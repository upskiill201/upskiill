'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, ArrowLeft, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { CartItem as CartItemComponent } from '../../components/features/CartItem';
import Button from '../../components/ui/Button';
import styles from './CartPage.module.css';

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, totalPrice, totalItems, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [guestInfo, setGuestInfo] = useState({ email: '', fullName: '' });

  // 1. Check if user is logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://upskiill-backend.onrender.com';
        const res = await fetch(`${apiUrl}/auth/me`);
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (e) {
        console.error('Auth check failed', e);
      }
    };
    checkAuth();
  }, []);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://upskiill-backend.onrender.com';
      
      const payload = {
        courseIds: items.map((item) => item.id),
        ...(user ? {} : guestInfo), // Include guest info if not logged in
      };

      const res = await fetch(`${apiUrl}/orders/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) {
        // Success
        clearCart();
        router.push('/checkout/success');
      } else {
        setError(result.message || 'Checkout failed');
      }
    } catch (err) {
      setError('An unexpected error occurred during checkout');
      console.error(err);
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (totalItems === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <ShoppingBag size={64} color="#CBD5E1" style={{ marginBottom: '20px' }} />
          <h2 className={styles.emptyTitle}>Your cart is empty</h2>
          <p className={styles.emptyDesc}>Explore our courses and start learning today!</p>
          <Link href="/courses">
            <Button variant="primary">Browse Courses</Button>
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
      <h1 className={styles.title}>Shopping Cart ({totalItems})</h1>

      <div className={styles.content}>
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
              onMoveToWishlist={() => {}} // Placeholder
            />
          ))}
        </div>

        {/* Right: Summary */}
        <div className={styles.summaryCard}>
          <h2 className={styles.summaryTitle}>Order Summary</h2>
          
          <div className={styles.summaryRow}>
            <span>Subtotal ({totalItems} items)</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          
          <div className={styles.summaryRow}>
            <span>Discounts</span>
            <span>-$0.00</span>
          </div>

          <div className={styles.totalRow}>
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          {error && (
            <div style={{ color: '#EF4444', fontSize: '14px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={16} /> {error}
            </div>
          )}

          {/* Guest Checkout Fields */}
          {!user && (
            <div className={styles.guestForm}>
              <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '16px' }}>
                Checkout as guest or <Link href="/login" style={{ color: '#3D5AFE', fontWeight: '600' }}>Login</Link>
              </p>
              <div className={styles.formGroup}>
                <label className={styles.label}>Full Name</label>
                <input 
                  type="text" 
                  className={styles.input} 
                  placeholder="e.g. John Doe"
                  value={guestInfo.fullName}
                  onChange={(e) => setGuestInfo({ ...guestInfo, fullName: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Email Address</label>
                <input 
                  type="email" 
                  className={styles.input} 
                  placeholder="e.g. john@example.com"
                  value={guestInfo.email}
                  onChange={(e) => setGuestInfo({ ...guestInfo, email: e.target.value })}
                />
              </div>
            </div>
          )}

          <Button 
            variant="primary" 
            fullWidth 
            size="lg" 
            onClick={handleCheckout}
            disabled={isCheckingOut || (!user && (!guestInfo.email || !guestInfo.fullName))}
          >
            {isCheckingOut ? (
              <>
                <Loader2 size={20} className={styles.spinner} /> Processing...
              </>
            ) : (
              user ? 'Complete Purchase' : 'Checkout as Guest'
            )}
          </Button>

          <p style={{ textAlign: 'center', fontSize: '12px', color: '#94A3B8', marginTop: '16px' }}>
            By checking out, you agree to our Terms of Service & Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
