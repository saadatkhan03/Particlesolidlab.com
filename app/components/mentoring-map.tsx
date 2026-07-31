"use client";

import { ScientificAnimationFrame } from "./scientific-animations";

const MAP_STYLES = `
  .mentoring-map-motion {
    height: 100%;
    width: 100%;
  }

  .mentoring-map-svg {
    display: block;
    height: 100%;
    width: 100%;
  }

  .mentoring-map-svg .map-route-base {
    fill: none;
    stroke: rgba(127, 176, 201, 0.28);
    stroke-linecap: round;
    stroke-width: 2;
  }

  .mentoring-map-svg .map-route-flow {
    animation: mentoring-map-flow 3.8s linear infinite;
    animation-play-state: paused;
    fill: none;
    stroke: #57c5c7;
    stroke-dasharray: 10 15;
    stroke-linecap: round;
    stroke-width: 2.5;
  }

  .mentoring-map-svg .map-pulse {
    animation: mentoring-map-pulse 2.8s ease-out infinite;
    animation-play-state: paused;
    fill: none;
    opacity: 0.22;
    stroke: #57c5c7;
    stroke-width: 2;
    transform-box: fill-box;
    transform-origin: center;
  }

  .mentoring-map-motion.is-active .map-route-flow,
  .mentoring-map-motion.is-active .map-pulse {
    animation-play-state: running;
  }

  .mentoring-map-svg .map-label-bg {
    fill: rgba(7, 28, 49, 0.92);
    stroke: rgba(127, 176, 201, 0.42);
    stroke-width: 1;
  }

  .mentoring-map-svg .map-label-text {
    fill: #e7f1f6;
    font-family: var(--mono, "IBM Plex Mono", ui-monospace, monospace);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.02em;
  }

  .mentoring-map-svg .map-guide {
    fill: #8ca9bc;
    font-family: var(--mono, "IBM Plex Mono", ui-monospace, monospace);
    font-size: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  @keyframes mentoring-map-flow {
    to {
      stroke-dashoffset: -100;
    }
  }

  @keyframes mentoring-map-pulse {
    0% {
      opacity: 0.45;
      transform: scale(0.55);
    }
    72%,
    100% {
      opacity: 0;
      transform: scale(1.65);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .mentoring-map-svg .map-route-flow,
    .mentoring-map-svg .map-pulse {
      animation: none;
    }
  }
`;

const routes = [
  {
    d: "M112 224 Q205 78 340 88",
    delay: "0s",
  },
  {
    d: "M112 224 Q330 58 574 128",
    delay: "0.55s",
  },
  {
    d: "M112 224 Q286 374 510 300",
    delay: "1.1s",
  },
  {
    d: "M112 224 Q150 332 274 332",
    delay: "1.65s",
  },
  {
    d: "M112 224 Q355 152 638 242",
    delay: "2.2s",
  },
] as const;

const nodes = [
  {
    x: 340,
    y: 88,
    label: "Master’s / PhD",
    labelX: 273,
    labelY: 112,
    width: 134,
    delay: "0s",
  },
  {
    x: 574,
    y: 128,
    label: "Postdoctoral",
    labelX: 520,
    labelY: 152,
    width: 108,
    delay: "0.5s",
  },
  {
    x: 510,
    y: 300,
    label: "Fellowship",
    labelX: 462,
    labelY: 324,
    width: 96,
    delay: "1s",
  },
  {
    x: 274,
    y: 332,
    label: "Scholarship",
    labelX: 224,
    labelY: 356,
    width: 100,
    delay: "1.5s",
  },
  {
    x: 638,
    y: 242,
    label: "Faculty",
    labelX: 600,
    labelY: 266,
    width: 76,
    delay: "2s",
  },
] as const;

export function MentoringOpportunityMap() {
  return (
    <>
      <style>{MAP_STYLES}</style>
      <ScientificAnimationFrame
        id="mentoring-opportunity-map"
        title="From an applicant profile to a focused application"
        description="A schematic map of how one evidence-based profile can be adapted for different academic routes. The paths represent tailored decisions, not guaranteed placements."
        legend={[
          {
            label: "Applicant profile",
            color: "#12a0ab",
            detail: "Experience, evidence, constraints, and goals.",
          },
          {
            label: "Tailored route",
            color: "#57c5c7",
            detail: "A target-specific document and contact strategy.",
          },
          {
            label: "Academic target",
            color: "#e7f1f6",
            detail: "Programme or position selected by fit.",
          },
        ]}
        readouts={[
          {
            label: "Application strategy",
            value: "Tailored",
            detail: "No generic mass application.",
          },
          {
            label: "Review format",
            value: "One-to-one",
            detail: "Advice responds to the applicant’s record.",
          },
          {
            label: "Scope",
            value: "Academic pathways",
            detail: "Study, research, fellowship, and faculty routes.",
          },
          {
            label: "Outcome",
            value: "No guarantee",
            detail: "Admissions, funding, and hiring remain third-party decisions.",
          },
        ]}
        source={
          <>
            Schematic guidance framework. Destination labels describe application
            categories, not a placement record or success-rate claim.
          </>
        }
      >
        {(runtime) => (
          <div
            className={`mentoring-map-motion ${runtime.active ? "is-active" : ""}`}
            key={runtime.replayToken}
          >
            <svg
              aria-hidden="true"
              className="mentoring-map-svg"
              focusable="false"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 720 430"
            >
              <defs>
                <pattern
                  height="28"
                  id="mentoring-map-grid"
                  patternUnits="userSpaceOnUse"
                  width="28"
                >
                  <circle cx="2" cy="2" fill="rgba(127,176,201,.18)" r="1.2" />
                </pattern>
                <radialGradient id="mentoring-profile-glow">
                  <stop offset="0" stopColor="#12a0ab" stopOpacity=".58" />
                  <stop offset="1" stopColor="#12a0ab" stopOpacity="0" />
                </radialGradient>
              </defs>

              <rect fill="#08213c" height="430" width="720" />
              <rect
                fill="url(#mentoring-map-grid)"
                height="398"
                width="688"
                x="16"
                y="16"
              />
              <text className="map-guide" x="32" y="42">
                Profile-led opportunity mapping
              </text>

              <g>
                {routes.map((route) => (
                  <path
                    className="map-route-base"
                    d={route.d}
                    key={`base-${route.d}`}
                  />
                ))}
                {routes.map((route) => (
                  <path
                    className="map-route-flow"
                    d={route.d}
                    key={`flow-${route.d}`}
                    pathLength={100}
                    style={{ animationDelay: route.delay }}
                  />
                ))}
              </g>

              <g>
                {nodes.map((node) => (
                  <g key={node.label}>
                    <circle
                      className="map-pulse"
                      cx={node.x}
                      cy={node.y}
                      r="15"
                      style={{ animationDelay: node.delay }}
                    />
                    <circle
                      cx={node.x}
                      cy={node.y}
                      fill="#57c5c7"
                      r="5"
                    />
                    <rect
                      className="map-label-bg"
                      height="26"
                      rx="8"
                      width={node.width}
                      x={node.labelX}
                      y={node.labelY}
                    />
                    <text
                      className="map-label-text"
                      textAnchor="middle"
                      x={node.labelX + node.width / 2}
                      y={node.labelY + 17}
                    >
                      {node.label}
                    </text>
                  </g>
                ))}
              </g>

              <g>
                <circle
                  cx="112"
                  cy="224"
                  fill="url(#mentoring-profile-glow)"
                  r="56"
                />
                <circle
                  cx="112"
                  cy="224"
                  fill="#0a2846"
                  r="27"
                  stroke="#12a0ab"
                  strokeWidth="2"
                />
                <circle cx="112" cy="216" fill="#e7f1f6" r="7" />
                <path
                  d="M99 237a13 13 0 0 1 26 0"
                  fill="#e7f1f6"
                />
                <rect
                  className="map-label-bg"
                  height="28"
                  rx="8"
                  width="112"
                  x="56"
                  y="264"
                />
                <text
                  className="map-label-text"
                  textAnchor="middle"
                  x="112"
                  y="282"
                >
                  Your profile
                </text>
              </g>
            </svg>
          </div>
        )}
      </ScientificAnimationFrame>
    </>
  );
}
