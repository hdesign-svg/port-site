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
    id: "basic-accounting",
    title: "Basic Accounting",
    company: "Housecall Pro",
    year: "2025",
    description: [
      "Designed a self-serve accounting experience for a new DIY accounting offering.",
      "For home service professionals with simpler accounting needs, simplifying transaction review and reporting.",
    ],
    outcomes: ["Validated self-serve accounting through pilot testing."],
    images: [
      {
        src: "/images/plane-desktop.png",
        alt: "Basic Accounting transaction review workflow",
        device: "desktop",
      },
      {
        src: "/images/plane-desktop.png",
        alt: "Basic Accounting reporting dashboard",
        device: "desktop",
      },
    ],
  },
  {
    id: "hcp-money-enrollment",
    title: "HCP Money Enrollment",
    company: "Housecall Pro",
    year: "2025",
    description: [
      "Redesigned enrollment after funnel analysis revealed users were dropping off before seeing the product.",
      "Built for home service professionals evaluating fintech products before commitment.",
    ],
    outcomes: ["3% → 12% conversion", "Adopted across product squads"],
    images: [
      {
        src: "/images/plane-desktop.png",
        alt: "Legacy HCP Money marketing landing page inside the product",
        device: "desktop",
      },
      {
        src: "/images/plane-desktop.png",
        alt: "Window-view enrollment dialogue with feature carousel over product empty state",
        device: "desktop",
      },
      {
        src: "/images/plane-desktop.png",
        alt: "Unlocked module with quasi-empty state after enrollment",
        device: "desktop",
      },
    ],
  },
  {
    id: "concierge-conversations",
    title: "Concierge Conversations",
    company: "Mad Mobile",
    year: "2024",
    description: [
      "Reimagined customer messaging through strategy, workflow design, and delivery as part of the Concierge platform overhaul.",
      "Helping retail associates manage customer relationships through modern messaging, product sharing, and AI-assisted writing.",
    ],
    outcomes: ["Kept associates in-platform", "$mm protected in contract renewals"],
    images: [
      {
        src: "/images/concierge-screenshot.png",
        alt: "Concierge Conversations messaging thread",
        device: "phone",
      },
      {
        src: "/images/concierge-screenshot.png",
        alt: "Concierge Conversations product sharing flow",
        device: "phone",
      },
    ],
  },
  {
    id: "concierge-ai",
    title: "Concierge AI",
    company: "Mad Mobile",
    year: "2024",
    description: [
      "Led 0 → 1 design across strategy, system modeling, and delivery for a new agent experience.",
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
    id: "concierge-platform",
    title: "Concierge Platform",
    company: "Mad Mobile",
    year: "2024",
    description: [
      "Led 0 → 1 design across strategy, system modeling, and delivery for a foundational clienteling platform redesign.",
      "Built for retail associates managing customer relationships, modernizing a stagnant clienteling experience.",
    ],
    outcomes: [
      "10% increase in associate sentiment",
      "$mm protected in contract renewals",
    ],
    images: [
      {
        src: "/images/concierge-screenshot.png",
        alt: "Concierge Platform customer profile view",
        device: "phone",
      },
      {
        src: "/images/concierge-screenshot.png",
        alt: "Concierge Platform associate home screen",
        device: "phone",
      },
    ],
  },
];
