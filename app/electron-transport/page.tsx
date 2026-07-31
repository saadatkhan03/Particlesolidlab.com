import type { Metadata } from "next";
import { ProjectPage } from "../components/project-page";

export const metadata: Metadata = {
  title: "Electron Transport, Scattering & Emission",
  description:
    "Monte Carlo electron transport, ELSEPA-derived Mott elastic cross sections, energy-loss functions, backscattering, and secondary-electron emission.",
  alternates: { canonical: "/electron-transport" },
  openGraph: {
    title: "Electron Transport, Scattering & Emission",
    description:
      "Physics libraries and Monte Carlo studies from bulk solids to nanostructures.",
    url: "/electron-transport",
  },
};

export default function ElectronTransportPage() {
  return <ProjectPage slug="electron-transport" />;
}
