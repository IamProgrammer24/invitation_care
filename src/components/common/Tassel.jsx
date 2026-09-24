const STRANDS = Array.from({ length: 9 }, (_, i) => {
  const t = i / 8;
  return { x1: 13 + t * 14, x2: 5 + t * 30 };
});

export default function Tassel({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 40 124" aria-hidden="true">
      <line
        x1="20"
        y1="0"
        x2="20"
        y2="28"
        stroke="var(--accent)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <line
        x1="20"
        y1="0"
        x2="20"
        y2="28"
        stroke="#8a5a00"
        strokeWidth="5"
        strokeDasharray="1.4 3.2"
      />

      <circle
        cx="20"
        cy="36"
        r="9.5"
        fill="var(--accent)"
        stroke="#b57d00"
        strokeWidth="1.5"
      />
      <path
        d="M14 33 Q20 29 26 33"
        fill="none"
        stroke="#fff7ec"
        strokeOpacity="0.55"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <rect x="14" y="44" width="12" height="6" rx="2" fill="#b57d00" />

      <path d="M12 50 L28 50 L37 116 Q20 124 3 116 Z" fill="var(--accent)" />
      {STRANDS.map((s, i) => (
        <line
          key={i}
          x1={s.x1}
          y1="50"
          x2={s.x2}
          y2="118"
          stroke="#b57d00"
          strokeOpacity="0.55"
          strokeWidth="1"
        />
      ))}
      <rect x="11" y="62" width="18" height="5" rx="2.5" fill="#b57d00" />
      <path
        d="M3 116 Q20 124 37 116"
        fill="none"
        stroke="#b57d00"
        strokeWidth="2"
      />
    </svg>
  );
}
