import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

export function LazyImage({ src, alt, className, containerClassName, ...props }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Omit React DOM event handlers that conflict with framer-motion's types
  const { onAnimationStart, onDragStart, onDrag, onDragEnd, ...safeProps } = props;

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {/* Skeleton / Placeholder while loading */}
      {!isLoaded && !hasError && (
        <Skeleton className="absolute inset-0 w-full h-full bg-muted" />
      )}

      {/* Fallback Error */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground text-xs text-center p-2">
          Impossible de charger l'image
        </div>
      )}

      {/* Actual Image */}
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        initial={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
        animate={{
          opacity: isLoaded ? 1 : 0,
          filter: isLoaded ? "blur(0px)" : "blur(10px)",
          scale: isLoaded ? 1 : 1.05
        }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={cn(
          "w-full h-full object-cover",
          className
        )}
        {...(safeProps as React.ComponentPropsWithoutRef<typeof motion.img>)}
      />
    </div>
  );
}
