import Image from "next/image";
import { site } from "@/data/site";
import { NavLinks } from "@/components/NavLinks";

export function Hero() {
  return (
    <header className="flex flex-col gap-8 border-b border-border pb-12 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex max-w-[405px] flex-col gap-6">
        <div className="flex flex-col gap-4">
          <Image
            src="/images/profile.jpg"
            alt=""
            width={40}
            height={40}
            className="size-10 rounded-full object-cover"
            priority
          />
          <div>
            <p className="text-[15px] leading-6 text-fg">{site.name}</p>
            <p className="text-sm leading-[22px] text-fg-muted">{site.title}</p>
          </div>
        </div>
        <p className="text-[19px] font-medium leading-[30px] text-fg">
          {site.tagline}
        </p>
      </div>
      <NavLinks />
    </header>
  );
}
