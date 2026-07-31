import type { Metadata } from "next";
import { ProjectPage } from "../components/project-page";

export const metadata: Metadata = {
  title: "Monte Carlo Uncertainty Quantification for CD-SEM",
  description:
    "Systematic uncertainty quantification across 17,280 physical-model combinations for trustworthy Monte Carlo semiconductor metrology.",
  alternates: { canonical: "/uncertainty" },
  openGraph: {
    title: "Monte Carlo Uncertainty Quantification for CD-SEM",
    description:
      "Separating model-form uncertainty from statistical noise in simulation-based metrology.",
    url: "/uncertainty",
  },
};

export default function UncertaintyPage() {
  return <ProjectPage slug="uncertainty" />;
}

