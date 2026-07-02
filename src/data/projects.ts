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
      "Designed a self-serve accounting experience for a new DIY accounting offering.",
      "For home service professionals with simpler accounting needs, simplifying transaction review and reporting.",
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
      "Redesigned activation after funnel analysis revealed users were dropping off before seeing the product.",
      "Built for home service professionals evaluating fintech products before commitment.",
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
      "Reimagined customer messaging through strategy, workflow design, and delivery as part of the Concierge platform overhaul.",
      "Helping retail associates manage customer relationships through modern messaging, product sharing, and AI-assisted writing.",
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
      "At Mad Mobile, I led 0 → 1 design for an agent experience used by retail associates at brands including Ralph Lauren, Tractor Supply, and Estée Lauder. It unified customer relationships, product recommendations, and outreach through a conversational interface.",
      "From strategy through launch, I explored interaction models, validated concepts, and designed an experience retail associates could trust.",
      "The result reduced task time by 75% and established a foundation for AI-powered workflows across the platform.",
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
      "At Mad Mobile, I led the transformation of the Concierge platform for retailers including Ralph Lauren, Urban Outfitters, and Pandora, modernizing a stagnant clienteling experience.",
      "From strategy through launch, I defined the system model, guided other designers, and established a scalable foundation future experiences could build on.",
      "The redesign secured contract renewals, increased customer satisfaction by 10%, and renewed confidence from brands considering leaving the platform.",
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
