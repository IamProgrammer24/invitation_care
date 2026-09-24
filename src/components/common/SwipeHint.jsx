import { motion } from "framer-motion";
import "./SwipeHint.css";

export default function SwipeHint({ lang }) {
  return (
    <motion.div
      className="swipe-hint"
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 2.2 }}
    >
      <div className="swipe-chevrons">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 15l6-6 6 6" />
        </svg>
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 15l6-6 6 6" />
        </svg>
      </div>
      <span>{lang === "hi" ? "ऊपर स्वाइप करें" : "Swipe up"}</span>
    </motion.div>
  );
}
