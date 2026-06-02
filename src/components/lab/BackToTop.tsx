"use client";

import { ArrowUp } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { iconButtonSize } from "@/lib/icon-button";

const SCROLL_THRESHOLD = 400;

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className="back-to-top-anchor pointer-events-none fixed inset-x-0 bottom-0 z-50 px-5 lg:px-10"
    >
      <div className="relative mx-auto w-full max-w-[var(--shell-max)]">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          aria-hidden={!visible}
          tabIndex={visible ? 0 : -1}
          className={`back-to-top icon-btn icon-btn--md icon-btn--raised${visible ? " back-to-top--visible" : ""}`}
        >
          <ArrowUp size={iconButtonSize.md} weight="regular" aria-hidden />
        </button>
      </div>
    </div>
  );
}
