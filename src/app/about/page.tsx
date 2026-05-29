import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/site";
import { NavLinks } from "@/components/NavLinks";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: `About — ${site.name}`,
  description: `About ${site.name}, ${site.title}.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-[960px] flex-1 px-6 pt-24 lg:px-0">
      <header className="flex flex-col gap-8 border-b border-border pb-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="text-sm leading-[22px] text-fg-muted transition-colors hover:text-fg"
          >
            ← Work
          </Link>
          <div className="flex flex-col gap-4">
            <Image
              src="/images/profile.jpg"
              alt=""
              width={40}
              height={40}
              className="size-10 rounded-full object-cover"
            />
            <div>
              <h1 className="text-[15px] leading-6 text-fg">{site.name}</h1>
              <p className="text-sm leading-[22px] text-fg-muted">
                {site.title}
              </p>
            </div>
          </div>
        </div>
        <NavLinks />
      </header>

      <article className="flex flex-col gap-6 border-b border-border py-12">
        <p className="max-w-[640px] text-[19px] font-medium leading-[30px] text-fg">
          I design product systems that hold up under real-world complexity —
          from strategy and research through delivery.
        </p>
        <div className="flex max-w-[640px] flex-col gap-6 text-[15px] leading-6 text-fg">
          <p>
            Over eight years, I&apos;ve worked across B2B SaaS, retail, and
            mobile — often as the designer bridging product strategy, design
            systems, and engineering.
          </p>
          <p>
            I think in objects and relationships (OOUX), care deeply about
            craft, and believe the best interfaces disappear into the work
            people are trying to do.
          </p>
          <p>
            Currently open to senior product design roles and select freelance
            projects. Reach out at{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-fg-muted transition-colors hover:text-fg"
            >
              {site.email}
            </a>
            .
          </p>
        </div>
      </article>

      <Footer />
    </div>
  );
}
