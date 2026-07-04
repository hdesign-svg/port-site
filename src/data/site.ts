export const site = {
  name: "Harry Howe",
  title: "Product Designer",
  tagline:
    "Designed for web and mobile for 8 years. Systems under the hood, experiences people can trust.",
  heroBody: [
    "I'm a product designer, 8 years in. I've worked across fintech, retail, the trades, and personal projects. No matter the domain, I take complexity and make experiences feel predictable, connected, and valuable.",
    "I specialize in modeling systems and refining interfaces. I start with what's under the hood. When the foundation is right, the interface becomes a reflection of the way people naturally think.",
  ],
  heroEmployers: [
    { name: "Housecall Pro", href: "https://www.housecallpro.com" },
    { name: "Mad Mobile", href: "https://www.madmobile.com" },
  ],
  heroExperienceTail:
    ", leading 0 → 1 initiatives, redesigning platforms, and shaping agent experiences.",
  linkedin: "https://www.linkedin.com/in/harry-howe-5102baa1/",
  resume: "/resume.pdf",
  email: "hello@harryhowe.com",
} as const;

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
};

/* Placeholder recommendations — swap with the 7 real ones from LinkedIn. Kept
 * varied in length so the expand-inline interaction has short and long cases. */
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Harry is one of the most complete product designers I've worked with. He moves fluidly between systems thinking and craft, and he has a rare ability to take a genuinely ambiguous problem and return with a direction the whole team can rally behind. He raised the bar for design at our company and everyone around him got better for it.",
    name: "Alex Rivera",
    role: "VP Product, Housecall Pro",
  },
  {
    id: "t2",
    quote:
      "Working with Harry felt like adding a co-founder, not a contractor. He owned the outcome end to end.",
    name: "Jordan Lee",
    role: "CEO & Cofounder, Mad Mobile",
  },
  {
    id: "t3",
    quote:
      "He redesigned our activation flow and the numbers spoke for themselves. But what stuck with me was the process — he modeled the underlying system first, pressure-tested it with real users, and only then touched the interface. That discipline is why the work held up long after launch and became the pattern we reused across the platform.",
    name: "Sam Patel",
    role: "Group PM, Housecall Pro",
  },
  {
    id: "t4",
    quote:
      "Harry has impeccable taste and the engineering fluency to back it up. He speaks our language.",
    name: "Morgan Chen",
    role: "Staff Engineer, Mad Mobile",
  },
  {
    id: "t5",
    quote:
      "I've hired a lot of designers and Harry is in the top percentile. He's decisive, he's kind, and he's relentlessly focused on what actually moves the business. He pushed back on us when we were wrong and brought the data to prove it. I'd work with him again in a heartbeat, and I've recommended him to every founder I know.",
    name: "Taylor Brooks",
    role: "Founder, Retail Collective",
  },
  {
    id: "t6",
    quote:
      "The clearest systems thinker on the team. Harry made complex flows feel obvious and calm.",
    name: "Riley Nguyen",
    role: "Design Lead, Housecall Pro",
  },
  {
    id: "t7",
    quote:
      "Harry joined to fix one feature and ended up reshaping how we think about the whole product. He has that effect — his questions are better than most people's answers. Thoughtful, fast, and completely trustworthy with the hardest problems we had.",
    name: "Casey Morgan",
    role: "Head of Product, Concierge",
  },
];
