"use client";

import { useEffect } from "react";

import type { ProjectImage } from "@/data/projects";

type PortfolioLightboxProps = {
  image: ProjectImage | null;
  onClose: () => void;
};

export function PortfolioLightbox({ image, onClose }: PortfolioLightboxProps) {
  useEffect(() => {
    if (!image) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [image, onClose]);

  if (!image) {
    return null;
  }

  return (
    <div
      className="portfolio-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      onClick={onClose}
    >
      <button
        type="button"
        className="portfolio-lightbox__close"
        onClick={onClose}
        aria-label="Close"
      >
        ×
      </button>
      <div
        className="portfolio-lightbox__frame"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Native img preserves source aspect in the lightbox */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image.src} alt={image.alt} className="portfolio-lightbox__image" />
      </div>
    </div>
  );
}
