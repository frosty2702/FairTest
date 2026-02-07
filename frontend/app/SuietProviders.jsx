'use client';

import { useState, useEffect } from 'react';
import { WalletProvider } from '@suiet/wallet-kit';
/* App styles loaded via layout.jsx / globals.css */

export default function SuiProviders({ children }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Defer wallet provider until client mount to avoid SSR/hydration issues
  // that can trigger "missing required error components"
  if (!mounted) {
    return <div style={{ minHeight: '100vh', background: '#0f172a', color: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
  }

  return <WalletProvider>{children}</WalletProvider>;
}
