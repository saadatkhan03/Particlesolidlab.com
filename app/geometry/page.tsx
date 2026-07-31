import type { Metadata } from "next";
import { ProjectPage } from "../components/project-page";

export const metadata: Metadata = {
  title: "3D Geometry Construction for Particle Transport",
  description:
    "Gmsh, Python, and finite-element triangular-mesh workflows for complex nanostructures in Monte Carlo transport simulation.",
  alternates: { canonical: "/geometry" },
  openGraph: {
    title: "3D Geometry Construction for Particle Transport",
    description:
      "From experimental morphology to full-3D simulation-ready geometry.",
    url: "/geometry",
  },
};

export default function GeometryPage() {
  return <ProjectPage slug="geometry" />;
}

