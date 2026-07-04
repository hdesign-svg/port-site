"use client";

import { useState } from "react";

import { portfolioRevealStyle } from "@/components/portfolio/portfolioReveal";
import { testimonials } from "@/data/site";

/** Long quotes collapse to this many lines until expanded. */
const CLAMP_MIN_CHARS = 160;

type PortfolioTestimonialsProps = {
  revealOffset?: number;
};

export function PortfolioTestimonials({
  revealOffset = 0,
}: PortfolioTestimonialsProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <section
      id="testimonials"
      className="portfolio__section portfolio__testimonials"
      aria-label="Endorsements"
    >
      <div className="portfolio__section-inner">
        <h2
          className="ds-type-lg portfolio__testimonials-heading portfolio__reveal"
          style={portfolioRevealStyle(revealOffset)}
        >
          Endorsements
        </h2>

        <div className="portfolio__quotes">
          {testimonials.map((testimonial, index) => {
            const isOpen = expanded.has(testimonial.id);
            const expandable = testimonial.quote.length > CLAMP_MIN_CHARS;

            return (
              <div
                key={testimonial.id}
                className="portfolio__quote portfolio__reveal"
                data-expanded={isOpen}
                style={portfolioRevealStyle(revealOffset + 1 + index)}
                role={expandable ? "button" : undefined}
                tabIndex={expandable ? 0 : undefined}
                aria-expanded={expandable ? isOpen : undefined}
                onClick={expandable ? () => toggle(testimonial.id) : undefined}
                onKeyDown={
                  expandable
                    ? (event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          toggle(testimonial.id);
                        }
                      }
                    : undefined
                }
              >
                <p className="ds-type-md portfolio__quote-text">
                  {testimonial.quote}
                </p>
                <div className="portfolio__quote-attr">
                  <span className="ds-type-sm portfolio__quote-name">
                    {testimonial.name}
                  </span>
                  <span className="ds-type-sm portfolio__quote-role">
                    {testimonial.role}
                  </span>
                </div>
                {expandable && !isOpen ? (
                  <span className="ds-type-sm portfolio__quote-more">
                    Read more
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
