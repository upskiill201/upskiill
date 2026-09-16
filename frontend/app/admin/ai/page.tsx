'use client';

import { useState } from 'react';
import { Bot, Eye, Gauge, Plus, Sparkles, Trash2 } from 'lucide-react';
import {
  Banner,
  Button,
  Card,
  ConfirmDialog,
  ErrorState,
  Loading,
  PageHeader,
  adminMutate,
  relativeTime,
  useAdminData,
} from '@/components/admin/AdminUI';
import styles from './ai.module.css';

interface ProviderView {
  id: string;
  name: string;
  kind: string;
  model: string;
  baseUrl: string | null;
  apiKeyMasked: string;
  isActive: boolean;
  isFallback: boolean;
  maxOutputTokens: number;
  temperature: number;
  timeoutMs: number;
  dailyBudgetUsd: number;
  lastTestAt: string | null;
  lastTestOk: boolean | null;
  lastTestError: string | null;
}

interface UsageSummary {
  aiEnabled: boolean;
  limits: {
    globalDailyUsd: number;
    perUserCallsPerDay: number;
    proactivePerDay: number;
  };
  today: { calls: number; costUsd: number };
}

const CODECRAFT_BASE_URL = 'https://codecraftapi.com/v1';
const CODECRAFT_DEFAULT_MODEL = 'claude-opus-4.8';

/** Mirrors AI_ELIGIBLE_REASONS in tey-delivery.service.ts. Every other reason
 *  is template-only by design, so there's nothing an AI test could show for
 *  them — see the Rules page for a preview of the (always-available)
 *  template copy across all 9 reasons. */
const AI_ELIGIBLE_REASONS = [
  'INACTIVE_RETURN',
  'COURSE_NEAR_COMPLETION',
  'PROGRESS_CELEBRATION',
] as const;

interface PlaygroundResult {
  ok: boolean;
  provider?: string;
  model?: string;
  latencyMs?: number;
  raw?: string | null;
  error?: string;
  template: { title: string; body: string };
}

type Role = 'primary' | 'fallback' | 'off';

function roleOf(p: ProviderView): Role {
  if (!p.isActive) return 'off';
  return p.isFallback ? 'fallback' : 'primary';
}

export default function AdminAiPage() {
  const {
    data: providers,
    error: providersError,
    isLoading: providersLoading,
    mutate: mutateProviders,
  } = useAdminData<ProviderView[]>('/api/tey/admin/ai/providers');

  const { data: usage } = useAdminData<UsageSummary>('/api/tey/admin/ai/usage');

  // Quick add: CodeCraft
  const [ccKey, setCcKey] = useState('');
  const [ccModel, setCcModel] = useState(CODECRAFT_DEFAULT_MODEL);
  const [ccBusy, setCcBusy] = useState(false);
  const [ccError, setCcError] = useState<string | null>(null);
  const [ccTestResult, setCcTestResult] = useState<{ ok: boolean; message: string } | null>(null);

  // Per-row test results
  const [testResults, setTestResults] = useState<
    Record<string, { ok: boolean; message: string }>
  >({});
  const [busyId, setBusyId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ProviderView | null>(null);
  const [deleting, setDeleting] = useState(false);

  // AI playground
  const [pgReason, setPgReason] = useState<string>(AI_ELIGIBLE_REASONS[0]);
  const [pgProviderId, setPgProviderId] = useState<string>('');
  const [pgBusy, setPgBusy] = useState(false);
  const [pgResult, setPgResult] = useState<PlaygroundResult | null>(null);

  async function runPlayground() {
    setPgBusy(true);
    setPgResult(null);
    try {
      const res = await adminMutate<PlaygroundResult>('/api/tey/admin/ai/playground', {
        method: 'POST',
        body: { reason: pgReason, ...(pgProviderId ? { providerId: pgProviderId } : {}) },
      });
      setPgResult(res);
    } catch (e) {
      setPgResult({
        ok: false,
        error: e instanceof Error ? e.message : 'Could not reach the playground',
        template: { title: '', body: '' },
      });
    } finally {
      setPgBusy(false);
    }
  }

  // Attempts to pull {title, body} out of the model's raw text, the same
  // leniency structured-output.ts uses on the real send path — this is a
  // preview only, so a parse miss just falls back to showing the raw text.
  function parseAiCopy(raw: string | null | undefined): { title: string; body: string } | null {
    if (!raw) return null;
    try {
      const match = raw.match(/\{[\s\S]*\}/);
      const parsed = JSON.parse(match ? match[0] : raw) as { title?: string; body?: string };
      if (parsed.title && parsed.body) return { title: parsed.title, body: parsed.body };
    } catch {
      // fall through
    }
    return null;
  }

  // Advanced "add custom provider"
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [advForm, setAdvForm] = useState({
    name: '',
    kind: 'OPENAI_COMPATIBLE',
    model: '',
    baseUrl: '',
    apiKey: '',
  });
  const [advBusy, setAdvBusy] = useState(false);
  const [advError, setAdvError] = useState<string | null>(null);

  async function testProvider(id: string) {
    setBusyId(id);
    try {
      const res = await adminMutate<{ ok: boolean; error?: string; latencyMs?: number }>(
        `/api/tey/admin/ai/providers/${id}/test`,
      );
      setTestResults((prev) => ({
        ...prev,
        [id]: res.ok
          ? { ok: true, message: `Connected (${res.latencyMs}ms)` }
          : { ok: false, message: res.error || 'Connection failed' },
      }));
      await mutateProviders();
    } catch (e) {
      setTestResults((prev) => ({
        ...prev,
        [id]: { ok: false, message: e instanceof Error ? e.message : 'Connection failed' },
      }));
    } finally {
      setBusyId(null);
    }
  }

  async function setRole(target: ProviderView, role: Role) {
    if (!providers) return;
    setBusyId(target.id);
    try {
      if (role === 'off') {
        await adminMutate(`/api/tey/admin/ai/providers/${target.id}`, {
          method: 'PATCH',
          body: { isActive: false },
        });
      } else if (role === 'primary') {
        await adminMutate(`/api/tey/admin/ai/providers/${target.id}`, {
          method: 'PATCH',
          body: { isActive: true, isFallback: false },
        });
        // Only one primary at a time — demote whoever else held the slot.
        const others = providers.filter(
          (p) => p.id !== target.id && p.isActive && !p.isFallback,
        );
        await Promise.all(
          others.map((p) =>
            adminMutate(`/api/tey/admin/ai/providers/${p.id}`, {
              method: 'PATCH',
              body: { isActive: false },
            }),
          ),
        );
      } else {
        await adminMutate(`/api/tey/admin/ai/providers/${target.id}`, {
          method: 'PATCH',
          body: { isActive: true, isFallback: true },
        });
        const others = providers.filter(
          (p) => p.id !== target.id && p.isActive && p.isFallback,
        );
        await Promise.all(
          others.map((p) =>
            adminMutate(`/api/tey/admin/ai/providers/${p.id}`, {
              method: 'PATCH',
              body: { isActive: false },
            }),
          ),
        );
      }
      await mutateProviders();
    } finally {
      setBusyId(null);
    }
  }

  async function quickAddCodeCraft() {
    if (!ccKey.trim()) {
      setCcError('Paste your CodeCraft API key first.');
      return;
    }
    setCcBusy(true);
    setCcError(null);
    setCcTestResult(null);
    try {
      const created = await adminMutate<ProviderView>('/api/tey/admin/ai/providers', {
        method: 'POST',
        body: {
          name: `codecraft-${Date.now().toString(36)}`,
          kind: 'OPENAI_COMPATIBLE',
          baseUrl: CODECRAFT_BASE_URL,
          model: ccModel.trim() || CODECRAFT_DEFAULT_MODEL,
          apiKey: ccKey.trim(),
          isActive: false,
          isFallback: false,
        },
      });
      await mutateProviders();
      setCcKey('');

      // Test it immediately so the admin doesn't have to hunt for the button.
      const res = await adminMutate<{ ok: boolean; error?: string; latencyMs?: number }>(
        `/api/tey/admin/ai/providers/${created.id}/test`,
      );
      setCcTestResult(
        res.ok
          ? { ok: true, message: `Connected (${res.latencyMs}ms). Set it as the active provider below.` }
          : { ok: false, message: res.error || 'Added, but the connection test failed — check the key.' },
      );
      await mutateProviders();
    } catch (e) {
      setCcError(e instanceof Error ? e.message : 'Could not add CodeCraft');
    } finally {
      setCcBusy(false);
    }
  }

  async function addCustomProvider() {
    if (!advForm.name.trim() || !advForm.model.trim() || !advForm.apiKey.trim()) {
      setAdvError('Name, model, and API key are required.');
      return;
    }
    if (advForm.kind === 'OPENAI_COMPATIBLE' && !advForm.baseUrl.trim()) {
      setAdvError('Base URL is required for an OpenAI-compatible provider.');
      return;
    }
    setAdvBusy(true);
    setAdvError(null);
    try {
      await adminMutate('/api/tey/admin/ai/providers', {
        method: 'POST',
        body: {
          name: advForm.name.trim(),
          kind: advForm.kind,
          model: advForm.model.trim(),
          baseUrl: advForm.baseUrl.trim() || undefined,
          apiKey: advForm.apiKey.trim(),
          isActive: false,
          isFallback: false,
        },
      });
      await mutateProviders();
      setAdvForm({ name: '', kind: 'OPENAI_COMPATIBLE', model: '', baseUrl: '', apiKey: '' });
      setShowAdvanced(false);
    } catch (e) {
      setAdvError(e instanceof Error ? e.message : 'Could not add provider');
    } finally {
      setAdvBusy(false);
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await adminMutate(`/api/tey/admin/ai/providers/${deleteTarget.id}`, {
        method: 'DELETE',
      });
      await mutateProviders();
      setDeleteTarget(null);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <PageHeader
        title="AI"
        subtitle="The model Tey uses to personalize a handful of nudges. Most reminders use free, built-in templates and never touch this — see Rules."
      />

      <div className={styles.section}>
        {usage && !usage.aiEnabled && (
          <Banner tone="warn">
            AI generation is switched off at the server level right now
            (<code>TEY_AI_ENABLED</code> is not set to <code>true</code>).
            Providers below are saved and ready, but Tey will keep using
            templates until an engineer flips that on. Nothing here will send
            anything until it is.
          </Banner>
        )}
        {usage && usage.aiEnabled && (
          <Banner tone="info">
            AI is live. Today: {usage.today.calls} calls, $
            {usage.today.costUsd.toFixed(3)} spent, capped at $
            {usage.limits.globalDailyUsd}/day.
          </Banner>
        )}

        <Card title="Add CodeCraft" icon={<Sparkles size={15} />}>
          <p className={styles.fieldHint} style={{ marginBottom: 12 }}>
            CodeCraft is one API key that works with 31 models — the
            recommended way to get Tey personalizing nudges. Paste your key,
            pick a model, and it&apos;s tested automatically.{' '}
            <a href="https://codecraftapi.com/register" target="_blank" rel="noreferrer">
              Get a key
            </a>
            .
          </p>
          <div className={styles.formGrid}>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>API key</span>
              <input
                type="password"
                autoComplete="off"
                placeholder="cc_..."
                className={styles.textInput}
                value={ccKey}
                onChange={(e) => setCcKey(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>Model</span>
              <input
                type="text"
                className={styles.textInput}
                value={ccModel}
                onChange={(e) => setCcModel(e.target.value)}
              />
              <span className={styles.fieldHint}>
                Any model id CodeCraft supports — this default is a solid start.
              </span>
            </div>
            <Button onClick={() => void quickAddCodeCraft()} disabled={ccBusy}>
              {ccBusy ? 'Adding…' : 'Add & test'}
            </Button>
          </div>
          {ccError && <p className={styles.errorNote} style={{ marginTop: 10 }}>{ccError}</p>}
          {ccTestResult && (
            <p
              className={ccTestResult.ok ? styles.testResultGood : styles.testResultBad}
              style={{ marginTop: 10 }}
            >
              {ccTestResult.message}
            </p>
          )}
        </Card>

        <Card title="Providers" icon={<Bot size={15} />}>
          {providersError ? (
            <ErrorState error={providersError as Error} />
          ) : providersLoading || !providers ? (
            <Loading />
          ) : providers.length === 0 ? (
            <p className={styles.fieldHint}>
              No providers yet — add CodeCraft above, or a custom one below.
            </p>
          ) : (
            <div className={styles.providerList}>
              {providers.map((p) => {
                const role = roleOf(p);
                const result = testResults[p.id];
                const rowBusy = busyId === p.id;
                return (
                  <div key={p.id} className={styles.providerRow}>
                    <div className={styles.providerInfo}>
                      <span className={styles.providerName}>{p.name}</span>
                      <span className={styles.providerMeta}>
                        {p.kind} · {p.model} · key {p.apiKeyMasked}
                      </span>
                      {p.lastTestAt && (
                        <span
                          className={p.lastTestOk ? styles.testResultGood : styles.testResultBad}
                        >
                          Last test {relativeTime(p.lastTestAt)}
                          {!p.lastTestOk && p.lastTestError ? `: ${p.lastTestError}` : ''}
                        </span>
                      )}
                      {result && (
                        <span className={result.ok ? styles.testResultGood : styles.testResultBad}>
                          {result.message}
                        </span>
                      )}
                    </div>
                    <div className={styles.providerActions}>
                      <div className={styles.roleGroup}>
                        <button
                          type="button"
                          disabled={rowBusy}
                          className={`${styles.roleBtn} ${role === 'primary' ? styles.roleBtnPrimaryActive : ''}`}
                          onClick={() => void setRole(p, 'primary')}
                        >
                          Primary
                        </button>
                        <button
                          type="button"
                          disabled={rowBusy}
                          className={`${styles.roleBtn} ${role === 'fallback' ? styles.roleBtnFallbackActive : ''}`}
                          onClick={() => void setRole(p, 'fallback')}
                        >
                          Fallback
                        </button>
                        <button
                          type="button"
                          disabled={rowBusy}
                          className={styles.roleBtn}
                          onClick={() => void setRole(p, 'off')}
                        >
                          Off
                        </button>
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => void testProvider(p.id)}
                        disabled={rowBusy}
                      >
                        {rowBusy ? 'Working…' : 'Test'}
                      </Button>
                      <button
                        type="button"
                        aria-label={`Delete ${p.name}`}
                        onClick={() => setDeleteTarget(p)}
                        style={{
                          border: 'none',
                          background: 'none',
                          color: 'var(--error-red)',
                          cursor: 'pointer',
                          padding: 6,
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        <Card title="Test AI copy" icon={<Eye size={15} />}>
          <p className={styles.fieldHint} style={{ marginBottom: 12 }}>
            Generates a real nudge using a sample learner (12-day streak,
            mid-course) — nothing is sent to anyone. Pick any provider below
            to try it, whatever its Primary/Fallback/Off role — that&apos;s
            not changed by running this. Only these 3 reasons ever call AI; every
            other alert is template-only by design, always free, and
            previewable on the <a href="/admin/rules">Rules page</a>.
          </p>
          <div className={styles.formGrid}>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>Reason</span>
              <select
                className={styles.selectInput}
                value={pgReason}
                onChange={(e) => setPgReason(e.target.value)}
              >
                {AI_ELIGIBLE_REASONS.map((r) => (
                  <option key={r} value={r}>
                    {r.replaceAll('_', ' ').toLowerCase()}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>Model</span>
              <select
                className={styles.selectInput}
                value={pgProviderId}
                onChange={(e) => setPgProviderId(e.target.value)}
              >
                <option value="">Whatever&apos;s currently active</option>
                {(providers ?? []).map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — {p.model}
                    {roleOf(p) === 'primary' ? ' (Primary)' : roleOf(p) === 'fallback' ? ' (Fallback)' : ''}
                  </option>
                ))}
              </select>
            </div>
            <Button
              onClick={() => void runPlayground()}
              disabled={pgBusy || (providers ?? []).length === 0}
            >
              {pgBusy ? 'Generating…' : 'Generate'}
            </Button>
          </div>
          {(providers ?? []).length === 0 && (
            <p className={styles.fieldHint} style={{ marginTop: 8 }}>
              Add a provider above first — even an inactive one can be tested here.
            </p>
          )}

          {pgResult && (
            <div style={{ marginTop: 16, display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr' }}>
              <div>
                <span className={styles.fieldLabel}>Template (always free, always on)</span>
                <div
                  style={{
                    marginTop: 6,
                    padding: 12,
                    border: '2px solid var(--border)',
                    borderRadius: 10,
                    background: 'var(--bg-section)',
                  }}
                >
                  <strong style={{ fontSize: 14 }}>{pgResult.template.title}</strong>
                  <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--text-secondary)' }}>
                    {pgResult.template.body}
                  </p>
                </div>
              </div>
              <div>
                <span className={styles.fieldLabel}>
                  {pgResult.ok
                    ? `AI (${providers?.find((p) => p.id === pgProviderId)?.name ?? 'active provider'} · ${pgResult.model} · ${pgResult.latencyMs}ms)`
                    : 'AI'}
                </span>
                <div
                  style={{
                    marginTop: 6,
                    padding: 12,
                    border: `2px solid ${pgResult.ok ? 'var(--brand-blue)' : 'var(--error-red)'}`,
                    borderRadius: 10,
                    background: pgResult.ok ? 'var(--light-blue-bg)' : 'var(--bg-section)',
                  }}
                >
                  {!pgResult.ok ? (
                    <p className={styles.errorNote} style={{ margin: 0 }}>
                      {pgResult.error}
                    </p>
                  ) : (
                    (() => {
                      const parsed = parseAiCopy(pgResult.raw);
                      return parsed ? (
                        <>
                          <strong style={{ fontSize: 14 }}>{parsed.title}</strong>
                          <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--text-secondary)' }}>
                            {parsed.body}
                          </p>
                        </>
                      ) : (
                        <p className={styles.providerMeta} style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                          {pgResult.raw}
                        </p>
                      );
                    })()
                  )}
                </div>
              </div>
            </div>
          )}
        </Card>

        <Card title="Usage" icon={<Gauge size={15} />}>
          {usage ? (
            <div className={styles.usageGrid}>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Today</span>
                <span className={styles.providerName}>
                  {usage.today.calls} calls · ${usage.today.costUsd.toFixed(3)}
                </span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Global daily budget</span>
                <span className={styles.providerName}>${usage.limits.globalDailyUsd}</span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Per-learner calls/day</span>
                <span className={styles.providerName}>{usage.limits.perUserCallsPerDay}</span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Proactive nudges/day (all learners)</span>
                <span className={styles.providerName}>{usage.limits.proactivePerDay}</span>
              </div>
            </div>
          ) : (
            <Loading />
          )}
        </Card>

        <Card>
          <button
            type="button"
            className={styles.toggleAdvanced}
            onClick={() => setShowAdvanced((v) => !v)}
          >
            <Plus size={14} style={{ verticalAlign: -2 }} />{' '}
            {showAdvanced ? 'Hide' : 'Add a different provider (Anthropic, Gemini, OpenRouter, ...)'}
          </button>

          {showAdvanced && (
            <div style={{ marginTop: 16 }}>
              <div className={styles.formGrid}>
                <div className={styles.field}>
                  <span className={styles.fieldLabel}>Name</span>
                  <input
                    type="text"
                    className={styles.textInput}
                    placeholder="e.g. anthropic-default"
                    value={advForm.name}
                    onChange={(e) => setAdvForm((f) => ({ ...f, name: e.target.value }))}
                  />
                </div>
                <div className={styles.field}>
                  <span className={styles.fieldLabel}>Kind</span>
                  <select
                    className={styles.selectInput}
                    value={advForm.kind}
                    onChange={(e) => setAdvForm((f) => ({ ...f, kind: e.target.value }))}
                  >
                    <option value="OPENAI_COMPATIBLE">OpenAI-compatible</option>
                    <option value="ANTHROPIC">Anthropic</option>
                    <option value="GEMINI">Gemini</option>
                  </select>
                </div>
                <div className={styles.field}>
                  <span className={styles.fieldLabel}>Model</span>
                  <input
                    type="text"
                    className={styles.textInput}
                    placeholder="e.g. gemini-2.0-flash"
                    value={advForm.model}
                    onChange={(e) => setAdvForm((f) => ({ ...f, model: e.target.value }))}
                  />
                </div>
                {advForm.kind === 'OPENAI_COMPATIBLE' && (
                  <div className={styles.field}>
                    <span className={styles.fieldLabel}>Base URL</span>
                    <input
                      type="text"
                      className={styles.textInput}
                      placeholder="https://..."
                      value={advForm.baseUrl}
                      onChange={(e) => setAdvForm((f) => ({ ...f, baseUrl: e.target.value }))}
                    />
                  </div>
                )}
                <div className={styles.field}>
                  <span className={styles.fieldLabel}>API key</span>
                  <input
                    type="password"
                    autoComplete="off"
                    className={styles.textInput}
                    value={advForm.apiKey}
                    onChange={(e) => setAdvForm((f) => ({ ...f, apiKey: e.target.value }))}
                  />
                </div>
              </div>
              <div className={styles.formFooter}>
                <Button onClick={() => void addCustomProvider()} disabled={advBusy}>
                  {advBusy ? 'Adding…' : 'Add provider'}
                </Button>
                {advError && <span className={styles.errorNote}>{advError}</span>}
              </div>
            </div>
          )}
        </Card>
      </div>

      {deleteTarget && (
        <ConfirmDialog
          title={`Remove ${deleteTarget.name}?`}
          description="This deletes the stored key permanently. If it's the active provider, Tey falls back to templates until another is set."
          confirmLabel="Remove"
          tone="danger"
          busy={deleting}
          onConfirm={() => void confirmDelete()}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </>
  );
}
