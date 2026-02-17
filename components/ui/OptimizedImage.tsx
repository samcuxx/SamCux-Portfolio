import Image, { type ImageProps } from "next/image";
import { getConvexImageUrl } from "@/lib/utils";

type OptimizedImageProps = Omit<ImageProps, "src"> & {
  src: ImageProps["src"];
};

export function OptimizedImage(props: OptimizedImageProps) {
  const { src, loading, priority, ...rest } = props;

  let resolvedSrc = src;

  if (typeof src === "string") {
    const isStorageId =
      src !== "" && !src.includes("://") && !src.startsWith("/");

    if (isStorageId) {
      resolvedSrc = getConvexImageUrl(src);
    }
  }

  const finalLoading =
    typeof loading !== "undefined"
      ? loading
      : priority
        ? undefined
        : "lazy";

  return (
    <Image
      src={resolvedSrc}
      loading={finalLoading}
      priority={priority}
      {...rest}
    />
  );
}

