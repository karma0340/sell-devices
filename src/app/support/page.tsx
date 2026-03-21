'use client';

import { useState } from 'react';

export default function SupportPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="container" style={{ padding: '8rem 0', maxWidth: '800px' }}>
      <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
        <span className="blue-gradient-text" style={{ fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Technical Support
        </span>
        <h1 className="gradient-text" style={{ fontSize: '4rem', marginTop: '0.5rem' }}>
          How Can We Help?
        </h1>
        <p style={{ color: '#888', marginTop: '1rem' }}>Our team in Berlin Kreuzberg is ready for your technical queries.</p>
      </header>

      {submitted ? (
        <div className="glass" style={{ padding: '4rem', textAlign: 'center', borderRadius: '12px' }}>
          <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Message Received</h2>
          <p style={{ color: '#888' }}>We will get back to you within 24 hours.</p>
          <button 
            onClick={() => setSubmitted(false)}
            style={{ marginTop: '2rem', padding: '0.8rem 1.5rem', background: 'white', color: 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Send Another
          </button>
        </div>
      ) : (
        <form 
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.8rem', color: '#666' }}>Name</label>
              <input type="text" required style={{ padding: '1rem', background: '#111', border: '1px solid var(--border)', borderRadius: '4px', color: 'white' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.8rem', color: '#666' }}>Email</label>
              <input type="email" required style={{ padding: '1rem', background: '#111', border: '1px solid var(--border)', borderRadius: '4px', color: 'white' }} />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.8rem', color: '#666' }}>Serial Number (Optional)</label>
            <input type="text" style={{ padding: '1rem', background: '#111', border: '1px solid var(--border)', borderRadius: '4px', color: 'white' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.8rem', color: '#666' }}>Message</label>
            <textarea rows={6} required style={{ padding: '1rem', background: '#111', border: '1px solid var(--border)', borderRadius: '4px', color: 'white', resize: 'vertical' }}></textarea>
          </div>
          <button 
            type="submit"
            style={{ padding: '1.2rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 700, fontSize: '1.1rem', marginTop: '1rem' }}
          >
            Submit Inquiry
          </button>
        </form>
      )}

      <div style={{ marginTop: '6rem', paddingTop: '4rem', borderTop: '1px solid var(--border)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <h4 style={{ marginBottom: '0.5rem' }}>Mitte Showroom</h4>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>Torstraße 123, 10119 Berlin</p>
        </div>
        <div>
          <h4 style={{ marginBottom: '0.5rem' }}>24/7 Hotline</h4>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>+49 30 12345678</p>
        </div>
      </div>
    </div>
  );
}
