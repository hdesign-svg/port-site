export type Project = {
  id: string;
  title: string;
  company: string;
  year: string;
  description: string[];
  outcomes: string[];
  images: { src: string; alt: string }[];
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
      },
      {
        src: "/images/concierge-screenshot.png",
        alt: "Concierge AI customer outreach screen",
      },
      {
        src: "/images/concierge-screenshot.png",
        alt: "Concierge AI product pairing screen",
      },
    ],
  },
  {
    id: "preview-02",
    title: "Project Two",
    company: "Company",
    year: "2023",
    description: [
      "Placeholder for layout preview — second project block to show section rhythm.",
    ],
    outcomes: ["Outcome metric one", "Outcome metric two"],
    images: [
      {
        src: "/images/concierge-screenshot.png",
        alt: "Placeholder mockup",
      },
      {
        src: "/images/concierge-screenshot.png",
        alt: "Placeholder mockup",
      },
    ],
  },
];
