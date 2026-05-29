import { Hero } from "@/components/Hero";
import { ProjectSection } from "@/components/ProjectSection";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-[960px] flex-1 px-6 pt-24 lg:px-0">
      <Hero />
      <div className="flex flex-col gap-12 pt-12">
        {projects.map((project) => (
          <ProjectSection key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
