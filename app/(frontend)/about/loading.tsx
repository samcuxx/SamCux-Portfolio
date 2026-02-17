export default function AboutLoading() {
  return (
    <div className="max-w-6xl mx-auto px-6 mb-20">
      {/* Header skeleton - matches AboutHeader (title area) */}
      <div className="text-left md:text-center mb-12">
        <div className="h-14 md:h-16 w-48 md:w-56 mx-auto md:mx-auto bg-gray-200 dark:bg-[#222F43] rounded-lg animate-pulse" />
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Left column: Intro + Stats + Experience - same structure as AboutContent */}
        <div className="space-y-8">
          {/* AboutIntro: bio block + 2 buttons */}
          <div className="space-y-6">
            <div className="relative">
              <div className="h-4 w-full bg-gray-200 dark:bg-[#222F43] rounded animate-pulse mb-3" />
              <div className="h-4 w-full bg-gray-200 dark:bg-[#222F43] rounded animate-pulse mb-3" />
              <div className="h-4 w-4/5 bg-gray-200 dark:bg-[#222F43] rounded animate-pulse" />
              <div className="absolute -left-4 top-0 w-1 h-full bg-gray-200 dark:bg-[#222F43] rounded-full" />
            </div>
            <div className="h-4 w-full bg-gray-200 dark:bg-[#222F43] rounded animate-pulse mb-2" />
            <div className="h-4 w-5/6 bg-gray-200 dark:bg-[#222F43] rounded animate-pulse" />
            <div className="flex gap-4 pt-4">
              <div className="h-12 w-32 rounded-full bg-gray-200 dark:bg-[#222F43] animate-pulse" />
              <div className="h-12 w-28 rounded-full bg-gray-200 dark:bg-[#222F43] animate-pulse" />
            </div>
          </div>

          {/* AboutStats: 2x2 grid */}
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="p-4 bg-white dark:bg-[#131C31] rounded-xl border border-gray-100 dark:border-[#222F43]"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg w-9 h-9 bg-gray-200 dark:bg-[#222F43] animate-pulse" />
                  <div>
                    <div className="h-7 w-12 bg-gray-200 dark:bg-[#222F43] rounded mb-1 animate-pulse" />
                    <div className="h-4 w-20 bg-gray-200 dark:bg-[#222F43] rounded animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* AboutExperience: 2 timeline items - same pl-6, p-6, rounded-xl */}
          <div className="pt-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 rounded bg-gray-200 dark:bg-[#222F43] animate-pulse" />
              <div className="h-8 w-28 bg-gray-200 dark:bg-[#222F43] rounded animate-pulse" />
            </div>
            <div className="space-y-6">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="relative pl-6 border-l-2 border-gray-200 dark:border-[#222F43] p-6 rounded-xl"
                >
                  <div className="absolute -left-[9px] top-8 w-4 h-4 rounded-full bg-gray-200 dark:bg-[#222F43]" />
                  <div className="h-4 w-24 bg-gray-200 dark:bg-[#222F43] rounded mb-2 animate-pulse" />
                  <div className="h-6 w-64 bg-gray-200 dark:bg-[#222F43] rounded mb-2 animate-pulse" />
                  <div className="h-4 w-48 bg-gray-200 dark:bg-[#222F43] rounded mb-3 animate-pulse" />
                  <div className="h-4 w-full bg-gray-200 dark:bg-[#222F43] rounded mb-4 animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-3 w-full bg-gray-200 dark:bg-[#222F43] rounded animate-pulse" />
                    <div className="h-3 w-5/6 bg-gray-200 dark:bg-[#222F43] rounded animate-pulse" />
                    <div className="h-3 w-4/6 bg-gray-200 dark:bg-[#222F43] rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Image + TechStack + Education - same structure */}
        <div className="space-y-12">
          {/* AboutImage: profile block - same aspect/container as real image */}
          <div className="relative group">
            <div className="relative z-10 rounded-2xl overflow-hidden bg-gray-200 dark:bg-[#222F43] aspect-[5/6] max-h-[500px] w-full animate-pulse" />
            <div className="absolute inset-0 rounded-2xl transform rotate-3 bg-gray-200/20 dark:bg-[#222F43]/20" />
          </div>

          {/* AboutTechStack: 2-col grid of 8 items */}
          <div className="pt-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 rounded bg-gray-200 dark:bg-[#222F43] animate-pulse" />
              <div className="h-8 w-24 bg-gray-200 dark:bg-[#222F43] rounded animate-pulse" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="p-4 bg-white dark:bg-[#131C31] rounded-xl border border-gray-100 dark:border-[#222F43]"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-[#222F43] animate-pulse" />
                    <div className="h-5 w-20 bg-gray-200 dark:bg-[#222F43] rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AboutEducation: 2 cards */}
          <div className="pt-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 rounded bg-gray-200 dark:bg-[#222F43] animate-pulse" />
              <div className="h-8 w-56 bg-gray-200 dark:bg-[#222F43] rounded animate-pulse" />
            </div>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="p-4 bg-white dark:bg-[#131C31] rounded-xl border border-gray-100 dark:border-[#222F43]"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-lg w-8 h-8 bg-gray-200 dark:bg-[#222F43] animate-pulse" />
                    <div className="h-4 w-24 bg-gray-200 dark:bg-[#222F43] rounded animate-pulse" />
                  </div>
                  <div className="h-6 w-48 bg-gray-200 dark:bg-[#222F43] rounded mb-2 animate-pulse" />
                  <div className="flex justify-between items-center">
                    <div className="h-4 w-32 bg-gray-200 dark:bg-[#222F43] rounded animate-pulse" />
                    <div className="h-4 w-16 bg-gray-200 dark:bg-[#222F43] rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
