import { useMemo } from "react";
import { motion } from "framer-motion";
import { getNights, parseDate } from "../../data/navratriColors";
import "./NineColours.css";

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const pop = {
  hidden: { opacity: 0, scale: 0.4 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 16 },
  },
};

export default function NineColours({ lang, startDate }) {
  const nights = useMemo(() => getNights(startDate), [startDate]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.round((today - parseDate(startDate)) / 86400000);
  const tonight = diff >= 0 && diff < 9 ? nights[diff] : null;

  const heading =
    lang === "hi" ? "नौ रातें, नौ रंग" : "Nine nights, nine colours";

  let note = "";
  if (tonight) {
    note =
      lang === "hi"
        ? `आज का रंग: ${tonight.hi}`
        : `Tonight, wear ${tonight.en.toLowerCase()}`;
  } else if (diff < 0) {
    const d = nights[0].date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
    });
    note = lang === "hi" ? `शुरू: ${d}` : `Begins on ${d}`;
  }

  return (
    <section className="section colours">
      <motion.h2
        className="colours-title"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {heading}
      </motion.h2>

      <motion.div
        className="colour-grid"
        variants={grid}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {nights.map((n, i) => (
          <motion.div key={n.day} variants={pop} className="night">
            <span
              className={`dot ${i === diff ? "is-today" : ""}`}
              style={{ background: n.hex }}
            />
            <span className="night-label">{lang === "hi" ? n.hi : n.en}</span>
            <span className="night-day">
              {lang === "hi" ? `दिन ${n.day}` : `Day ${n.day}`}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {note && <p className="colours-note">{note}</p>}
    </section>
  );
}
