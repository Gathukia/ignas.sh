import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from "@/lib/utils";

export const BlurImage = ({ src, alt, ...props }) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className="relative overflow-hidden">
      <Image
        src={src}
        alt={alt}
        {...props}
        className={cn(
          "duration-700 ease-in-out",
          isLoading ? "scale-110 blur-2xl grayscale" : "scale-100 blur-0 grayscale-0"
        )}
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  );
};