'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { verifyOTP, resendOTP } from '@/actions/verify';
import styles from './Verify.module.css';

function VerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [timer, setTimer] = useState(60);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (!email) {
      router.push('/register');
    }
  }, [email, router]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    setError('');

    const otpString = otp.join('');
    if (otpString.length < 6) {
      setError('Please enter all 6 digits.');
      setLoading(false);
      return;
    }

    try {
      const result = await verifyOTP(email!, otpString);
      if (result.success) {
        setSuccess(true);
        setTimeout(() => router.push('/login?verified=true'), 2000);
      } else {
        setError(result.error || 'Invalid code.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;
    setResending(true);
    setError('');
    
    try {
      const result = await resendOTP(email!);
      if (result.success) {
        setTimer(60);
        setError('✅ New code sent to your email.');
      } else {
        setError(result.error || 'Failed to resend code.');
      }
    } catch (err) {
      setError('Something went wrong.');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="container" style={{ padding: '5rem 0' }}>
      <div className={`${styles.card} glass`}>
        <h1 className="gradient-text">Verify Identity</h1>
        <p className={styles.subtitle}>We sent a 6-digit code to <strong>{email}</strong></p>

        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>✅ Email verified! Redirecting...</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.otpGrid}>
            {otp.map((digit, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className={styles.otpInput}
                autoComplete="off"
                disabled={loading || success}
              />
            ))}
          </div>

          <button 
            type="submit" 
            className={styles.verifyBtn}
            disabled={loading || success}
          >
            {loading ? 'Verifying...' : 'Verify Code'}
          </button>
        </form>

        <p className={styles.resend}>
          Didn&apos;t receive it? 
          <button 
            onClick={handleResend} 
            disabled={loading || resending || timer > 0}
          >
            {resending ? 'Sending...' : 'Try again'}
          </button>
          {timer > 0 && <span className={styles.timer}>in {timer}s</span>}
        </p>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>Loading...</div>}>
      <VerifyContent />
    </Suspense>
  );
}
