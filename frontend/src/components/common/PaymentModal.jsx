import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { X, Loader } from 'lucide-react';
import toast from 'react-hot-toast';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pqr2');

const CheckoutForm = ({ clientSecret, course, user, onSuccess, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user?.name || 'Student',
          address: {
            country: 'IN', // Required for Indian Stripe accounts in some cases
          }
        },
      },
    });

    setIsProcessing(false);

    if (error) {
      toast.error(error.message);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      onSuccess();
    } else {
      toast.error('Payment failed. Please try again.');
    }
  };

  const CARD_OPTIONS = {
    style: {
      base: {
        color: '#fff',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
        iconColor: '#8b5cf6',
      },
      invalid: {
        color: '#ef4444',
        iconColor: '#ef4444',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', padding: '16px', borderRadius: '12px' }}>
        <h4 style={{ color: '#fff', fontWeight: 'bold', margin: '0 0 12px 0', fontSize: '1.1rem' }}>Order Summary</h4>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '12px' }}>
          <span>{course.title}</span>
          <span>₹{course.price}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', fontWeight: 'bold', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <span>Total</span>
          <span>₹{course.price}</span>
        </div>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#cbd5e1', marginBottom: '8px' }}>Card Details</label>
        <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '16px', borderRadius: '12px', minHeight: '50px' }}>
          <CardElement options={CARD_OPTIONS} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
        <button
          type="button"
          onClick={onCancel}
          disabled={isProcessing}
          style={{ flex: 1, padding: '12px', background: 'transparent', border: '1px solid #475569', color: '#cbd5e1', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          style={{ flex: 1, padding: '12px', background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', border: 'none', color: '#fff', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', boxShadow: '0 4px 14px rgba(139, 92, 246, 0.4)' }}
        >
          {isProcessing ? <><Loader size={18} className="animate-spin" /> Processing...</> : `Pay ₹${course.price}`}
        </button>
      </div>
    </form>
  );
};

const PaymentModal = ({ isOpen, onClose, clientSecret, course, user, onSuccess }) => {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 999999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', background: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(8px)' }}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '450px',
          padding: '32px',
          borderRadius: '24px',
          background: 'linear-gradient(145deg, #1e1e2f, #2a2a40)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}
      >
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
        >
          <X size={24} />
        </button>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', marginBottom: '24px', margin: 0 }}>Complete Payment</h2>

        {clientSecret ? (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm
              clientSecret={clientSecret}
              course={course}
              user={user}
              onSuccess={onSuccess}
              onCancel={onClose}
            />
          </Elements>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 0' }}>
            <Loader className="animate-spin" style={{ color: '#8b5cf6', marginBottom: '16px' }} size={32} />
            <p style={{ color: '#94a3b8', margin: 0 }}>Initializing secure payment...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
