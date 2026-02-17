 "use client";
import React from "react";
import { Camera } from "lucide-react";
import { usePaginatedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { OptimizedImage } from "@/components/ui/OptimizedImage";

export function PhotosGrid() {
  const {
    results: photos,
    status,
    loadMore,
    isLoadingMore,
  } = usePaginatedQuery(
    api.photos.getPage,
    {},
    { initialNumItems: 9 }
  );

  // Loading state
  const [imagesLoaded, setImagesLoaded] = React.useState<Record<string, boolean>>({});
  
  const handleImageLoaded = (id: string) => {
    setImagesLoaded(prev => ({ ...prev, [id]: true }));
  };

  const sortedPhotos = React.useMemo(() => {
    if (!photos) return [];
    return [...photos].sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order;
      }
      return b.createdAt - a.createdAt;
    });
  }, [photos]);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 mb-8">
        <Camera className="w-6 h-6 text-[#ffe400]" />
        <h3
          className={`font-dynapuff text-2xl font-semibold text-[#101010] dark:text-[#94A9C9]`}
        >
          Recent Captures
        </h3>
      </div>

      {status === "LoadingFirstPage" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="relative bg-white dark:bg-[#131C31] rounded-xl overflow-hidden border border-gray-100 dark:border-[#222F43] animate-pulse h-64"
            />
          ))}
        </div>
      ) : sortedPhotos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-[#66768f]">No photos available yet.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedPhotos.map((photo, index) => {
            const isImageLoaded = imagesLoaded[photo._id] || false;

              return (
              <div
                key={photo._id}
                className={`group relative bg-white dark:bg-[#131C31] rounded-xl overflow-hidden
                  border ${photo.featured ? 'border-[#ffe400]' : 'border-gray-100 dark:border-[#222F43]'} hover:border-[#ffe400] 
                  dark:hover:border-[#ffe400] transition-all duration-300 animate-slideInUp`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {photo.featured && (
                  <div className="absolute top-2 right-2 z-10 bg-[#ffe400] text-[#101010] text-xs font-medium px-2 py-1 rounded-full">
                    Featured
                  </div>
                )}
                <div className="relative aspect-square overflow-hidden">
                  {/* Skeleton loader */}
                  {!isImageLoaded && (
                    <div className="absolute inset-0">
                      <div className="w-full h-full bg-gray-200 dark:bg-[#1E293B]">
                        <div className="h-full w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-[#1E293B] dark:via-[#2A3A50] dark:to-[#1E293B] bg-[length:400%_100%] animate-shimmer" />
                      </div>
                    </div>
                  )}
                  
                  {photo.imageUrl && (
                    <OptimizedImage
                      src={photo.imageUrl}
                      alt={photo.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className={`object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 ${
                        isImageLoaded ? "opacity-100" : "opacity-0"
                      }`}
                      onLoadingComplete={() => handleImageLoaded(photo._id)}
                      onError={() => {
                        console.log("Image failed to load, using fallback");
                        handleImageLoaded(photo._id);
                      }}
                    />
                  )}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                    flex items-end p-4"
                  >
                    <div className="text-white">
                      <h4 className="text-lg font-semibold mb-1">{photo.title}</h4>
                      <div className="flex items-center gap-2 text-sm opacity-80">
                        <span>{photo.location}</span>
                        <span>•</span>
                        <span>{photo.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {status === "CanLoadMore" && (
          <div className="flex justify-center pt-8">
            <button
              type="button"
              onClick={() => loadMore(9)}
              disabled={isLoadingMore}
              className="px-6 py-3 rounded-full bg-[#ffe400] text-[#101010] font-semibold hover:scale-105 transition-transform disabled:opacity-60"
            >
              {isLoadingMore ? "Loading..." : "Load more photos"}
            </button>
          </div>
        )}
      </>
      )}
    </div>
  );
}
