import "./Toran.css";

const ITEMS = Array.from({ length: 9 }, (_, i) => i);

export default function Toran() {
  return (
    <div className="toran" aria-hidden="true">
      {ITEMS.map((i) => (
        <div
          key={i}
          className="toran-item"
          style={{ animationDelay: `${i * 0.28}s` }}
        >
          <span
            className="toran-thread"
            style={{ height: 16 + (i % 3) * 10 }}
          />
          <span className={`toran-bloom ${i % 2 ? "b-gold" : "b-saffron"}`} />
        </div>
      ))}
    </div>
  );
}
