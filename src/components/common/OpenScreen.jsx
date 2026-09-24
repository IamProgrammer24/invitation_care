import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./OpenScreen.css";

export default function OpenScreen({ onOpen }) {
  const root = useRef(null);
  const busy = useRef(false);

  const { contextSafe } = useGSAP(
    () => {
      gsap.set(".flame", { scale: 0, opacity: 0, svgOrigin: "100 104" });
      gsap.set(".glow", { scale: 0.6, opacity: 0, svgOrigin: "100 85" });
      gsap.from(".diya-wrap", {
        y: 20,
        opacity: 0,
        duration: 0.9,
        ease: "power2.out",
      });
    },
    { scope: root },
  );

  const handleOpen = contextSafe(() => {
    if (busy.current) return;
    busy.current = true;

    const tl = gsap.timeline({ onComplete: onOpen });

    tl.to(".flame", {
      scale: 1,
      opacity: 1,
      duration: 0.7,
      ease: "back.out(2)",
    })
      .to(
        ".glow",
        { scale: 1, opacity: 1, duration: 0.9, ease: "power2.out" },
        "<",
      )
      .to(".hint", { opacity: 0, duration: 0.3 }, "<")
      .to(
        ".diya-wrap",
        { scale: 1.15, opacity: 0, duration: 0.5, ease: "power1.in" },
        "+=0.6",
      )
      .to(
        ".curtain-l",
        { xPercent: -100, duration: 1.1, ease: "power3.inOut" },
        "-=0.1",
      )
      .to(
        ".curtain-r",
        { xPercent: 100, duration: 1.1, ease: "power3.inOut" },
        "<",
      );
  });

  return (
    <div
      ref={root}
      className="open-screen"
      onClick={handleOpen}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleOpen()}
      role="button"
      tabIndex={0}
      aria-label="Tap to open the invitation"
    >
      <div className="curtain curtain-l" />
      <div className="curtain curtain-r" />

      <div className="open-content">
        <div className="diya-wrap">
          <svg
            viewBox="0 0 200 200"
            width="220"
            height="220"
            aria-hidden="true"
          >
            <circle
              className="glow"
              cx="100"
              cy="85"
              r="75"
              fill="var(--accent)"
              fillOpacity="0.22"
            />

            <path d="M35 118 C45 168 155 168 165 118 Z" fill="var(--accent)" />
            <ellipse cx="100" cy="118" rx="65" ry="10" fill="var(--accent-2)" />
            <ellipse cx="100" cy="118" rx="54" ry="6" fill="#4a0f1c" />
            <rect x="98" y="100" width="4" height="18" rx="2" fill="#4a0f1c" />

            <g className="flame">
              <g className="flame-inner">
                <path
                  d="M100 38 C122 64 120 96 100 106 C80 96 78 64 100 38 Z"
                  fill="var(--accent-2)"
                />
                <path
                  d="M100 62 C111 76 110 94 100 100 C90 94 89 76 100 62 Z"
                  fill="#ffe08a"
                />
              </g>
            </g>
          </svg>
        </div>

        <div className="hint">
          <span className="pulse">Tap to open</span>
          <span className="hint-hi">दीया जलाएं</span>
        </div>
      </div>
    </div>
  );
}
