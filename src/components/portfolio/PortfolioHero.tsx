import Image from "next/image";

import { TextLink } from "@/design-system/components/TextLink";
import { site } from "@/data/site";

export function PortfolioHero() {
  return (
    <section className="portfolio__section portfolio__hero">
      <div className="portfolio__section-inner">
        <div className="portfolio__copy">
          <header className="portfolio__hero-header">
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
                <p className="ds-type-lg">{site.name}</p>
              </div>
            </div>
          </header>

          <div className="portfolio__hero-blurb ds-type-stack--sectioned">
            <div className="ds-type-stack">
              {site.heroBody.map((paragraph) => (
                <p key={paragraph} className="ds-type-md">
                  {paragraph}
                </p>
              ))}
            </div>
            <p className="ds-type-md">{site.previousRoles}</p>
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
