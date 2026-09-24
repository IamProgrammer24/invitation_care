import { motion } from "framer-motion";

import Petals from "../common/Petals";
import Toran from "../common/Toran";

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
      <Toran />
      {play && <Petals />}

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

        <motion.div variants={rise} className="scroll">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
