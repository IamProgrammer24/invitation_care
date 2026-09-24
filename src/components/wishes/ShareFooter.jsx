import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import brand from "../../data/brand";
import "./ShareFooter.css";

const COLOURS = ["#f4b400", "#f28c28", "#fff7ec", "#d32f2f"];

export default function ShareFooter({ lang, message }) {
  const [burst, setBurst] = useState(0);

  const particles = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => {
        const a = (i / 16) * Math.PI * 2;
        const dist = 70 + (i % 3) * 26;
        return {
          x: Math.cos(a) * dist,
          y: Math.sin(a) * dist - 20,
          size: 7 + (i % 3) * 3,
          color: COLOURS[i % COLOURS.length],
        };
      }),
    [],
  );

  const handleShare = async () => {
    setBurst((b) => b + 1);
    const url = window.location.href;
    const text = `${message}\n\n${url}`;

    if (navigator.share) {
      try {
        await navigator.share({ text, url });
        return;
      } catch {
        return;
      }
    }
    window.open(
      `https://wa.me/?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener",
    );
  };

  return (
    <footer className="share-footer">
      <div className="share-wrap">
        <button className="share-btn" onClick={handleShare}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" />
            <path d="M16 6l-4-4-4 4" />
            <path d="M12 2v13" />
          </svg>
          {lang === "hi" ? "शुभकामनाएं भेजें" : "Share the wishes"}
        </button>

        {burst > 0 &&
          particles.map((p, i) => (
            <motion.span
              key={`${burst}-${i}`}
              className="confetti"
              style={{ width: p.size, height: p.size, background: p.color }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{ x: p.x, y: p.y, opacity: 0, scale: 0.3, rotate: 200 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            />
          ))}
      </div>

      <div className="credit">
        <p>Made with love by {brand.name}</p>
        <a
          href={`https://instagram.com/${brand.instagram}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
          </svg>
          @{brand.instagram}
        </a>
      </div>
    </footer>
  );
}
