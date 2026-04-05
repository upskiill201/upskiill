'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, ArrowLeft, Trash2, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { CartItem as CartItemComponent } from '../../components/features/CartItem';
import Button from '../../components/ui/Button';
import styles from './CartPage.module.css';

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, totalPrice, totalItems } = useCart();

  if (totalItems === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <ShoppingBag size={72} color="#334155" style={{ margin: '0 auto 24px' }} />
          <h2 className={styles.emptyTitle}>Your cart is empty</h2>
          <p className={styles.emptyDesc}>
            Explore our library and find a course that will level up your skills.
          </p>
          <Link href="/courses">
            <Button variant="primary" size="lg">Browse Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Link href="/courses" className={styles.backLink}>
        <ArrowLeft size={16} /> Back to Courses
      </Link>

      <h1 className={styles.title}>
        <ShoppingCart size={28} /> Shopping Cart
        <span className={styles.itemCount}>{totalItems} {totalItems === 1 ? 'item' : 'items'}</span>
      </h1>

      <div className={styles.layout}>
        {/* Left: Cart Items */}
        <div className={styles.cartList}>
          {items.map((item) => (
            <CartItemComponent
              key={item.id}
              courseId={item.id}
              title={item.title}
              thumbnail={item.thumbnail}
              instructorName={item.instructorName}
              price={item.price}
              onRemove={() => removeItem(item.id)}
              onMoveToWishlist={() => {}}
            />
          ))}
        </div>

        {/* Right: Order Summary */}
        <div className={styles.summaryCard}>
          <h2 className={styles.summaryTitle}>Order Summary</h2>

          <div className={styles.summaryRows}>
            {items.map(item => (
              <div key={item.id} className={styles.summaryRow}>
                <span className={styles.summaryItemName}>{item.title}</span>
                <span className={styles.summaryItemPrice}>${item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className={styles.divider} />

          <div className={styles.totalRow}>
            <span>Total</span>
            <span className={styles.totalAmount}>${totalPrice.toFixed(2)}</span>
          </div>

          <Button
            variant="primary"
            fullWidth
            size="lg"
            onClick={() => router.push('/checkout')}
            style={{ marginTop: '24px' }}
          >
            Proceed to Checkout →
          </Button>

          <p className={styles.secureNote}>
            🔒 Secure checkout. 30-day money-back guarantee.
          </p>
        </div>
      </div>
    </div>
  );
}
