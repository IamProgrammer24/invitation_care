import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { parseDate } from "../../data/navratriColors";
import CARDS from "../../data/cards";
import "./BlessingsJourney.css";

const READY = 9;
const EXT = "webp";
const GAP = 14;

export default function BlessingsJourney({ lang, startDate }) {
  const track = useRef(null);
  const raf = useRef(0);
  const [active, setActive] = useState(0);
  const hi = lang === "hi";
  const L = hi ? "hi" : "en";
  const cards = CARDS.slice(0, READY);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.round((today - parseDate(startDate)) / 86400000);
  const tonight = diff >= 0 && diff < READY ? diff : -1;

  const stepOf = () => {
    const card = track.current && track.current.querySelector(".bj-card");
    return card ? card.offsetWidth + GAP : 0;
  };

  useEffect(() => {
    if (tonight < 0) return;
    track.current.scrollLeft = tonight * stepOf();
    setActive(tonight);
  }, [tonight]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const onScroll = () => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const s = stepOf();
      if (!s) return;
      const i = Math.round(track.current.scrollLeft / s);
      setActive(Math.max(0, Math.min(cards.length - 1, i)));
    });
  };

  const goTo = (i) =>
    track.current.scrollTo({ left: i * stepOf(), behavior: "smooth" });

  return (
    <motion.section
      className="bj"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
    >
      <h2 className="bj-heading">
        {hi ? "नवरात्रि आशीर्वाद यात्रा" : "Navratri Blessings Journey"}
      </h2>
      <p className="bj-sub">
        {hi
          ? "नौ रातें, नौ रंग, नौ आशीर्वाद"
          : "Nine nights. Nine colours. Nine blessings."}
      </p>

      <div className="bj-track" ref={track} onScroll={onScroll}>
        {cards.map((c, i) => (
          <div key={i} className={`bj-card ${i === active ? "is-active" : ""}`}>
            {i === tonight && (
              <span className="bj-tonight">{hi ? "आज की रात" : "Tonight"}</span>
            )}

            <img
              className="bj-img"
              src={`/images/cards/day${i + 1}.${EXT}`}
              alt=""
              draggable="false"
              loading={i === 0 ? "eager" : "lazy"}
            />

            <div className="bj-banner" style={{ color: c.ink }}>
              <span className="bj-day">
                {hi ? `दिन ${i + 1}` : `Day ${i + 1}`}
              </span>
              <span className="bj-colour">{c.colour[L]}</span>
            </div>

            <div
              className="bj-body"
              style={
                c.inset
                  ? { left: `${c.inset}%`, right: `${c.inset}%` }
                  : undefined
              }
            >
              <p className="bj-title">{c.title[L]}</p>
              <p
                className="bj-text"
                style={c.size ? { fontSize: `${c.size}cqw` } : undefined}
              >
                {c.text[L]}
              </p>
            </div>
          </div>
        ))}
      </div>

      {cards.length > 1 && (
        <>
          <div className="bj-dots">
            {cards.map((_, i) => (
              <button
                key={i}
                className={`bj-dot ${i === active ? "on" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Day ${i + 1}`}
              />
            ))}
          </div>
          <p className="bj-hint">
            {active === cards.length - 1
              ? hi
                ? "ऊपर स्वाइप करें"
                : "Swipe up to continue"
              : hi
                ? "दाएं-बाएं स्वाइप करें"
                : "Swipe sideways"}
          </p>
        </>
      )}
    </motion.section>
  );
}
