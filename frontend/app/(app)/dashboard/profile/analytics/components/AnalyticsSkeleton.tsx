import Skeleton from '@/components/ui/Skeleton';

/** Card-shaped loading placeholder shared by every analytics section, so nothing pops in with a layout shift. */
export function CardSkeleton({ height = 140 }: { height?: number }) {
  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white p-5">
      <Skeleton width="40%" height={14} borderRadius={6} className="mb-3" />
      <Skeleton width="100%" height={height} borderRadius={10} />
    </div>
  );
}

export function RowSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-[#E2E8F0] bg-white p-4">
      <Skeleton width={40} height={40} borderRadius={10} />
      <div className="flex-1">
        <Skeleton width="60%" height={12} borderRadius={6} className="mb-2" />
        <Skeleton width="90%" height={10} borderRadius={6} />
      </div>
    </div>
  );
}
