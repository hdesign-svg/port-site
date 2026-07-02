import Image from "next/image";

import { PortfolioCopy } from "@/components/portfolio/PortfolioCopy";
import { TextLink } from "@/design-system/components/TextLink";
import { site } from "@/data/site";

export function PortfolioHero() {
  return (
    <section className="portfolio__section portfolio__hero">
      <div className="portfolio__section-inner">
        <div className="portfolio__copy">
          <header className="portfolio__hero-header">
            <Image
              src="/images/profile.jpg"
              alt=""
              width={36}
              height={36}
              className="portfolio__avatar"
              priority
            />
            <p className="ds-type-lg">{site.name}</p>
          </header>

          <div className="portfolio__hero-blurb ds-type-stack--sectioned">
            <div className="ds-type-stack">
              {site.heroBody.map((paragraph) => (
                <p key={paragraph} className="ds-type-md">
                  <PortfolioCopy text={paragraph} />
                </p>
              ))}
              <p className="ds-type-md">
                I&apos;ve brought that approach to{" "}
                {site.heroEmployers.map((employer, index) => {
                  const isLast = index === site.heroEmployers.length - 1;
                  const isSecondToLast =
                    index === site.heroEmployers.length - 2;
                  const separator =
                    isLast
                      ? null
                      : isSecondToLast
                        ? site.heroEmployers.length === 2
                          ? " and "
                          : ", and "
                        : ", ";

                  return (
                    <span key={employer.name}>
                      <TextLink href={employer.href} external>
                        {employer.name}
                      </TextLink>
                      {separator}
                    </span>
                  );
                })}
                <PortfolioCopy text={site.heroExperienceTail} />
              </p>
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
        </div>
      </div>
    </section>
  );
}
