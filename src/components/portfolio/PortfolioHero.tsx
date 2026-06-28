import Image from "next/image";

import { PortfolioThemeToggle } from "@/components/portfolio/PortfolioThemeToggle";
import { TextLink } from "@/design-system/components/TextLink";
import { site } from "@/data/site";

function IdentityBlock() {
  return (
    <div className="portfolio__identity">
      <Image
        src="/images/profile.jpg"
        alt=""
        width={40}
        height={40}
        className="portfolio__avatar"
        priority
      />
      <div className="ds-type-stack">
        <p className="ds-type-strong">{site.name}</p>
        <p className="ds-type-subtle">{site.title}</p>
      </div>
    </div>
  );
}

export function PortfolioHero() {
  return (
    <header className="portfolio__hero">
      <div className="portfolio__hero-mobile-bar">
        <IdentityBlock />
        <PortfolioThemeToggle />
      </div>

      <div className="portfolio__hero-rail">
        <IdentityBlock />
      </div>

      <div className="portfolio__hero-body">
        <div className="portfolio__hero-body-row">
          <div className="ds-type-stack">
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
          <PortfolioThemeToggle />
        </div>
      </div>
    </header>
  );
}
