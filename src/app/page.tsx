import { BackToTop } from "@/components/lab/BackToTop";
import { LabHero } from "@/components/lab/LabHero";
import { LabProject } from "@/components/lab/LabProject";
import { PageBackdrop, type BackdropVariant } from "@/components/lab/PageBackdrop";
import { projects } from "@/data/projects";

type HomeProps = {
  searchParams: Promise<{ bg?: string }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const { bg } = await searchParams;
  const variant: BackdropVariant =
    bg === "margin-grid" ||
    bg === "hero-wash" ||
    bg === "noise" ||
    bg === "dots"
      ? bg
      : "none";

  return (
    <>
      <PageBackdrop variant={variant}>
        <main>
          <div className="border-x border-border">
            {variant === "hero-wash" ? (
              <div className="hero-wash-band">
                <LabHero />
              </div>
            ) : (
              <LabHero />
            )}

            {projects.map((project, index) => (
              <LabProject key={project.id} project={project} index={index} />
            ))}
          </div>
        </main>
      </PageBackdrop>
      <BackToTop />
    </>
  );
}
