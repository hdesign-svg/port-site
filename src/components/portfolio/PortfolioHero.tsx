import Image from "next/image";

import { PortfolioThemeToggle } from "@/components/portfolio/PortfolioThemeToggle";
import { TextLink } from "@/design-system/components/TextLink";
import { site } from "@/data/site";

export function PortfolioHero() {
  return (
    <section className="portfolio__hero">
      <header className="portfolio__hero-header">
        <div className="portfolio__hero-identity">
          <Image
            src="/images/profile.jpg"
            alt=""
            width={40}
            height={40}
            className="portfolio__avatar"
            priority
          />
          <div className="portfolio__hero-names">
            <p className="ds-type-strong">{site.name}</p>
            <p className="ds-type-subtle">{site.title}</p>
          </div>
        </div>

        <PortfolioThemeToggle />
      </header>

      <hr className="portfolio__divider" />

      <div className="portfolio__hero-blurb ds-type-stack">
        {site.heroBody.map((paragraph) => (
          <p key={paragraph} className="ds-type-body">
            {paragraph}
          </p>
        ))}
        <p className="ds-type-muted">{site.previousRoles}</p>
        <div className="portfolio__links">
          <TextLink href={site.linkedin} external>
            LinkedIn
          </TextLink>
          <TextLink href={site.resume} external>
            Resume
          </TextLink>
        </div>
      </div>

      <hr className="portfolio__divider" />
    </section>
  );
}
