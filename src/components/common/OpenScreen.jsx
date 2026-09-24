import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Curtain from "./Curtain";
import Tassel from "./Tassel";
import TwistedCord from "./TwistedCord";
import { OPEN_BODY, OPEN_EDGE } from "./curtainPaths";
import "./OpenScreen.css";

const PULL_PX = 90;
const PULL_T = 0.5;

export default function OpenScreen({ onStart }) {
  const root = useRef(null);
  const tl = useRef(null);
  const busy = useRef(false);
  const drag = useRef({ active: false, startY: 0, moved: 0 });
  const [open, setOpen] = useState(false);

  useGSAP(
    () => {
      const t = gsap.timeline({
        paused: true,
        onComplete: () => setOpen(true),
      });

      t.to(".pull", { y: PULL_PX, duration: PULL_T, ease: "none" }, 0)
        .to(
          ".tie-band, .knot",
          { scale: 0, opacity: 0, duration: 0.4, ease: "power2.in" },
          PULL_T,
        )
        .to(
          ".pull",
          { y: PULL_PX + 90, opacity: 0, duration: 0.5, ease: "power2.in" },
          PULL_T,
        )
        .to(
          ".morph-body",
          { attr: { d: OPEN_BODY }, duration: 1.6, ease: "power3.inOut" },
          0.65,
        )
        .to(
          ".morph-edge",
          { attr: { d: OPEN_EDGE }, duration: 1.6, ease: "power3.inOut" },
          0.65,
        )
        .to(".open-bg", { opacity: 0, duration: 1, ease: "power1.inOut" }, 0.9)
        .call(onStart, [], 0.9)
        .to(
          ".rope, .tassel",
          { opacity: 1, duration: 0.5, ease: "power1.out" },
          2.0,
        );

      tl.current = t;
    },
    { scope: root },
  );

  const play = () => {
    if (busy.current) return;
    busy.current = true;
    tl.current.play();
  };

  const onDown = (e) => {
    if (busy.current) return;
    drag.current = { active: true, startY: e.clientY, moved: 0 };
    e.currentTarget.setPointerCapture(e.pointerId);
    tl.current.pause();
  };

  const onMove = (e) => {
    if (!drag.current.active) return;
    const dy = Math.max(0, e.clientY - drag.current.startY);
    drag.current.moved = dy;
    tl.current.time(Math.min(dy / PULL_PX, 1) * PULL_T);
  };

  const onUp = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    const dy = drag.current.moved;
    if (dy < 6 || dy >= PULL_PX * 0.5) play();
    else tl.current.reverse();
  };

  const onKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      play();
    }
  };

  return (
    <div
      ref={root}
      className={`open-screen ${open ? "is-open" : ""}`}
      aria-hidden={open}
    >
      <div className="open-bg" />

      <Curtain side="left" />
      <Curtain side="right" />

      <div className="tie">
        <svg className="tie-band" viewBox="0 0 300 30" aria-hidden="true">
          <TwistedCord d="M0 8 Q150 24 300 8" width={7} />
        </svg>

        <svg className="knot" viewBox="0 0 70 64" aria-hidden="true">
          <TwistedCord
            d="M35 30 C18 8 3 22 13 37 C20 46 32 40 35 32"
            width={5}
          />
          <TwistedCord
            d="M35 30 C52 8 67 22 57 37 C50 46 38 40 35 32"
            width={5}
          />
          <circle
            cx="35"
            cy="30"
            r="9"
            fill="var(--accent)"
            stroke="#b57d00"
            strokeWidth="2.5"
          />
          <circle cx="35" cy="30" r="3.5" fill="#b57d00" fillOpacity="0.55" />
        </svg>

        <div
          className="pull"
          role="button"
          tabIndex={open ? -1 : 0}
          aria-label="Pull the tassels to open the invitation"
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          onKeyDown={onKey}
        >
          <div className="pull-bob">
            <Tassel className="pull-tassel pt-l" />
            <Tassel className="pull-tassel pt-r" />
          </div>
        </div>
      </div>
    </div>
  );
}
