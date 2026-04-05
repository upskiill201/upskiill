'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, ArrowLeft, Loader2, AlertCircle, CreditCard, Smartphone, CheckCircle2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { CartItem as CartItemComponent } from '../../components/features/CartItem';
import Button from '../../components/ui/Button';
import styles from './CartPage.module.css';

// Stripe Integration
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Preload stripe (use dummy key in dev)
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY || 'pk_test_mock_stripe_key_123');

// Embedded Stripe Checkout Form
const StripeCheckoutForm = ({ totalAmount, onSuccess }: { totalAmount: number, onSuccess: () => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required', // Avoid full redirect if possible to keep seamless UI
    });

    if (error) {
      setErrorMsg(error.message || 'An unexpected error occurred.');
      setIsProcessing(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.stripeForm}>
      <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Credit Card details</h3>
      <PaymentElement />
      {errorMsg && <div className={styles.errorAlert}><AlertCircle size={16}/> {errorMsg}</div>}
      <Button 
        type="submit" 
        variant="primary" 
        fullWidth 
        style={{ marginTop: '24px' }}
        disabled={isProcessing || !stripe || !elements}
      >
        {isProcessing ? <><Loader2 size={18} className="animate-spin" /> Processing...</> : `Pay $${totalAmount.toFixed(2)} securely`}
      </Button>
    </form>
  );
};


export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, totalPrice, totalItems, clearCart } = useCart();
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  
  // Payment Flow State
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'mesomb'>('stripe');
  const [clientSecret, setClientSecret] = useState<string>('');
  const [isInitializing, setIsInitializing] = useState(false);
  
  // Mobile Money State
  const [mobileProvider, setMobileProvider] = useState<'MTN' | 'ORANGE'>('MTN');
  const [mobileNumber, setMobileNumber] = useState('');
  const [isProcessingMobile, setIsProcessingMobile] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          setUser(await res.json());
        }
      } catch (e) {}
    };
    checkAuth();
  }, []);

  // Fetch Stripe Intent if items exist
  useEffect(() => {
    if (totalItems > 0 && user && paymentMethod === 'stripe' && !clientSecret) {
      setIsInitializing(true);
      fetch('/api/payment/stripe/create-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ courseIds: items.map(i => i.id) }),
      })
      .then(r => r.json())
      .then(data => {
        if (data.clientSecret) setClientSecret(data.clientSecret);
      })
      .catch(console.error)
      .finally(() => setIsInitializing(false));
    }
  }, [items, user, paymentMethod, totalItems, clientSecret]);

  const handleMobileMoney = async () => {
    if (!mobileNumber) {
      setError('Please enter a valid mobile number');
      return;
    }
    setError(null);
    setIsProcessingMobile(true);
    
    try {
      const res = await fetch('/api/payment/mesomb/collect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          courseIds: items.map(i => i.id),
          payerAccount: mobileNumber,
          service: mobileProvider
        }),
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        clearCart();
        router.push('/checkout/success');
      } else {
        setError(data.message || 'Payment failed. Please check your phone prompt.');
      }
    } catch(err) {
      setError('Connection to Mobile Money gateway failed.');
    } finally {
      setIsProcessingMobile(false);
    }
  };

  if (totalItems === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <ShoppingBag size={64} color="#334155" style={{ marginBottom: '20px' }} />
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
    <div className={styles.premiumLayout}>
      <div className={styles.checkoutWrapper}>
        
        {/* Left Side: Cart & Summary */}
        <div className={styles.orderSide}>
          <Link href="/courses" className={styles.backLink}>
            <ArrowLeft size={16} /> Back to Courses
          </Link>
          <h1 className={styles.title}>Order Summary</h1>
          
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

          <div className={styles.totalsBlock}>
            <div className={styles.totalRow}>
              <span style={{ color: '#94A3B8' }}>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className={styles.totalRowLarge}>
              <span>Total to Pay</span>
              <span className={styles.gradientText}>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Payment Portal */}
        <div className={styles.paymentSide}>
          <h2 className={styles.paymentTitle}>Secure Checkout</h2>
          
          {!user ? (
            <div className={styles.authLock}>
              <p>You must be signed in to purchase courses.</p>
              <Link href="/login"><Button variant="primary" fullWidth>Log In to Continue</Button></Link>
            </div>
          ) : (
            <>
              {/* Payment Selectors */}
              <div className={styles.paymentMethodCards}>
                <button 
                  className={`${styles.methodCard} ${paymentMethod === 'stripe' ? styles.active : ''}`}
                  onClick={() => setPaymentMethod('stripe')}
                >
                  <CreditCard size={24} />
                  <span>Card / Apple Pay</span>
                </button>
                <button 
                  className={`${styles.methodCard} ${paymentMethod === 'mesomb' ? styles.active : ''}`}
                  onClick={() => setPaymentMethod('mesomb')}
                >
                  <Smartphone size={24} />
                  <span>Mobile Money</span>
                </button>
              </div>

              {/* Dynamic Payment Forms */}
              <div className={styles.paymentFormContainer}>
                {paymentMethod === 'stripe' && (
                  isInitializing ? (
                    <div className={styles.loadingBox}><Loader2 className="animate-spin" /> Preparing secure gateway...</div>
                  ) : clientSecret ? (
                    <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'night' } }}>
                      <StripeCheckoutForm 
                        totalAmount={totalPrice} 
                        onSuccess={() => { clearCart(); router.push('/checkout/success'); }} 
                      />
                    </Elements>
                  ) : (
                    <div className={styles.errorAlert}>Failed to load payment gateway.</div>
                  )
                )}

                {paymentMethod === 'mesomb' && (
                  <div className={styles.mobileMoneyForm}>
                    <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Mobile Money (XAF)</h3>
                    <p style={{ color: '#94A3B8', fontSize: '14px', marginBottom: '20px' }}>
                      Exchange Rate: 1 USD = 600 FCFA. <br/>You will be billed approx: <strong>{(totalPrice * 600).toLocaleString()} FCFA</strong>
                    </p>
                    
                    <div className={styles.formGroup}>
                      <label>Network Provider</label>
                      <select 
                        value={mobileProvider} 
                        onChange={(e) => setMobileProvider(e.target.value as any)}
                        className={styles.input}
                      >
                        <option value="MTN">MTN Mobile Money</option>
                        <option value="ORANGE">Orange Money</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label>Phone Number</label>
                      <input 
                        type="tel" 
                        placeholder="e.g. 671234567" 
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        className={styles.input}
                      />
                    </div>

                    {error && <div className={styles.errorAlert} style={{ marginTop: '16px' }}><AlertCircle size={16}/> {error}</div>}

                    <Button 
                      onClick={handleMobileMoney} 
                      variant="primary" 
                      fullWidth 
                      style={{ marginTop: '24px' }}
                      disabled={isProcessingMobile || !mobileNumber}
                    >
                      {isProcessingMobile ? 'Pushing prompt to your phone...' : 'Pay with Mobile Money'}
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}

          <div className={styles.secureBadge}>
            <CheckCircle2 size={14} color="#10B981" />
            <span>Encrypted & secure. We do not store your payment data.</span>
          </div>
        </div>

      </div>
    </div>
  );
}
