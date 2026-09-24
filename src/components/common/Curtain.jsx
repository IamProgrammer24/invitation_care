import { CLOSED_BODY, CLOSED_EDGE } from "./curtainPaths";
import "./Curtain.css";
import Tassel from "./Tassel";
import TwistedCord from "./TwistedCord";

export default function Curtain({ side }) {
  return (
    <div className={`curtain curtain-${side}`}>
      <div className="curtain-art">
        <svg
          viewBox="0 0 100 570"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id={`folds-${side}`}
              gradientUnits="userSpaceOnUse"
              x1="0"
              y1="0"
              x2="10.5"
              y2="0"
              gradientTransform="rotate(7)"
              spreadMethod="repeat"
            >
              <stop offset="0" style={{ stopColor: "var(--curtain-a)" }} />
              <stop offset="0.5" style={{ stopColor: "var(--curtain-b)" }} />
              <stop offset="1" style={{ stopColor: "var(--curtain-a)" }} />
            </linearGradient>

            <linearGradient id={`shade-${side}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#000" stopOpacity="0" />
              <stop offset="1" stopColor="#000" stopOpacity="0.3" />
            </linearGradient>

            <pattern
              id={`motif-${side}`}
              width="20"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M10 10 l3 7 -3 7 -3 -7z"
                fill="var(--accent)"
                fillOpacity="0.55"
              />
              <circle
                cx="10"
                cy="17"
                r="1.2"
                style={{ fill: "var(--curtain-a)" }}
              />
            </pattern>
          </defs>

          <path
            className="morph-edge"
            d={CLOSED_EDGE}
            transform="translate(3.5,0)"
            fill="none"
            stroke="#000"
            strokeOpacity="0.2"
            strokeWidth="12"
            vectorEffect="non-scaling-stroke"
          />

          <path
            className="morph-body"
            d={CLOSED_BODY}
            fill={`url(#folds-${side})`}
          />
          <path
            className="morph-body"
            d={CLOSED_BODY}
            fill={`url(#motif-${side})`}
          />
          <path
            className="morph-body"
            d={CLOSED_BODY}
            fill={`url(#shade-${side})`}
          />

          <path
            className="morph-edge"
            d={CLOSED_EDGE}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="6"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            className="morph-edge"
            d={CLOSED_EDGE}
            transform="translate(-6,0)"
            fill="none"
            stroke="#fff7ec"
            strokeOpacity="0.85"
            strokeWidth="2.5"
            strokeDasharray="0.1 9"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            className="morph-edge"
            d={CLOSED_EDGE}
            transform="translate(-10.5,0)"
            fill="none"
            stroke="var(--accent)"
            strokeOpacity="0.7"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <svg
          className="rope"
          viewBox="0 0 100 14"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <TwistedCord d="M0 4 Q50 11 100 6" width={6} />
        </svg>
        <span className="tassel">
          <Tassel className="tassel-svg" />
        </span>
      </div>
    </div>
  );
}
