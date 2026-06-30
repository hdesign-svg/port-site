import Image from "next/image";

import { TextLink } from "@/design-system/components/TextLink";
import { site } from "@/data/site";

export function PortfolioHero() {
  return (
    <section className="portfolio__hero">
      <div className="portfolio__hero-bar">
        <div className="portfolio__hero-identity-row">
          <Image
            src="/images/profile.jpg"
            alt=""
            width={40}
            height={40}
            className="portfolio__avatar"
            priority
          />
          <p className="ds-type-strong">{site.name}</p>
          <p className="ds-type-subtle">{site.title}</p>
        </div>

        <div className="portfolio__links">
          <TextLink href={site.linkedin} external>
            LinkedIn
          </TextLink>
          <TextLink href={site.resume} external>
            Resume
          </TextLink>
        </div>
      </div>

      <div className="portfolio__hero-blurb ds-type-stack">
        {site.heroBody.map((paragraph) => (
          <p key={paragraph} className="ds-type-body">
            {paragraph}
          </p>
        ))}
        <p className="ds-type-muted">{site.previousRoles}</p>
      </div>

      <hr className="portfolio__divider" />
    </section>
  );
}
