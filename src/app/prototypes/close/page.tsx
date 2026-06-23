import { DM_Sans, Fraunces } from "next/font/google";
import type { Metadata } from "next";
import { CloseApp } from "@/components/prototypes/close/CloseApp";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Close · Self-serve accounting prototype",
  description: "Experimental accounting UX — isolated from HCP design system",
};

export default function ClosePrototypePage() {
  return (
    <div className={`${fraunces.variable} ${dmSans.variable} font-[family-name:var(--font-dm-sans)]`}>
      <CloseApp />
    </div>
  );
}
