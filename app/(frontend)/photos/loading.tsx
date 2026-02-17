export default function PhotosLoading() {
  return (
    <div className="max-w-6xl mx-auto px-6 mb-20">
      <div className="animate-pulse space-y-8 pt-24">
        <div className="h-10 w-40 bg-gray-200 dark:bg-[#222F43] rounded-lg mx-auto" />
        <div className="space-y-4 max-w-2xl mx-auto">
          <div className="h-4 w-full bg-gray-200 dark:bg-[#222F43] rounded" />
          <div className="h-4 w-5/6 bg-gray-200 dark:bg-[#222F43] rounded" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-64 bg-gray-200 dark:bg-[#222F43] rounded-xl"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

