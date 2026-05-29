import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="py-12">
      <p className="text-sm leading-[22px] text-fg-muted">
        © {new Date().getFullYear()} {site.name}.{" "}
        <a
          href={`mailto:${site.email}`}
          className="transition-colors hover:text-fg"
        >
          {site.email}
        </a>
      </p>
    </footer>
  );
}
