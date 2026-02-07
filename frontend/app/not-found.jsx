'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: 'var(--bg-dark, #0f172a)',
      color: 'var(--text-main, #f8fafc)',
      fontFamily: 'Inter, sans-serif',
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>404</h1>
      <p style={{ color: 'var(--text-muted, #94a3b8)', marginBottom: '1.5rem' }}>
        Page not found
      </p>
      <Link
        href="/"
        style={{
          padding: '0.75rem 1.5rem',
          background: 'var(--primary, #6366f1)',
          color: 'white',
          borderRadius: '0.5rem',
          fontWeight: 600,
          textDecoration: 'none',
        }}
      >
        Go home
      </Link>
    </div>
  );
}
