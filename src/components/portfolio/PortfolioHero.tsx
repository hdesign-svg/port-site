import Image from "next/image";

import { PortfolioThemeToggle } from "@/components/portfolio/PortfolioThemeToggle";
import { TextLink } from "@/design-system/components/TextLink";
import { site } from "@/data/site";

export function PortfolioHero() {
  return (
    <section className="portfolio__hero">
      <div className="portfolio__grid">
        <div className="portfolio__grid-col portfolio__hero-inner">
          <hr className="portfolio__divider" />

          <header className="portfolio__hero-header portfolio__hero-band portfolio__hero-band--tight">
            <div className="portfolio__hero-identity">
              <Image
                src="/images/profile.jpg"
                alt=""
                width={36}
                height={36}
                className="portfolio__avatar"
                priority
              />
              <div className="portfolio__hero-names ds-type-identity">
                <p className="ds-type-strong">{site.name}</p>
                <p className="ds-type-subtle">{site.title}</p>
              </div>
            </div>

            <PortfolioThemeToggle />
          </header>

          <hr className="portfolio__divider" />

          <div className="portfolio__hero-blurb ds-type-stack--sectioned">
            <div className="ds-type-stack">
              {site.heroBody.map((paragraph) => (
                <p key={paragraph} className="ds-type-body">
                  {paragraph}
                </p>
              ))}
            </div>
            <p className="ds-type-body">{site.previousRoles}</p>
            <div className="portfolio__links">
              <TextLink href={site.linkedin} external>
                LinkedIn
              </TextLink>
              <TextLink href={site.resume} external>
                Resume
              </TextLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
