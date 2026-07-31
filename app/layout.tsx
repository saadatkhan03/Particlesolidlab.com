import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SiteFooter, SiteHeader } from "./components/site-shell";
import "./globals.css";

const siteUrl = "https://www.particlesolidlab.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Particle Solid Lab · Computational Particle Transport & Radiation Damage",
    template: "%s · Particle Solid Lab",
  },
  description:
    "Monte Carlo methods, scientific software, and multiscale simulation for electron-solid interaction, ion irradiation, semiconductor metrology, and radiation-tolerant materials.",
  applicationName: "Particle Solid Lab",
  authors: [{ name: "Dr. Muhammad Saadat Shakoor Khan", url: siteUrl }],
  creator: "Dr. Muhammad Saadat Shakoor Khan",
  publisher: "Particle Solid Lab",
  alternates: { canonical: "/" },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Particle Solid Lab",
    title:
      "Particle Solid Lab · Computational Particle Transport & Radiation Damage",
    description:
      "Monte Carlo methods, scientific software, and multiscale simulation for electron-solid interaction, ion irradiation, semiconductor metrology, and radiation-tolerant materials.",
    images: [
      {
        url: "/og.png",
        width: 1536,
        height: 1024,
        alt: "Particle Solid Lab — computational models for particle transport and radiation damage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Particle Solid Lab · Computational Particle Transport & Radiation Damage",
    description:
      "Monte Carlo methods, scientific software, and multiscale simulation for electron-solid interaction, ion irradiation, semiconductor metrology, and radiation-tolerant materials.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#0a2540",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dr. Muhammad Saadat Shakoor Khan",
  url: siteUrl,
  image: `${siteUrl}/assets/img/profile.jpg`,
  email: "mailto:mkhan@theory.issp.ac.cn",
  jobTitle: "Postdoctoral Researcher",
  affiliation: {
    "@type": "Organization",
    name: "Institute of Solid State Physics, Hefei Institutes of Physical Science, Chinese Academy of Sciences",
    url: "http://english.issp.cas.cn/",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Science and Technology of China",
  },
  description:
    "Computational physicist specialising in Monte Carlo simulation of electron and ion transport in solids, radiation damage, uncertainty quantification, and scientific software.",
  sameAs: [
    "https://orcid.org/0000-0001-7723-2887",
    "https://scholar.google.com/citations?user=kneeK7cAAAAJ",
    "https://www.researchgate.net/profile/Saadat-Khan-2",
  ],
  knowsAbout: [
    "Monte Carlo simulation",
    "Particle–solid interaction",
    "Electron transport",
    "Ion irradiation",
    "Radiation materials science",
    "Uncertainty quantification",
    "Scientific computing",
    "IM3D",
    "MMonCa",
    "Gmsh",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
