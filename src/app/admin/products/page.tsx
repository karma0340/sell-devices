'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './Products.module.css';
import { useRouter } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image?: string;
  features: string[];
}

import { deleteProductAction } from '@/actions/product';

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [pendingDelete, setPendingDelete] = useState<Product | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/admin/products');
      if (!res.ok) throw new Error('API fetch failed');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const commitDelete = async (product: Product) => {
    try {
      const result = await deleteProductAction(product.id);
      if (result?.error) {
        console.error('Database delete failed:', result.error);
        alert(`Failed to delete in background: ${result.error}`);
        // Optionally fetch products again to restore it if DB delete failed
        fetchProducts(); 
      } else {
        router.refresh();
      }
    } catch (error) {
      console.error('Delete execution error:', error);
    }
  };

  const handleDelete = (product: Product) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete ${product.name}? If yes, it will be removed.`);
    if (!isConfirmed) return;

    // If there is already a pending delete, execute it immediately
    if (pendingDelete && timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      commitDelete(pendingDelete);
    }

    // Move to pending delete and remove from UI
    setPendingDelete(product);
    setProducts(prev => prev.filter(p => p.id !== product.id));

    // Schedule actual database deletion
    timeoutRef.current = setTimeout(() => {
      commitDelete(product);
      setPendingDelete(null);
    }, 8000); // 8 seconds to undo
  };

  const handleUndo = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (pendingDelete) {
      setProducts(prev => {
        // Place it back at the top for visibility, or we could sort by original index
        return [pendingDelete, ...prev];
      });
      setPendingDelete(null);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setImagePreview(product.image || null);
    setIsModalOpen(true);
  };

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          let width = img.width;
          let height = img.height;

          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.8));
        };
      };
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const compressed = await compressImage(file);
      setImagePreview(compressed);
      setIsUploading(false);
    }
  };

  const handleSaveProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Process features (split by newline)
    const featuresRaw = formData.get('features') as string;
    const features = featuresRaw.split('\n').map(f => f.trim()).filter(f => f !== '');

    const data = {
      id: editingProduct?.id,
      name: formData.get('name') as string,
      category: formData.get('category') as string,
      price: Number(formData.get('price')),
      description: formData.get('description') as string,
      image: imagePreview || formData.get('imageUrl') as string || '/assets/default.png',
      features: features,
    };

    await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    setIsModalOpen(false);
    setEditingProduct(null);
    setImagePreview(null);
    fetchProducts();
    router.refresh();
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>Real-Time Inventory</h1>
          <p>Syncing directly to MongoDB Database.</p>
        </div>
        <button className={styles.addBtn} onClick={() => { setEditingProduct(null); setImagePreview(null); setIsModalOpen(true); }}>
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
                    <small>{product.id.slice(-6).toUpperCase()}</small>
                  </div>
                </td>
                <td>{product.category}</td>
                <td>€{product.price.toLocaleString()}</td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.editBtn} onClick={() => handleEdit(product)}>Edit</button>
                    <button 
                      className={styles.deleteBtn} 
                      onClick={() => handleDelete(product)}
                    >
                      Delete
                    </button>
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
            <div className={styles.modalHeader}>
              <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button className={styles.closeBtn} onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            <form onSubmit={handleSaveProduct} className={styles.modalForm}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Product Name</label>
                  <input name="name" defaultValue={editingProduct?.name} required placeholder="iPhone 15 Pro" />
                </div>
                <div className={styles.formGroup}>
                  <label>Category</label>
                  <select 
                    name="categorySelect" 
                    defaultValue={editingProduct?.category || 'Phones'} 
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === 'CUSTOM') {
                        (e.target.nextElementSibling as HTMLInputElement).style.display = 'block';
                        (e.target.nextElementSibling as HTMLInputElement).required = true;
                        (e.target.nextElementSibling as HTMLInputElement).focus();
                      } else {
                        (e.target.nextElementSibling as HTMLInputElement).style.display = 'none';
                        (e.target.nextElementSibling as HTMLInputElement).required = false;
                        (e.target.nextElementSibling as HTMLInputElement).value = val;
                      }
                    }}
                  >
                    {['Phones', 'Laptops', 'Audio', 'Wearables', 'Tablets', 'Accessories', 'Smart Home', 'Gaming'].map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                    {Array.from(new Set(products.map(p => p.category))).filter(c => !['Phones', 'Laptops', 'Audio', 'Wearables', 'Tablets', 'Accessories', 'Smart Home', 'Gaming'].includes(c)).map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                    <option value="CUSTOM">+ Add New...</option>
                  </select>
                  <input 
                    name="category" 
                    defaultValue={editingProduct?.category} 
                    style={{ display: 'none', marginTop: '0.5rem' }} 
                    placeholder="Enter new category name" 
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Price (€)</label>
                  <input name="price" type="number" defaultValue={editingProduct?.price} required placeholder="999" />
                </div>
                <div className={styles.formGroup}>
                  <label>Image (Local Upload or URL)</label>
                  <div className={styles.imageInputs}>
                    <input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} style={{ display: 'none' }} />
                    <button type="button" className={styles.uploadBtn} onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
                      {isUploading ? 'Compressing...' : 'Upload Image'}
                    </button>
                    <input name="imageUrl" defaultValue={editingProduct?.image} placeholder="Or enter URL" />
                  </div>
                  {imagePreview && (
                    <div className={styles.previewContainer}>
                      <img src={imagePreview} alt="Preview" className={styles.imagePreview} />
                      <button type="button" onClick={() => setImagePreview(null)}>Remove</button>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Description</label>
                <textarea name="description" defaultValue={editingProduct?.description} required rows={3}></textarea>
              </div>

              <div className={styles.formGroup}>
                <label>Key Features (One per line)</label>
                <textarea 
                  name="features" 
                  defaultValue={editingProduct?.features?.join('\n')} 
                  placeholder="A17 Pro Chip&#10;Titanium Design&#10;48MP Main Camera"
                  rows={4}
                ></textarea>
              </div>

              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelBtn} onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className={styles.saveBtn} disabled={isUploading}>Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Undo Toast Notification */}
      {pendingDelete && (
        <div className={styles.undoToast}>
          <span><strong>{pendingDelete.name}</strong> was deleted.</span>
          <button onClick={handleUndo} className={styles.undoBtn}>Undo</button>
        </div>
      )}
    </div>
  );
}
