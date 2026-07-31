"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
  type RefObject,
} from "react";

export type ScientificLegendItem = {
  label: string;
  color: string;
  detail?: string;
};

export type ScientificReadout = {
  label: string;
  value: string;
  detail?: string;
};

export type ScientificAnimationRuntime = {
  active: boolean;
  inView: boolean;
  paused: boolean;
  reducedMotion: boolean;
  replayToken: number;
};

export type ScientificAnimationFrameProps = {
  id: string;
  title: string;
  description: string;
  legend: ScientificLegendItem[];
  readouts: ScientificReadout[];
  source?: ReactNode;
  controls?: ReactNode;
  onReplay?: () => void;
  children:
    | ReactNode
    | ((runtime: ScientificAnimationRuntime) => ReactNode);
};

const SCIENTIFIC_ANIMATION_STYLES = `
  .sci-frame {
    --sci-ink: var(--ink, #0a2540);
    --sci-navy: var(--navy, #123a63);
    --sci-accent: var(--accent, #0e7c86);
    --sci-signal: var(--accent-2, #12a0ab);
    --sci-paper: var(--paper, #ffffff);
    --sci-mist: var(--mist, #f4f7fb);
    --sci-line: var(--line, #dce4ed);
    --sci-muted: var(--muted, #5a6b82);
    color: var(--sci-ink);
    background: var(--sci-paper);
    border: 1px solid var(--sci-line);
    border-radius: 18px;
    box-shadow: 0 22px 58px -36px rgba(10, 37, 64, 0.44);
    margin: 0;
    min-width: 0;
    overflow: hidden;
  }

  .sci-frame-header {
    display: grid;
    gap: 14px;
    padding: clamp(20px, 4vw, 32px);
  }

  .sci-frame-heading {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 18px;
  }

  .sci-frame-copy {
    min-width: 0;
  }

  .sci-frame-badge {
    align-items: center;
    background: rgba(14, 124, 134, 0.09);
    border: 1px solid rgba(14, 124, 134, 0.28);
    border-radius: 999px;
    color: var(--sci-accent);
    display: inline-flex;
    font-family: var(--mono, "IBM Plex Mono", ui-monospace, monospace);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.04em;
    line-height: 1.2;
    margin-bottom: 10px;
    padding: 7px 11px;
  }

  .sci-frame-title {
    color: var(--sci-ink);
    font-family: var(--serif, Fraunces, Georgia, serif);
    font-size: clamp(1.45rem, 2.8vw, 2rem);
    line-height: 1.18;
    margin: 0;
  }

  .sci-frame-description {
    color: var(--sci-muted);
    font-size: 15.5px;
    line-height: 1.65;
    margin: 10px 0 0;
    max-width: 72ch;
  }

  .sci-frame-actions {
    align-items: center;
    display: flex;
    flex: 0 0 auto;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: flex-end;
  }

  .sci-button,
  .sci-mode-tab,
  .sci-stage-tab {
    appearance: none;
    background: var(--sci-paper);
    border: 1px solid #c9d5e2;
    border-radius: 9px;
    color: var(--sci-ink);
    cursor: pointer;
    font: 600 13px/1.2 var(--sans, Inter, system-ui, sans-serif);
    min-height: 44px;
    padding: 10px 14px;
    transition:
      border-color 160ms ease,
      background 160ms ease,
      color 160ms ease,
      transform 160ms ease;
  }

  .sci-button:hover:not(:disabled),
  .sci-mode-tab:hover,
  .sci-stage-tab:hover {
    border-color: var(--sci-accent);
    color: var(--sci-accent);
    transform: translateY(-1px);
  }

  .sci-button:focus-visible,
  .sci-mode-tab:focus-visible,
  .sci-stage-tab:focus-visible {
    outline: 3px solid rgba(14, 124, 134, 0.22);
    outline-offset: 2px;
  }

  .sci-button:disabled {
    cursor: not-allowed;
    opacity: 0.58;
  }

  .sci-runtime-status {
    color: var(--sci-muted);
    flex-basis: 100%;
    font-family: var(--mono, "IBM Plex Mono", ui-monospace, monospace);
    font-size: 11px;
    letter-spacing: 0.04em;
    text-align: right;
  }

  .sci-extra-controls {
    border-top: 1px solid var(--sci-line);
    padding-top: 14px;
  }

  .sci-mode-tabs,
  .sci-stage-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .sci-mode-tab[aria-selected="true"],
  .sci-mode-tab[aria-pressed="true"],
  .sci-stage-tab[aria-pressed="true"] {
    background: var(--sci-ink);
    border-color: var(--sci-ink);
    color: #ffffff;
  }

  .sci-canvas-shell {
    aspect-ratio: 16 / 9;
    background:
      radial-gradient(circle at 18% 10%, rgba(18, 160, 171, 0.14), transparent 36%),
      linear-gradient(180deg, #08213c 0%, #0a2846 100%);
    min-height: 250px;
    min-width: 0;
    overflow: hidden;
    position: relative;
  }

  .sci-canvas-shell::after {
    border: 1px solid rgba(127, 176, 201, 0.16);
    content: "";
    inset: 14px;
    pointer-events: none;
    position: absolute;
  }

  .sci-svg {
    display: block;
    height: 100%;
    inset: 0;
    position: absolute;
    width: 100%;
  }

  .sci-particle-mobile {
    display: none;
  }

  .sci-stage-scene,
  .sci-stage-pane {
    inset: 0;
    position: absolute;
  }

  .sci-stage-scene {
    background:
      radial-gradient(circle at 16% 8%, rgba(38, 192, 174, .14), transparent 34%),
      #071d34;
    overflow: hidden;
  }

  .sci-stage-pane {
    animation: sci-stage-enter 420ms ease both;
    display: grid;
    min-height: 0;
  }

  .sci-stage-image {
    height: 100%;
    min-height: 0;
    width: 100%;
  }

  .sci-stage-image-contain {
    background: #06182b;
    object-fit: contain;
  }

  .sci-stage-pane-focus {
    padding: 18px;
  }

  .sci-stage-label {
    background: rgba(5, 25, 46, .9);
    border: 1px solid rgba(127, 176, 201, .42);
    border-radius: 10px;
    bottom: 18px;
    color: #ffffff;
    display: grid;
    gap: 3px;
    left: 18px;
    max-width: min(420px, calc(100% - 36px));
    padding: 10px 12px;
    position: absolute;
  }

  .sci-stage-label strong,
  .sci-layer-readout strong,
  .sci-interface-readout strong {
    font-size: 13px;
    line-height: 1.25;
  }

  .sci-stage-label span,
  .sci-layer-readout p {
    color: rgba(234, 244, 247, .76);
    font-size: 11px;
    line-height: 1.42;
  }

  .sci-parameter-strip {
    bottom: 16px;
    display: grid;
    gap: 6px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    left: 16px;
    position: absolute;
    right: 16px;
  }

  .sci-parameter-strip span {
    background: rgba(5, 25, 46, .92);
    border: 1px solid rgba(38, 192, 174, .46);
    border-radius: 7px;
    color: rgba(234, 244, 247, .8);
    font-size: 10.5px;
    line-height: 1.2;
    padding: 7px 9px;
  }

  .sci-parameter-strip b {
    color: #62d5cb;
    font-size: 12px;
    margin-right: 4px;
  }

  .sci-stage-pane-split {
    gap: 16px;
    grid-template-columns: minmax(0, 1.45fr) minmax(180px, .75fr);
    padding: 18px;
  }

  .sci-figure-crop {
    background: #ffffff;
    border: 1px solid rgba(127, 176, 201, .46);
    border-radius: 10px;
    min-height: 0;
    overflow: hidden;
    position: relative;
  }

  .sci-figure-crop img {
    height: 200%;
    max-width: none;
    object-fit: fill;
    position: absolute;
    width: 200%;
  }

  .sci-crop-tem img {
    left: 0;
    top: 0;
  }

  .sci-crop-parameters img {
    left: -100%;
    top: 0;
  }

  .sci-crop-model img {
    left: 0;
    top: -100%;
  }

  .sci-crop-mesh img {
    left: -100%;
    top: -100%;
  }

  .sci-layer-readout,
  .sci-interface-readout {
    align-content: start;
    background: rgba(5, 25, 46, .9);
    border: 1px solid rgba(127, 176, 201, .38);
    border-radius: 10px;
    color: #ffffff;
    display: grid;
    gap: 10px;
    min-width: 0;
    padding: 16px;
  }

  .sci-layer-readout ol {
    display: grid;
    gap: 7px;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .sci-layer-readout li {
    align-items: center;
    color: rgba(234, 244, 247, .84);
    display: flex;
    font-size: 11px;
    gap: 8px;
  }

  .sci-layer-readout i {
    border: 1px solid rgba(255,255,255,.35);
    border-radius: 3px;
    display: inline-block;
    height: 11px;
    width: 11px;
  }

  .sci-region-vacuum { background: #071d34; }
  .sci-region-pt { background: #26c0ae; }
  .sci-region-cr { background: #cf7e3e; }
  .sci-region-si { background: #b8ddec; }

  .sci-interface-readout span,
  .sci-interface-readout em,
  .sci-interface-readout small,
  .sci-interface-readout b {
    border-radius: 7px;
    font-size: 10.5px;
    font-style: normal;
    line-height: 1.35;
    padding: 8px 9px;
  }

  .sci-interface-readout span {
    background: rgba(127, 176, 201, .14);
    border: 1px solid rgba(127, 176, 201, .28);
  }

  .sci-interface-readout b {
    color: #62d5cb;
    padding-block: 2px;
  }

  .sci-interface-readout em {
    background: rgba(38, 192, 174, .14);
    border: 1px solid rgba(38, 192, 174, .35);
    color: #89e0d8;
  }

  .sci-interface-readout small {
    border-top: 1px solid rgba(127, 176, 201, .25);
    color: rgba(234, 244, 247, .7);
    padding-inline: 0;
  }

  .sci-im3d-input-stage {
    align-items: stretch;
    gap: 14px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    padding: clamp(18px, 4vw, 38px);
  }

  .sci-im3d-input-card,
  .sci-im3d-projectile {
    align-content: center;
    background: rgba(5, 25, 46, .88);
    border: 1px solid rgba(127, 176, 201, .38);
    border-radius: 12px;
    color: #ffffff;
    display: grid;
    gap: 10px;
    min-width: 0;
    padding: clamp(14px, 2.6vw, 24px);
  }

  .sci-im3d-input-card span,
  .sci-im3d-projectile span {
    color: #66d8d0;
    font-family: var(--mono, "IBM Plex Mono", ui-monospace, monospace);
    font-size: 10px;
    letter-spacing: .07em;
    text-transform: uppercase;
  }

  .sci-im3d-input-card strong,
  .sci-im3d-projectile strong {
    font-size: clamp(13px, 2vw, 17px);
    line-height: 1.3;
  }

  .sci-im3d-input-card small {
    color: rgba(234, 244, 247, .68);
    font-size: 10.5px;
    line-height: 1.45;
  }

  .sci-im3d-projectile {
    border-color: rgba(38, 192, 174, .52);
    text-align: center;
  }

  .sci-im3d-projectile i {
    background: linear-gradient(90deg, transparent, #26c0ae);
    display: block;
    height: 3px;
    margin: 0 auto;
    position: relative;
    width: min(150px, 80%);
  }

  .sci-im3d-projectile i::after {
    border-bottom: 7px solid transparent;
    border-left: 11px solid #26c0ae;
    border-top: 7px solid transparent;
    content: "";
    position: absolute;
    right: -2px;
    top: -5px;
  }

  .sci-im3d-cascade-stage {
    overflow: hidden;
  }

  .sci-im3d-lattice {
    display: grid;
    gap: clamp(6px, 1.1vw, 12px);
    grid-template-columns: repeat(9, 1fr);
    inset: 15% 8% 10%;
    opacity: .9;
    position: absolute;
  }

  .sci-im3d-lattice i {
    aspect-ratio: 1;
    background: radial-gradient(circle at 32% 27%, #f8fdff, #8eb7d0 45%, #3d647d 100%);
    border: 1px solid rgba(255,255,255,.35);
    border-radius: 50%;
    box-shadow: inset -3px -4px 7px rgba(5,25,46,.28);
    display: block;
  }

  .sci-im3d-lattice i.is-cr {
    background: radial-gradient(circle at 32% 27%, #ffecec, #b65a58 45%, #6e292d 100%);
  }

  .sci-im3d-lattice i.is-vacancy {
    background: rgba(5,25,46,.86);
    border: 2px dashed #ff6f79;
    box-shadow: none;
  }

  .sci-im3d-interstitial {
    background: radial-gradient(circle at 32% 27%, #fffce8, #f5c85d 45%, #a95f15 100%);
    border: 1px solid rgba(255,255,255,.65);
    border-radius: 50%;
    box-shadow: 0 0 0 5px rgba(245,200,93,.16);
    height: clamp(10px, 1.7vw, 16px);
    position: absolute;
    width: clamp(10px, 1.7vw, 16px);
  }

  .interstitial-a { left: 47%; top: 50%; }
  .interstitial-b { left: 66%; top: 62%; }
  .interstitial-c { left: 75%; top: 43%; }

  .sci-im3d-track {
    background: linear-gradient(90deg, #ffffff, #a8d6ef);
    border-radius: 999px;
    height: 3px;
    position: absolute;
    transform-origin: left center;
  }

  .track-primary { left: 4%; top: 23%; transform: rotate(20deg); width: 38%; }
  .track-recoil-a { left: 39%; top: 39%; transform: rotate(24deg); width: 34%; }
  .track-recoil-b { left: 48%; top: 47%; transform: rotate(-24deg); width: 28%; }

  .sci-im3d-collision {
    animation: sci-collision-pulse 1.4s ease-in-out infinite;
    background: #f0a93c;
    border: 2px solid #fff;
    border-radius: 50%;
    box-shadow: 0 0 0 9px rgba(240,169,60,.2);
    height: 14px;
    position: absolute;
    width: 14px;
  }

  .collision-primary { left: 39%; top: 37%; }
  .collision-secondary { animation-delay: .38s; left: 61%; top: 54%; }

  .sci-im3d-label {
    background: rgba(5,25,46,.92);
    border: 1px solid rgba(127,176,201,.4);
    border-radius: 7px;
    color: #eaf4f7;
    font-size: clamp(9px, 1.45vw, 12px);
    font-weight: 700;
    padding: 6px 8px;
    position: absolute;
  }

  .label-projectile { left: 5%; top: 11%; }
  .label-nuclear { left: 28%; top: 15%; }
  .label-recoil { right: 9%; top: 24%; }
  .label-defects { bottom: 7%; right: 8%; }

  .sci-im3d-output-grid {
    gap: 12px;
    grid-template-columns: minmax(0, 1.55fr) minmax(150px, .65fr);
    padding: 14px;
  }

  .sci-im3d-output-grid figure {
    background: #ffffff;
    border: 1px solid rgba(127,176,201,.42);
    border-radius: 10px;
    display: grid;
    grid-template-rows: minmax(0, 1fr) auto;
    margin: 0;
    min-height: 0;
    overflow: hidden;
  }

  .sci-im3d-output-grid img {
    height: 100%;
    min-height: 0;
    object-fit: contain;
    width: 100%;
  }

  .sci-im3d-output-grid figcaption {
    background: rgba(5,25,46,.94);
    color: #eaf4f7;
    font-size: 10px;
    font-weight: 700;
    line-height: 1.25;
    padding: 8px 10px;
  }

  @keyframes sci-stage-enter {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes sci-collision-pulse {
    0%, 100% { box-shadow: 0 0 0 3px rgba(240,169,60,.12); transform: scale(.92); }
    50% { box-shadow: 0 0 0 13px rgba(240,169,60,.22); transform: scale(1.08); }
  }

  .sci-frame-support {
    display: grid;
    gap: 0;
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  }

  .sci-legend,
  .sci-readouts {
    margin: 0;
    padding: clamp(20px, 3vw, 28px);
  }

  .sci-legend {
    border-right: 1px solid var(--sci-line);
    display: grid;
    gap: 13px;
    list-style: none;
  }

  .sci-legend-item {
    align-items: flex-start;
    display: grid;
    gap: 10px;
    grid-template-columns: 14px minmax(0, 1fr);
  }

  .sci-legend-swatch {
    border: 1px solid rgba(10, 37, 64, 0.18);
    border-radius: 4px;
    height: 14px;
    margin-top: 3px;
    width: 14px;
  }

  .sci-legend-label,
  .sci-readout-value {
    color: var(--sci-ink);
    display: block;
    font-size: 14px;
    font-weight: 650;
    line-height: 1.35;
  }

  .sci-legend-detail,
  .sci-readout-detail {
    color: var(--sci-muted);
    display: block;
    font-size: 12.5px;
    line-height: 1.45;
    margin-top: 2px;
  }

  .sci-readouts {
    display: grid;
    gap: 14px 18px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .sci-readout {
    min-width: 0;
  }

  .sci-readout dt {
    color: var(--sci-muted);
    font-family: var(--mono, "IBM Plex Mono", ui-monospace, monospace);
    font-size: 10.5px;
    letter-spacing: 0.08em;
    line-height: 1.35;
    margin-bottom: 5px;
    text-transform: uppercase;
  }

  .sci-readout dd {
    margin: 0;
    overflow-wrap: anywhere;
  }

  .sci-frame-source {
    background: var(--sci-mist);
    border-top: 1px solid var(--sci-line);
    color: var(--sci-muted);
    font-size: 12.5px;
    line-height: 1.55;
    padding: 14px clamp(20px, 3vw, 28px);
  }

  .sci-frame-source a {
    color: var(--sci-accent);
    font-weight: 650;
    text-underline-offset: 3px;
  }

  @media (max-width: 720px) {
    .sci-frame-heading {
      display: grid;
    }

    .sci-frame-actions {
      justify-content: flex-start;
    }

    .sci-runtime-status {
      flex-basis: auto;
      text-align: left;
    }

    .sci-canvas-shell {
      aspect-ratio: 16 / 10;
      min-height: 240px;
    }

    .sci-frame-support {
      grid-template-columns: 1fr;
    }

    .sci-stage-pane-split {
      gap: 10px;
      grid-template-columns: minmax(0, 1.3fr) minmax(145px, .7fr);
      padding: 10px;
    }

    .sci-layer-readout,
    .sci-interface-readout {
      gap: 7px;
      padding: 11px;
    }

    .sci-im3d-input-stage {
      gap: 9px;
      padding: 14px;
    }

    .sci-legend {
      border-bottom: 1px solid var(--sci-line);
      border-right: 0;
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 440px) {
    .sci-frame {
      border-radius: 14px;
    }

    .sci-frame-header {
      padding: 18px;
    }

    .sci-frame-actions {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      width: 100%;
    }

    .sci-button {
      width: 100%;
    }

    .sci-runtime-status {
      grid-column: 1 / -1;
    }

    .sci-mode-tabs,
    .sci-stage-tabs {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .sci-mode-tab,
    .sci-stage-tab {
      min-width: 0;
      padding-inline: 10px;
    }

    .sci-canvas-shell {
      aspect-ratio: 4 / 3;
      min-height: 240px;
    }

    .sci-particle-desktop {
      display: none;
    }

    .sci-particle-mobile {
      display: block;
    }

    .sci-legend,
    .sci-readouts {
      padding: 18px;
    }

    .sci-legend {
      grid-template-columns: 1fr;
    }

    .sci-parameter-strip {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .sci-stage-pane-split {
      grid-template-columns: 1fr;
      grid-template-rows: minmax(0, 1.25fr) minmax(0, .75fr);
    }

    .sci-layer-readout p,
    .sci-interface-readout small {
      display: none;
    }

    .sci-im3d-input-stage {
      grid-template-columns: 1fr;
      padding: 10px;
    }

    .sci-im3d-input-card,
    .sci-im3d-projectile {
      gap: 4px;
      padding: 9px 11px;
    }

    .sci-im3d-input-card small,
    .sci-im3d-projectile span {
      display: none;
    }

    .sci-im3d-output-grid {
      grid-template-columns: 1fr 35%;
      padding: 8px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .sci-button,
    .sci-mode-tab,
    .sci-stage-tab {
      transition: none;
    }

    .sci-stage-pane {
      animation: none;
    }

    .sci-im3d-collision {
      animation: none;
    }
  }
`;

function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }

    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  return reducedMotion;
}

function useElementInView(ref: RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      const timeout = window.setTimeout(() => setInView(true), 0);
      return () => window.clearTimeout(timeout);
    }

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "64px 0px", threshold: 0.08 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  return inView;
}

function useLoopPhase(
  active: boolean,
  reducedMotion: boolean,
  replayToken: number,
  duration: number,
  staticPhase: number,
) {
  const [phase, setPhase] = useState(staticPhase);
  const phaseRef = useRef(staticPhase);
  const previousReplay = useRef(replayToken);

  useEffect(() => {
    if (reducedMotion) {
      const frame = requestAnimationFrame(() => {
        phaseRef.current = staticPhase;
        setPhase(staticPhase);
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [reducedMotion, staticPhase]);

  useEffect(() => {
    if (previousReplay.current === replayToken) return;
    previousReplay.current = replayToken;
    const next = reducedMotion ? staticPhase : 0;
    const frame = requestAnimationFrame(() => {
      phaseRef.current = next;
      setPhase(next);
    });
    return () => cancelAnimationFrame(frame);
  }, [reducedMotion, replayToken, staticPhase]);

  useEffect(() => {
    if (!active || reducedMotion) return;

    let frame = 0;
    let previous = performance.now();

    const tick = (now: number) => {
      const elapsed = Math.min(now - previous, 80);
      previous = now;
      const next = (phaseRef.current + elapsed / duration) % 1;
      phaseRef.current = next;
      setPhase(next);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, duration, reducedMotion, replayToken]);

  return phase;
}

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function revealBetween(phase: number, start: number, end: number) {
  return clamp01((phase - start) / (end - start));
}

function sanitizeId(value: string) {
  return value.replace(/[^a-zA-Z0-9_-]/g, "");
}

function focusRovingButton(
  event: KeyboardEvent<HTMLButtonElement>,
  currentIndex: number,
  count: number,
  refs: RefObject<Array<HTMLButtonElement | null>>,
  activate: (index: number) => void,
) {
  let nextIndex = currentIndex;

  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    nextIndex = (currentIndex + 1) % count;
  } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    nextIndex = (currentIndex - 1 + count) % count;
  } else if (event.key === "Home") {
    nextIndex = 0;
  } else if (event.key === "End") {
    nextIndex = count - 1;
  } else {
    return;
  }

  event.preventDefault();
  activate(nextIndex);
  refs.current[nextIndex]?.focus();
}

export function ScientificAnimationFrame({
  id,
  title,
  description,
  legend,
  readouts,
  source,
  controls,
  onReplay,
  children,
}: ScientificAnimationFrameProps) {
  const frameRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const inView = useElementInView(frameRef);
  const [paused, setPaused] = useState(false);
  const [replayToken, setReplayToken] = useState(0);
  const active = inView && !paused && !reducedMotion;
  const safeId = sanitizeId(id);

  const runtime: ScientificAnimationRuntime = {
    active,
    inView,
    paused,
    reducedMotion,
    replayToken,
  };

  const status = reducedMotion
    ? "Static frame · reduced motion"
    : paused
      ? "Paused"
      : inView
        ? "Playing"
        : "Ready";

  const handleReplay = () => {
    setPaused(false);
    setReplayToken((value) => value + 1);
    onReplay?.();
  };

  return (
    <>
      <style>{SCIENTIFIC_ANIMATION_STYLES}</style>
      <article className="sci-frame" id={safeId} ref={frameRef}>
        <header className="sci-frame-header">
          <div className="sci-frame-heading">
            <div className="sci-frame-copy">
              <span className="sci-frame-badge">
                Conceptual visualization
              </span>
              <h3 className="sci-frame-title" id={`${safeId}-title`}>
                {title}
              </h3>
              <p className="sci-frame-description" id={`${safeId}-description`}>
                {description}
              </p>
            </div>
            <div className="sci-frame-actions" aria-label="Animation controls">
              <button
                aria-label={paused ? `Resume ${title}` : `Pause ${title}`}
                aria-pressed={paused}
                className="sci-button"
                disabled={reducedMotion}
                onClick={() => setPaused((value) => !value)}
                type="button"
              >
                {reducedMotion ? "Static frame" : paused ? "Resume" : "Pause"}
              </button>
              <button
                aria-label={`Replay ${title}`}
                className="sci-button"
                onClick={handleReplay}
                type="button"
              >
                Replay
              </button>
              <span className="sci-runtime-status">{status}</span>
            </div>
          </div>
          {controls ? (
            <div className="sci-extra-controls">{controls}</div>
          ) : null}
        </header>

        <div
          aria-describedby={`${safeId}-description`}
          aria-labelledby={`${safeId}-title`}
          className="sci-canvas-shell"
          role="img"
        >
          {typeof children === "function" ? children(runtime) : children}
        </div>

        <div className="sci-frame-support">
          <ul className="sci-legend" aria-label={`${title} legend`}>
            {legend.map((item) => (
              <li className="sci-legend-item" key={item.label}>
                <span
                  aria-hidden="true"
                  className="sci-legend-swatch"
                  style={{ background: item.color }}
                />
                <span>
                  <span className="sci-legend-label">{item.label}</span>
                  {item.detail ? (
                    <span className="sci-legend-detail">{item.detail}</span>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>

          <dl className="sci-readouts">
            {readouts.map((item) => (
              <div className="sci-readout" key={item.label}>
                <dt>{item.label}</dt>
                <dd>
                  <span className="sci-readout-value">{item.value}</span>
                  {item.detail ? (
                    <span className="sci-readout-detail">{item.detail}</span>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {source ? <div className="sci-frame-source">{source}</div> : null}
      </article>
    </>
  );
}

type SceneRuntimeProps = {
  runtime: ScientificAnimationRuntime;
};

type InteractionMode = "electron" | "damage";

type CollisionCascadeAnimationProps = {
  focus?: "combined" | "damage";
};

function wrapSvgLabel(value: string, maximumCharacters: number) {
  return value.split(/\s+/).reduce<string[]>((lines, word) => {
    const current = lines.at(-1);

    if (!current || current.length + word.length + 1 > maximumCharacters) {
      lines.push(word);
    } else {
      lines[lines.length - 1] = `${current} ${word}`;
    }

    return lines;
  }, []);
}

function SvgCallout({
  x,
  y,
  width,
  title,
  detail,
  tone = "#eaf4f7",
}: {
  x: number;
  y: number;
  width: number;
  title: string;
  detail?: string;
  tone?: string;
}) {
  const titleLines = wrapSvgLabel(
    title,
    Math.max(10, Math.floor((width - 20) / 8)),
  );
  const detailLines = detail
    ? wrapSvgLabel(detail, Math.max(12, Math.floor((width - 20) / 6.2)))
    : [];
  const detailStart = 20 + titleLines.length * 18 + 2;
  const height = detailLines.length
    ? detailStart + (detailLines.length - 1) * 15 + 10
    : 31 + (titleLines.length - 1) * 18;

  return (
    <g>
      <rect
        fill="rgba(5, 25, 46, .9)"
        height={height}
        rx="7"
        stroke={tone}
        strokeOpacity=".42"
        width={width}
        x={x}
        y={y}
      />
      <text fill={tone} fontSize="16" fontWeight="750">
        {titleLines.map((line, index) => (
          <tspan key={line} x={x + 10} y={y + 21 + index * 18}>
            {line}
          </tspan>
        ))}
      </text>
      {detailLines.length ? (
        <text fill="rgba(234,244,247,.72)" fontSize="12.3">
          {detailLines.map((line, index) => (
            <tspan
              key={line}
              x={x + 10}
              y={y + detailStart + index * 15}
            >
              {line}
            </tspan>
          ))}
        </text>
      ) : null}
    </g>
  );
}

function MobileSvgLabel({
  x,
  y,
  width,
  title,
  tone = "#eaf4f7",
}: {
  x: number;
  y: number;
  width: number;
  title: string;
  tone?: string;
}) {
  const lines = wrapSvgLabel(
    title,
    Math.max(9, Math.floor((width - 12) / 5.5)),
  );
  const height = 10 + lines.length * 12;

  return (
    <g>
      <rect
        fill="rgba(5, 25, 46, .94)"
        height={height}
        rx="5"
        stroke={tone}
        strokeOpacity=".48"
        width={width}
        x={x}
        y={y}
      />
      <text fill={tone} fontSize="10.5" fontWeight="750">
        {lines.map((line, index) => (
          <tspan key={line} x={x + 6} y={y + 14 + index * 12}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
}

function MobileElectronSignalScene({ phase }: { phase: number }) {
  const incoming = revealBetween(phase, 0.02, 0.22);
  const inelastic = revealBetween(phase, 0.17, 0.38);
  const elastic = revealBetween(phase, 0.34, 0.56);
  const signals = revealBetween(phase, 0.48, 0.84);

  return (
    <>
      <rect fill="rgba(9,35,62,.96)" height="238" width="360" y="62" />
      <line stroke="#77c9d0" strokeWidth="1.5" x1="12" x2="348" y1="62" y2="62" />
      <text fill="rgba(234,244,247,.7)" fontSize="7" fontWeight="700" x="14" y="57">VACUUM</text>
      <text fill="rgba(234,244,247,.7)" fontSize="7" fontWeight="700" x="14" y="75">SOLID</text>

      {Array.from({ length: 5 }).map((_, row) =>
        Array.from({ length: 8 }).map((__, column) => (
          <circle
            cx={31 + column * 43 + (row % 2) * 21}
            cy={92 + row * 42}
            fill="#819fb2"
            key={`${row}-${column}`}
            opacity=".78"
            r="7"
            stroke="rgba(235,246,250,.42)"
          />
        )),
      )}

      <path
        d="M180 30 L180 118 C180 137 164 158 145 175"
        fill="none"
        pathLength={1}
        stroke="#ffffff"
        strokeDasharray={1}
        strokeDashoffset={1 - Math.max(incoming, inelastic, elastic)}
        strokeLinecap="round"
        strokeWidth="2.4"
      />
      <circle cx="180" cy={30 + incoming * 88} fill="#ffffff" r="4" />

      <g opacity={inelastic}>
        <circle cx="180" cy="118" fill="#f0a93c" r="6" stroke="#fff" />
        <path d="M118 125 L171 120" stroke="#f0a93c" />
        <MobileSvgLabel x={5} y={108} width={113} title="Inelastic scattering" tone="#ffc36a" />
      </g>
      <g opacity={elastic}>
        <circle cx="145" cy="175" fill="#5bb4e8" r="6" stroke="#fff" />
        <path d="M110 190 L137 179" stroke="#5bb4e8" />
        <MobileSvgLabel x={5} y={178} width={105} title="Elastic scattering" tone="#74c8f1" />
      </g>

      <g opacity={signals}>
        <path d="M180 118 C144 93 108 72 70 46" fill="none" stroke="#f5c85d" strokeWidth="2" />
        <circle cx="70" cy="46" fill="#f5c85d" r="3.5" />
        <path d="M145 175 C193 133 249 88 322 45" fill="none" stroke="#5bb4e8" strokeWidth="2.2" />
        <circle cx="322" cy="45" fill="#5bb4e8" r="3.5" />
        <path d="M180 118 L266 53 l7 2 l-3 -7 l7 2 l-3 -7" fill="none" stroke="#f36c77" strokeWidth="2" />
        <path d="M180 118 C194 102 205 126 219 110 C233 94 244 118 258 102 C272 86 285 99 300 72" fill="none" stroke="#b69cff" strokeWidth="2" />

        <MobileSvgLabel x={4} y={4} width={98} title="Secondary electron" tone="#f5c85d" />
        <MobileSvgLabel x={255} y={4} width={101} title="Backscattered electron" tone="#74c8f1" />
        <MobileSvgLabel x={233} y={112} width={121} title="Characteristic X-ray" tone="#ff8790" />
        <MobileSvgLabel x={232} y={207} width={122} title="Visible / UV photon" tone="#c5b2ff" />
      </g>

      <MobileSvgLabel x={112} y={4} width={135} title="Incident primary electron" tone="#ffffff" />
    </>
  );
}

const MOBILE_DAMAGE_SITES = [
  { x: 130, y: 126 },
  { x: 190, y: 160 },
  { x: 210, y: 194 },
] as const;

function MobileDamageCascadeScene({ phase }: { phase: number }) {
  const incident = revealBetween(phase, 0.02, 0.24);
  const recoil = revealBetween(phase, 0.2, 0.63);
  const defects = revealBetween(phase, 0.52, 0.78);

  return (
    <>
      <rect fill="rgba(9,35,62,.96)" height="238" width="360" y="62" />
      <line stroke="#77c9d0" strokeWidth="1.5" x1="12" x2="348" y1="62" y2="62" />
      <text fill="rgba(234,244,247,.7)" fontSize="7" fontWeight="700" x="14" y="76">Fe MATRIX + FeNiAl PRECIPITATE</text>
      <circle cx="246" cy="171" fill="rgba(18,160,171,.08)" r="67" stroke="rgba(97,213,203,.55)" strokeDasharray="4 4" />

      {Array.from({ length: 6 }).map((_, row) =>
        Array.from({ length: 8 }).map((__, column) => {
          const x = 30 + column * 40 + (row % 2) * 20;
          const y = 92 + row * 34;
          const isDefect = MOBILE_DAMAGE_SITES.some((site) => site.x === x && site.y === y);
          const inPrecipitate = Math.hypot(x - 246, y - 171) < 63;
          return (
            <circle
              cx={x}
              cy={y}
              fill={inPrecipitate ? ((row + column) % 2 ? "#dc7659" : "#62b66d") : "#819fb2"}
              key={`${row}-${column}`}
              opacity={isDefect ? 1 - defects : inPrecipitate ? .96 : .72}
              r={inPrecipitate ? 8 : 7}
              stroke="rgba(235,246,250,.44)"
            />
          );
        }),
      )}

      <path
        d="M15 34 C55 55 91 86 130 126"
        fill="none"
        pathLength={1}
        stroke="#22c2b2"
        strokeDasharray={1}
        strokeDashoffset={1 - incident}
        strokeLinecap="round"
        strokeWidth="2.6"
      />
      <circle cx={15 + incident * 115} cy={34 + incident * 92} fill="#22c2b2" r="5" stroke="#fff" />

      <g opacity={revealBetween(phase, 0.13, 0.34)}>
        <circle cx="80" cy="82" fill="#f0a93c" r="4" />
        <MobileSvgLabel x={82} y={4} width={151} title="Electronic inelastic scattering" tone="#ffc36a" />
      </g>
      <g opacity={revealBetween(phase, 0.2, 0.42) * (1 - revealBetween(phase, 0.5, 0.7))}>
        <circle cx="130" cy="126" fill="#ff6f79" r="7" stroke="#fff" />
        <path d="M158 100 L137 120" stroke="#ff6f79" />
        <MobileSvgLabel x={154} y={70} width={181} title="Nuclear elastic scattering → PKA" tone="#ff8b94" />
      </g>

      <path
        d="M130 126 C151 137 172 150 190 160 C198 172 204 183 210 194"
        fill="none"
        pathLength={1}
        stroke="#a8d6ef"
        strokeDasharray={1}
        strokeDashoffset={1 - recoil}
        strokeLinecap="round"
        strokeWidth="2.4"
      />
      <path d="M190 160 C217 142 240 123 266 108" fill="none" stroke="#a8d6ef" strokeWidth="1.7" />
      <path d="M210 194 C238 207 262 225 284 243" fill="none" stroke="#a8d6ef" strokeWidth="1.7" />

      <g opacity={revealBetween(phase, 0.28, 0.5) * (1 - revealBetween(phase, 0.52, 0.72))}>
        <circle cx="151" cy="139" fill="#9bb6c6" r="7" stroke="#fff" />
        <MobileSvgLabel x={207} y={116} width={139} title="Primary knock-on atom (PKA)" tone="#d5efff" />
      </g>

      <g opacity={defects}>
        {MOBILE_DAMAGE_SITES.map((site) => (
          <circle cx={site.x} cy={site.y} fill="#071d34" key={`${site.x}-${site.y}`} r="8" stroke="#ff6f79" strokeDasharray="3 2" strokeWidth="2" />
        ))}
        {[{ x: 151, y: 145 }, { x: 208, y: 178 }, { x: 238, y: 215 }].map((site) => (
          <circle cx={site.x} cy={site.y} fill="#f5c85d" key={`${site.x}-${site.y}`} r="8" stroke="#fff4cf" />
        ))}
        <MobileSvgLabel x={5} y={217} width={72} title="Vacancy" tone="#ff8b94" />
        <MobileSvgLabel x={267} y={217} width={87} title="Interstitial" tone="#f5c85d" />
        <MobileSvgLabel x={98} y={260} width={164} title="Recoil path: momentum transfer" tone="#d5efff" />
      </g>

      <MobileSvgLabel x={4} y={4} width={72} title="Incident ion" tone="#5be0d3" />
      <MobileSvgLabel x={239} y={4} width={117} title="Neutron: nuclear scatter → PKA" tone="#ffffff" />
    </>
  );
}

function ElectronSignalScene({
  phase,
  atomGradientId,
}: {
  phase: number;
  atomGradientId: string;
}) {
  const incoming = revealBetween(phase, 0.02, 0.22);
  const inelastic = revealBetween(phase, 0.17, 0.38);
  const elastic = revealBetween(phase, 0.34, 0.56);
  const signals = revealBetween(phase, 0.48, 0.84);

  return (
    <>
      <rect fill="rgba(9, 35, 62, .96)" height="310" width="720" y="110" />
      <line stroke="#77c9d0" strokeWidth="2" x1="28" x2="692" y1="110" y2="110" />
      <text fill="rgba(234,244,247,.66)" fontSize="10" fontWeight="700" x="36" y="98">VACUUM</text>
      <text fill="rgba(234,244,247,.66)" fontSize="10" fontWeight="700" x="36" y="128">SOLID</text>

      {Array.from({ length: 6 }).map((_, row) =>
        Array.from({ length: 13 }).map((__, column) => (
          <circle
            cx={70 + column * 50 + (row % 2) * 25}
            cy={154 + row * 43}
            fill={`url(#${atomGradientId})`}
            key={`${row}-${column}`}
            opacity=".72"
            r="10.5"
            stroke="rgba(196,225,238,.42)"
          />
        )),
      )}

      <path
        d="M350 30 L350 154 C350 177 325 201 301 224"
        fill="none"
        pathLength={1}
        stroke="#f5f8fb"
        strokeDasharray={1}
        strokeDashoffset={1 - Math.max(incoming, inelastic, elastic)}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3.2"
      />
      <circle
        cx="350"
        cy={30 + incoming * 124}
        fill="#f5f8fb"
        r="5.8"
        stroke="#6dd5db"
        strokeWidth="1.5"
      />

      <g opacity={inelastic}>
        <circle cx="350" cy="154" fill="#f0a93c" r="8" stroke="#ffffff" strokeWidth="1.3" />
        <circle cx="350" cy="154" fill="none" r="15" stroke="#f0a93c" strokeOpacity=".44" strokeWidth="2" />
        <path d="M264 163 L334 156" stroke="#f0a93c" strokeWidth="1.4" />
        <SvgCallout
          x={35}
          y={137}
          width={229}
          title="Inelastic scattering"
          detail="energy transfer by excitation or ionization"
          tone="#ffc36a"
        />
      </g>

      <g opacity={elastic}>
        <circle cx="301" cy="224" fill="#5bb4e8" r="8" stroke="#ffffff" strokeWidth="1.3" />
        <circle cx="301" cy="224" fill="none" r="15" stroke="#5bb4e8" strokeOpacity=".44" strokeWidth="2" />
        <path d="M241 249 L287 232" stroke="#5bb4e8" strokeWidth="1.4" />
        <SvgCallout
          x={35}
          y={245}
          width={206}
          title="Elastic scattering"
          detail="direction changes with negligible energy loss"
          tone="#74c8f1"
        />
      </g>

      <path
        d="M301 224 C356 186 441 108 642 66"
        fill="none"
        pathLength={1}
        stroke="#5bb4e8"
        strokeDasharray={1}
        strokeDashoffset={1 - signals}
        strokeLinecap="round"
        strokeWidth="2.8"
      />
      <circle cx="642" cy="66" fill="#5bb4e8" opacity={signals} r="4.8" />

      <path
        d="M350 154 C292 135 210 108 91 70"
        fill="none"
        pathLength={1}
        stroke="#f5c85d"
        strokeDasharray={1}
        strokeDashoffset={1 - signals}
        strokeLinecap="round"
        strokeWidth="2.8"
      />
      <circle cx="91" cy="70" fill="#f5c85d" opacity={signals} r="4.8" />

      <g opacity={signals}>
        <SvgCallout
          x={32}
          y={18}
          width={212}
          title="Secondary electron"
          detail="low-energy electron escapes from near the surface"
          tone="#f5c85d"
        />
        <SvgCallout
          x={488}
          y={18}
          width={200}
          title="Backscattered electron"
          detail="the primary exits after elastic deflection"
          tone="#74c8f1"
        />

        <path d="M350 154 L505 75 l9 3 l-3 -9 l9 3 l-3 -9 l76 -30" fill="none" stroke="#f36c77" strokeWidth="2.5" />
        <SvgCallout
          x={484}
          y={143}
          width={205}
          title="Characteristic X-ray"
          detail="inner-shell ionization followed by radiative relaxation"
          tone="#ff8790"
        />

        <path d="M350 154 C367 136 382 163 399 145 C416 127 432 154 449 136 C466 118 482 145 499 127 C516 109 532 127 551 93" fill="none" stroke="#b69cff" strokeWidth="2.4" />
        <SvgCallout
          x={474}
          y={302}
          width={215}
          title="Visible / UV photon"
          detail="radiative de-excitation; material dependent"
          tone="#c5b2ff"
        />
      </g>

      <SvgCallout x={259} y={18} width={184} title="Incident primary electron" tone="#ffffff" />
    </>
  );
}

const DAMAGE_DEFECT_SITES = [
  { x: 283, y: 154 },
  { x: 329, y: 230 },
  { x: 398, y: 268 },
] as const;

function DamageCascadeScene({
  phase,
  matrixGradientId,
  alGradientId,
  niGradientId,
  interstitialGradientId,
}: {
  phase: number;
  matrixGradientId: string;
  alGradientId: string;
  niGradientId: string;
  interstitialGradientId: string;
}) {
  const incident = revealBetween(phase, 0.02, 0.24);
  const recoil = revealBetween(phase, 0.2, 0.63);
  const defects = revealBetween(phase, 0.52, 0.78);

  return (
    <>
      <rect fill="rgba(9, 35, 62, .96)" height="330" width="720" y="90" />
      <line stroke="#77c9d0" strokeWidth="2" x1="28" x2="692" y1="90" y2="90" />
      <text fill="rgba(234,244,247,.66)" fontSize="10" fontWeight="700" x="36" y="79">VACUUM</text>
      <text fill="rgba(234,244,247,.66)" fontSize="10" fontWeight="700" x="36" y="108">Fe MATRIX + FeNiAl PRECIPITATE</text>
      <circle cx="448" cy="242" fill="rgba(18,160,171,.09)" r="100" stroke="rgba(97,213,203,.42)" strokeDasharray="6 5" strokeWidth="1.5" />

      {Array.from({ length: 7 }).map((_, row) =>
        Array.from({ length: 13 }).map((__, column) => {
          const x = 76 + column * 46 + (row % 2) * 23;
          const y = 116 + row * 38;
          const isDefect = DAMAGE_DEFECT_SITES.some((site) => site.x === x && site.y === y);
          const inPrecipitate = Math.hypot(x - 448, y - 242) < 92;
          const gradient = inPrecipitate
            ? (row + column) % 2
              ? alGradientId
              : niGradientId
            : matrixGradientId;

          return (
            <circle
              cx={x}
              cy={y}
              fill={`url(#${gradient})`}
              key={`${row}-${column}`}
              opacity={isDefect ? 1 - defects : inPrecipitate ? .95 : .68}
              r={inPrecipitate ? 11 : 10}
              stroke="rgba(235,246,250,.38)"
            />
          );
        }),
      )}

      <path
        d="M44 30 C108 57 176 92 283 154"
        fill="none"
        pathLength={1}
        stroke="#22c2b2"
        strokeDasharray={1}
        strokeDashoffset={1 - incident}
        strokeLinecap="round"
        strokeWidth="3.4"
      />
      <circle cx={44 + incident * 239} cy={30 + incident * 124} fill="#22c2b2" r="7" stroke="#e9ffff" strokeWidth="1.5" />
      <SvgCallout x={33} y={18} width={116} title="Incident ion" tone="#5be0d3" />

      <g opacity={revealBetween(phase, 0.14, 0.33)}>
        <circle cx="184" cy="100" fill="#f0a93c" r="5" />
        <circle cx="208" cy="114" fill="#f0a93c" opacity=".72" r="3.5" />
        <path d="M204 70 L190 92" stroke="#f0a93c" strokeWidth="1.3" />
        <SvgCallout x={154} y={18} width={224} title="Electronic inelastic scattering" detail="electronic stopping: energy transferred to target electrons" tone="#ffc36a" />
      </g>

      <g opacity={revealBetween(phase, 0.2, 0.39) * (1 - revealBetween(phase, 0.48, 0.7))}>
        <circle cx="283" cy="154" fill="#ff6f79" r="9" stroke="#fff" strokeWidth="1.3" />
        <circle cx="283" cy="154" fill="none" r="18" stroke="#ff6f79" strokeOpacity=".5" strokeWidth="2" />
        <path d="M364 135 L301 151" stroke="#ff6f79" strokeWidth="1.4" />
        <SvgCallout x={364} y={111} width={235} title="Nuclear elastic scattering" detail="momentum transfer displaces an atom and creates the PKA" tone="#ff8b94" />
      </g>

      <path
        d="M283 154 C303 176 315 204 329 230 C354 247 375 257 398 268"
        fill="none"
        pathLength={1}
        stroke="#a8d6ef"
        strokeDasharray={1}
        strokeDashoffset={1 - recoil}
        strokeLinecap="round"
        strokeWidth="3"
      />
      <path
        d="M329 230 C370 215 410 196 452 166"
        fill="none"
        pathLength={1}
        stroke="#a8d6ef"
        strokeDasharray={1}
        strokeDashoffset={1 - revealBetween(phase, 0.34, 0.64)}
        strokeLinecap="round"
        strokeWidth="2.3"
      />
      <path
        d="M398 268 C440 280 478 304 518 338"
        fill="none"
        pathLength={1}
        stroke="#a8d6ef"
        strokeDasharray={1}
        strokeDashoffset={1 - revealBetween(phase, 0.43, 0.7)}
        strokeLinecap="round"
        strokeWidth="2.3"
      />

      <g opacity={revealBetween(phase, 0.28, 0.48) * (1 - revealBetween(phase, 0.52, 0.72))}>
        <circle cx="310" cy="195" fill={`url(#${matrixGradientId})`} r="9" stroke="#fff" strokeWidth="1" />
        <SvgCallout x={461} y={202} width={218} title="Primary knock-on atom (PKA)" detail="the first displaced lattice atom starts the cascade" tone="#d5efff" />
        <path d="M461 224 L323 199" stroke="#a8d6ef" strokeWidth="1.3" />
      </g>

      <g opacity={defects}>
        {DAMAGE_DEFECT_SITES.map((site) => (
          <circle
            cx={site.x}
            cy={site.y}
            fill="rgba(7,27,48,.9)"
            key={`${site.x}-${site.y}`}
            r="11"
            stroke="#ff6f79"
            strokeDasharray="4 3"
            strokeWidth="2.6"
          />
        ))}
        {[{ x: 307, y: 178 }, { x: 363, y: 251 }, { x: 433, y: 292 }].map((site) => (
          <circle
            cx={site.x}
            cy={site.y}
            fill={`url(#${interstitialGradientId})`}
            key={`${site.x}-${site.y}`}
            r="10.5"
            stroke="#fff4cf"
            strokeWidth="1.2"
          />
        ))}
        <path d="M188 300 L283 164" stroke="#ff6f79" strokeWidth="1.3" />
        <SvgCallout x={43} y={295} width={145} title="Vacancy" detail="empty original lattice site" tone="#ff8b94" />
        <path d="M523 328 L445 296" stroke="#f5c85d" strokeWidth="1.3" />
        <SvgCallout x={523} y={315} width={165} title="Interstitial" detail="displaced atom between sites" tone="#f5c85d" />
        <SvgCallout x={256} y={352} width={210} title="Recoil path" detail="momentum transfer leaves vacancy–interstitial pairs" tone="#d5efff" />
      </g>

      <g opacity={revealBetween(phase, 0.43, 0.62)}>
        <SvgCallout x={471} y={18} width={217} title="For neutron irradiation" detail="a nuclear scatter first generates the PKA" tone="#ffffff" />
        <path d="M578 61 C523 80 470 102 419 129" fill="none" stroke="#ffffff" strokeDasharray="5 5" strokeOpacity=".65" strokeWidth="1.4" />
      </g>
    </>
  );
}

function ParticleInteractionScene({
  runtime,
  forcedMode,
  onModeChange,
  onPhaseLabel,
}: SceneRuntimeProps & {
  forcedMode: InteractionMode | null;
  onModeChange: (mode: InteractionMode) => void;
  onPhaseLabel: (label: string) => void;
}) {
  const masterPhase = useLoopPhase(
    runtime.active,
    runtime.reducedMotion,
    runtime.replayToken,
    forcedMode ? 7200 : 14800,
    forcedMode === "damage" ? 0.78 : 0.42,
  );
  const mode: InteractionMode = forcedMode ?? (masterPhase < 0.5 ? "electron" : "damage");
  const phase = forcedMode ? masterPhase : (masterPhase % 0.5) * 2;
  const label =
    mode === "electron"
      ? phase < 0.24
        ? "Primary electron enters the solid"
        : phase < 0.5
          ? "Elastic deflection and inelastic energy transfer"
          : "Measurable electron and photon signals"
      : phase < 0.24
        ? "Incident ion; neutron damage begins with a PKA"
        : phase < 0.52
          ? "Nuclear collision and branching atomic recoils"
          : "Vacancies and interstitials form Frenkel pairs";
  const id = sanitizeId(useId());

  useEffect(() => onModeChange(mode), [mode, onModeChange]);
  useEffect(() => onPhaseLabel(label), [label, onPhaseLabel]);

  return (
    <>
      <svg
        aria-hidden="true"
        className="sci-svg sci-particle-desktop"
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 720 420"
      >
        <defs>
          <radialGradient id={`${id}-matrix`} cx="32%" cy="26%" r="72%">
            <stop offset="0" stopColor="#f8fdff" />
            <stop offset=".32" stopColor="#afc9d8" />
            <stop offset="1" stopColor="#56778e" />
          </radialGradient>
          <radialGradient id={`${id}-al`} cx="32%" cy="26%" r="72%">
            <stop offset="0" stopColor="#fff4ea" />
            <stop offset=".32" stopColor="#f58a62" />
            <stop offset="1" stopColor="#8f342c" />
          </radialGradient>
          <radialGradient id={`${id}-ni`} cx="32%" cy="26%" r="72%">
            <stop offset="0" stopColor="#f0ffe9" />
            <stop offset=".32" stopColor="#67c77b" />
            <stop offset="1" stopColor="#247441" />
          </radialGradient>
          <radialGradient id={`${id}-interstitial`} cx="32%" cy="26%" r="72%">
            <stop offset="0" stopColor="#fffce8" />
            <stop offset=".35" stopColor="#f5c85d" />
            <stop offset="1" stopColor="#b46b16" />
          </radialGradient>
        </defs>
        <rect fill="#071d34" height="420" width="720" />
        {mode === "electron" ? (
          <ElectronSignalScene phase={phase} atomGradientId={`${id}-matrix`} />
        ) : (
          <DamageCascadeScene
            alGradientId={`${id}-al`}
            interstitialGradientId={`${id}-interstitial`}
            matrixGradientId={`${id}-matrix`}
            niGradientId={`${id}-ni`}
            phase={phase}
          />
        )}
      </svg>
      <svg
        aria-hidden="true"
        className="sci-svg sci-particle-mobile"
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 360 300"
      >
        <rect fill="#071d34" height="300" width="360" />
        {mode === "electron" ? (
          <MobileElectronSignalScene phase={phase} />
        ) : (
          <MobileDamageCascadeScene phase={phase} />
        )}
      </svg>
    </>
  );
}

export function CollisionCascadeAnimation({
  focus = "combined",
}: CollisionCascadeAnimationProps = {}) {
  const lockedToDamage = focus === "damage";
  const [manualMode, setManualMode] = useState<InteractionMode | null>(lockedToDamage ? "damage" : null);
  const [currentMode, setCurrentMode] = useState<InteractionMode>(lockedToDamage ? "damage" : "electron");
  const [phaseLabel, setPhaseLabel] = useState(
    lockedToDamage ? "Vacancies and interstitials form Frenkel pairs" : "Primary electron enters the solid",
  );

  const controls = lockedToDamage ? null : (
    <div aria-label="Particle-solid interaction mode" className="sci-mode-tabs" role="group">
      {([
        ["electron", "Electron → signals"],
        ["damage", "Ion / neutron → damage"],
      ] as const).map(([mode, label]) => (
        <button
          aria-pressed={manualMode === mode}
          className="sci-mode-tab"
          key={mode}
          onClick={() => {
            setManualMode(mode);
            setCurrentMode(mode);
          }}
          type="button"
        >
          {label}
        </button>
      ))}
      <button
        aria-pressed={manualMode === null}
        className="sci-mode-tab"
        onClick={() => setManualMode(null)}
        type="button"
      >
        Auto sequence
      </button>
    </div>
  );

  const legend =
    currentMode === "electron"
      ? [
          { label: "Primary / backscattered electron", color: "#5bb4e8", detail: "The incident electron may leave after elastic deflection" },
          { label: "Elastic scattering", color: "#74c8f1", detail: "Changes direction with little energy loss" },
          { label: "Inelastic scattering", color: "#f0a93c", detail: "Transfers energy through excitation or ionization" },
          { label: "Emitted signals", color: "linear-gradient(90deg,#f5c85d,#ff8790,#c5b2ff)", detail: "Secondary electrons, characteristic X-rays, and material-dependent optical photons" },
        ]
      : [
          { label: "Incident ion / PKA", color: "#22c2b2", detail: "For neutron irradiation, a nuclear scatter first creates the PKA" },
          { label: "Recoil path", color: "#a8d6ef", detail: "Momentum transferred through successive nuclear collisions" },
          { label: "Vacancy", color: "radial-gradient(circle,transparent 40%,#ff6f79 43% 62%,transparent 65%)", detail: "Hollow ring: the atom's original lattice site is empty" },
          { label: "Interstitial", color: "radial-gradient(circle at 35% 30%,#fffce8,#f5c85d 42%,#b46b16)", detail: "Filled sphere: a displaced atom rests between lattice sites" },
        ];

  return (
    <ScientificAnimationFrame
      controls={controls}
      description={
        lockedToDamage
          ? "An ion—or a primary knock-on atom created by neutron scattering—transfers momentum through nuclear collisions. Branching recoils displace lattice atoms and leave vacancy–interstitial pairs."
          : "Two distinct mechanisms are shown separately: electron scattering produces measurable electron and photon signals; ion or neutron irradiation produces primary knock-on atoms, recoil cascades, vacancies, and interstitials."
      }
      id={lockedToDamage ? "collision-cascade-animation" : "particle-solid-flagship-animation"}
      legend={legend}
      onReplay={() => {
        if (!lockedToDamage) setManualMode(null);
      }}
      readouts={[
        { label: "Active mechanism", value: currentMode === "electron" ? "Electron–solid signals" : "Displacement damage" },
        { label: "Current stage", value: phaseLabel, detail: "Labels and paths belong only to the active mechanism" },
        currentMode === "electron"
          ? { label: "Detected outputs", value: "BSE · SE · X-ray · optical photon", detail: "Optical emission depends on the target material" }
          : { label: "Damage unit", value: "Frenkel pair", detail: "One vacancy plus one interstitial" },
        { label: "Status", value: "Explanatory schematic", detail: "No illustrative path or count is presented as measured data" },
      ]}
      source="Mechanisms are separated by projectile and outcome. Electron-signal labels follow electron-transport physics; the damage mode follows binary-collision and primary-damage terminology."
      title={lockedToDamage ? "Primary damage and a collision cascade" : "Electron signals, primary damage, and a collision cascade"}
    >
      {(runtime) => (
        <ParticleInteractionScene
          forcedMode={lockedToDamage ? "damage" : manualMode}
          onModeChange={setCurrentMode}
          onPhaseLabel={setPhaseLabel}
          runtime={runtime}
        />
      )}
    </ScientificAnimationFrame>
  );
}

type ElectronMode = "solid" | "scatter";

function waveY(x: number) {
  return 192 - 34 * Math.cos(((x - 40) / 190) * Math.PI * 2);
}

function makeWavePath() {
  let path = `M40 ${waveY(40).toFixed(1)}`;
  for (let x = 48; x <= 600; x += 8) {
    path += ` L${x} ${waveY(x).toFixed(1)}`;
  }
  return path;
}

const ELECTRON_WAVE_PATH = makeWavePath();
const ELECTRON_WAVE_FILL = `${ELECTRON_WAVE_PATH} L600 285 L40 285 Z`;

function ElectronSolidScene({
  runtime,
  onEventLabel,
}: SceneRuntimeProps & { onEventLabel: (label: string) => void }) {
  const phase = useLoopPhase(
    runtime.active,
    runtime.reducedMotion,
    runtime.replayToken,
    6200,
    0.76,
  );
  const incoming = revealBetween(phase, 0, 0.24);
  const transport = revealBetween(phase, 0.2, 0.58);
  const emission = revealBetween(phase, 0.5, 0.83);
  const eventLabel =
    phase < 0.22
      ? "Primary electron arrives"
      : phase < 0.54
        ? "Scattering inside the solid"
        : "Secondary and backscattered emission";

  useEffect(() => onEventLabel(eventLabel), [eventLabel, onEventLabel]);

  return (
    <svg
      aria-hidden="true"
      className="sci-svg"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 640 400"
    >
      <rect fill="rgba(8,33,60,.2)" height="400" width="640" />
      <rect fill="#b8ddec" height="75" width="560" x="40" y="285" />
      <path d={ELECTRON_WAVE_FILL} fill="#cf7e3e" opacity="0.92" />
      <path
        d={ELECTRON_WAVE_PATH}
        fill="none"
        stroke="#26c0ae"
        strokeLinejoin="round"
        strokeWidth="12"
      />

      <path
        d="M112 45 C125 82 151 120 178 164"
        fill="none"
        pathLength={1}
        stroke="#eaf4f7"
        strokeDasharray={1}
        strokeDashoffset={1 - incoming}
        strokeLinecap="round"
        strokeWidth="2.8"
      />
      <circle
        cx={112 + incoming * 66}
        cy={45 + incoming * 119}
        fill="#eaf4f7"
        opacity={phase < 0.32 ? 1 : 0}
        r="5"
      />

      <path
        d="M178 164 C210 207 252 193 278 235 C302 267 327 275 350 267"
        fill="none"
        pathLength={1}
        stroke="#eaf4f7"
        strokeDasharray={1}
        strokeDashoffset={1 - transport}
        strokeLinecap="round"
        strokeWidth="2.5"
      />
      {[
        { x: 218, y: 202, color: "#f0a93c" },
        { x: 278, y: 235, color: "#5bb4e8" },
        { x: 350, y: 267, color: "#5bb4e8" },
      ].map((event, index) => (
          <circle
            cx={event.x}
            cy={event.y}
            fill={event.color}
            key={`${event.x}-${event.y}`}
            opacity={revealBetween(transport, index * 0.22, index * 0.22 + 0.25)}
            r="5"
            stroke="rgba(255,255,255,.6)"
            strokeWidth="1"
          />
        ))}

      <path
        d="M218 202 C198 156 167 128 142 92"
        fill="none"
        pathLength={1}
        stroke="#f3c567"
        strokeDasharray={1}
        strokeDashoffset={1 - emission}
        strokeLinecap="round"
        strokeWidth="2.2"
      />
      <path
        d="M350 267 C407 224 442 180 477 125 C495 96 522 79 551 68"
        fill="none"
        pathLength={1}
        stroke="#eaf4f7"
        strokeDasharray={1}
        strokeDashoffset={1 - emission}
        strokeLinecap="round"
        strokeWidth="2.2"
      />

      <g opacity={incoming}>
        <SvgCallout x={224} y={18} width={193} title="Incident primary electron" tone="#ffffff" />
      </g>
      <g opacity={revealBetween(phase, 0.25, 0.44)}>
        <path d="M92 240 L205 207" stroke="#f0a93c" strokeWidth="1.3" />
        <SvgCallout x={38} y={238} width={205} title="Inelastic scattering" detail="energy transfer creates a secondary excitation" tone="#ffc36a" />
      </g>
      <g opacity={revealBetween(phase, 0.43, 0.62)}>
        <path d="M396 249 L362 263" stroke="#5bb4e8" strokeWidth="1.3" />
        <SvgCallout x={396} y={234} width={211} title="Elastic scattering" detail="large-angle deflection can return the primary" tone="#74c8f1" />
      </g>
      <g opacity={emission}>
        <SvgCallout x={29} y={27} width={190} title="Secondary electron" detail="low-energy emitted electron" tone="#f5c85d" />
        <SvgCallout x={430} y={27} width={181} title="Backscattered electron" detail="the primary leaves the solid" tone="#74c8f1" />
      </g>

      <g fill="rgba(234,244,247,.84)" fontSize="10" fontWeight="700">
        <text x="502" y="187">Pt coating</text>
        <text x="510" y="250">Cr grating</text>
        <text x="503" y="330">Si substrate</text>
      </g>
    </svg>
  );
}

const SCATTER_EVENTS = [
  { x: 180, y: 124, kind: "elastic", at: 0.22 },
  { x: 286, y: 94, kind: "inelastic", at: 0.43 },
  { x: 401, y: 224, kind: "elastic", at: 0.64 },
  { x: 530, y: 170, kind: "inelastic", at: 0.8 },
] as const;

function ScatterScene({
  runtime,
  onEventLabel,
}: SceneRuntimeProps & { onEventLabel: (label: string) => void }) {
  const phase = useLoopPhase(
    runtime.active,
    runtime.reducedMotion,
    runtime.replayToken,
    6400,
    0.84,
  );
  const pathReveal = revealBetween(phase, 0.03, 0.84);
  const eventIndex = Math.min(
    SCATTER_EVENTS.length - 1,
    Math.max(0, Math.floor(pathReveal * SCATTER_EVENTS.length)),
  );
  const currentEvent = SCATTER_EVENTS[eventIndex];
  const eventLabel =
    currentEvent.kind === "elastic"
      ? "Elastic deflection"
      : "Inelastic energy transfer";

  useEffect(() => onEventLabel(eventLabel), [eventLabel, onEventLabel]);

  return (
    <svg
      aria-hidden="true"
      className="sci-svg"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 640 400"
    >
      <rect fill="rgba(8,33,60,.22)" height="400" width="640" />
      {Array.from({ length: 6 }).map((_, row) =>
        Array.from({ length: 10 }).map((__, column) => (
          <g key={`${row}-${column}`}>
            <circle
              cx={70 + column * 56 + (row % 2) * 24}
              cy={72 + row * 50}
              fill="rgba(127,176,201,.16)"
              r="11"
              stroke="rgba(127,176,201,.24)"
              strokeWidth="1"
            />
            <circle
              cx={70 + column * 56 + (row % 2) * 24}
              cy={72 + row * 50}
              fill="rgba(226,239,248,.25)"
              r="2.5"
            />
          </g>
        )),
      )}

      <path
        d="M66 43 L180 124 L286 94 L401 224 L530 170 L585 286"
        fill="none"
        pathLength={1}
        stroke="#eaf4f7"
        strokeDasharray={1}
        strokeDashoffset={1 - pathReveal}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />

      {SCATTER_EVENTS.map((event) => {
        const visible = revealBetween(phase, event.at, event.at + 0.08);
        const color = event.kind === "elastic" ? "#5bb4e8" : "#f0a93c";
        return (
          <g key={`${event.x}-${event.y}`} opacity={visible}>
            <circle
              cx={event.x}
              cy={event.y}
              fill={color}
              r="7"
              stroke="#ffffff"
              strokeWidth="1.2"
            />
            <circle
              cx={event.x}
              cy={event.y}
              fill="none"
              r="13"
              stroke={color}
              strokeOpacity="0.42"
              strokeWidth="1.5"
            />
          </g>
        );
      })}

      <path
        d="M286 94 C326 68 355 51 382 45"
        fill="none"
        opacity={revealBetween(phase, 0.44, 0.58)}
        stroke="#f3c567"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <circle
        cx="382"
        cy="45"
        fill="#f3c567"
        opacity={revealBetween(phase, 0.52, 0.62)}
        r="4.5"
      />
      <SvgCallout
        x={28}
        y={18}
        width={222}
        title={currentEvent.kind === "elastic" ? "Elastic scattering" : "Inelastic scattering"}
        detail={
          currentEvent.kind === "elastic"
            ? "direction changes; kinetic energy is approximately conserved"
            : "energy is transferred to an excitation in the solid"
        }
        tone={currentEvent.kind === "elastic" ? "#74c8f1" : "#ffc36a"}
      />
      <g opacity={revealBetween(phase, 0.44, 0.62)}>
        <SvgCallout x={373} y={18} width={230} title="Secondary excitation" detail="possible product of the inelastic event" tone="#f5c85d" />
      </g>
    </svg>
  );
}

export function ElectronTransportExplorer() {
  const [mode, setMode] = useState<ElectronMode>("solid");
  const [eventLabel, setEventLabel] = useState(
    "Secondary and backscattered emission",
  );
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const reactId = sanitizeId(useId());
  const modes: Array<{ key: ElectronMode; label: string }> = [
    { key: "solid", label: "Electron–solid" },
    { key: "scatter", label: "Elastic / inelastic" },
  ];
  const selectMode = (index: number) => {
    setMode(modes[index].key);
  };

  const controls = (
    <div
      aria-label="Electron transport view"
      className="sci-mode-tabs"
      role="tablist"
    >
      {modes.map((item, index) => (
        <button
          aria-controls={`${reactId}-${item.key}-panel`}
          aria-selected={mode === item.key}
          className="sci-mode-tab"
          id={`${reactId}-${item.key}-tab`}
          key={item.key}
          onClick={() => selectMode(index)}
          onKeyDown={(event) =>
            focusRovingButton(
              event,
              index,
              modes.length,
              tabRefs,
              selectMode,
            )
          }
          ref={(element) => {
            tabRefs.current[index] = element;
          }}
          role="tab"
          tabIndex={mode === item.key ? 0 : -1}
          type="button"
        >
          {item.label}
        </button>
      ))}
    </div>
  );

  const legend =
    mode === "solid"
      ? [
          {
            label: "Primary electron",
            color: "#eaf4f7",
            detail: "Incident or backscattered trajectory",
          },
          {
            label: "Elastic scattering",
            color: "#5bb4e8",
            detail: "Changes the primary-electron direction",
          },
          {
            label: "Inelastic scattering",
            color: "#f0a93c",
            detail: "Transfers energy and can create a secondary excitation",
          },
          {
            label: "Secondary electron",
            color: "#f3c567",
            detail: "Lower-energy electron leaving the solid",
          },
          {
            label: "Material geometry",
            color: "#26c0ae",
            detail: "Layered surface represented explicitly",
          },
        ]
      : [
          {
            label: "Electron trajectory",
            color: "#eaf4f7",
            detail: "Successive sampled free paths",
          },
          {
            label: "Elastic event",
            color: "#5bb4e8",
            detail: "Direction changes; energy is approximately conserved",
          },
          {
            label: "Inelastic event",
            color: "#f0a93c",
            detail: "Energy is transferred to the solid",
          },
          {
            label: "Secondary excitation",
            color: "#f3c567",
            detail: "Possible outcome of an inelastic interaction",
          },
        ];

  return (
    <ScientificAnimationFrame
      controls={controls}
      description={
        mode === "solid"
          ? "A primary electron enters a layered surface, scatters through the material, and may leave as a backscattered electron or generate lower-energy secondary electrons."
          : "A trajectory is assembled from sampled free paths. Elastic events mainly change direction, while inelastic events transfer energy and can create secondary excitations."
      }
      id="electron-transport-explorer"
      legend={legend}
      readouts={[
        {
          label: "View",
          value:
            mode === "solid"
              ? "Electron–solid interaction"
              : "Scattering event chain",
        },
        {
          label: "Current event",
          value: eventLabel,
          detail: "Illustrative process stage",
        },
        {
          label: "Physics",
          value:
            mode === "solid"
              ? "Transport + emission"
              : "Elastic + inelastic",
        },
        {
          label: "Numbers",
          value: "Not simulated here",
          detail: "No illustrative path is presented as measured data",
        },
      ]}
      source="Conceptual transport views based on Monte Carlo electron–solid interaction and scattering workflows; geometry and paths are explanatory rather than measured."
      title={
        mode === "solid"
          ? "Electron transport through a structured surface"
          : "Elastic and inelastic scattering"
      }
    >
      {(runtime) => (
        <div
          aria-labelledby={`${reactId}-${mode}-tab`}
          id={`${reactId}-${mode}-panel`}
          role="tabpanel"
        >
          {mode === "solid" ? (
            <ElectronSolidScene
              key="electron-solid"
              onEventLabel={setEventLabel}
              runtime={runtime}
            />
          ) : (
            <ScatterScene
              key="scatter"
              onEventLabel={setEventLabel}
              runtime={runtime}
            />
          )}
        </div>
      )}
    </ScientificAnimationFrame>
  );
}

const GEOMETRY_STAGES = [
  {
    label: "TEM evidence",
    detail: "Pt-coated Cr wave grating on a Si substrate",
  },
  {
    label: "TEM parameters",
    detail: "λ/2, h, b, 2s, θ, and the 10 nm Pt coating",
  },
  {
    label: "Layered model",
    detail: "Vacuum, Pt, Cr, and Si assigned as regions",
  },
  {
    label: "Tagged 3D mesh",
    detail: "Every triangular facet retains material adjacency",
  },
];

function GeometryStageScene({
  runtime,
  manualStage,
  onStageChange,
}: SceneRuntimeProps & {
  manualStage: number | null;
  onStageChange: (stage: number) => void;
}) {
  const phase = useLoopPhase(
    runtime.active,
    runtime.reducedMotion,
    runtime.replayToken,
    9600,
    0.88,
  );
  const automaticStage = Math.min(3, Math.floor(phase * 4));
  const stage = manualStage ?? automaticStage;

  useEffect(() => onStageChange(stage), [onStageChange, stage]);

  return (
    <div aria-hidden="true" className="sci-stage-scene sci-geometry-scene">
      {stage === 0 ? (
        <div className="sci-stage-pane sci-stage-pane-focus">
          <div className="sci-figure-crop sci-crop-tem">
            <img alt="" src="/assets/img/wave_3d_grating.jpg" />
          </div>
          <div className="sci-stage-label">
            <strong>1 · Enlarged experimental TEM cross-section</strong>
            <span>The measured Cr waveform—not an idealized generic curve—is the geometric starting point.</span>
          </div>
        </div>
      ) : null}

      {stage === 1 ? (
        <div className="sci-stage-pane sci-stage-pane-split">
          <div className="sci-figure-crop sci-crop-parameters">
            <img alt="" src="/assets/img/wave_3d_grating.jpg" />
          </div>
          <div className="sci-layer-readout" aria-label="TEM-derived geometry parameters">
            <strong>Measured → parameterised waveform</strong>
            <ol>
              <li><b>λ/2</b>&nbsp; wave period</li>
              <li><b>h</b>&nbsp; peak-to-valley height</li>
              <li><b>b</b>&nbsp; valley-to-substrate base height</li>
              <li><b>2s</b>&nbsp; linewidth shrinkage</li>
              <li><b>θ</b>&nbsp; wave-peak tilt angle</li>
            </ol>
            <p>The Cr grating is coated by 10 nm Pt; the fitted geometry follows the experimental TEM profile.</p>
          </div>
        </div>
      ) : null}

      {stage === 2 ? (
        <div className="sci-stage-pane sci-stage-pane-split">
          <div className="sci-figure-crop sci-crop-model">
            <img alt="" src="/assets/img/wave_3d_grating.jpg" />
          </div>
          <div className="sci-layer-readout">
            <strong>Five-line material model</strong>
            <ol>
              <li><i className="sci-region-vacuum" />Vacuum</li>
              <li><i className="sci-region-pt" />Pt surface coating</li>
              <li><i className="sci-region-cr" />Cr wave grating</li>
              <li><i className="sci-region-si" />Si substrate</li>
            </ol>
            <p>The three central lines define the simulation region of interest; the conformal Pt layer follows the curved Cr surface above Si.</p>
          </div>
        </div>
      ) : null}

      {stage === 3 ? (
        <div className="sci-stage-pane sci-stage-pane-split">
          <div className="sci-figure-crop sci-crop-mesh">
            <img alt="" src="/assets/img/wave_3d_grating.jpg" />
          </div>
          <div className="sci-interface-readout">
            <strong>Material-aware trajectory crossing</strong>
            <span>Current finite element: material = Cr</span>
            <b>electron crosses a triangular facet →</b>
            <span>look up adjacent element: material = Pt</span>
            <em>Switch to Pt elastic, inelastic, and surface data</em>
            <small>If no adjacent material element exists, the neighbour is vacuum and the code applies its surface escape / reflection condition.</small>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function GeometryPipelineAnimation() {
  const [currentStage, setCurrentStage] = useState(3);
  const [manualStage, setManualStage] = useState<number | null>(null);
  const stageRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const selectStage = (index: number) => {
    setManualStage(index);
    setCurrentStage(index);
  };

  const controls = (
    <div
      aria-label="Geometry construction stages"
      className="sci-stage-tabs"
      role="group"
    >
      {GEOMETRY_STAGES.map((stage, index) => (
        <button
          aria-pressed={currentStage === index}
          className="sci-stage-tab"
          key={stage.label}
          onClick={() => selectStage(index)}
          onKeyDown={(event) =>
            focusRovingButton(
              event,
              index,
              GEOMETRY_STAGES.length,
              stageRefs,
              selectStage,
            )
          }
          ref={(element) => {
            stageRefs.current[index] = element;
          }}
          type="button"
        >
          {index + 1}. {stage.label}
        </button>
      ))}
    </div>
  );

  return (
    <ScientificAnimationFrame
      controls={controls}
      description="The actual TEM evidence is converted into measured geometric parameters, a stacked Si–Cr–Pt model, and a triangular mesh whose facets retain material and adjacency information for Monte Carlo transport."
      id="geometry-pipeline-animation"
      legend={[
        {
          label: "Si substrate",
          color: "#b8ddec",
          detail: "Bottom material region",
        },
        {
          label: "Cr grating",
          color: "#cf7e3e",
          detail: "Wave-shaped structured material",
        },
        {
          label: "Pt coating",
          color: "#26c0ae",
          detail: "Thin layer following the Cr surface",
        },
        {
          label: "Tagged mesh facet",
          color: "#929ea6",
          detail: "Stores current and adjacent material regions",
        },
      ]}
      onReplay={() => setManualStage(null)}
      readouts={[
        {
          label: "Current stage",
          value: `${currentStage + 1} of ${GEOMETRY_STAGES.length}`,
          detail: GEOMETRY_STAGES[currentStage].label,
        },
        {
          label: "Input",
          value: currentStage === 0 ? "TEM cross-section" : "Validated prior stage",
        },
        {
          label: "Output",
          value: GEOMETRY_STAGES[currentStage].detail,
        },
        {
          label: "Transport query",
          value: "Triangle → adjacent region",
          detail: "Si, Cr, Pt, or vacuum determines the next interaction law",
        },
      ]}
      source="The four visual stages use the supplied 2021 research figure: enlarged TEM cross-section, parameterised Si–Cr–Pt model, five-line simulation region, and 3D mesh. The interface readout explains the material-ownership logic separately."
      title="From TEM morphology to a layered 3D mesh"
    >
      {(runtime) => (
        <GeometryStageScene
          manualStage={manualStage}
          onStageChange={setCurrentStage}
          runtime={runtime}
        />
      )}
    </ScientificAnimationFrame>
  );
}

function lineScanMean(position: number) {
  const distance = Math.abs(position);
  const insideLine = distance <= 25;

  if (insideLine) {
    return 27 + 35 * Math.pow(distance / 25, 1.65);
  }

  return 10 + 10 * Math.sqrt((distance - 25) / 25);
}

function lineScanSpread(position: number) {
  const distance = Math.abs(position);

  if (distance <= 25) {
    return 6 + 6 * Math.exp(-Math.pow((distance - 25) / 5.5, 2));
  }

  return 3 + 2 * ((distance - 25) / 25);
}

function plotPoint(position: number, intensity: number): [number, number] {
  const x = 94 + ((position + 50) / 100) * 504;
  const y = 330 - intensity * 3.2;
  return [x, y];
}

function makeEnsemblePath(index: number) {
  const modelOffset = (index - 4) / 4;
  let path = "";

  for (let position = -50; position <= 50; position += 2) {
    const mean = lineScanMean(position);
    const spread = lineScanSpread(position);
    const localVariation =
      modelOffset * spread * 0.78 +
      Math.sin(position * 0.11 + index * 0.7) * spread * 0.22 +
      (index % 2 ? 1 : -1) * Math.sign(position || 1) * spread * 0.08;
    const [x, y] = plotPoint(position, mean + localVariation);
    path += `${position === -50 ? "M" : " L"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }

  return path;
}

function makeMeanPath() {
  let path = "";
  for (let position = -50; position <= 50; position += 2) {
    const [x, y] = plotPoint(position, lineScanMean(position));
    path += `${position === -50 ? "M" : " L"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return path;
}

function makeBandPath() {
  const upper: Array<[number, number]> = [];
  const lower: Array<[number, number]> = [];
  for (let position = -50; position <= 50; position += 2) {
    const mean = lineScanMean(position);
    const spread = lineScanSpread(position);
    upper.push(plotPoint(position, mean + spread));
    lower.push(plotPoint(position, mean - spread));
  }

  const first = upper[0];
  let path = `M${first[0]} ${first[1].toFixed(1)}`;
  upper.slice(1).forEach(([x, y]) => {
    path += ` L${x} ${y.toFixed(1)}`;
  });
  lower.reverse().forEach(([x, y]) => {
    path += ` L${x} ${y.toFixed(1)}`;
  });
  return `${path} Z`;
}

const ENSEMBLE_PATHS = Array.from({ length: 9 }, (_, index) =>
  makeEnsemblePath(index),
);
const ENSEMBLE_BAND = makeBandPath();
const ENSEMBLE_MEAN = makeMeanPath();

function UncertaintyScene({ runtime }: SceneRuntimeProps) {
  const phase = useLoopPhase(
    runtime.active,
    runtime.reducedMotion,
    runtime.replayToken,
    7800,
    0.9,
  );
  const visibleCurves = Math.max(
    1,
    Math.min(ENSEMBLE_PATHS.length, Math.ceil(phase * 12)),
  );
  const envelopeOpacity = revealBetween(phase, 0.46, 0.72);
  const meanReveal = revealBetween(phase, 0.58, 0.82);

  return (
    <svg
      aria-hidden="true"
      className="sci-svg"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 640 400"
    >
      <rect fill="rgba(8,33,60,.2)" height="400" width="640" />
      <text fill="rgba(234,244,247,.72)" fontSize="12" fontWeight="700" x="270" y="372">Scan position, x (nm)</text>
      <text fill="rgba(234,244,247,.72)" fontSize="11" fontWeight="700" transform="rotate(-90 24 235)" x="24" y="235">Secondary-electron intensity, I(x) (a.u.)</text>
      <text fill="rgba(234,244,247,.75)" fontSize="11" fontWeight="700" x="95" y="37">Published CD-SEM campaign · 17,280 model combinations</text>
      {[74, 138, 202, 266, 330].map((y) => (
        <line
          key={y}
          stroke="rgba(127,176,201,.16)"
          strokeWidth="1"
          x1="94"
          x2="598"
          y1={y}
          y2={y}
        />
      ))}
      <line
        stroke="rgba(234,244,247,.55)"
        strokeWidth="1.5"
        x1="94"
        x2="598"
        y1="330"
        y2="330"
      />
      <line
        stroke="rgba(234,244,247,.55)"
        strokeWidth="1.5"
        x1="94"
        x2="94"
        y1="62"
        y2="330"
      />
      {[-50, -25, 0, 25, 50].map((tick) => {
        const [x] = plotPoint(tick, 0);
        return (
          <g key={tick}>
            <line stroke="rgba(234,244,247,.55)" x1={x} x2={x} y1="330" y2="336" />
            <text fill="rgba(234,244,247,.68)" fontSize="10" textAnchor="middle" x={x} y="350">{tick}</text>
          </g>
        );
      })}
      {[0, 20, 40, 60, 80].map((tick) => {
        const [, y] = plotPoint(-50, tick);
        return (
          <text fill="rgba(234,244,247,.68)" fontSize="10" key={tick} textAnchor="end" x="86" y={y + 3}>{tick}</text>
        );
      })}

      <path
        d={ENSEMBLE_BAND}
        fill="rgba(18,160,171,.20)"
        opacity={envelopeOpacity}
        stroke="rgba(18,160,171,.52)"
        strokeWidth="1.2"
      />

      {ENSEMBLE_PATHS.map((path, index) => (
        <path
          d={path}
          fill="none"
          key={path}
          opacity={index < visibleCurves ? 0.42 : 0}
          stroke="#8eb7d0"
          strokeWidth="1.35"
        />
      ))}

      <path
        d={ENSEMBLE_MEAN}
        fill="none"
        pathLength={1}
        stroke="#eaf4f7"
        strokeDasharray={1}
        strokeDashoffset={1 - meanReveal}
        strokeLinecap="round"
        strokeWidth="3"
      />
    </svg>
  );
}

export function UncertaintyEnsembleAnimation() {
  return (
    <ScientificAnimationFrame
      description="Candidate physical inputs produce a family of CD-SEM line-scan profiles. Their spread is strongly position-dependent: it widens near high-sensitivity edges and changes across the feature instead of forming a constant-width band."
      id="uncertainty-ensemble-animation"
      legend={[
        {
          label: "Candidate model realization",
          color: "#8eb7d0",
          detail: "One elastic-potential, dielectric, optical-ELF, and work-function choice",
        },
        {
          label: "Position-dependent uncertainty band",
          color: "rgba(18,160,171,.45)",
          detail: "Its width changes with scan position—the key result",
        },
        {
          label: "Mean line-scan profile, Ī(x)",
          color: "#eaf4f7",
          detail: "Central profile across the candidate model set",
        },
      ]}
      readouts={[
        {
          label: "Published campaign",
          value: "17,280 model combinations",
          detail: "The paper's 384 × 3 × 5 × 3 input campaign",
        },
        {
          label: "Elastic model space",
          value: "384 ELSEPA potential combinations",
          detail: "Used for comparison and model-selection uncertainty",
        },
        {
          label: "Broader inelastic catalogue",
          value: "3 formalisms × 4 ELF datasets = 12",
          detail: "LLM, FPA, and SMA with the supplied optical-data catalogue",
        },
        {
          label: "Main finding",
          value: "Band width varies with x",
          detail: "A constant uncertainty band would erase the result",
        },
      ]}
      source="The profile shape follows the supplied CD-SEM evidence: a lateral line scan with edge-sensitive, non-uniform model spread. The animation is explanatory and does not reproduce numerical values from a single run."
      title="From model ensemble to a position-dependent uncertainty band"
    >
      {(runtime) => <UncertaintyScene runtime={runtime} />}
    </ScientificAnimationFrame>
  );
}

const IM3D_STAGES = [
  "Bulk Fe–Cr target + projectile definition",
  "Binary-collision transport + recoil cascade",
  "Primary-damage tally versus depth and range",
  "Fe–Cr depth maps + 3D damage distribution",
];

function IM3DScene({
  runtime,
  onStageChange,
}: SceneRuntimeProps & { onStageChange: (stage: number) => void }) {
  const phase = useLoopPhase(
    runtime.active,
    runtime.reducedMotion,
    runtime.replayToken,
    11200,
    0.86,
  );
  const stage = Math.min(3, Math.floor(phase * 4));

  useEffect(() => onStageChange(stage), [onStageChange, stage]);

  return (
    <div aria-hidden="true" className="sci-stage-scene sci-im3d-scene">
      {stage === 0 ? (
        <div className="sci-stage-pane sci-im3d-input-stage">
          <div className="sci-im3d-input-card">
            <span>Target</span>
            <strong>Homogeneous bulk Fe–Cr</strong>
            <small>Material composition and displacement thresholds</small>
          </div>
          <div className="sci-im3d-projectile">
            <i />
            <strong>Fe / Cr ion or PKA</strong>
            <span>species · energy · direction · starting point</span>
          </div>
          <div className="sci-im3d-input-card">
            <span>Calculation</span>
            <strong>IM3D binary-collision Monte Carlo</strong>
            <small>Bulk cell—not a wave, coating, or layered surface</small>
          </div>
        </div>
      ) : null}

      {stage === 1 ? (
        <div className="sci-stage-pane sci-im3d-cascade-stage">
          <div className="sci-im3d-lattice">
            {Array.from({ length: 72 }).map((_, index) => (
              <i
                className={`${index % 5 === 0 ? "is-cr" : "is-fe"}${[25, 38, 52].includes(index) ? " is-vacancy" : ""}`}
                key={index}
              />
            ))}
          </div>
          <span className="sci-im3d-interstitial interstitial-a" />
          <span className="sci-im3d-interstitial interstitial-b" />
          <span className="sci-im3d-interstitial interstitial-c" />
          <div className="sci-im3d-track track-primary" />
          <div className="sci-im3d-track track-recoil-a" />
          <div className="sci-im3d-track track-recoil-b" />
          <div className="sci-im3d-collision collision-primary" />
          <div className="sci-im3d-collision collision-secondary" />
          <span className="sci-im3d-label label-projectile">ion / PKA</span>
          <span className="sci-im3d-label label-nuclear">nuclear elastic collision</span>
          <span className="sci-im3d-label label-recoil">branching recoil paths</span>
          <span className="sci-im3d-label label-defects">vacancy + interstitial tally</span>
        </div>
      ) : null}

      {stage === 2 ? (
        <div className="sci-stage-pane">
          <img alt="" className="sci-stage-image sci-stage-image-contain" src="/assets/img/fecr_dpa.jpg" />
          <div className="sci-stage-label">
            <strong>3 · Primary-damage tally</strong>
            <span>Fe/Cr ion and PKA damage are accumulated as DPA versus depth and range.</span>
          </div>
        </div>
      ) : null}

      {stage === 3 ? (
        <div className="sci-stage-pane sci-im3d-output-grid">
          <figure>
            <img alt="" src="/assets/img/fecr_contour.jpg" />
            <figcaption>Energy–depth / range DPA maps</figcaption>
          </figure>
          <figure>
            <img alt="" src="/assets/img/fecr_3d.jpg" />
            <figcaption>50 keV 3D primary-damage distribution</figcaption>
          </figure>
        </div>
      ) : null}
    </div>
  );
}

export function IM3DWorkflowAnimation() {
  const [currentStage, setCurrentStage] = useState(3);

  return (
    <ScientificAnimationFrame
      description="A homogeneous bulk Fe–Cr target and an incident Fe/Cr ion or primary knock-on atom enter IM3D. Binary collisions generate recoil cascades, which are tallied as depth profiles, energy–depth maps, and three-dimensional primary-damage distributions."
      id="im3d-workflow-animation"
      legend={[
        {
          label: "Bulk Fe / Cr target",
          color: "linear-gradient(90deg,#8eb7d0,#b65a58)",
          detail: "Homogeneous material target used in this campaign",
        },
        {
          label: "Incident ion / PKA and recoils",
          color: "#eaf4f7",
          detail: "Binary-collision paths through the bulk target",
        },
        {
          label: "Primary-damage tally",
          color: "#d69a43",
          detail: "Vacancies, interstitials, and DPA accumulated versus depth",
        },
        {
          label: "Output fields",
          color: "#12a0ab",
          detail: "Depth-resolved profiles and damage distributions",
        },
      ]}
      readouts={[
        {
          label: "Workflow stage",
          value: `${currentStage + 1} of ${IM3D_STAGES.length}`,
          detail: IM3D_STAGES[currentStage],
        },
        {
          label: "Inputs",
          value: "Bulk Fe–Cr + Fe/Cr ion or PKA",
        },
        {
          label: "Transport",
          value: "Binary-collision Monte Carlo",
        },
        {
          label: "Outputs",
          value: "Depth profiles · energy maps · 3D damage",
          detail: "The output stages use the supplied Fe–Cr research figures",
        },
      ]}
      source="The workflow is restricted to the supplied bulk Fe–Cr IM3D campaign. Export to CRT or MMonCa is a downstream option and is not shown as part of the Fe–Cr primary-damage calculation."
      title="From IM3D inputs to radiation-damage outputs"
    >
      {(runtime) => (
        <IM3DScene onStageChange={setCurrentStage} runtime={runtime} />
      )}
    </ScientificAnimationFrame>
  );
}
