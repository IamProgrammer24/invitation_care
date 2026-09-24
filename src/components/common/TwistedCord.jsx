export default function TwistedCord({ d, width = 6 }) {
  return (
    <>
      <path
        d={d}
        fill="none"
        stroke="var(--accent)"
        strokeWidth={width}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={d}
        fill="none"
        stroke="#8a5a00"
        strokeWidth={width}
        strokeDasharray="1.5 4"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={d}
        fill="none"
        stroke="#fff7ec"
        strokeOpacity="0.35"
        strokeWidth={width / 4}
        strokeLinecap="round"
        transform="translate(0,-1.2)"
        vectorEffect="non-scaling-stroke"
      />
    </>
  );
}
