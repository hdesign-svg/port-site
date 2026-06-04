import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { HcpMuiProvider } from "@/components/prototypes/hcp/HcpMuiProvider";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function HcpPrototypesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={openSans.className}>
      <HcpMuiProvider>{children}</HcpMuiProvider>
    </div>
  );
}
