import type { Metadata } from "next";

import "@/design-system/portfolio-app.css";
import "./portfolio.css";
import { site } from "@/data/site";
import { scrollInitScript } from "@/lib/scroll";
import { themeInitScript } from "@/lib/theme";

export const metadata: Metadata = {
  title: `${site.name} — ${site.title}`,
  description: site.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" data-theme="dark" suppressHydrationWarning>
      <body className="portfolio min-h-full">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script dangerouslySetInnerHTML={{ __html: scrollInitScript }} />
        {children}
      </body>
    </html>
  );
}
