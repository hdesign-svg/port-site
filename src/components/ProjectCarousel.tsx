"use client";

import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";

type ProjectCarouselProps = {
  images: Project["images"];
};

function ArrowButton({
  direction,
  onClick,
  disabled,
}: {
  direction: "left" | "right";
  onClick: () => void;
  disabled?: boolean;
}) {
  const Icon = direction === "left" ? ArrowLeft : ArrowRight;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Previous image" : "Next image"}
      className="flex h-8 shrink-0 items-center justify-center rounded-md border border-border bg-bg px-3 py-2 disabled:cursor-not-allowed"
    >
      <Icon
        size={16}
        weight="regular"
        className={disabled ? "text-[#d4d4d8]" : "text-fg"}
        aria-hidden
      />
    </button>
  );
}

export function ProjectCarousel({ images }: ProjectCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  }, []);

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [updateScrollState, images.length]);

  const scroll = useCallback((direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    const cardWidth = container.querySelector("[data-carousel-card]")?.clientWidth;
    const gap = 24;
    const amount = (cardWidth ?? 304) + gap;

    container.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div
        ref={scrollRef}
        onScroll={updateScrollState}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            data-carousel-card
            className="relative flex h-[420px] w-full min-w-[240px] flex-1 snap-start items-center justify-center rounded-2xl bg-surface sm:h-[573px] sm:min-w-[280px]"
          >
            <div className="relative h-[78%] w-[69%] overflow-hidden rounded-xl">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 60vw, 210px"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <ArrowButton
          direction="left"
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
        />
        <ArrowButton
          direction="right"
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
        />
      </div>
    </div>
  );
}
