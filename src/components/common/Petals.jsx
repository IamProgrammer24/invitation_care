import "./Petals.css";

const FLOWERS = Array.from({ length: 10 }, (_, i) => ({
  left: (i * 37 + 8) % 90,
  delay: (i * 1.3) % 8,
  duration: 10 + (i % 4) * 2,
  size: 12 + (i % 3) * 4,
  variant: i % 2 ? "fl-b" : "fl-a",
}));

const RING = Array.from({ length: 8 }, (_, i) => i * 45);

export default function Petals() {
  return (
    <div className="petals" aria-hidden="true">
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <g id="fl-a">
            {RING.map((deg) => (
              <circle
                key={deg}
                cx="0"
                cy="-9.5"
                r="6"
                transform={`rotate(${deg})`}
                fill="var(--accent-2)"
              />
            ))}
            <circle r="9" fill="var(--accent)" />
            <circle r="3.5" fill="var(--accent-2)" />
          </g>
          <g id="fl-b">
            {RING.map((deg) => (
              <circle
                key={deg}
                cx="0"
                cy="-9.5"
                r="6"
                transform={`rotate(${deg})`}
                fill="var(--accent)"
              />
            ))}
            <circle r="9" fill="var(--accent-2)" />
            <circle r="3.5" fill="var(--accent)" />
          </g>
        </defs>
      </svg>

      {FLOWERS.map((f, i) => (
        <svg
          key={i}
          className="flower"
          viewBox="-16 -16 32 32"
          style={{
            left: `${f.left}%`,
            width: f.size,
            height: f.size,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
          }}
        >
          <use href={`#${f.variant}`} />
        </svg>
      ))}
    </div>
  );
}
