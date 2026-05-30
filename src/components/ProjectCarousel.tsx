"use client";

import Image from "next/image";
import type { Project } from "@/data/projects";

type ProjectCarouselProps = {
  images: Project["images"];
};

export function ProjectCarousel({ images }: ProjectCarouselProps) {
  return (
    <div className="flex gap-10 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {images.map((image, index) => (
        <div
          key={`${image.src}-${index}`}
          className="relative h-[477px] w-[210px] shrink-0 overflow-hidden rounded-lg"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover object-top"
            sizes="210px"
          />
        </div>
      ))}
    </div>
  );
}
