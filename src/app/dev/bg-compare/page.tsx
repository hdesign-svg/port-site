import type { Metadata } from "next";

import { BgCompareLab } from "@/components/portfolio/BgCompareLab";

export const metadata: Metadata = {
  title: "Background compare — dev",
  robots: { index: false, follow: false },
};

export default function BgComparePage() {
  return <BgCompareLab />;
}
