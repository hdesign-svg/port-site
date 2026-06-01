import Image from "next/image";
import { Suspense } from "react";
import { site } from "@/data/site";
import { ThemeToggle } from "@/components/lab/ThemeToggle";

export function LabHero() {
  return (
    <section className="border-b border-border">
      <div className="p-[1.5rlh]">
        <div className="mb-[1.5rlh] flex items-center justify-between gap-[1rlh]">
          <div className="flex min-w-0 items-center gap-[1rlh]">
            <Image
              src="/images/profile.jpg"
              alt=""
              width={40}
              height={40}
              className="size-10 shrink-0 rounded-full object-cover"
              priority
            />
            <div className="flex min-w-0 flex-col">
              <p className="font-[650] text-fg-strong">{site.name}</p>
              <p className="text-fg-muted">{site.title}</p>
            </div>
          </div>
          <Suspense fallback={null}>
            <ThemeToggle />
          </Suspense>
        </div>

        <div className="max-w-[40em] [&_p:not(:last-child)]:mb-[1rlh]">
          <p>I&apos;ve designed for web and mobile for 8 years.</p>
          <p>
            My approach to craft starts with what&apos;s under the hood. I care
            deeply about creating the systems and models that shape a product
            and translating them into experiences people can understand and
            trust.
          </p>
          <p>
            I&apos;m passionate about helping products reflect the way people
            already think.
          </p>
          <p className="text-fg-muted">
            Previously at Housecall Pro, Mad Mobile, and Ibotta.
          </p>
          <div className="mt-[1.5rlh] flex flex-wrap gap-x-[1.5rlh] gap-y-[0.5rlh]">
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="link-highlight"
            >
              LinkedIn
            </a>
            <a
              href={site.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="link-highlight"
            >
              Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
