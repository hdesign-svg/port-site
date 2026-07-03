"use client";

import { useEffect, useState } from "react";

import { PortfolioHome } from "@/components/portfolio/PortfolioHome";

/* Full warm neutral system — same lightness ladder as the cool ramp, hue ~80.
 * Applied as a set so ink, dividers, borders and surfaces all share the paper's
 * temperature. bg (the tunable) is layered on top per-candidate. */
const WARM_SYSTEM: Record<string, string> = {
  "--ds-fg": "oklch(0.265 0.012 80)",
  "--ds-body": "oklch(0.560 0.014 80)",
  "--ds-muted": "oklch(0.769 0.012 80)",
  "--ds-muted-on-subtle": "oklch(0.560 0.014 80)",
  "--ds-rule": "oklch(0.905 0.010 80)",
  "--ds-border": "oklch(0.862 0.012 80)",
  "--ds-bg-subtle": "oklch(0.945 0.007 80)",
  "--ds-surface": "oklch(0.945 0.007 80)",
  "--ds-surface-raised": "oklch(0.912 0.009 80)",
  "--ds-shadow-key": "oklch(0.30 0.020 70)",
};

const COOL_SYSTEM: Record<string, string> = {
  "--ds-fg": "oklch(0.262 0.010 248)",
  "--ds-body": "oklch(0.558 0.012 248)",
  "--ds-muted": "oklch(0.769 0.010 248)",
  "--ds-muted-on-subtle": "oklch(0.558 0.012 248)",
  "--ds-rule": "oklch(0.911 0.006 248)",
  "--ds-border": "oklch(0.867 0.009 248)",
  "--ds-bg-subtle": "oklch(0.942 0.005 248)",
  "--ds-surface": "oklch(0.942 0.005 248)",
  "--ds-surface-raised": "oklch(0.911 0.006 248)",
  "--ds-shadow-key": "oklch(0.262 0.010 248)",
};

export const BG_CANDIDATES = [
  {
    id: "warm-paper",
    label: "Warm paper",
    bg: "oklch(0.968 0.009 78)",
    warm: true,
    note: "Original warm paper — chroma 0.009, warm content system",
  },
  {
    id: "warm-soft",
    label: "Warm soft",
    bg: "oklch(0.968 0.007 78)",
    warm: true,
    note: "A touch less warm — chroma 0.007, warm content system",
  },
  {
    id: "warm-faint",
    label: "Warm faint",
    bg: "oklch(0.968 0.0055 80)",
    warm: true,
    note: "Subtle warmth — chroma 0.0055, warm content system",
  },
  {
    id: "current",
    label: "Current (cool)",
    bg: "oklch(0.982 0.005 248)",
    warm: false,
    note: "Reference — current cool near-white",
  },
] as const;

export type BgCandidateId = (typeof BG_CANDIDATES)[number]["id"];

type ShotTreatment = "both" | "border" | "shadow";

const SHOT_TREATMENTS: { id: ShotTreatment; label: string; note: string }[] = [
  { id: "both", label: "Border + shadow", note: "current — both edge and lift" },
  { id: "border", label: "Border only", note: "flat artifact, crisp edge" },
  { id: "shadow", label: "Shadow only", note: "rests on paper, no hard edge" },
];

export function BgCompareLab() {
  const [activeId, setActiveId] = useState<BgCandidateId>("warm-soft");
  const [treatment, setTreatment] = useState<ShotTreatment>("both");

  const active =
    BG_CANDIDATES.find((candidate) => candidate.id === activeId) ??
    BG_CANDIDATES[0];

  useEffect(() => {
    const body = document.body;
    const system = active.warm ? WARM_SYSTEM : COOL_SYSTEM;
    const applied = { ...system, "--ds-bg": active.bg };

    for (const [prop, value] of Object.entries(applied)) {
      body.style.setProperty(prop, value);
    }
    body.style.background = active.bg;

    return () => {
      for (const prop of Object.keys(applied)) {
        body.style.removeProperty(prop);
      }
      body.style.removeProperty("background");
    };
  }, [active.bg, active.warm]);

  useEffect(() => {
    document.body.dataset.shotTreatment = treatment;
    return () => {
      delete document.body.dataset.shotTreatment;
    };
  }, [treatment]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const index = Number.parseInt(event.key, 10);
      if (index < 1 || index > BG_CANDIDATES.length) {
        return;
      }

      const next = BG_CANDIDATES[index - 1];
      if (next) {
        setActiveId(next.id);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const firstProject = document.querySelector(".portfolio__project");
      firstProject?.scrollIntoView({ behavior: "auto", block: "start" });
    }, 400);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="bg-compare" role="toolbar" aria-label="Background candidates">
        <div className="bg-compare__inner">
          <p className="bg-compare__title">Background compare</p>
          <div className="bg-compare__options">
            {BG_CANDIDATES.map((candidate, index) => {
              const selected = candidate.id === activeId;

              return (
                <button
                  key={candidate.id}
                  type="button"
                  className={`bg-compare__option${selected ? " bg-compare__option--active" : ""}`}
                  aria-pressed={selected}
                  onClick={() => setActiveId(candidate.id)}
                >
                  <span
                    className="bg-compare__swatch"
                    style={{ background: candidate.bg }}
                    aria-hidden
                  />
                  <span className="bg-compare__label">
                    {index + 1}. {candidate.label}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="bg-compare__note">{active.note}</p>

          <p className="bg-compare__title bg-compare__title--sub">
            Image treatment
          </p>
          <div className="bg-compare__options">
            {SHOT_TREATMENTS.map((option) => {
              const selected = option.id === treatment;

              return (
                <button
                  key={option.id}
                  type="button"
                  className={`bg-compare__option${selected ? " bg-compare__option--active" : ""}`}
                  aria-pressed={selected}
                  onClick={() => setTreatment(option.id)}
                >
                  <span className="bg-compare__label">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <PortfolioHome />
    </>
  );
}
