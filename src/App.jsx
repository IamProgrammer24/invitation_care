import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import config from "./data/config";
import OpenScreen from "./components/common/OpenScreen";
import Toran from "./components/common/Toran";
import Petals from "./components/common/Petals";
import Hero from "./components/wishes/Hero";
import MessageCard from "./components/wishes/MessageCard";
import NineColours from "./components/wishes/NineColours";
import From from "./components/wishes/From";
import ShareFooter from "./components/wishes/ShareFooter";
import SwipeHint from "./components/common/SwipeHint";
import "./App.css";

const LAST = 4;

export default function App() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const touch = useRef(null);
  const message = config.message[config.lang];

  const stageRef = useRef(null);

  const next = useCallback(() => setStep((s) => Math.min(s + 1, LAST)), []);
  const prev = useCallback(() => setStep((s) => Math.max(s - 1, 0)), []);

  useEffect(() => {
    document.documentElement.dataset.theme = config.theme;
  }, []);

  useEffect(() => {
    if (!started) return;
    const onKey = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [started, next, prev]);

  const onTouchStart = (e) => {
    const t = e.touches[0];
    const el = stageRef.current;
    touch.current = {
      x: t.clientX,
      y: t.clientY,
      atTop: el.scrollTop <= 2,
      atBottom: el.scrollTop + el.clientHeight >= el.scrollHeight - 2,
    };
  };

  const onTouchEnd = (e) => {
    if (!touch.current || !started) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;
    const { atTop, atBottom } = touch.current;
    touch.current = null;

    if (Math.abs(dy) > 50 && Math.abs(dy) > Math.abs(dx) * 1.5) {
      if (dy < 0 && atBottom) next();
      if (dy > 0 && atTop) prev();
    }
  };

  const screens = [
    <Hero key="hero" play={started} />,
    <MessageCard key="msg" message={message} />,
    <NineColours key="col" lang={config.lang} startDate={config.startDate} />,
    <From
      key="from"
      from={config.from}
      photo={config.photo}
      lang={config.lang}
    />,
    <ShareFooter key="share" lang={config.lang} message={message} />,
  ];

  return (
    <>
      <div className="page-bg" aria-hidden="true" />
      <Toran />
      {started && <Petals />}

      <motion.div
        key={`bloom-${step}`}
        className="bloom"
        aria-hidden="true"
        initial={{ scale: 0.3, opacity: 0.4 }}
        animate={{ scale: 2.4, opacity: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />

      <div
        ref={stageRef}
        className="stage"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            className="screen"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.08 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {screens[step]}
          </motion.div>
        </AnimatePresence>
      </div>

      {started && (
        <motion.nav
          className="nav"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          {/* <button
            className="nav-btn"
            onClick={prev}
            aria-label="Previous screen"
            style={{ visibility: step === 0 ? "hidden" : "visible" }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 15l6-6 6 6" />
            </svg>
          </button> */}
          {/* 
          <div className="dots">
            {screens.map((_, i) => (
              <button
                key={i}
                className={`dot-nav ${i === step ? "on" : ""}`}
                onClick={() => setStep(i)}
                aria-label={`Go to screen ${i + 1}`}
              />
            ))}
          </div> */}

          {/* <button
            className="nav-btn next"
            onClick={next}
            aria-label="Next screen"
            style={{ visibility: step === LAST ? "hidden" : "visible" }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button> */}
        </motion.nav>
      )}

      <AnimatePresence>
        {started && step === 0 && <SwipeHint key="hint" lang={config.lang} />}
      </AnimatePresence>

      <OpenScreen onStart={() => setStarted(true)} />
    </>
  );
}
