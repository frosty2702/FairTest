'use client';

import React from 'react';
import Link from 'next/link';

function StudentDashboard() {
  return (
    <div className="student-dashboard">
      <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '3rem' }}>Student Dashboard</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <Link href="/student/browse" className="glass-card" style={{ display: 'block', textDecoration: 'none' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>Find Exams</h3>
          <p style={{ color: 'var(--text-muted)' }}>Browse available exams via ENS discovery and register using Yellow Network.</p>
        </Link>
        <Link href="/student/results" className="glass-card" style={{ display: 'block', textDecoration: 'none' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--secondary)' }}>My Results</h3>
          <p style={{ color: 'var(--text-muted)' }}>View and verify your anonymous scores and global rankings stored on Sui.</p>
        </Link>
      </div>
    </div>
  );
}

export default StudentDashboard;
