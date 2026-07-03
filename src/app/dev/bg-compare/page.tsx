import type { Metadata } from "next";

import { BgCompareLab } from "@/components/portfolio/BgCompareLab";

export const metadata: Metadata = {
  title: "Background compare — dev",
  robots: { index: false, follow: false },
};

/* Load the serif candidates via <link> — a CSS @import gets stripped by
 * Tailwind v4 / Lightning CSS, so the fonts never fetched. React hoists
 * these into <head>. Families listed alphabetically per the Google Fonts API. */
export default function BgComparePage() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,400;0,14..32,500;0,14..32,600;1,14..32,400&family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;1,6..72,300;1,6..72,400&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,500;1,8..60,400&family=Spectral:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&display=swap"
      />
      <BgCompareLab />
    </>
  );
}
