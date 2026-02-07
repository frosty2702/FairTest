'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ConnectButton, useWallet } from '@suiet/wallet-kit';
import fairTestService from '../../services/FairTestService';
import './TopBar.css';

const TopBar = ({ title, role, onRoleChange }) => {
  const router = useRouter();
  const { address } = useWallet();

  useEffect(() => {
    if (address) {
      fairTestService.connectWallet(address);
    } else {
      fairTestService.connectWallet(null);
    }
  }, [address]);

  const handleRoleChange = (newRole) => {
    onRoleChange(newRole);
    if (newRole === 'student') router.push('/student');
    else if (newRole === 'creator') router.push('/creator');
    else if (newRole === 'evaluator') router.push('/evaluator');
  };

  return (
    <div className="topbar">
      <div className="topbar-left">
        <h1 className="page-title">{title}</h1>
      </div>
      
      <div className="topbar-right">
        <select 
          className="role-switch"
          value={role}
          onChange={(e) => handleRoleChange(e.target.value)}
        >
          <option value="student">👨‍🎓 Student</option>
          <option value="creator">👨‍🏫 Creator</option>
          <option value="evaluator">👩‍🏫 Evaluator</option>
        </select>
        
        <button className="notification-btn">
          🔔
          <span className="notification-badge">3</span>
        </button>
        
        <div className="wallet-connect-wrapper">
          <ConnectButton label="Connect Wallet" />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
