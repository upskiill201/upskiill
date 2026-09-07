import { RefreshCw } from 'lucide-react';

/**
 * Local, section-scoped error state. One section failing (e.g. the heatmap
 * endpoint timing out) must never blank the rest of the page — each section
 * owns its own SWR hook and renders this instead of crashing.
 */
export function AnalyticsSectionError({ label, onRetry }: { label: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-[#E2E8F0] bg-[#F5F7FB] p-6 text-center">
      <p className="text-sm font-medium text-[#64748B]">Couldn&apos;t load {label} right now.</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="flex items-center gap-1.5 text-sm font-semibold text-[#0172FD] hover:text-[#00459E]"
        >
          <RefreshCw size={14} /> Try again
        </button>
      )}
    </div>
  );
}
