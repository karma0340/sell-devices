'use client';

import { useState, useEffect } from 'react';
import styles from './Products.module.css';
import { PRODUCTS as initialProducts } from '@/lib/data';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('admin_products');
    if (saved) {
      setProducts(JSON.parse(saved));
    } else {
      setProducts(initialProducts);
    }
  }, []);

  const saveProducts = (updated: Product[]) => {
    setProducts(updated);
    localStorage.setItem('admin_products', JSON.stringify(updated));
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      saveProducts(products.filter(p => p.id !== id));
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      category: formData.get('category') as string,
      price: Number(formData.get('price')),
      description: formData.get('description') as string,
    };

    if (editingProduct) {
      saveProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...data } : p));
    } else {
      const newProduct = {
        id: Math.random().toString(36).substr(2, 9),
        ...data,
      };
      saveProducts([...products, newProduct]);
    }
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>Product Inventory</h1>
          <p>Manage your smart devices and gadgets.</p>
        </div>
        <button className={styles.addBtn} onClick={() => { setEditingProduct(null); setIsModalOpen(true); }}>
          + Add New Product
        </button>
      </header>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>
                  <div className={styles.nameCell}>
                    <strong>{product.name}</strong>
                    <small>{product.id}</small>
                  </div>
                </td>
                <td>{product.category}</td>
                <td>€{product.price.toLocaleString()}</td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.editBtn} onClick={() => handleEdit(product)}>Edit</button>
                    <button className={styles.deleteBtn} onClick={() => handleDelete(product.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSaveProduct}>
              <div className={styles.formGroup}>
                <label>Product Name</label>
                <input name="name" defaultValue={editingProduct?.name} required />
              </div>
              <div className={styles.formGroup}>
                <label>Category</label>
                <input name="category" defaultValue={editingProduct?.category} required />
              </div>
              <div className={styles.formGroup}>
                <label>Price (€)</label>
                <input name="price" type="number" defaultValue={editingProduct?.price} required />
              </div>
              <div className={styles.formGroup}>
                <label>Description</label>
                <textarea name="description" defaultValue={editingProduct?.description} required rows={3}></textarea>
              </div>
              <div className={styles.modalActions}>
                <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className={styles.saveBtn}>Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
