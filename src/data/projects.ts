export type MockupDevice = "phone" | "desktop";

export type ProjectImage = {
  src: string;
  alt: string;
  /** Defaults to phone. Desktop uses landscape aspect at full rail width. */
  device?: MockupDevice;
};

export type Project = {
  id: string;
  title: string;
  company: string;
  year: string;
  description: string[];
  outcomes: string[];
  images: ProjectImage[];
};

export const projects: Project[] = [
  {
    id: "concierge-ai",
    title: "Concierge AI",
    company: "Mad Mobile",
    year: "2024",
    description: [
      "Led 0 → 1 design across strategy, testing, system modeling, and delivery for a new agent experience.",
      "Built for retail associates managing customer relationships, product pairing, and outreach at scale.",
    ],
    outcomes: [
      "75% faster task completion",
      "$mm protected in contract renewals",
    ],
    images: [
      {
        src: "/images/concierge-screenshot.png",
        alt: "Concierge AI hydration summary screen",
        device: "phone",
      },
      {
        src: "/images/concierge-screenshot.png",
        alt: "Concierge AI customer outreach screen",
        device: "phone",
      },
    ],
  },
  {
    id: "preview-02",
    title: "Project Two",
    company: "Company",
    year: "2023",
    description: [
      "Placeholder for layout preview — mix of desktop and mobile work.",
    ],
    outcomes: ["Outcome metric one", "Outcome metric two"],
    images: [
      {
        src: "/images/plane-desktop.png",
        alt: "Plane project management desktop home screen",
        device: "desktop",
      },
      {
        src: "/images/concierge-screenshot.png",
        alt: "Mobile product screen",
        device: "phone",
      },
    ],
  },
];
