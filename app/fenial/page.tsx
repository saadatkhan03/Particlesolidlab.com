import type { Metadata } from "next";
import { ProjectPage } from "../components/project-page";

export const metadata: Metadata = {
  title:
    "Morphological Effect of Microstructures on Anti-irradiation Tolerance of FeNiAl Superlattice Alloys",
  description:
    "Collision-cascade and defect-evolution modelling of FeNiAl nanoprecipitate alloys for radiation-tolerant nuclear and fusion materials.",
  alternates: { canonical: "/fenial" },
  openGraph: {
    title:
      "Morphological Effect of Microstructures on Anti-irradiation Tolerance of FeNiAl Superlattice Alloys",
    description:
      "How nanoprecipitate geometry reshapes primary radiation damage and defect evolution.",
    url: "/fenial",
  },
};

export default function FeNiAlPage() {
  return <ProjectPage slug="fenial" />;
}
