import Image from "next/image";
import { Suspense } from "react";
import { site } from "@/data/site";
import { ThemeToggle } from "@/components/lab/ThemeToggle";

function ThemeToggleSlot() {
  return (
    <Suspense fallback={null}>
      <ThemeToggle />
    </Suspense>
  );
}

function IdentityBlock() {
  return (
    <div className="flex min-w-0 items-center gap-[0.75rlh]">
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
  );
}

function HeroBody() {
  return (
    <div className="min-w-0 flex-1 [&_p:not(:last-child)]:mb-[0.75rlh]">
      <p>I&apos;ve designed for web and mobile for 8 years.</p>
      <p>
        My approach to craft starts with what&apos;s under the hood. I care
        deeply about creating the systems and models that shape a product and
        translating them into experiences people can understand and trust.
      </p>
      <p>
        I&apos;m passionate about helping products reflect the way people
        already think.
      </p>
      <p className="text-fg-muted">
        Previously at Housecall Pro, Mad Mobile, and Ibotta.
      </p>
      <div className="mt-[1rlh] flex flex-wrap gap-x-[0.75rlh] gap-y-[0.5rlh]">
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
  );
}

export function LabHero() {
  return (
    <section className="grid grid-cols-1 border-b border-border lg:grid-cols-[var(--rail-left)_1fr]">
      {/* Mobile — identity + toggle */}
      <div className="flex items-start justify-between gap-[1rlh] border-b border-border p-[1.5rlh] lg:hidden">
        <IdentityBlock />
        <div className="hero-copy-toggle flex shrink-0 items-center lg:hidden">
          <ThemeToggleSlot />
        </div>
      </div>

      {/* Desktop — left rail identity */}
      <div className="hidden border-border lg:block lg:border-r">
        <div className="flex items-center gap-[1rlh] p-[1.5rlh]">
          <IdentityBlock />
        </div>
      </div>

      {/* Body + toggle — toggle aligned to first line of copy */}
      <div className="p-[1.5rlh] lg:col-start-2 lg:row-start-1">
        <div className="flex items-start justify-between gap-[1rlh]">
          <HeroBody />
          <div className="hero-copy-toggle max-lg:hidden flex shrink-0 items-center">
            <ThemeToggleSlot />
          </div>
        </div>
      </div>
    </section>
  );
}
