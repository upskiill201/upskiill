export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-[var(--bg-page)] w-full max-w-5xl mx-auto p-4 sm:p-8 gap-6 pt-6">
      
      {/* Featured Courses Banner Skeleton */}
      <div className="w-full bg-[var(--bg-section)] rounded-2xl h-48 sm:h-64 flex items-center justify-center border border-[var(--border)]">
        <span className="text-[var(--text-secondary)] font-semibold tracking-widest text-sm sm:text-base">
          FEATURED COURSES
        </span>
      </div>

      {/* Grid of Course Card Skeletons */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
        
        {/* Skeleton Card 1 */}
        <div className="flex flex-col gap-3">
          <div className="w-full aspect-video bg-[var(--border)] rounded-xl opacity-60"></div>
          <div className="w-3/4 h-4 bg-[var(--border)] rounded-full opacity-60"></div>
          <div className="w-1/2 h-4 bg-[var(--border)] rounded-full opacity-60"></div>
        </div>

        {/* Skeleton Card 2 */}
        <div className="flex flex-col gap-3">
          <div className="w-full aspect-video bg-[var(--border)] rounded-xl opacity-60"></div>
          <div className="w-3/4 h-4 bg-[var(--border)] rounded-full opacity-60"></div>
          <div className="w-1/2 h-4 bg-[var(--border)] rounded-full opacity-60"></div>
        </div>

        {/* Skeleton Card 3 */}
        <div className="hidden sm:flex flex-col gap-3">
          <div className="w-full aspect-video bg-[var(--border)] rounded-xl opacity-60"></div>
          <div className="w-3/4 h-4 bg-[var(--border)] rounded-full opacity-60"></div>
          <div className="w-1/2 h-4 bg-[var(--border)] rounded-full opacity-60"></div>
        </div>

        {/* Skeleton Card 4 */}
        <div className="hidden sm:flex flex-col gap-3">
          <div className="w-full aspect-video bg-[var(--border)] rounded-xl opacity-60"></div>
          <div className="w-3/4 h-4 bg-[var(--border)] rounded-full opacity-60"></div>
          <div className="w-1/2 h-4 bg-[var(--border)] rounded-full opacity-60"></div>
        </div>

      </div>

    </div>
  );
}
