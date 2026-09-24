import { motion } from "framer-motion";
import "./MessageCard.css";

const PETALS = Array.from({ length: 12 }, (_, i) => i * 30);

export default function MessageCard({ message }) {
  return (
    <section className="section">
      <motion.div
        className="msg-card"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <svg className="mandala" viewBox="0 0 100 100" aria-hidden="true">
          {PETALS.map((deg) => (
            <ellipse
              key={deg}
              cx="50"
              cy="24"
              rx="7"
              ry="20"
              fill="var(--accent)"
              transform={`rotate(${deg} 50 50)`}
            />
          ))}
          <circle cx="50" cy="50" r="9" fill="var(--accent-2)" />
        </svg>

        <h2 className="msg-title">शुभकामनाएं</h2>
        <p className="msg-text">{message}</p>
      </motion.div>
    </section>
  );
}
