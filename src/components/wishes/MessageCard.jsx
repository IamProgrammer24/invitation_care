import { motion } from "framer-motion";
import "./MessageCard.css";

export default function MessageCard({ message }) {
  return (
    <section className="section">
      <motion.div
        className="frame-card"
        initial={{ opacity: 0, y: 30, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
      >
        <img
          className="frame-img"
          src="/images/card-arch.png"
          alt=""
          draggable="false"
        />

        <div className="frame-text">
          <h2 className="frame-title">शुभकामनाएं</h2>
          <p className="frame-msg">{message}</p>
        </div>
      </motion.div>
    </section>
  );
}
