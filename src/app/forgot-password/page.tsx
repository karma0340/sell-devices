'use client';

import { useState } from 'react';
import styles from './Forgot.module.css';
import Link from 'next/link';
import { requestPasswordReset } from '@/actions/forgotPassword';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const result = await requestPasswordReset(email);
      if (result.success) {
        setMessage('Reset instructions sent to ' + email + '. Redirecting to verification...');
        setTimeout(() => {
          router.push(`/reset-password?email=${encodeURIComponent(email)}`);
        }, 3000);
      } else {
        setError(result.error || 'Failed to process request.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '5rem 0' }}>
      <div className={`${styles.card} glass`}>
        <h1 className="gradient-text">Reset Password</h1>
        <p className={styles.subtitle}>Enter your email address and we&apos;ll send you a link to reset your password.</p>

        {message && <div className={styles.success}>✅ {message}</div>}
        {error && <div className={styles.error}>{error}</div>}

        {!message && (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="karl@berlin.de"
                required
              />
            </div>

            <button type="submit" disabled={loading} className={styles.submitBtn}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        )}

        <div className={styles.footer}>
          <Link href="/login" className={styles.backLink}>&larr; Back to Login</Link>
        </div>
      </div>
    </div>
  );
}
