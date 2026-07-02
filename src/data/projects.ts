export type MockupDevice = "phone" | "desktop";

export type ProjectPlatform = "mobile" | "web";

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
  domain: string;
  year: string;
  platform: ProjectPlatform;
  description: string[];
  images: ProjectImage[];
};

export type ProjectFilter = "all" | ProjectPlatform;

export function projectMatchesFilter(
  project: Project,
  filter: ProjectFilter,
): boolean {
  return filter === "all" || project.platform === filter;
}

export const projects: Project[] = [
  {
    id: "basic-accounting",
    title: "Basic Accounting",
    company: "Housecall Pro",
    domain: "Trades",
    year: "2025",
    platform: "web",
    description: [
      "At Housecall Pro, I led the design of a new self-serve accounting experience for home service professionals managing their own books.",
      "Transaction review, categorization, and reporting came together in a streamlined workflow that helped business owners confidently prepare tax-ready books on their own.",
      "Early testing validated the experience, giving Housecall Pro confidence in a new self-serve accounting offering.",
    ],
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
    id: "hcp-money-activation",
    title: "HCP Money Activation",
    company: "Housecall Pro",
    domain: "Trades",
    year: "2025",
    platform: "web",
    description: [
      "At Housecall Pro, I owned the design of the activation experience for home service professionals unlocking financial tools.",
      "A new unlock pattern helped business owners understand what they were unlocking before deciding to activate it, replacing a gated flow with a more guided experience.",
      "The redesign increased activation from 3% to 16% and became the new unlock pattern across the platform.",
    ],
    images: [
      {
        src: "/images/plane-desktop.png",
        alt: "HCP Money activation screen with feature carousel",
        device: "desktop",
      },
      {
        src: "/images/plane-desktop.png",
        alt: "Expense module onboarding — business information step",
        device: "desktop",
      },
      {
        src: "/images/plane-desktop.png",
        alt: "HCP Money overview after activation",
        device: "desktop",
      },
    ],
  },
  {
    id: "concierge-conversations",
    title: "Concierge Conversations",
    company: "Mad Mobile",
    domain: "Retail",
    year: "2024",
    platform: "mobile",
    description: [
      "At Mad Mobile, I led 0 → 1 design for a new messaging experience that became the communication hub for Concierge. Retail associates could manage conversations, share products, organize customer segments, and keep everything in one place.",
      "I helped shape the product strategy by bringing AI directly into messaging, allowing associates to rewrite, personalize, and send messages without leaving their workflow.",
      "The redesign gave retail associates fewer reasons to leave Concierge, helping brands keep customer communication, sales activity, and relationship data in one place.",
    ],
    images: [
      {
        src: "/images/mindvalley-light.png",
        alt: "Mindvalley Discover programs screen",
        device: "phone",
      },
      {
        src: "/images/mindvalley-light.png",
        alt: "Mindvalley trending programs carousel",
        device: "phone",
      },
      {
        src: "/images/mindvalley-light.png",
        alt: "Mindvalley popular programs screen",
        device: "phone",
      },
    ],
  },
  {
    id: "concierge-ai",
    title: "Concierge AI",
    company: "Mad Mobile",
    domain: "Retail",
    year: "2024",
    platform: "mobile",
    description: [
      "At Mad Mobile, I led 0 → 1 design for an agent experience used by retail associates at brands including Tractor Supply, Estée Lauder, and Talbots.",
      "I designed the agent around the platform's object model so it could understand customers, recommend products, and handle personalized communication.",
      "The result reduced task time by 75%, giving retail associates more time to build relationships and drive sales.",
    ],
    images: [
      {
        src: "/images/moonly-dark.png",
        alt: "Moonly lunar calendar screen",
        device: "phone",
      },
      {
        src: "/images/moonly-dark.png",
        alt: "Moonly moon phase calendar",
        device: "phone",
      },
      {
        src: "/images/moonly-dark.png",
        alt: "Moonly lunar activity categories",
        device: "phone",
      },
    ],
  },
  {
    id: "concierge-platform",
    title: "Concierge Platform",
    company: "Mad Mobile",
    domain: "Retail",
    year: "2024",
    platform: "mobile",
    description: [
      "At Mad Mobile, I led 0 → 1 design for the Concierge platform, rebuilding a clienteling product used by retailers including Ralph Lauren, Urban Outfitters, and Pandora.",
      "I helped shape the product strategy, then led the redesign from object modeling through delivery to create a stronger foundation for the product.",
      "The redesign secured contract renewals, increased customer satisfaction by 10%, and helped put the product back on a path to growth.",
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
      {
        src: "/images/concierge-screenshot.png",
        alt: "Concierge Platform customer task list",
        device: "phone",
      },
    ],
  },
];
