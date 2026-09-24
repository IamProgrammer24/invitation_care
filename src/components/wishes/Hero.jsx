import { motion } from "framer-motion";
import "./Hero.css";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.28, delayChildren: 0.35 } },
};

const rise = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function Hero({ play }) {
  return (
    <section className="hero">
      <motion.div
        className="hero-body"
        variants={container}
        initial="hidden"
        animate={play ? "show" : "hidden"}
      >
        <motion.p variants={rise} className="jai">
          ॥ जय माता दी ॥
        </motion.p>

        <h1 className="title">
          <motion.span variants={rise}>शुभ</motion.span>
          <motion.span variants={rise}>नवरात्रि</motion.span>
        </h1>

        <motion.p variants={rise} className="wish">
          Happy Navratri
        </motion.p>

        <motion.div variants={rise} className="divider">
          <i /> <b /> <i />
        </motion.div>
      </motion.div>
    </section>
  );
}
