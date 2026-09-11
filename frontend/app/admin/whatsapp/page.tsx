'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { CheckCircle2, RefreshCw, Smartphone } from 'lucide-react';
import {
  Banner,
  Button,
  Card,
  ConfirmDialog,
  ErrorState,
  Loading,
  PageHeader,
  Pill,
  adminFetcher,
  adminStyles as s,
} from '@/components/admin/AdminUI';

interface WhatsAppQrData {
  enabled: boolean;
  isConnected: boolean;
  hasQrCode: boolean;
  qrDataUrl: string | null;
}

export default function AdminWhatsAppPage() {
  const { data, error, isLoading, mutate } = useSWR<WhatsAppQrData>(
    '/api/whatsapp/qr-data',
    adminFetcher,
    {
      // Poll while waiting to be scanned so the QR (and the connected state
      // once it lands) updates on its own — no manual refresh, no re-running
      // a script. Stops mattering once connected since nothing changes then.
      refreshInterval: 4000,
    },
  );

  const [confirmingReset, setConfirmingReset] = useState(false);
  const [resetting, setResetting] = useState(false);

  if (error) return <ErrorState error={error as Error} />;
  if (isLoading || !data) {
    return (
      <>
        <PageHeader title="WhatsApp" />
        <Loading />
      </>
    );
  }

  const doReset = async () => {
    setResetting(true);
    try {
      await fetch('/api/whatsapp/reset', { credentials: 'include' });
      await mutate();
    } finally {
      setResetting(false);
      setConfirmingReset(false);
    }
  };

  return (
    <>
      <PageHeader
        title="WhatsApp"
        subtitle="Connect the phone that delivers real OTP codes and Tey nudges over WhatsApp."
      />

      {!data.enabled && (
        <Banner tone="warn">
          <strong>ENABLE_WHATSAPP is not set</strong> on this backend deploy.
          Set it in Render and redeploy before a number can be linked here —
          this page will keep showing nothing to scan until then.
        </Banner>
      )}

      <Card title="Connection" icon={<Smartphone size={15} />}>
        {data.isConnected ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <CheckCircle2 size={20} color="var(--success-green)" />
              <Pill tone="good">Connected</Pill>
              <span className={s.metricHint}>
                Tey&apos;s WhatsApp is linked and ready to send.
              </span>
            </div>
            <p className={s.metricHint} style={{ margin: 0 }}>
              Disconnecting logs the entire platform&apos;s WhatsApp session out
              immediately — no OTPs or nudges will deliver until a new device
              is linked. Only do this if the linked phone is being replaced.
            </p>
            <div>
              <Button
                variant="danger"
                onClick={() => setConfirmingReset(true)}
              >
                Disconnect &amp; re-link
              </Button>
            </div>
          </div>
        ) : data.hasQrCode && data.qrDataUrl ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Pill tone="warn">Not connected</Pill>
              <span className={s.metricHint}>Scan this to link a device.</span>
            </div>
            <div
              style={{
                background: 'white',
                padding: 16,
                borderRadius: 12,
                display: 'inline-block',
                width: 'fit-content',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- server-generated data: URI, not an optimizable asset */}
              <img
                src={data.qrDataUrl}
                alt="WhatsApp linking QR code"
                width={260}
                height={260}
              />
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-muted, #6b7280)', paddingLeft: 18, margin: 0 }}>
              <li>Open WhatsApp on the phone you want to link</li>
              <li>Settings → Linked Devices → Link a Device</li>
              <li>Scan the code above</li>
            </ol>
            <p className={s.metricHint} style={{ margin: 0 }}>
              This refreshes automatically every few seconds — if it looks
              stale, wait a moment rather than reloading the page.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <RefreshCw size={16} />
            <span className={s.metricHint}>
              Waiting for the WhatsApp socket to initialise…
            </span>
          </div>
        )}
      </Card>

      {confirmingReset && (
        <ConfirmDialog
          title="Disconnect WhatsApp?"
          description="This logs the entire platform's WhatsApp session out immediately. No OTPs or nudges will send until a new device is linked. Only do this if you're replacing the phone."
          confirmLabel="Disconnect"
          tone="danger"
          busy={resetting}
          onConfirm={() => void doReset()}
          onCancel={() => setConfirmingReset(false)}
        />
      )}
    </>
  );
}
