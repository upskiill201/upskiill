'use client';

/**
 * Creator Earnings — Overview | Transactions | Payouts | Payment Info |
 * Reports. Backed by the immutable earnings ledger; every dollar a creator
 * sees can be traced to its transactions.
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3, ReceiptText, Landmark, CreditCard, FileDown, Wallet,
} from 'lucide-react';
import { OverviewTab } from '@/components/creator/earnings/OverviewTab';
import { TransactionsTab } from '@/components/creator/earnings/TransactionsTab';
import { PayoutsTab } from '@/components/creator/earnings/PayoutsTab';
import { PaymentInfoTab } from '@/components/creator/earnings/PaymentInfoTab';
import { ReportsTab } from '@/components/creator/earnings/ReportsTab';
import styles from './page.module.css';

type TabKey = 'overview' | 'transactions' | 'payouts' | 'payment-info' | 'reports';

const TABS: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: 'overview', label: 'Overview', icon: <BarChart3 size={15} /> },
  { key: 'transactions', label: 'Transactions', icon: <ReceiptText size={15} /> },
  { key: 'payouts', label: 'Payouts', icon: <Landmark size={15} /> },
  { key: 'payment-info', label: 'Payment Info', icon: <CreditCard size={15} /> },
  { key: 'reports', label: 'Reports', icon: <FileDown size={15} /> },
];

export default function EarningsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('overview');

  return (
    <div className={styles.page}>
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.headerIconWrap}>
          <Wallet size={26} />
        </div>
        <div>
          <h1 className={styles.title}>Earnings</h1>
          <p className={styles.subtitle}>
            What your courses earn, what you keep, and where every cent goes —
            down to each transaction.
          </p>
        </div>
      </div>

      {/* TABS */}
      <div className={styles.tabBar}>
        {TABS.map((t) => (
          <button
            key={t.key}
            className={`${styles.tabBtn} ${activeTab === t.key ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(t.key)}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* BODY */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'transactions' && <TransactionsTab />}
        {activeTab === 'payouts' && <PayoutsTab />}
        {activeTab === 'payment-info' && <PaymentInfoTab />}
        {activeTab === 'reports' && <ReportsTab />}
      </motion.div>
    </div>
  );
}
