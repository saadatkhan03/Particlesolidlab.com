import type { Metadata } from "next";
import { ProjectPage } from "../components/project-page";

export const metadata: Metadata = {
  title: "IM3D Ion-Irradiation Simulation",
  description:
    "IM3D ion-irradiation workflows, primary-damage datasets, user-guide contributions, and coupling to CRT and MMonCa.",
  alternates: { canonical: "/im3d" },
  openGraph: {
    title: "IM3D Ion-Irradiation Simulation",
    description:
      "From 3D ion transport and damage profiles to longer-time defect evolution.",
    url: "/im3d",
  },
};

export default function IM3DPage() {
  return <ProjectPage slug="im3d" />;
}

