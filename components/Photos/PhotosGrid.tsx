import React from "react";
import Image from "next/image";
import { Camera } from "lucide-react";


// Sample photo data - replace with your actual photos
const photos = [
  {
    url: "https://images.unsplash.com/photo-1494173853739-c21f58b16055?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Nature's Beauty",
    location: "Forest Trail",
    date: "2024",
  },
  {
    url: "https://images.unsplash.com/photo-1414690165279-49ab0a9a7e66?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Urban Exploration",
    location: "Downtown",
    date: "2024",
  },
  {
    url: "https://images.unsplash.com/photo-1510074468346-504b4d8a8630?q=80&w=398&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Modern Architecture",
    location: "City Center",
    date: "2024",
  },
  {
    url: "https://images.unsplash.com/photo-1461704946971-9e5d8b7938f0?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fHw%3D",
    title: "Self Portrait",
    location: "Studio",
    date: "2024",
  },
  {
    url: "https://images.unsplash.com/photo-1463620910506-d0458143143e?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE2fHx8ZW58MHx8fHx8",
    title: "Travel Memories",
    location: "Adventure",
    date: "2024",
  },
  {
    url: "https://images.unsplash.com/photo-1414690165279-49ab0a9a7e66?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Street Photography",
    location: "Urban Life",
    date: "2024",
  },
];

export function PhotosGrid() {
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="group relative bg-white dark:bg-[#131C31] rounded-xl overflow-hidden
              border border-gray-100 dark:border-[#222F43] hover:border-[#ffe400] 
              dark:hover:border-[#ffe400] transition-all duration-300 animate-slideInUp"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={photo.url}
                alt={photo.title}
                width={400}
                height={400}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
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
        ))}
      </div>
    </div>
  );
}
