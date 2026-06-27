import { ThemeToggle } from "@/components/lab/ThemeToggle";
import { TextLink } from "@/design-system/components/TextLink";
import { site } from "@/data/site";

export function PortfolioHero() {
  return (
    <header className="portfolio-v2__hero">
      <div className="portfolio-v2__hero-top">
        <div className="ds-type-stack">
          <p className="ds-type-strong">{site.name}</p>
          <p className="ds-type-subtle">{site.title}</p>
        </div>
        <ThemeToggle />
      </div>

      <div className="ds-type-stack">
        <p className="ds-type-body">{site.tagline}</p>
        <p className="ds-type-muted">
          Previously at Housecall Pro, Mad Mobile, and Ibotta.
        </p>
      </div>

      <div className="portfolio-v2__links">
        <TextLink href={site.linkedin} external>
          LinkedIn
        </TextLink>
        <TextLink href={site.resume} external>
          Resume
        </TextLink>
      </div>
    </header>
  );
}
