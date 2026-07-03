"use client";

import { useEffect, useState } from "react";

import { PortfolioHome } from "@/components/portfolio/PortfolioHome";

/* Each palette is a complete, coherent monochrome system: canvas, ink,
 * dividers, borders and surfaces all share one hue axis so nothing reads
 * "off temperature". These are distinct directions to react to — not
 * degrees of the same warmth. Same lightness ladder across all of them so
 * only hue/chroma (the character) changes. */
type Palette = {
  id: string;
  label: string;
  note: string;
  tokens: Record<string, string>;
};

const PALETTES: Palette[] = [
  {
    id: "weppy",
    label: "Warm neutral (Weppy)",
    note: "Weppy's move — warm paper gutter + NEUTRAL grey/black ink + pure-white content. Warmth without tinting the text or screenshots.",
    tokens: {
      "--ds-bg": "oklch(0.966 0.007 96)",
      "--ds-fg": "oklch(0.235 0.003 96)",
      "--ds-body": "oklch(0.556 0.004 96)",
      "--ds-muted": "oklch(0.744 0.005 96)",
      "--ds-muted-on-subtle": "oklch(0.556 0.004 96)",
      "--ds-rule": "oklch(0.902 0.006 96)",
      "--ds-border": "oklch(0.862 0.007 96)",
      "--ds-bg-subtle": "oklch(0.945 0.006 96)",
      "--ds-surface": "oklch(0.945 0.006 96)",
      "--ds-surface-raised": "oklch(0.914 0.007 96)",
      "--ds-shadow-key": "oklch(0.30 0.018 90)",
    },
  },
  {
    id: "bone",
    label: "Bone",
    note: "Warm cream + brown-black ink. Printed, editorial, gallery paper.",
    tokens: {
      "--ds-bg": "oklch(0.964 0.018 82)",
      "--ds-fg": "oklch(0.268 0.022 68)",
      "--ds-body": "oklch(0.556 0.026 72)",
      "--ds-muted": "oklch(0.764 0.022 76)",
      "--ds-muted-on-subtle": "oklch(0.556 0.026 72)",
      "--ds-rule": "oklch(0.900 0.022 80)",
      "--ds-border": "oklch(0.858 0.026 80)",
      "--ds-bg-subtle": "oklch(0.945 0.020 80)",
      "--ds-surface": "oklch(0.945 0.020 80)",
      "--ds-surface-raised": "oklch(0.914 0.022 80)",
      "--ds-shadow-key": "oklch(0.30 0.028 66)",
    },
  },
  {
    id: "clay",
    label: "Clay",
    note: "Deeper sand/terracotta neutral. The most tactile, hand-made warmth.",
    tokens: {
      "--ds-bg": "oklch(0.951 0.030 56)",
      "--ds-fg": "oklch(0.274 0.036 44)",
      "--ds-body": "oklch(0.552 0.040 50)",
      "--ds-muted": "oklch(0.752 0.032 54)",
      "--ds-muted-on-subtle": "oklch(0.552 0.040 50)",
      "--ds-rule": "oklch(0.891 0.032 56)",
      "--ds-border": "oklch(0.848 0.038 56)",
      "--ds-bg-subtle": "oklch(0.934 0.030 56)",
      "--ds-surface": "oklch(0.934 0.030 56)",
      "--ds-surface-raised": "oklch(0.904 0.034 56)",
      "--ds-shadow-key": "oklch(0.30 0.044 46)",
    },
  },
  {
    id: "greige",
    label: "Greige",
    note: "Olive-grey putty. Quiet, architectural, Scandinavian restraint.",
    tokens: {
      "--ds-bg": "oklch(0.961 0.018 120)",
      "--ds-fg": "oklch(0.270 0.020 124)",
      "--ds-body": "oklch(0.554 0.024 122)",
      "--ds-muted": "oklch(0.760 0.020 120)",
      "--ds-muted-on-subtle": "oklch(0.554 0.024 122)",
      "--ds-rule": "oklch(0.900 0.020 118)",
      "--ds-border": "oklch(0.856 0.024 118)",
      "--ds-bg-subtle": "oklch(0.943 0.018 118)",
      "--ds-surface": "oklch(0.943 0.018 118)",
      "--ds-surface-raised": "oklch(0.912 0.020 118)",
      "--ds-shadow-key": "oklch(0.30 0.024 122)",
    },
  },
  {
    id: "porcelain",
    label: "Porcelain",
    note: "Cool blue-white + cool ink. Crisp, modern, product-led.",
    tokens: {
      "--ds-bg": "oklch(0.981 0.010 240)",
      "--ds-fg": "oklch(0.258 0.024 252)",
      "--ds-body": "oklch(0.550 0.026 250)",
      "--ds-muted": "oklch(0.762 0.020 246)",
      "--ds-muted-on-subtle": "oklch(0.550 0.026 250)",
      "--ds-rule": "oklch(0.910 0.016 244)",
      "--ds-border": "oklch(0.864 0.020 244)",
      "--ds-bg-subtle": "oklch(0.955 0.010 242)",
      "--ds-surface": "oklch(0.955 0.010 242)",
      "--ds-surface-raised": "oklch(0.916 0.016 242)",
      "--ds-shadow-key": "oklch(0.26 0.028 252)",
    },
  },
  {
    id: "graphite",
    label: "Graphite",
    note: "Dimmer cool canvas, near-black ink. High-contrast, confident.",
    tokens: {
      "--ds-bg": "oklch(0.966 0.008 252)",
      "--ds-fg": "oklch(0.232 0.024 260)",
      "--ds-body": "oklch(0.522 0.026 256)",
      "--ds-muted": "oklch(0.740 0.018 252)",
      "--ds-muted-on-subtle": "oklch(0.522 0.026 256)",
      "--ds-rule": "oklch(0.898 0.014 252)",
      "--ds-border": "oklch(0.850 0.018 252)",
      "--ds-bg-subtle": "oklch(0.942 0.009 252)",
      "--ds-surface": "oklch(0.942 0.009 252)",
      "--ds-surface-raised": "oklch(0.910 0.014 252)",
      "--ds-shadow-key": "oklch(0.22 0.026 260)",
    },
  },
  {
    id: "graphite-refined",
    label: "Graphite refined",
    note: "Recommended — graphite's deep cool canvas for max screenshot pop, ink calmed to a near-neutral near-black.",
    tokens: {
      "--ds-bg": "oklch(0.962 0.006 250)",
      "--ds-fg": "oklch(0.235 0.014 258)",
      "--ds-body": "oklch(0.520 0.015 256)",
      "--ds-muted": "oklch(0.738 0.011 252)",
      "--ds-muted-on-subtle": "oklch(0.520 0.015 256)",
      "--ds-rule": "oklch(0.896 0.009 252)",
      "--ds-border": "oklch(0.848 0.011 252)",
      "--ds-bg-subtle": "oklch(0.940 0.006 252)",
      "--ds-surface": "oklch(0.940 0.006 252)",
      "--ds-surface-raised": "oklch(0.908 0.009 252)",
      "--ds-shadow-key": "oklch(0.22 0.016 258)",
    },
  },
  {
    id: "slate",
    label: "Slate",
    note: "Graphite's confident dark ink, chroma dialed back so UI screenshots stay true.",
    tokens: {
      "--ds-bg": "oklch(0.969 0.005 250)",
      "--ds-fg": "oklch(0.238 0.013 258)",
      "--ds-body": "oklch(0.530 0.014 256)",
      "--ds-muted": "oklch(0.744 0.010 252)",
      "--ds-muted-on-subtle": "oklch(0.530 0.014 256)",
      "--ds-rule": "oklch(0.899 0.008 252)",
      "--ds-border": "oklch(0.852 0.010 252)",
      "--ds-bg-subtle": "oklch(0.943 0.006 252)",
      "--ds-surface": "oklch(0.943 0.006 252)",
      "--ds-surface-raised": "oklch(0.911 0.008 252)",
      "--ds-shadow-key": "oklch(0.22 0.016 258)",
    },
  },
  {
    id: "ash",
    label: "Ash",
    note: "Near-neutral with a whisper of cool. Screenshots read dead accurate.",
    tokens: {
      "--ds-bg": "oklch(0.973 0.002 250)",
      "--ds-fg": "oklch(0.248 0.006 256)",
      "--ds-body": "oklch(0.542 0.007 254)",
      "--ds-muted": "oklch(0.752 0.005 252)",
      "--ds-muted-on-subtle": "oklch(0.542 0.007 254)",
      "--ds-rule": "oklch(0.903 0.004 252)",
      "--ds-border": "oklch(0.856 0.005 252)",
      "--ds-bg-subtle": "oklch(0.944 0.003 252)",
      "--ds-surface": "oklch(0.944 0.003 252)",
      "--ds-surface-raised": "oklch(0.912 0.004 252)",
      "--ds-shadow-key": "oklch(0.24 0.008 256)",
    },
  },
  {
    id: "neutral",
    label: "True neutral",
    note: "Subtle near-white neutral (oklch.fyi model). White content pops via border + shadow, not color.",
    tokens: {
      "--ds-bg": "oklch(0.985 0 0)",
      "--ds-fg": "oklch(0.255 0 0)",
      "--ds-body": "oklch(0.545 0 0)",
      "--ds-muted": "oklch(0.758 0 0)",
      "--ds-muted-on-subtle": "oklch(0.545 0 0)",
      "--ds-rule": "oklch(0.905 0 0)",
      "--ds-border": "oklch(0.858 0 0)",
      "--ds-bg-subtle": "oklch(0.958 0 0)",
      "--ds-surface": "oklch(0.958 0 0)",
      "--ds-surface-raised": "oklch(0.930 0 0)",
      "--ds-shadow-key": "oklch(0.20 0 0)",
    },
  },
  {
    id: "ink-dark",
    label: "Ink (dark)",
    note: "Dark — deep cool near-black. Heads up: light UI screenshots will clash on a dark canvas.",
    tokens: {
      "--ds-bg": "oklch(0.205 0.010 258)",
      "--ds-fg": "oklch(0.955 0.006 250)",
      "--ds-body": "oklch(0.800 0.010 250)",
      "--ds-muted": "oklch(0.620 0.012 252)",
      "--ds-muted-on-subtle": "oklch(0.720 0.011 250)",
      "--ds-rule": "oklch(0.320 0.012 254)",
      "--ds-border": "oklch(0.380 0.014 254)",
      "--ds-bg-subtle": "oklch(0.245 0.010 256)",
      "--ds-surface": "oklch(0.245 0.010 256)",
      "--ds-surface-raised": "oklch(0.285 0.012 256)",
      "--ds-shadow-key": "oklch(0.05 0.010 258)",
    },
  },
  {
    id: "graphite-dark",
    label: "Graphite (dark)",
    note: "Dark — lifted cool charcoal, softer than pure ink. Same clash caveat on screenshots.",
    tokens: {
      "--ds-bg": "oklch(0.242 0.008 252)",
      "--ds-fg": "oklch(0.960 0.005 250)",
      "--ds-body": "oklch(0.808 0.009 250)",
      "--ds-muted": "oklch(0.640 0.010 252)",
      "--ds-muted-on-subtle": "oklch(0.730 0.009 250)",
      "--ds-rule": "oklch(0.350 0.010 252)",
      "--ds-border": "oklch(0.410 0.012 252)",
      "--ds-bg-subtle": "oklch(0.285 0.008 252)",
      "--ds-surface": "oklch(0.285 0.008 252)",
      "--ds-surface-raised": "oklch(0.325 0.010 252)",
      "--ds-shadow-key": "oklch(0.06 0.010 255)",
    },
  },
  {
    id: "espresso-dark",
    label: "Espresso (dark)",
    note: "Dark — warm espresso near-black. Richer, but warm dark + light screenshots clash hardest.",
    tokens: {
      "--ds-bg": "oklch(0.215 0.012 60)",
      "--ds-fg": "oklch(0.952 0.010 78)",
      "--ds-body": "oklch(0.800 0.014 74)",
      "--ds-muted": "oklch(0.620 0.014 68)",
      "--ds-muted-on-subtle": "oklch(0.720 0.013 72)",
      "--ds-rule": "oklch(0.330 0.014 64)",
      "--ds-border": "oklch(0.390 0.016 64)",
      "--ds-bg-subtle": "oklch(0.255 0.012 62)",
      "--ds-surface": "oklch(0.255 0.012 62)",
      "--ds-surface-raised": "oklch(0.295 0.014 62)",
      "--ds-shadow-key": "oklch(0.04 0.010 60)",
    },
  },
];

export type PaletteId = (typeof PALETTES)[number]["id"];

type ShotTreatment = "both" | "border" | "shadow" | "none";

const SHOT_TREATMENTS: { id: ShotTreatment; label: string; note: string }[] = [
  { id: "both", label: "Border + shadow", note: "current — both edge and lift" },
  { id: "border", label: "Border only", note: "flat artifact, crisp edge" },
  { id: "shadow", label: "Shadow only", note: "rests on paper, no hard edge" },
  { id: "none", label: "None", note: "bare image — no edge, no lift" },
];

type Typeface = "sans" | "inter" | "spectral" | "newsreader" | "source-serif";

const TYPEFACES: { id: Typeface; label: string }[] = [
  { id: "sans", label: "Geist (sans)" },
  { id: "inter", label: "Inter" },
  { id: "spectral", label: "Spectral" },
  { id: "newsreader", label: "Newsreader" },
  { id: "source-serif", label: "Source Serif" },
];

const TYPE_PRESETS: { id: string; label: string; heading: Typeface; body: Typeface }[] = [
  { id: "all-sans", label: "All sans", heading: "sans", body: "sans" },
  { id: "all-serif", label: "All serif", heading: "spectral", body: "spectral" },
  {
    id: "serif-head",
    label: "Serif head · sans body",
    heading: "spectral",
    body: "sans",
  },
];

export function BgCompareLab() {
  const [activeId, setActiveId] = useState<PaletteId>("neutral");
  const [treatment, setTreatment] = useState<ShotTreatment>("both");
  const [headingFace, setHeadingFace] = useState<Typeface>("spectral");
  const [bodyFace, setBodyFace] = useState<Typeface>("sans");

  const active = PALETTES.find((p) => p.id === activeId) ?? PALETTES[0];

  useEffect(() => {
    const body = document.body;
    for (const [prop, value] of Object.entries(active.tokens)) {
      body.style.setProperty(prop, value);
    }
    body.style.background = active.tokens["--ds-bg"];

    return () => {
      for (const prop of Object.keys(active.tokens)) {
        body.style.removeProperty(prop);
      }
      body.style.removeProperty("background");
    };
  }, [active]);

  useEffect(() => {
    document.body.dataset.shotTreatment = treatment;
    return () => {
      delete document.body.dataset.shotTreatment;
    };
  }, [treatment]);

  useEffect(() => {
    document.body.dataset.faceHeading = headingFace;
    document.body.dataset.faceBody = bodyFace;
    return () => {
      delete document.body.dataset.faceHeading;
      delete document.body.dataset.faceBody;
    };
  }, [headingFace, bodyFace]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const index = Number.parseInt(event.key, 10);
      if (index < 1 || index > PALETTES.length) {
        return;
      }

      const next = PALETTES[index - 1];
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
      <div className="bg-compare" role="toolbar" aria-label="Color palette candidates">
        <div className="bg-compare__inner">
          <p className="bg-compare__title">Color palette</p>
          <div className="bg-compare__options">
            {PALETTES.map((palette, index) => {
              const selected = palette.id === activeId;

              return (
                <button
                  key={palette.id}
                  type="button"
                  className={`bg-compare__option${selected ? " bg-compare__option--active" : ""}`}
                  aria-pressed={selected}
                  onClick={() => setActiveId(palette.id)}
                >
                  <span
                    className="bg-compare__swatch"
                    style={{ background: palette.tokens["--ds-bg"] }}
                    aria-hidden
                  />
                  <span className="bg-compare__label">
                    {index + 1}. {palette.label}
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

          <p className="bg-compare__title bg-compare__title--sub">Typeface</p>
          <div className="bg-compare__options">
            {TYPE_PRESETS.map((preset) => {
              const selected =
                preset.heading === headingFace && preset.body === bodyFace;

              return (
                <button
                  key={preset.id}
                  type="button"
                  className={`bg-compare__option${selected ? " bg-compare__option--active" : ""}`}
                  aria-pressed={selected}
                  onClick={() => {
                    setHeadingFace(preset.heading);
                    setBodyFace(preset.body);
                  }}
                >
                  <span className="bg-compare__label">{preset.label}</span>
                </button>
              );
            })}
          </div>

          <p className="bg-compare__subtitle">Headings</p>
          <div className="bg-compare__options">
            {TYPEFACES.map((option) => {
              const selected = option.id === headingFace;

              return (
                <button
                  key={option.id}
                  type="button"
                  className={`bg-compare__option${selected ? " bg-compare__option--active" : ""}`}
                  aria-pressed={selected}
                  onClick={() => setHeadingFace(option.id)}
                >
                  <span className="bg-compare__label">{option.label}</span>
                </button>
              );
            })}
          </div>

          <p className="bg-compare__subtitle">Body</p>
          <div className="bg-compare__options">
            {TYPEFACES.map((option) => {
              const selected = option.id === bodyFace;

              return (
                <button
                  key={option.id}
                  type="button"
                  className={`bg-compare__option${selected ? " bg-compare__option--active" : ""}`}
                  aria-pressed={selected}
                  onClick={() => setBodyFace(option.id)}
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
