import { BackToTop } from "@/components/lab/BackToTop";
import { LabHomeMainFromQuery } from "@/components/lab/LabHomeMain";

export default function Home() {
  return (
    <>
      <LabHomeMainFromQuery />
      <BackToTop />
    </>
  );
}
