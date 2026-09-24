import "./Petals.css";

const PETALS = Array.from({ length: 10 }, (_, i) => ({
  left: (i * 37 + 8) % 96,
  delay: (i * 1.3) % 8,
  duration: 9 + (i % 4) * 2,
  size: 10 + (i % 3) * 4,
  color: i % 2 ? "var(--accent)" : "var(--accent-2)",
}));

export default function Petals() {
  return (
    <div className="petals" aria-hidden="true">
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.4,
            background: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
