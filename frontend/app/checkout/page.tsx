'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, Loader2, AlertCircle, CreditCard, Smartphone,
  CheckCircle2, Shield, Lock
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import Button from '../../components/ui/Button';
import styles from './CheckoutPage.module.css';

// Stripe
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY || '');

// Stripe form component
function StripeForm({ totalPrice, onSuccess }: { totalPrice: number; onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setProcessing(true);
    setErrorMsg('');

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    if (error) {
      setErrorMsg(error.message || 'Payment failed. Please try again.');
      setProcessing(false);
    } else if (paymentIntent?.status === 'succeeded') {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handlePay}>
      <PaymentElement options={{
        layout: 'tabs',
      }} />
      {errorMsg && (
        <div className={styles.errorAlert}>
          <AlertCircle size={16} /> {errorMsg}
        </div>
      )}
      <Button
        type="submit"
        variant="primary"
        fullWidth
        size="lg"
        style={{ marginTop: '24px' }}
        disabled={processing || !stripe || !elements}
      >
        {processing
          ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Processing...</>
          : `Pay $${totalPrice.toFixed(2)} Securely`}
      </Button>
    </form>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const [user, setUser] = useState<{ id: string; fullName: string; email: string } | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Payment method: 'stripe' or 'momo' (Mobile Money)
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'momo'>('stripe');

  // Stripe
  const [clientSecret, setClientSecret] = useState('');
  const [stripeLoading, setStripeLoading] = useState(false);
  const [stripeError, setStripeError] = useState('');

  // Mobile Money
  const [momoProvider, setMomoProvider] = useState<'MTN' | 'ORANGE' | 'EXPRESS_UNION' | 'WAVE'>('MTN');
  const [momoNumber, setMomoNumber] = useState('');
  const [momoProcessing, setMomoProcessing] = useState(false);
  const [momoError, setMomoError] = useState('');

  // Auth check — redirect to login if not authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        if (res.ok) {
          setUser(await res.json());
        } else {
          // Not logged in — send them to login with a return URL
          router.push('/login?returnTo=/checkout');
        }
      } catch {
        router.push('/login?returnTo=/checkout');
      } finally {
        setAuthLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  // Redirect if cart is empty
  useEffect(() => {
    if (!authLoading && totalItems === 0) {
      router.push('/cart');
    }
  }, [authLoading, totalItems, router]);

  // Fetch Stripe client secret when stripe method is selected
  const fetchStripeIntent = useCallback(async () => {
    if (!user || totalItems === 0) return;
    setStripeLoading(true);
    setStripeError('');
    try {
      const res = await fetch('/api/payment/stripe/create-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ courseIds: items.map(i => i.id) }),
      });
      const data = await res.json();
      if (res.ok && data.clientSecret) {
        setClientSecret(data.clientSecret);
      } else {
        setStripeError(data.message || 'Failed to initialize payment gateway.');
      }
    } catch {
      setStripeError('Network error. Please check your connection and try again.');
    } finally {
      setStripeLoading(false);
    }
  }, [user, totalItems, items]);

  useEffect(() => {
    if (paymentMethod === 'stripe' && user && !clientSecret) {
      fetchStripeIntent();
    }
  }, [paymentMethod, user, clientSecret, fetchStripeIntent]);

  const handleMomoPayment = async () => {
    if (!momoNumber || momoNumber.length < 8) {
      setMomoError('Please enter a valid phone number (at least 8 digits).');
      return;
    }
    setMomoError('');
    setMomoProcessing(true);
    try {
      const res = await fetch('/api/payment/mesomb/collect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          courseIds: items.map(i => i.id),
          payerAccount: momoNumber,
          service: momoProvider,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        clearCart();
        router.push('/checkout/success');
      } else {
        setMomoError(data.message || 'Mobile Money payment failed. Did you confirm the prompt on your phone?');
      }
    } catch {
      setMomoError('Connection error. Please try again.');
    } finally {
      setMomoProcessing(false);
    }
  };

  const handleSuccess = () => {
    clearCart();
    router.push('/checkout/success');
  };

  if (authLoading) {
    return (
      <div className={styles.loadingScreen}>
        <Loader2 size={40} className={styles.spinner} />
        <p>Verifying your session...</p>
      </div>
    );
  }

  if (!user || totalItems === 0) return null;

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>

        {/* Left: Order Summary */}
        <div className={styles.summarySide}>
          <Link href="/cart" className={styles.backLink}>
            <ArrowLeft size={16} /> Back to Cart
          </Link>

          <h1 className={styles.heading}>Secure Checkout</h1>
          <p className={styles.subheading}>Logged in as <strong>{user.email}</strong></p>

          <div className={styles.orderCard}>
            <h2 className={styles.orderTitle}>Your Order</h2>
            {items.map(item => (
              <div key={item.id} className={styles.orderItem}>
                <div className={styles.orderItemInfo}>
                  <p className={styles.orderItemName}>{item.title}</p>
                </div>
                <span className={styles.orderItemPrice}>${item.price.toFixed(2)}</span>
              </div>
            ))}
            <div className={styles.orderDivider} />
            <div className={styles.orderTotal}>
              <span>Total</span>
              <span className={styles.orderTotalAmount}>${totalPrice.toFixed(2)} USD</span>
            </div>
          </div>

          <div className={styles.guarantees}>
            <div className={styles.guarantee}><Shield size={16} /> 30-day money-back guarantee</div>
            <div className={styles.guarantee}><Lock size={16} /> SSL encrypted & secure</div>
            <div className={styles.guarantee}><CheckCircle2 size={16} /> Instant course access on payment</div>
          </div>
        </div>

        {/* Right: Payment */}
        <div className={styles.paymentSide}>
          <h2 className={styles.paymentTitle}>Payment Method</h2>

          {/* Method Selector */}
          <div className={styles.methodSelector}>
            <button
              className={`${styles.methodTab} ${paymentMethod === 'stripe' ? styles.activeTab : ''}`}
              onClick={() => setPaymentMethod('stripe')}
            >
              <CreditCard size={20} />
              <span>Card & Digital Wallets</span>
            </button>
            <button
              className={`${styles.methodTab} ${paymentMethod === 'momo' ? styles.activeTab : ''}`}
              onClick={() => setPaymentMethod('momo')}
            >
              <Smartphone size={20} />
              <span>Mobile Money (Africa)</span>
            </button>
          </div>

          {/* Stripe Panel */}
          {paymentMethod === 'stripe' && (
            <div className={styles.paymentPanel}>
              <p className={styles.panelNote}>
                Pay securely with Credit Card, Debit Card, Apple Pay, or Google Pay.
              </p>
              {stripeLoading && (
                <div className={styles.loadingBox}>
                  <Loader2 size={22} className={styles.spinner} />
                  <span>Connecting to payment gateway...</span>
                </div>
              )}
              {stripeError && !stripeLoading && (
                <div className={styles.errorAlert}>
                  <AlertCircle size={16} /> {stripeError}
                  <button className={styles.retryLink} onClick={fetchStripeIntent}>Retry</button>
                </div>
              )}
              {clientSecret && !stripeLoading && (
                <Elements
                  stripe={stripePromise}
                  options={{ clientSecret, appearance: { theme: 'night', variables: { colorPrimary: '#3D5AFE' } } }}
                >
                  <StripeForm totalPrice={totalPrice} onSuccess={handleSuccess} />
                </Elements>
              )}
            </div>
          )}

          {/* Mobile Money Panel */}
          {paymentMethod === 'momo' && (
            <div className={styles.paymentPanel}>
              <p className={styles.panelNote}>
                Pay via Mobile Money. You will receive a USSD prompt on your phone to confirm.
                <br />
                <strong>Amount: {(totalPrice * 600).toLocaleString()} FCFA</strong> (Rate: 1 USD = 600 XAF)
              </p>

              <div className={styles.formGroup}>
                <label className={styles.label}>Mobile Money Provider</label>
                <div className={styles.providerGrid}>
                  {[
                    { id: 'MTN', label: 'MTN MoMo', flag: '🟡' },
                    { id: 'ORANGE', label: 'Orange Money', flag: '🟠' },
                    { id: 'EXPRESS_UNION', label: 'Express Union', flag: '🔵' },
                    { id: 'WAVE', label: 'Wave', flag: '🔵' },
                  ].map(p => (
                    <button
                      key={p.id}
                      className={`${styles.providerCard} ${momoProvider === p.id ? styles.providerActive : ''}`}
                      onClick={() => setMomoProvider(p.id as typeof momoProvider)}
                    >
                      <span style={{ fontSize: '22px' }}>{p.flag}</span>
                      <span className={styles.providerLabel}>{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Phone Number</label>
                <div className={styles.phoneInput}>
                  <span className={styles.phonePrefix}>+237</span>
                  <input
                    type="tel"
                    className={styles.phoneField}
                    placeholder="671 234 567"
                    value={momoNumber}
                    onChange={e => setMomoNumber(e.target.value.replace(/\D/g, ''))}
                    maxLength={9}
                  />
                </div>
              </div>

              {momoError && (
                <div className={styles.errorAlert}>
                  <AlertCircle size={16} /> {momoError}
                </div>
              )}

              <Button
                variant="primary"
                fullWidth
                size="lg"
                style={{ marginTop: '24px' }}
                onClick={handleMomoPayment}
                disabled={momoProcessing || !momoNumber}
              >
                {momoProcessing
                  ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Waiting for confirmation...</>
                  : `Pay ${(totalPrice * 600).toLocaleString()} FCFA via ${momoProvider}`}
              </Button>

              <p className={styles.momoHint}>
                After clicking, check your phone for a PIN confirmation prompt from {momoProvider}.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
