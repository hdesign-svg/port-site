import Link from "next/link";
import { site } from "@/data/site";

const linkClassName =
  "nav-link text-[13px] leading-5 text-fg-muted hover:text-fg";

export function NavLinks() {
  return (
    <nav
      aria-label="Site navigation"
      className="flex flex-col items-start gap-1 text-[13px] leading-5 text-fg-muted"
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
    </nav>
  );
}
