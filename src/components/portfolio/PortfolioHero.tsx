import Image from "next/image";

import { PortfolioCopy } from "@/components/portfolio/PortfolioCopy";
import { portfolioRevealStyle } from "@/components/portfolio/portfolioReveal";
import { TextLink } from "@/design-system/components/TextLink";
import { site } from "@/data/site";

type PortfolioHeroProps = {
  revealOffset?: number;
};

export function PortfolioHero({ revealOffset = 0 }: PortfolioHeroProps) {
  return (
    <section className="portfolio__section portfolio__hero">
      <div className="portfolio__section-inner">
        <div className="portfolio__copy">
          <header className="portfolio__hero-header">
            <div
              className="portfolio__hero-mark portfolio__reveal"
              style={portfolioRevealStyle(revealOffset)}
            >
              <Image
                src="/images/profile.jpg"
                alt=""
                width={36}
                height={36}
                className="portfolio__avatar"
                priority
              />
            </div>
            <p
              className="ds-type-lg portfolio__reveal"
              style={portfolioRevealStyle(revealOffset + 1)}
            >
              {site.name}
            </p>
          </header>

          <div className="portfolio__hero-blurb ds-type-stack--sectioned">
            <div className="ds-type-stack">
              {site.heroBody.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className="ds-type-md portfolio__reveal"
                  style={portfolioRevealStyle(revealOffset + 2 + index)}
                >
                  <PortfolioCopy text={paragraph} />
                </p>
              ))}
              <p
                className="ds-type-md portfolio__reveal"
                style={portfolioRevealStyle(revealOffset + 2 + site.heroBody.length)}
              >
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
            <div
              className="portfolio__links portfolio__reveal"
              style={portfolioRevealStyle(
                revealOffset + 2 + site.heroBody.length + 1,
              )}
            >
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
