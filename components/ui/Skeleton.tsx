import { cn } from "@/lib/utils";

export function Skeleton({ 
  className, 
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-200 dark:bg-[#222F43]",
        className
      )}
      {...props}
    />
  );
} 