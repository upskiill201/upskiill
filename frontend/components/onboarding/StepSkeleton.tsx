'use client';

/**
 * StepSkeleton
 *
 * Loading skeleton shown while useOnboardingSession restores state.
 * Renders two separate layouts that mirror the real step pages:
 *  - Mobile: progress bar top → mascot image area → headline → subtitle → cards (3-col) → button
 *  - Desktop: two-column split (mascot left, content right)
 */

function Bone({ className }: { className: string }) {
  return (
    <div className={`bg-slate-200/80 rounded-xl animate-pulse ${className}`} />
  );
}

export function StepSkeleton() {
  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-[#EBF3FE] via-[#F4F8FF] to-[#FFFFFF]">

      {/* ══════════════════════ MOBILE SKELETON ══════════════════════ */}
      <div className="flex flex-col h-full md:hidden">

        {/* Progress bar row */}
        <div className="flex items-center gap-3 px-6 pt-8 pb-4">
          <div className="flex-1 h-3 bg-[#E5EAEF] rounded-full overflow-hidden">
            <div className="h-full w-[13%] bg-[#0172FD]/25 rounded-full animate-pulse" />
          </div>
          <Bone className="w-8 h-4 !rounded-md" />
        </div>

        {/* Mascot area — large image placeholder at top */}
        <div className="relative w-full flex justify-center" style={{ height: '42vh' }}>
          <Bone className="!rounded-full w-44 h-44 mt-4 self-center opacity-40" />
        </div>

        {/* Text + cards overlap area */}
        <div className="flex flex-col flex-1 px-6 -mt-16 relative z-10">
          {/* White fade identical to the real page */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-white pointer-events-none" />

          {/* Headline — two lines */}
          <div className="pt-6 flex flex-col gap-2 mb-3">
            <Bone className="h-9 w-4/5 mx-auto" />
            <Bone className="h-9 w-3/5 mx-auto" />
          </div>

          {/* Subtitle — two lines */}
          <div className="flex flex-col gap-1.5 mb-6">
            <Bone className="h-4 w-3/4 mx-auto !rounded-md" />
            <Bone className="h-4 w-2/3 mx-auto !rounded-md" />
          </div>

          {/* Skill cards grid — 3 columns, 2 rows visible */}
          <div className="grid grid-cols-3 gap-2 mb-auto">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-white rounded-2xl animate-pulse shadow-sm"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {/* Icon placeholder inside card */}
                <div className="flex flex-col items-center justify-center h-full gap-2">
                  <div className="w-14 h-14 rounded-xl bg-slate-100 animate-pulse" />
                  <div className="h-2.5 w-10 bg-slate-100 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>

          {/* Buttons row at bottom */}
          <div className="flex gap-3 pb-6 pt-4" style={{ marginTop: '-20px' }}>
            <Bone className="w-16 h-14 flex-shrink-0 !rounded-2xl" />
            <Bone className="flex-1 h-14 !rounded-2xl bg-[#0172FD]/20" />
          </div>
        </div>
      </div>

      {/* ══════════════════════ DESKTOP SKELETON ══════════════════════ */}
      <div className="hidden md:flex h-full w-full max-w-[1440px] mx-auto">

        {/* Left column — mascot */}
        <div className="w-1/2 lg:w-5/12 h-full flex items-center justify-center">
          <Bone className="w-[380px] h-[380px] !rounded-full opacity-30" />
        </div>

        {/* Right column — content */}
        <div className="flex-1 h-full flex flex-col justify-center px-10 lg:px-12 gap-6">

          {/* Progress bar */}
          <div className="flex items-center gap-5">
            <div className="flex-1 h-4 bg-[#E5EAEF] rounded-full overflow-hidden">
              <div className="h-full w-[13%] bg-[#0172FD]/25 rounded-full animate-pulse" />
            </div>
            <Bone className="w-10 h-5 !rounded-md" />
          </div>

          {/* Headline — two big lines */}
          <div className="flex flex-col gap-3">
            <Bone className="h-14 lg:h-16 w-full" />
            <Bone className="h-14 lg:h-16 w-4/5" />
          </div>

          {/* Subtitle */}
          <div className="flex flex-col gap-2">
            <Bone className="h-5 w-3/4 !rounded-md" />
            <Bone className="h-5 w-2/3 !rounded-md" />
          </div>

          {/* Skill cards grid — 4 cols on md, 5 on lg */}
          <div className="grid grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-white rounded-3xl animate-pulse shadow-sm flex flex-col items-center justify-center gap-3"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-slate-100 animate-pulse" />
                <div className="h-3 w-12 bg-slate-100 rounded animate-pulse" />
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <Bone className="w-24 h-16 !rounded-[2rem]" />
            <Bone className="w-56 h-16 !rounded-[2rem] bg-[#0172FD]/20" />
          </div>
        </div>
      </div>

    </div>
  );
}
