import Link from "next/link";
import { site } from "@/data/site";

const linkClassName =
  "text-sm leading-[22px] text-fg-muted transition-colors hover:text-fg";

export function NavLinks() {
  return (
    <nav
      aria-label="Site navigation"
      className="flex flex-col items-start gap-1 text-sm leading-[22px] text-fg-muted"
    >
      <Link href="/about" className={linkClassName}>
        About
      </Link>
      <a
        href={site.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        LinkedIn ↗
      </a>
      <a
        href={site.resume}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        Resume ↗
      </a>
    </nav>
  );
}
