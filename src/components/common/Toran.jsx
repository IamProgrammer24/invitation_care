import { useId } from "react";
import "./Toran.css";

const ROPE = [
  [120, 10],
  [161, 21],
  [202, 28],
  [278, 28],
  [319, 21],
  [360, 10],
];
const DROP = [50, 78, 106, 134];
const BELLS = [161, 319];

export default function Toran({ className = "" }) {
  const uid = useId().replace(/:/g, "");
  const A = `${uid}a`;
  const B = `${uid}b`;

  return (
    <svg
      className={`toran ${className}`}
      viewBox="0 0 480 200"
      aria-hidden="true"
    >
      <defs>
        <g id={A}>
          {Array.from({ length: 8 }, (_, i) => (
            <circle
              key={i}
              cx="0"
              cy="-10"
              r="6"
              transform={`rotate(${i * 45})`}
              fill="var(--accent-2)"
            />
          ))}
          <circle r="10" fill="var(--accent)" />
          <circle r="4" fill="var(--accent-2)" />
        </g>
        <g id={B}>
          {Array.from({ length: 8 }, (_, i) => (
            <circle
              key={i}
              cx="0"
              cy="-10"
              r="6"
              transform={`rotate(${i * 45})`}
              fill="var(--accent)"
            />
          ))}
          <circle r="10" fill="var(--accent-2)" />
          <circle r="4" fill="var(--accent)" />
        </g>
      </defs>

      <path
        d="M120 10 Q240 50 360 10"
        fill="none"
        stroke="#c99a2e"
        strokeWidth="3"
      />

      <path
        d="M240 36 C212 28 194 52 200 68 C224 68 238 54 240 36Z"
        fill="#2f6b2a"
      />
      <path
        d="M240 36 C268 28 286 52 280 68 C256 68 242 54 240 36Z"
        fill="#3a7d33"
      />

      <line
        x1="240"
        y1="30"
        x2="240"
        y2="150"
        stroke="#c99a2e"
        strokeWidth="2"
      />
      {DROP.map((y, i) => (
        <g
          key={y}
          transform={`translate(240 ${y}) scale(${i === 3 ? 0.92 : 1.05})`}
        >
          <use href={`#${i % 2 ? B : A}`} />
        </g>
      ))}

      {ROPE.map(([x, y], i) => (
        <g key={x} transform={`translate(${x} ${y})`}>
          <use href={`#${i % 2 ? A : B}`} />
        </g>
      ))}

      {BELLS.map((x, i) => (
        <g
          key={x}
          className="swing"
          style={{
            transformOrigin: `${x}px 21px`,
            animationDelay: `${i * 0.7}s`,
          }}
        >
          {Array.from({ length: 8 }, (_, k) => (
            <circle key={k} cx={x} cy={34 + k * 8.5} r="2.7" fill="#fff7ec" />
          ))}
          <path
            d={`M${x - 8} 116 Q${x - 8} 98 ${x} 98 Q${x + 8} 98 ${x + 8} 116 Z`}
            fill="var(--accent)"
          />
          <rect
            x={x - 9}
            y="115"
            width="18"
            height="3"
            rx="1.5"
            fill="#c98a00"
          />
          <circle cx={x} cy="121" r="2.6" fill="#c98a00" />
        </g>
      ))}
    </svg>
  );
}
