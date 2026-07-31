export type NavItem = {
  label: string;
  href: string;
  emphasis?: boolean;
};

export type ResearchArea = {
  id: string;
  index: string;
  title: string;
  summary: string;
  tags: readonly string[];
  gateways: readonly { label: string; href: string }[];
};

export type Publication = {
  id: string;
  title: string;
  year: number;
  venue: string;
  authors: readonly string[];
  doi: string;
  pdf: string;
  topics: readonly string[];
  selected?: boolean;
};

export type Figure = {
  src: string;
  alt: string;
  caption: string;
  eyebrow?: string;
};

export type RelatedWork = {
  title: string;
  authors?: readonly string[];
  year?: number;
  status: "under review" | "in preparation";
};

export type ProjectSlug =
  | "fenial"
  | "geometry"
  | "uncertainty"
  | "electron-transport"
  | "im3d";

export type ProjectPage = {
  slug: ProjectSlug;
  title: string;
  shortTitle: string;
  eyebrow: string;
  summary: string;
  goal: readonly string[];
  method: readonly string[];
  results: readonly string[];
  figures: readonly Figure[];
  publicationIds: readonly string[];
  relatedWork?: RelatedWork;
  fundingGrantIds: readonly string[];
  animationIds: readonly string[];
  nextProject: ProjectSlug;
};

export type SoftwareTool = {
  id: string;
  name: string;
  category:
    | "simulation"
    | "physics library"
    | "workflow"
    | "geometry"
    | "data";
  description: string;
  technologies: readonly string[];
};

export type Guide = {
  id: string;
  title: string;
  subtitle: string;
  year: number;
  version?: string;
  pdf: string;
  citation: string;
};

export type Grant = {
  id: string;
  title: string;
  role: "Principal Investigator" | "Participant / Co-Investigator";
  agency: string;
  grantNumber: string;
  period?: string;
  amountCny: number;
  amountUsdApprox: number;
};

export type EducationEntry = {
  degree: string;
  institution: string;
  location: string;
  period: string;
  focus: string;
  award?: string;
  logo: string;
};

export type Conference = {
  year: number;
  format: string;
  name: string;
  location?: string;
  description: string;
};

export type Recognition = {
  id: string;
  type: "award" | "poster" | "certificate" | "contribution";
  title: string;
  description: string;
  meta: string;
  image: string;
};

export type Photo = {
  src: string;
  alt: string;
  title: string;
  caption: string;
};

export type CollaborationMode = {
  title: string;
  description: string;
};

export type MentoringService = {
  title: string;
  description: string;
};

export const nav = [
  { label: "Research", href: "/research" },
  { label: "Publications", href: "/publications" },
  { label: "Software", href: "/software" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Mentoring", href: "/mentoring", emphasis: true },
] as const satisfies readonly NavItem[];

export const researchAreas = [
  {
    id: "particle-solid",
    index: "01",
    title: "Monte Carlo Particle–Solid Simulation",
    summary:
      "Monte Carlo models of how electrons and ions travel, scatter, and deposit energy inside solids, with uncertainty quantified alongside the prediction.",
    tags: [
      "Electron transport",
      "Ion–solid interactions",
      "Cross sections",
      "Uncertainty quantification",
    ],
    gateways: [
      { label: "Electron transport", href: "/electron-transport" },
      { label: "Uncertainty", href: "/uncertainty" },
    ],
  },
  {
    id: "radiation-materials",
    index: "02",
    title: "Radiation Materials Science",
    summary:
      "Modelling collision cascades, primary damage, and defect evolution to understand how alloys survive irradiation in nuclear, fusion, and space environments.",
    tags: [
      "Primary damage",
      "Collision cascades",
      "Defect evolution",
      "FeNiAl superlattices",
    ],
    gateways: [
      { label: "FeNiAl alloy design", href: "/fenial" },
      { label: "IM3D", href: "/im3d" },
    ],
  },
  {
    id: "software-hpc",
    index: "03",
    title: "Scientific Software & HPC",
    summary:
      "Simulation, meshing, and coupling workflows in C++, Fortran, Python, and MPI for complex three-dimensional material geometries.",
    tags: ["IM3D", "MMonCa", "CRT", "Gmsh", "MPI"],
    gateways: [
      { label: "Software", href: "/software" },
      { label: "3D geometry", href: "/geometry" },
      { label: "IM3D", href: "/im3d" },
    ],
  },
  {
    id: "data-driven",
    index: "04",
    title: "Machine Learning for Simulation Data",
    summary:
      "Manifold learning, Gaussian-process kernels, denoising, and surrogate methods used to analyse scientific data and reduce simulation cost.",
    tags: [
      "Manifold learning",
      "Isomap",
      "Gaussian-process kernels",
      "Surrogate models",
    ],
    gateways: [
      { label: "Uncertainty", href: "/uncertainty" },
      { label: "Related publications", href: "/publications" },
    ],
  },
] as const satisfies readonly ResearchArea[];

export const publications = [
  {
    id: "germanium-emission-2025",
    title: "Monte Carlo study of the electron emission yields of germanium",
    year: 2025,
    venue: "Journal of Applied Physics",
    authors: [
      "H. I. Imtiaz",
      "Y. B. Zou",
      "S. F. Mao",
      "M. S. S. Khan",
      "Z. J. Ding",
    ],
    doi: "https://doi.org/10.1063/5.0251814",
    pdf: "/papers/imtiaz-khan-2025-germanium-emission-jap.pdf",
    topics: ["electron transport", "electron emission", "germanium"],
    selected: true,
  },
  {
    id: "extended-isomap-2024",
    title:
      "An Extended-Isomap for high-dimensional data accuracy and efficiency: a comprehensive survey",
    year: 2024,
    venue: "Multimedia Tools and Applications",
    authors: ["M. Yousaf", "M. S. S. Khan", "S. Ullah"],
    doi: "https://doi.org/10.1007/s11042-024-19917-y",
    pdf: "/papers/yousaf-khan-2024-extended-isomap-mta.pdf",
    topics: ["machine learning", "manifold learning", "Isomap"],
  },
  {
    id: "crcopd-backscattering-2024",
    title:
      "Electron backscattering coefficients for Cr, Co, and Pd solids: a Monte Carlo study",
    year: 2024,
    venue: "Journal of Applied Physics",
    authors: [
      "H. I. Imtiaz",
      "M. S. S. Khan",
      "A. Hussain",
      "S. F. Mao",
      "Y. B. Zou",
      "Z. J. Ding",
    ],
    doi: "https://doi.org/10.1063/5.0208968",
    pdf: "/papers/imtiaz-khan-2024-backscattering-crcopd-jap.pdf",
    topics: ["electron transport", "backscattering", "metals"],
  },
  {
    id: "uq-cdsem-2023",
    title:
      "Uncertainty evaluation of Monte Carlo simulated line-scan profiles of a critical-dimension SEM (CD-SEM)",
    year: 2023,
    venue: "Journal of Applied Physics",
    authors: [
      "M. S. S. Khan",
      "S. F. Mao",
      "Y. B. Zou",
      "Y. G. Li",
      "B. Da",
      "Z. J. Ding",
    ],
    doi: "https://doi.org/10.1063/5.0153379",
    pdf: "/papers/khan-2023-uncertainty-cdsem-jap.pdf",
    topics: ["uncertainty quantification", "CD-SEM", "metrology"],
    selected: true,
  },
  {
    id: "silicon-emission-2023",
    title:
      "An extensive theoretical quantification of secondary-electron emission from silicon",
    year: 2023,
    venue: "Vacuum",
    authors: [
      "M. S. S. Khan",
      "S. F. Mao",
      "Y. B. Zou",
      "D. B. Lu",
      "B. Da",
      "Y. G. Li",
      "Z. J. Ding",
    ],
    doi: "https://doi.org/10.1016/j.vacuum.2023.112257",
    pdf: "/papers/khan-2023-secondary-electron-silicon-vacuum.pdf",
    topics: [
      "electron transport",
      "secondary-electron emission",
      "uncertainty quantification",
    ],
    selected: true,
  },
  {
    id: "coreshell-xps-2023",
    title:
      "A theoretical characterization method for non-spherical core–shell nanoparticles by XPS",
    year: 2023,
    venue: "Physical Chemistry Chemical Physics",
    authors: [
      "J. M. Gong",
      "M. S. S. Khan",
      "B. Da",
      "H. Yoshikawa",
      "S. Tanuma",
      "Z. J. Ding",
    ],
    doi: "https://doi.org/10.1039/D3CP01413D",
    pdf: "/papers/gong-khan-2023-coreshell-nanoparticles-xps-pccp.pdf",
    topics: ["XPS", "core–shell nanoparticles", "photoelectron transport"],
    selected: true,
  },
  {
    id: "nr-isomap-2023",
    title:
      "NR-Isomap: an incremental approach with Gaussian-process kernels for denoising",
    year: 2023,
    venue:
      "2023 IEEE 6th International Conference on Big Data and Artificial Intelligence (BDAI)",
    authors: [
      "M. Yousaf",
      "M. S. S. Khan",
      "S. Ullah",
      "S. Wang",
      "L. Jing",
    ],
    doi: "https://doi.org/10.1109/BDAI59165.2023.10256697",
    pdf: "/papers/yousaf-khan-2023-nr-isomap-ieee-bdai.pdf",
    topics: ["machine learning", "Isomap", "Gaussian-process kernels"],
  },
  {
    id: "elf-backscattering-2022",
    title:
      "Influence of energy-loss function on the Monte Carlo simulated electron backscattering coefficient",
    year: 2022,
    venue: "Scientific Reports",
    authors: [
      "H. Chen",
      "Y. B. Zou",
      "S. F. Mao",
      "M. S. S. Khan",
      "K. Tőkési",
      "Z. J. Ding",
    ],
    doi: "https://doi.org/10.1038/s41598-022-20466-3",
    pdf: "/papers/chen-khan-2022-elf-backscattering-scirep.pdf",
    topics: ["electron transport", "energy-loss function", "backscattering"],
  },
  {
    id: "wave-cdsem-2021",
    title:
      "CD-SEM characterization of smoothly varying wave structures with a Monte Carlo simulation",
    year: 2021,
    venue: "Journal of Physics D: Applied Physics",
    authors: [
      "M. S. S. Khan",
      "L. H. Yang",
      "X. Deng",
      "S. F. Mao",
      "Y. B. Zou",
      "Y. G. Li",
      "H. M. Li",
      "Z. J. Ding",
    ],
    doi: "https://doi.org/10.1088/1361-6463/ac0de5",
    pdf: "/papers/khan-2021-cdsem-wave-structures-jpd.pdf",
    topics: ["CD-SEM", "electron transport", "3D geometry"],
    selected: true,
  },
  {
    id: "nric-isomap-2021",
    title: "NRIC: a noise-removal approach for the nonlinear Isomap method",
    year: 2021,
    venue: "Neural Processing Letters",
    authors: [
      "M. Yousaf",
      "M. S. S. Khan",
      "T. U. Rehman",
      "S. Ullah",
      "L. Jing",
    ],
    doi: "https://doi.org/10.1007/s11063-021-10472-3",
    pdf: "/papers/yousaf-khan-2021-nric-isomap-npl.pdf",
    topics: ["machine learning", "noise removal", "Isomap"],
  },
  {
    id: "wave-emission-2019",
    title:
      "Monte Carlo simulation of secondary-electron emission from wave-type structure",
    year: 2019,
    venue: "Journal of University of Science and Technology of China",
    authors: ["M. S. S. Khan", "Y. B. Zou", "C. Li", "Z. J. Ding"],
    doi: "https://doi.org/10.3969/j.issn.0253-2778.2019.01.011",
    pdf: "/papers/khan-2019-se-emission-wave-justc.pdf",
    topics: ["electron transport", "secondary-electron emission", "CD-SEM"],
  },
  {
    id: "model-library-cdsem-2018",
    title:
      "Use of a model-based library in critical-dimension measurement by CD-SEM",
    year: 2018,
    venue: "Measurement",
    authors: [
      "Y. B. Zou",
      "M. S. S. Khan",
      "H. M. Li",
      "Y. G. Li",
      "W. Li",
      "S. T. Gao",
      "L. S. Liu",
      "Z. J. Ding",
    ],
    doi: "https://doi.org/10.1016/j.measurement.2018.02.069",
    pdf: "/papers/zou-khan-2018-model-based-library-measurement.pdf",
    topics: ["CD-SEM", "metrology", "model-based library"],
  },
] as const satisfies readonly Publication[];

export const selectedPublications = publications.filter(
  (publication) => "selected" in publication && publication.selected,
);

export const grants = [
  {
    id: "nsfc-superlattice",
    title:
      "3D Monte-Carlo simulation of the anti-irradiation effect of superlattice nanoparticle composites",
    role: "Principal Investigator",
    agency: "National Natural Science Foundation of China (NSFC)",
    grantNumber: "W2533023",
    period: "2025–present",
    amountCny: 180_000,
    amountUsdApprox: 25_000,
  },
  {
    id: "foreign-experts-superlattice",
    title:
      "3D radiation-resistance simulation of superlattice nanocomposites",
    role: "Principal Investigator",
    agency:
      "National Foreign Experts Project (Y Category), State Administration of Foreign Experts Affairs, China",
    grantNumber: "Y20240239",
    amountCny: 200_000,
    amountUsdApprox: 27_500,
  },
  {
    id: "nsfc-tungsten",
    title: "Radiation–hydrogen–helium synergy in tungsten",
    role: "Participant / Co-Investigator",
    agency: "NSFC Major Research Plan (National Level)",
    grantNumber: "12375277",
    amountCny: 540_000,
    amountUsdApprox: 74_000,
  },
  {
    id: "anhui-fusion-materials",
    title: "Fusion-plasma material radiation-damage mechanisms",
    role: "Participant / Co-Investigator",
    agency: "Anhui Provincial Natural Science Outstanding Youth Fund",
    grantNumber: "2308085J04",
    amountCny: 700_000,
    amountUsdApprox: 96_000,
  },
] as const satisfies readonly Grant[];

export const projects: Record<ProjectSlug, ProjectPage> = {
  fenial: {
    slug: "fenial",
    title: "Morphological Effect of Microstructures on Anti-irradiation Tolerance of FeNiAl Superlattice Alloys",
    shortTitle: "FeNiAl alloy design",
    eyebrow: "FeNiAl · collision cascades · defect evolution",
    summary:
      "A multiscale simulation programme exploring how FeNiAl microstructures reshape primary radiation damage in an iron matrix.",
    goal: [
      "Understand whether nanoscale precipitate geometry can help structural alloys recover defects faster than irradiation creates them.",
      "Support longer-lived materials for nuclear and fusion environments, where radiation tolerance limits component lifetime.",
    ],
    method: [
      "Generate three-dimensional FeNiAl nanoprecipitate geometries and simulate primary damage with IM3D.",
      "Pass cascade output through a self-developed chemical rate-theory annealing code and MMonCa object kinetic Monte Carlo.",
      "Use bridge codes, format translation, consistency checks, and regression tests to keep the coupled IM3D → CRT → MMonCa workflow physically consistent.",
    ],
    results: [
      "The manuscript reports that morphology strongly changes how irradiation damage is distributed and retained across the alloy, even when composition is held fixed.",
      "The morphology sweep identifies an intermediate-radius, 20 vol% precipitate design as the best-performing regime; the supplied poster reports a peak-damage minimum near 40 nm and a recovery minimum at an intermediate radius.",
      "The work produced a cascade-annealing code and coupling utilities for the three simulation stages.",
    ],
    figures: [
      {
        src: "/assets/img/fenial_workflow.jpg",
        alt: "IM3D to CRT defect-evolution workflow for FeNiAl",
        eyebrow: "Method",
        caption:
          "Three-dimensional geometry, IM3D and FETM cascade simulation, defect analysis, and CRT annealing.",
      },
      {
        src: "/assets/img/fenial_3d.jpg",
        alt: "Three-dimensional FeNiAl nanoprecipitates in an iron matrix",
        eyebrow: "Geometry",
        caption:
          "FETM models of spherical FeNiAl nanoprecipitates embedded in an iron matrix.",
      },
      {
        src: "/assets/img/fenial_peak_dpa_morphology.png",
        alt: "Maximum local DPA versus FeNiAl precipitate radius for 5, 10, 15, and 20 percent volume fractions",
        eyebrow: "Cascade-stage optimum",
        caption:
          "Maximum local DPA reveals the geometry effect directly: the 20 vol% morphology gives the deepest minimum, near an intermediate radius of roughly 40 nm.",
      },
      {
        src: "/assets/img/fenial_residual_vacancy_morphology.png",
        alt: "Post-annealing steady-state vacancy concentration versus FeNiAl precipitate radius for four volume fractions",
        eyebrow: "Recovery-stage optimum",
        caption:
          "After CRT annealing at 733 K, the 20 vol% morphology retains the fewest vacancies, with its minimum near a 20 nm precipitate radius.",
      },
    ],
    publicationIds: [],
    relatedWork: {
      title:
        "Morphological Effect of Microstructures on Anti-irradiation Tolerance of FeNiAl Superlattice Alloys",
      authors: [
        "M. S. S. Khan",
        "Y. X. Xiong",
        "M. Yousaf",
        "F. Cheng",
        "Y. G. Li",
      ],
      year: 2026,
      status: "under review",
    },
    fundingGrantIds: [
      "nsfc-superlattice",
      "foreign-experts-superlattice",
    ],
    animationIds: ["animCascade"],
    nextProject: "geometry",
  },
  geometry: {
    slug: "geometry",
    title: "Full-3D Geometry in Particle-Transport Monte Carlo",
    shortTitle: "3D geometry",
    eyebrow: "Gmsh · FETM · complex nanostructures",
    summary:
      "Parametric geometry and meshing workflows that carry real, curved, and layered structures into transport codes originally designed for simple domains.",
    goal: [
      "Represent the interfaces and curved structures that control transport in real nanostructured materials.",
      "Preserve geometry fidelity so simulated observables correspond to the experimental structure rather than an oversimplified surrogate.",
    ],
    method: [
      "Start from the experimental TEM cross-section of the Pt-coated Cr wave grating on its Si substrate.",
      "Extract the wave period (λ/2), peak-to-valley height (h), valley-to-substrate base height (b), linewidth shrinkage (2s), wave-peak tilt (θ), and 10 nm Pt coating into a parameterised material model.",
      "Use Gmsh and Python to construct and triangulate the stacked Si, Cr, and conformal Pt regions while assigning every triangle to its material.",
      "At every facet crossing, query the adjacent triangle or vacuum boundary and switch the electron-transport data to Si, Cr, Pt, or the surface escape rule.",
    ],
    results: [
      "Enabled complex embedded geometry in transport codes previously limited to simple domains.",
      "Made triangle ownership and material adjacency explicit, so a trajectory can cross Si–Cr, Cr–Pt, and Pt–vacuum interfaces without losing its physical region.",
      "Built reusable pipelines for multilayer, nanoparticle, and superlattice targets while connecting experimental TEM morphology to the transport mesh.",
    ],
    figures: [
      {
        src: "/assets/img/wave_tem.jpg",
        alt: "TEM cross-section of a Pt-coated chromium wave grating on silicon",
        eyebrow: "TEM evidence",
        caption:
          "The experimental TEM cross-section used to identify the Si substrate, Cr grating, conformal Pt coating, and curved interfaces.",
      },
      {
        src: "/assets/img/wave_3d_grating.jpg",
        alt: "TEM-derived parameterised Si, Cr, and Pt model followed by its three-dimensional triangular mesh",
        eyebrow: "Parameters → model → mesh",
        caption:
          "The supplied research figure shows the complete sequence from TEM measurements to the parameterised layered model and material-aware 3D mesh.",
      },
      {
        src: "/assets/img/def_mesh.jpg",
        alt: "Finite-element triangular mesh used for electron transport through a structured CD-SEM target",
        eyebrow: "Tagged transport mesh",
        caption:
          "A finite-element triangular mesh in which each element retains material identity and adjacency for interface-aware electron tracking.",
      },
    ],
    publicationIds: [
      "wave-cdsem-2021",
      "coreshell-xps-2023",
      "uq-cdsem-2023",
    ],
    fundingGrantIds: [],
    animationIds: [
      "animGeometry",
      "geoWave2D",
      "geoWave3D",
      "geoCoreShell",
      "geoSuperlattice",
    ],
    nextProject: "uncertainty",
  },
  uncertainty: {
    slug: "uncertainty",
    title: "Uncertainty Quantification for Simulation Metrology",
    shortTitle: "Uncertainty",
    eyebrow: "CD-SEM · 17,280 model combinations · MPI",
    summary:
      "A systematic uncertainty programme that tests how physical-model choices move simulated semiconductor-metrology signals.",
    goal: [
      "Determine whether simulated nanometre-scale measurements remain reliable when their scattering and energy-loss models change.",
      "Separate physical-model uncertainty from geometry effects and Monte Carlo statistical noise.",
    ],
    method: [
      "Reproduce the published 17,280-profile campaign: 384 ELSEPA elastic-potential combinations × 3 dielectric models × 5 work functions × 3 optical ELF datasets.",
      "Run ensemble Monte Carlo campaigns with MPI and apply structured statistical post-processing to the resulting spatial fields.",
      "Compare that published campaign with the broader catalogue of 3 inelastic formalisms × 4 available ELF datasets = 12 inelastic combinations, together with reported work-function and electron-affinity values.",
      "Build confidence intervals that expose how model-form choices affect the simulated measurement and how the spread changes with scan position.",
    ],
    results: [
      "The elastic-potential and work-function choices materially shift absolute signal intensity; the optical ELF and dielectric-model choices contribute a smaller spread in the published study.",
      "The uncertainty envelope is non-uniform across the line scan, so a single constant error band would conceal the spatial dependence of model sensitivity.",
      "Normalisation reduces intensity-scale variation while preserving the edge-sensitive line-shape comparison, separating model-driven spread from Monte Carlo noise.",
      "Established a reusable framework for comparing emission and metrology predictions across candidate physics models.",
    ],
    figures: [
      {
        src: "/assets/img/uq_flowchart.jpg",
        alt: "Flowchart of the Monte Carlo uncertainty-quantification workflow",
        eyebrow: "Method",
        caption:
          "The ensemble workflow spanning work-function, energy-loss, and scattering-potential model choices.",
      },
      {
        src: "/assets/img/si_uq_grid.jpg",
        alt: "Silicon electron-emission yields across 17,280 model combinations",
        eyebrow: "Ensemble",
        caption:
          "Secondary-electron, backscattering, and total yields of silicon across 17,280 model combinations.",
      },
      {
        src: "/assets/img/uq_bands.jpg",
        alt: "CD-SEM line-scan profiles with model-form uncertainty bands and axes",
        eyebrow: "Result",
        caption:
          "Line-scan profiles with labeled axes and non-uniform uncertainty bands for alternative dielectric-response models.",
      },
      {
        src: "/assets/img/uq_cb_grid.jpg",
        alt: "Confidence-banded line scans across sidewall angles",
        eyebrow: "Confidence",
        caption:
          "Line-scan intensity with 75% and 95% confidence bands across sidewall angles.",
      },
      {
        src: "/assets/img/uq_mesh3d.jpg",
        alt: "Three-dimensional triangular mesh used for CD-SEM simulation",
        eyebrow: "Geometry",
        caption:
          "The meshed line structure used as the geometry input to the uncertainty campaign.",
      },
      {
        src: "/assets/img/poster_cdsem.jpg",
        alt: "Research poster about CD-SEM uncertainty evaluation",
        eyebrow: "Poster",
        caption:
          "The uncertainty study presented from physical inputs through simulated results.",
      },
    ],
    publicationIds: [
      "uq-cdsem-2023",
      "silicon-emission-2023",
      "model-library-cdsem-2018",
    ],
    fundingGrantIds: [],
    animationIds: [],
    nextProject: "electron-transport",
  },
  "electron-transport": {
    slug: "electron-transport",
    title: "Electron Transport, Scattering, and Emission",
    shortTitle: "Electron transport",
    eyebrow: "Cross sections · energy loss · electron yield",
    summary:
      "Physics libraries and Monte Carlo studies of elastic and inelastic scattering, backscattering, secondary-electron emission, and photoelectron escape.",
    goal: [
      "Build reliable electron-transport predictions for semiconductor metrology, surface analysis, and nanostructured materials.",
      "Understand how cross sections, energy-loss functions, material composition, and geometry shape measurable electron yields.",
    ],
    method: [
      "Sample elastic deflection and inelastic energy-loss events along Monte Carlo electron trajectories.",
      "Use Salvat's ELSEPA code to calculate Mott elastic cross sections across 384 combinations of nuclear charge distribution, electron density, exchange, correlation-polarisation, and solid-state atomic potentials; this code was used, not authored in this work.",
      "Compare full Penn, super-extended Mermin, and Levine–Louie inelastic formalisms with four available optical ELF datasets, giving a broader catalogue of 12 inelastic combinations.",
      "Combine the elastic and inelastic model spaces with reported work functions and electron-affinity values to quantify sensitivity and identify defensible model choices.",
      "Benchmark simulated yields and backscattering coefficients against experimental records across bulk and structured targets.",
    ],
    results: [
      "Quantified secondary-electron emission from silicon across the full physical-model space used in the study.",
      "Computed emission and backscattering behaviour for germanium and Cr, Co, and Pd solids.",
      "Modelled CD-SEM signals from wave-type structures and photoelectron transport in non-spherical core–shell particles.",
      "Used uncertainty quantification to identify which elastic and inelastic combinations were physically defensible and which dominated the spread.",
      "Extended the programme to spatially resolved secondary-electron emission in multiwall carbon nanotubes; that manuscript remains in preparation.",
    ],
    figures: [
      {
        src: "/assets/img/def_schematic.jpg",
        alt: "Schematic of electron-solid interaction",
        eyebrow: "Concept",
        caption:
          "Incident, backscattered, and secondary electrons resolved into elastic and inelastic events.",
      },
      {
        src: "/assets/img/wave_trajectories.jpg",
        alt: "Electron trajectories over a wave-type grating",
        eyebrow: "CD-SEM",
        caption:
          "Primary and cascade-secondary trajectories striking a Pt/Cr wave grating.",
      },
      {
        src: "/assets/img/si_3d_elf.jpg",
        alt: "Momentum- and energy-resolved loss functions for silicon",
        eyebrow: "Energy loss",
        caption:
          "Silicon energy-loss surfaces calculated with three dielectric-response formalisms.",
      },
      {
        src: "/assets/img/ge_yields.jpg",
        alt: "Electron emission yields of germanium",
        eyebrow: "Germanium",
        caption:
          "Secondary-electron, backscattering, and total-electron yields compared with experiment.",
      },
      {
        src: "/assets/img/crcopd_bsc.jpg",
        alt: "Backscattering coefficients of chromium, cobalt, and palladium",
        eyebrow: "Metals",
        caption:
          "Simulated coefficients for clean and carbon-contaminated surfaces compared with measurements.",
      },
      {
        src: "/assets/img/xps_trajectory.jpg",
        alt: "Photoelectron trajectories in a core-shell nanoparticle",
        eyebrow: "XPS",
        caption:
          "Photoelectron trajectories showing which signals escape a carbon-core, gold-shell particle.",
      },
      {
        src: "/assets/img/cnt_spatial.jpg",
        alt: "Spatial density of secondary electrons in a nanotube",
        eyebrow: "Work in progress",
        caption:
          "Spatial density of excited and emitted secondary electrons across a multiwall carbon nanotube.",
      },
      {
        src: "/assets/img/cnt_sey_nw.jpg",
        alt: "Secondary-electron yield versus carbon-nanotube wall count",
        eyebrow: "Work in progress",
        caption:
          "Secondary-electron yield as a function of wall count for several nanotube diameters.",
      },
      {
        src: "/assets/img/mlib_sem.jpg",
        alt: "SEM line structures used for model-based CD measurement",
        eyebrow: "Application",
        caption:
          "An experimental SEM field of interest and averaged line scan used for model-based measurement.",
      },
      {
        src: "/assets/img/sewave_p11.jpg",
        alt: "Secondary-electron line scans from wave-type structures",
        eyebrow: "Early work",
        caption:
          "Simulated line scans from wave-type Au/Si and Si/Si structures.",
      },
    ],
    publicationIds: [
      "germanium-emission-2025",
      "crcopd-backscattering-2024",
      "silicon-emission-2023",
      "coreshell-xps-2023",
      "elf-backscattering-2022",
      "wave-cdsem-2021",
      "wave-emission-2019",
      "model-library-cdsem-2018",
    ],
    relatedWork: {
      title: "Secondary Electron Emission from Carbon Nanotubes",
      status: "in preparation",
    },
    fundingGrantIds: [],
    animationIds: ["animEsolid", "animScatter"],
    nextProject: "im3d",
  },
  im3d: {
    slug: "im3d",
    title: "IM3D Ion-Irradiation Simulation",
    shortTitle: "IM3D",
    eyebrow: "3D ion irradiation · primary damage · coupled workflows",
    summary:
      "Use, documentation, and workflow integration of the parallel IM3D Monte Carlo code for three-dimensional ion-irradiation simulation.",
    goal: [
      "Resolve where energetic ions deposit energy and create primary damage in three-dimensional materials.",
      "Turn primary-damage output into usable inputs for defect-evolution studies and experimental interpretation.",
    ],
    method: [
      "Run IM3D ion and primary-knock-on-atom campaigns across a bulk Fe-Cr target and incident energies.",
      "Translate IM3D output into chemical rate-theory and MMonCa workflows for longer-time defect evolution.",
      "Document input preparation, output interpretation, and cross-code coupling in reproducible user guides.",
    ],
    results: [
      "Produced an Fe-Cr reference dataset from approximately 1,300 simulations spanning 1,260 incident energies from 0.1 keV to 1 MeV, with 100,000 incident ions per run.",
      "Delivered depth-resolved damage profiles, energy-resolved contour maps, and three-dimensional primary-damage distributions to experimental collaborators.",
      "Substantially rewrote and restructured the IM3D user manual and received acknowledgment for that contribution in the 2025 manual.",
      "Integrated IM3D with a self-developed CRT annealing code and MMonCa for FeNiAl defect-evolution studies.",
    ],
    figures: [
      {
        src: "/assets/img/fecr_3d.jpg",
        alt: "Three-dimensional primary-damage distribution in a bulk Fe-Cr simulation cell at 50 keV",
        eyebrow: "3D damage output",
        caption:
          "Three-dimensional primary-damage distribution in a 50 × 50 × 50 nm Fe–Cr cell for a 50 keV cascade; this is an output field, not the input geometry.",
      },
      {
        src: "/assets/img/fecr_dpa.jpg",
        alt: "Depth-resolved dpa profiles for Fe-Cr",
        eyebrow: "Depth profiles",
        caption:
          "Damage-versus-depth profiles for Fe and Cr ions and primary knock-on atoms.",
      },
      {
        src: "/assets/img/fecr_contour.jpg",
        alt: "Energy-resolved damage contour maps for Fe-Cr",
        eyebrow: "Energy sweep",
        caption:
          "Continuous damage maps versus depth and incident energy across the Fe–Cr campaign.",
      },
    ],
    publicationIds: [],
    fundingGrantIds: [
      "nsfc-superlattice",
      "foreign-experts-superlattice",
    ],
    animationIds: [],
    nextProject: "fenial",
  },
};

export const softwareTools = [
  {
    id: "im3d",
    name: "IM3D",
    category: "simulation",
    description:
      "Parallel Monte Carlo code used for three-dimensional ion-irradiation and primary-damage simulations, documentation, and coupled workflows.",
    technologies: ["Monte Carlo", "ion irradiation", "3D geometry"],
  },
  {
    id: "mmonca",
    name: "MMonCa",
    category: "simulation",
    description:
      "Object kinetic Monte Carlo tool used to evolve irradiation defects beyond the primary-damage stage.",
    technologies: ["OKMC", "defect evolution"],
  },
  {
    id: "crt",
    name: "Chemical rate-theory annealing code",
    category: "simulation",
    description:
      "Self-developed code that parses IM3D cascade output and models defect recovery through chemical rate theory.",
    technologies: ["Python", "chemical rate theory", "radiation damage"],
  },
  {
    id: "elsepa-model-space",
    name: "ELSEPA elastic-scattering model ensemble",
    category: "physics library",
    description:
      "Used Salvat's ELSEPA code to calculate Mott elastic cross sections across 384 scattering-potential combinations, then quantified their effect and model-selection uncertainty.",
    technologies: ["ELSEPA", "Mott cross sections", "model selection"],
  },
  {
    id: "elf-library",
    name: "Inelastic-scattering model suite",
    category: "physics library",
    description:
      "Implementations and comparisons based on full Penn, super-extended Mermin, and Levine–Louie treatments, evaluated with multiple optical energy-loss-function datasets.",
    technologies: ["FPA", "SMA", "LLM", "energy-loss function"],
  },
  {
    id: "coupling",
    name: "IM3D → CRT → MMonCa coupling",
    category: "workflow",
    description:
      "Bridge utilities for format translation, consistency validation, and regression checks across the primary-damage and defect-evolution stages.",
    technologies: ["Python", "cross-code coupling", "validation"],
  },
  {
    id: "geometry-pipeline",
    name: "Three-dimensional geometry and meshing pipeline",
    category: "geometry",
    description:
      "Parametric construction and finite-element triangular meshing for layered structures, core–shell particles, and nanoparticle superlattices.",
    technologies: ["Gmsh", "Python", "FETM", "MPI"],
  },
  {
    id: "fecr-database",
    name: "Fe–Cr radiation-damage database",
    category: "data",
    description:
      "Depth-resolved and energy-resolved IM3D results for Fe and Cr ions and primary knock-on atoms, prepared for experimental collaborators.",
    technologies: ["IM3D", "Fe–Cr", "dpa"],
  },
] as const satisfies readonly SoftwareTool[];

export const guides = [
  {
    id: "crt-guide",
    title: "Chemical Rate Theory and Radiation Damage Modeling",
    subtitle: "Using IM3D output and custom Python code",
    year: 2025,
    version: "1.0",
    pdf: "/guides/khan-2025-crt-calculation-guide.pdf",
    citation:
      "M. S. S. Khan, “Chemical Rate Theory and Radiation Damage Modeling Using IM3D Output and Python Code,” User Guide v1.0, Institute of Solid State Physics, HFIPS, Chinese Academy of Sciences, 2025.",
  },
  {
    id: "mmonca-guide",
    title: "Radiation Damage and Defect Modeling in Metals",
    subtitle: "Using IM3D and MMonCa tools",
    year: 2024,
    pdf: "/guides/khan-2024-mmonca-guide.pdf",
    citation:
      "M. S. S. Khan, “Comprehensive Guide to Radiation Damage and Defect Modeling in Metals Using IM3D and MMonCa Tools,” Institute of Solid State Physics, HFIPS, Chinese Academy of Sciences, 2024.",
  },
] as const satisfies readonly Guide[];

export const education = [
  {
    degree: "B.Sc. (Hons) Computational Physics",
    institution: "Centre for High Energy Physics, University of the Punjab",
    location: "Lahore, Pakistan",
    period: "2006–2010",
    focus: "Foundations in computational physics",
    logo: "/assets/img/logo_punjab.png",
  },
  {
    degree: "Mandarin Chinese Language Programme (HSK-4)",
    institution: "Anhui Normal University",
    location: "Wuhu, China",
    period: "2014–2015",
    focus: "Language preparation for graduate study in China",
    logo: "/assets/img/logo_anhui.png",
  },
  {
    degree: "M.S. Condensed-Matter Physics",
    institution: "University of Science and Technology of China (USTC)",
    location: "Hefei, China",
    period: "2015–2018",
    focus: "Monte Carlo electron-transport simulation",
    award: "China Scholarship Council fully funded scholarship",
    logo: "/assets/img/logo_ustc.png",
  },
  {
    degree: "Ph.D. Condensed-Matter Physics",
    institution: "University of Science and Technology of China (USTC)",
    location: "Hefei, China",
    period: "2018–2022",
    focus:
      "Monte Carlo simulation of secondary-electron emission from bulk and layered solids",
    award: "CAS-TWAS Presidential Fellowship",
    logo: "/assets/img/logo_ustc.png",
  },
] as const satisfies readonly EducationEntry[];

export const conferences = [
  {
    year: 2019,
    format: "Oral talk",
    name: "ChinaNANO 2019",
    location: "Beijing, China",
    description:
      "8th International Conference on Nanoscience and Technology; talk on Monte Carlo SEM imaging of wave-type structures.",
  },
  {
    year: 2025,
    format: "Oral presentation · award",
    name: "WMC-3 / WMS-9 / IUMRS-ICA",
    location: "Guilin, China",
    description:
      "High-level oral presentation on superlattice radiation tolerance.",
  },
  {
    year: 2026,
    format: "Poster",
    name: "18th ICMCMM",
    description:
      "International Conference on Multiscale Computational Materials Modeling; FeNiAl superlattices.",
  },
  {
    year: 2026,
    format: "Invited",
    name: "International Nathiagali Summer College",
    location: "Islamabad, Pakistan",
    description:
      "International Summer College on Physics and Contemporary Needs.",
  },
] as const satisfies readonly Conference[];

export const recognition = [
  {
    id: "oral-award",
    type: "award",
    title: "Certificate of High-Level Oral Presentation",
    description:
      "Awarded for “Engineering Radiation Tolerance in Al–Fe–Ni Superlattice Alloys via Microstructural Design.”",
    meta:
      "WMC-3 · WMS-9 · IUMRS-ICA 2025 · Guilin, China · Chinese Materials Research Society",
    image: "/assets/img/cert_oral.jpg",
  },
  {
    id: "fenial-poster",
    type: "poster",
    title: "FeNiAl superlattice radiation tolerance",
    description:
      "Ningbo poster presenting the IM3D collision-cascade study of coherent nanoprecipitates and defect survival.",
    meta: "18th ICMCMM · Ningbo, China · 2026",
    image: "/assets/img/poster_fenial.jpg",
  },
  {
    id: "wuhan-fenial-poster",
    type: "poster",
    title: "FeNiAl morphology and defect-survival design",
    description:
      "Wuhan poster comparing precipitate radius and volume fraction, including the local-damage and post-annealing optima.",
    meta: "WMC 2026 · Wuhan, China",
    image: "/assets/img/poster_wuhan_wmc2026.jpg",
  },
  {
    id: "cdsem-poster",
    type: "poster",
    title: "CD-SEM uncertainty evaluation",
    description:
      "Poster presenting the Monte Carlo uncertainty study from physical inputs through simulated results.",
    meta: "Uncertainty evaluation of CD-SEM line-scan profiles",
    image: "/assets/img/poster_cdsem.jpg",
  },
  {
    id: "wmc-participation",
    type: "certificate",
    title: "3rd World Materials Conference participation",
    description:
      "Participation in WMC-3, the 9th World Materials Summit, and IUMRS-ICA 2025.",
    meta: "Guilin, China · 14–17 October 2025",
    image: "/assets/img/cert_participation.jpg",
  },
  {
    id: "im3d-manual",
    type: "contribution",
    title: "IM3D user-manual contribution",
    description:
      "The IM3D user manual was substantially rewritten and restructured for clarity and usability; Dr. Khan is credited in its acknowledgments.",
    meta: "IM3D User Manual · 2025",
    image: "/assets/img/im3d_ack.jpg",
  },
] as const satisfies readonly Recognition[];

export const photos = [
  {
    src: "/assets/img/photo_chinanano.jpg",
    alt: "Dr. Khan at ChinaNANO 2019 in Beijing",
    title: "ChinaNANO 2019",
    caption:
      "8th International Conference on Nanoscience and Technology, Beijing.",
  },
  {
    src: "/assets/img/photo_grad2022.jpg",
    alt: "PhD graduation group photo at USTC in 2022",
    title: "PhD graduation · 2022",
    caption: "With the research group at USTC, Hefei.",
  },
  {
    src: "/assets/img/photo_lab2021.jpg",
    alt: "USTC research group photo in 2021",
    title: "Research group · 2021",
    caption: "Solid-structure laboratory at USTC, Hefei.",
  },
] as const satisfies readonly Photo[];

export const collaborationModes = [
  {
    title: "Joint research proposals",
    description:
      "Co-authored grant applications and multi-institution programme design.",
  },
  {
    title: "AI and computational modelling projects",
    description:
      "Physics-based simulation coupled with machine-learning surrogates and uncertainty quantification.",
  },
  {
    title: "Industry–academic partnerships",
    description:
      "Connecting fundamental simulation with production R&D in semiconductors, energy, and materials.",
  },
  {
    title: "Scientific software development",
    description:
      "Simulation engines, geometry and meshing tools, and cross-code coupling.",
  },
  {
    title: "Student research supervision",
    description:
      "Co-supervision of M.Sc. and Ph.D. projects in simulation and radiation materials science.",
  },
] as const satisfies readonly CollaborationMode[];

export const mentoringServices = [
  {
    title: "Emailing prospective supervisors",
    description:
      "Identify relevant supervisors and prepare concise, personalised first-contact emails with appropriate supporting documents and follow-up.",
  },
  {
    title: "Scholarship and university applications",
    description:
      "End-to-end guidance for international Master’s, Ph.D., and postdoctoral programmes, tailored to the institution and funding scheme.",
  },
  {
    title: "Academic CV and résumé",
    description:
      "Structure an academic, research, industry-research, or faculty CV around the applicant’s strongest evidence.",
  },
  {
    title: "Statement of Purpose",
    description:
      "Develop a focused narrative connecting preparation, research motivation, programme fit, and future direction.",
  },
  {
    title: "Motivation letter",
    description:
      "Prepare a persuasive letter for a specific university or advertised position rather than a reusable generic template.",
  },
  {
    title: "Research proposal",
    description:
      "Clarify the literature, research gap, objectives, methodology, and expected outcomes for proposal-led applications.",
  },
  {
    title: "Publication mentoring",
    description:
      "Support journal selection, manuscript structure, scientific writing, and responses to reviewers.",
  },
  {
    title: "Interview preparation",
    description:
      "One-to-one mock interviews for postgraduate, postdoctoral, research-scientist, lecturer, and assistant-professor selection.",
  },
  {
    title: "Global talent and immigration guidance",
    description:
      "Discuss research-based immigration and academic-progression pathways in relation to the applicant’s qualifications and goals.",
  },
] as const satisfies readonly MentoringService[];

export const mentoringDurations = [
  { service: "Initial career consultation", duration: "30–60 min" },
  { service: "CV / academic résumé review", duration: "60 min" },
  { service: "Statement of Purpose review", duration: "60 min" },
  { service: "Motivation letter review", duration: "60 min" },
  { service: "Research proposal review", duration: "60–120 min" },
  { service: "Mock interview", duration: "60 min" },
  { service: "Full application package", duration: "Custom" },
] as const;

export const mentoringDestinations = [
  "United Kingdom",
  "United States",
  "Canada",
  "Australia",
  "Germany",
  "Italy",
  "Spain",
  "Netherlands",
  "Scandinavia",
  "Czech Republic",
  "Lithuania",
  "Japan",
  "South Korea",
  "China",
  "Hong Kong",
] as const;

export const profiles = [
  {
    label: "Google Scholar",
    href: "https://scholar.google.com/citations?user=kneeK7cAAAAJ",
  },
  {
    label: "ORCID",
    href: "https://orcid.org/0000-0001-7723-2887",
  },
  {
    label: "ResearchGate",
    href: "https://www.researchgate.net/profile/Saadat-Khan-2",
  },
] as const;

export const contact = {
  name: "Dr. Muhammad Saadat Shakoor Khan",
  shortName: "M. S. S. Khan",
  role: "Postdoctoral Researcher",
  discipline: "Computational Physicist",
  affiliation:
    "Institute of Solid State Physics, Hefei Institutes of Physical Science, Chinese Academy of Sciences",
  location: "Hefei, China",
  institutionalEmail: "mkhan@theory.issp.ac.cn",
  personalEmail: "saadatkhan03@gmail.com",
  whatsappDisplay: "+86 185 5638 1675",
  whatsappHref: "https://wa.me/8618556381675",
  wechat: "saadat_khan",
  profileImage: "/assets/img/profile.jpg",
} as const;
