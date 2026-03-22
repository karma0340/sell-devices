'use client';

import { useState } from 'react';

export default function SupportPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="container" style={{ padding: '7rem 0 4rem', maxWidth: '800px' }}>
      <style>{`
        @media (max-width: 600px) {
          .support-grid { grid-template-columns: 1fr !important; }
          .support-title { font-size: 2.2rem !important; }
          .support-header { margin-bottom: 2rem !important; }
        }
      `}</style>
      <header className="support-header" style={{ marginBottom: '4rem', textAlign: 'center' }}>
        <span className="blue-gradient-text" style={{ fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.9rem' }}>
          Technical Support
        </span>
        <h1 className="gradient-text support-title" style={{ fontSize: '3.5rem', marginTop: '0.5rem', lineHeight: 1.1 }}>
          How Can We Help?
        </h1>
        <p style={{ color: '#888', marginTop: '1rem', fontSize: '0.9rem' }}>Our team in Berlin Kreuzberg is ready for your technical queries.</p>
      </header>

      {submitted ? (
        <div className="glass" style={{ padding: '3rem 2rem', textAlign: 'center', borderRadius: '12px' }}>
          <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Message Received</h2>
          <p style={{ color: '#888' }}>We will get back to you within 24 hours.</p>
          <button 
            onClick={() => setSubmitted(false)}
            style={{ marginTop: '2rem', padding: '0.8rem 1.5rem', background: 'white', color: 'black', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}
          >
            Send Another
          </button>
        </div>
      ) : (
        <form 
          style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}
          onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
        >
          <div className="support-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.75rem', color: '#888', fontWeight: 600 }}>Name</label>
              <input type="text" required style={{ padding: '0.9rem', background: '#0e0e0e', border: '1px solid var(--border)', borderRadius: '8px', color: 'white' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.75rem', color: '#888', fontWeight: 600 }}>Email</label>
              <input type="email" required style={{ padding: '0.9rem', background: '#0e0e0e', border: '1px solid var(--border)', borderRadius: '8px', color: 'white' }} />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ fontSize: '0.75rem', color: '#888', fontWeight: 600 }}>Serial Number (Optional)</label>
            <input type="text" placeholder="e.g. SN-123456" style={{ padding: '0.9rem', background: '#0e0e0e', border: '1px solid var(--border)', borderRadius: '8px', color: 'white' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ fontSize: '0.75rem', color: '#888', fontWeight: 600 }}>Message</label>
            <textarea rows={5} required placeholder="Tell us what's happening..." style={{ padding: '0.9rem', background: '#0e0e0e', border: '1px solid var(--border)', borderRadius: '8px', color: 'white', resize: 'vertical' }}></textarea>
          </div>
          <button 
            type="submit"
            style={{ padding: '1.1rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '1rem', marginTop: '1rem', boxShadow: '0 4px 15px rgba(0, 191, 255, 0.3)' }}
          >
            Submit Inquiry
          </button>
        </form>
      )}

      <div style={{ marginTop: '5rem', paddingTop: '3rem', borderTop: '1px solid var(--border)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
        <div>
          <h4 style={{ marginBottom: '0.4rem', color: 'var(--primary)', fontSize: '0.85rem', textTransform: 'uppercase' }}>Mitte Showroom</h4>
          <p style={{ color: '#ccc', fontSize: '0.85rem' }}>Torstraße 123, 10119 Berlin</p>
        </div>
        <div>
          <h4 style={{ marginBottom: '0.4rem', color: 'var(--primary)', fontSize: '0.85rem', textTransform: 'uppercase' }}>24/7 Hotline</h4>
          <p style={{ color: '#ccc', fontSize: '0.85rem' }}>+49 312146738</p>
        </div>
        <div>
          <h4 style={{ marginBottom: '0.4rem', color: 'var(--primary)', fontSize: '0.85rem', textTransform: 'uppercase' }}>Email Support</h4>
          <p style={{ color: '#ccc', fontSize: '0.85rem' }}>marvinlala90@gmail.com</p>
        </div>

      </div>
    </div>
  );
}
