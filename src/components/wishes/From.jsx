import { motion } from "framer-motion";
import "./From.css";

export default function From({ from, photo, lang }) {
  const label = lang === "hi" ? "शुभकामनाओं सहित" : "With love,";

  return (
    <section className="section from">
      <motion.div
        className="arch"
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {photo ? (
          <img src={photo} alt={from} loading="lazy" />
        ) : (
          <svg
            viewBox="0 0 24 24"
            width="64"
            height="64"
            fill="none"
            stroke="var(--card-text)"
            strokeWidth="1.4"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
          </svg>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
      >
        <p className="from-label">{label}</p>
        <p className="from-name">{from}</p>
      </motion.div>
    </section>
  );
}
