'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './Reset.module.css';
import { resetPassword } from '@/actions/forgotPassword';

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (otp.length < 6) {
      setError('Enter the 6-digit secure code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await resetPassword(email, otp, password);
      if (result.success) {
        router.push('/login?reset=success');
      } else {
        setError(result.error || 'Failed to reset password');
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '5rem 0' }}>
      <div className={`${styles.card} glass`}>
        <h1 className="gradient-text">Complete Reset</h1>
        <p className={styles.subtitle}>Enter the 6-digit code we sent to your email and choose a new password.</p>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Secure Code</label>
            <input 
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="123456"
              maxLength={6}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>New Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Confirm New Password</label>
            <input 
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" disabled={loading} className={styles.submitBtn}>
            {loading ? 'Updating...' : 'Change Password'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
