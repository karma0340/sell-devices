import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import styles from "./Orders.module.css";
import Link from 'next/link';

export default async function OrdersPage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  const orders = await prisma.order.findMany({
    where: {
      OR: [
        { userId: session.user.id },
        { email: session.user.email as string },
      ]
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="container" style={{ padding: "4rem 0" }}>
      <h1 className="gradient-text" style={{ marginBottom: "2.5rem", fontSize: "3rem" }}>My Orders</h1>
      
      {orders.length === 0 ? (
        <div className={styles.emptyState}>
          <p>You haven&apos;t placed any orders yet.</p>
          <Link href="/products" className="glass" style={{ display: 'inline-block', marginTop: '1.5rem', padding: '1rem 2rem' }}>
            Browse Products
          </Link>
        </div>
      ) : (
        <div className={styles.ordersGrid}>
          {orders.map((order: any) => (
            <div key={order.id} className={`${styles.orderCard} glass`}>
              <div className={styles.orderHeader}>
                <div>
                  <span className={styles.orderLabel}>Order ID</span>
                  <span className={styles.orderId}>{order.id.slice(-8).toUpperCase()}</span>
                </div>
                <div>
                  <span className={styles.orderLabel}>Date & Time</span>
                  <span className={styles.orderDate}>
                    {new Date(order.createdAt).toLocaleString(undefined, {
                      dateStyle: 'medium',
                      timeStyle: 'short'
                    })}
                  </span>
                </div>
                <div>
                  <span className={styles.orderStatus} data-status={order.status}>
                    {order.status}
                  </span>
                </div>
              </div>

              <div className={styles.orderItems}>
                <span className={styles.orderLabel}>Items Purchased</span>
                <div className={styles.itemList}>
                  {(order.items as any[]).map((item, idx) => (
                    <div key={idx} className={styles.itemRow}>
                      {item.image && (
                        <div className={styles.itemThumb}>
                          <img src={item.image} alt={item.name} />
                        </div>
                      )}
                      <div className={styles.itemInfo}>
                        <span className={styles.itemName}>{item.name || 'Premium Tech'}</span>
                        <span className={styles.itemQty}>x {item.quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.orderFooter}>
                <span className={styles.totalLabel}>Total Amount</span>
                <span className={styles.totalAmount}>€{order.total.toLocaleString()}</span>
              </div>

              {(order.address || order.phoneNumber || order.email) && (
                <div className={styles.deliverySection}>
                  <span className={styles.orderLabel} style={{ marginBottom: "1rem" }}>Fulfillment Logistics</span>
                  
                  {order.address && Object.keys(order.address).length > 0 && (
                    <div className={styles.deliveryRow}>
                      <span className={styles.deliveryIcon}>📍</span>
                      <div>
                        <div style={{ color: "#fff", fontWeight: "600", marginBottom: "0.25rem" }}>{order.customer}</div>
                        <div>{(order.address as any)?.line1} {(order.address as any)?.line2}</div>
                        <div>
                          {(order.address as any)?.city}, {(order.address as any)?.state} {(order.address as any)?.postal_code}
                        </div>
                        <div>{(order.address as any)?.country}</div>
                      </div>
                    </div>
                  )}

                  {order.phoneNumber && (
                    <div className={styles.deliveryRow}>
                      <span className={styles.deliveryIcon}>📞</span>
                      <div>{order.phoneNumber}</div>
                    </div>
                  )}

                  <div className={styles.deliveryRow}>
                    <span className={styles.deliveryIcon}>🚚</span>
                    <div>Estimated Arrival: <strong>{order.deliveryEstimate || '3-5 Business Days'}</strong></div>
                  </div>

                  <div className={styles.deliveryRow}>
                    <span className={styles.deliveryIcon}>✉️</span>
                    <div>{order.email}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
