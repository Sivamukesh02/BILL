import React, { useRef } from "react";
import confetti from "canvas-confetti";
import "../assets/Style/style.css";
import { motion } from "framer-motion";
import shop from "../assets/Image/shop.webp";

// barcode kuchi widths
const BARS = [3, 1, 2, 1, 3, 2, 1, 1, 3, 1, 2, 3, 1, 2, 1, 3, 1, 2, 1, 3, 2, 1, 2, 3];

function Proj() {
  // machine element -> confetti origin ku
  const btnRef = useRef(null);

  // ---------- CONFETTI ----------
  const fireConfetti = () => {
    const rect = btnRef.current.getBoundingClientRect();
    confetti({
      particleCount: 190,
      spread: 170,
      startVelocity: 35,
      gravity: 1.1,
      colors: ["#ffffff", "#4ba36d", "#de0d0d", "#ebe70b", "#22adc5"],
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: rect.bottom / window.innerHeight, // machine kku keezha irundhu poppu
      },
    });
  };

  {
  const colors = ["#ffffff", "#4ba36d", "#de0d0d", "#ebe70b", "#22adc5"];

  // LEFT side la irundhu (right pakkam poppu aagum)
  confetti({
    particleCount: 70,
    angle: 60,
    spread: 60,
    startVelocity: 55,
    gravity: 1.1,
    colors,
    origin: { x: 0, y: 0.7 },
  });

  // RIGHT side la irundhu (left pakkam poppu aagum)
  confetti({
    particleCount: 70,
    angle: 120,
    spread: 60,
    startVelocity: 55,
    gravity: 1.1,
    colors,
    origin: { x: 1, y: 0.7 },
  });
};

  return (
    <div className="bm-page">
      <div className="bm-stage">
        {/* 1) BLUR BG IMAGE (image src mattum inline, mathadhu ellam CSS) */}
        <div className="bm-bg" style={{ backgroundImage: `url(${shop})` }} />

        {/* 2) YELLOW MACHINE (SVG) */}
        <svg ref={btnRef} className="bm-machine" viewBox="0 0 320 52">
          <defs>
            <linearGradient id="bmYellow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffb400" />
              <stop offset="100%" stopColor="#f57c00" />
            </linearGradient>
          </defs>
          {/* body */}
          <rect x="0" y="0" width="320" height="52" rx="18" fill="url(#bmYellow)" />
          {/* shine */}
          <rect x="14" y="6" width="292" height="7" rx="3.5" fill="#ffd54f" opacity="0.75" />
          {/* slot (bill inga irundhu varum) */}
          <rect x="14" y="30" width="292" height="12" rx="6" fill="#3a2a00" />
        </svg>

        {/* 3) BILL - slot ulla irundhu keezha vara */}
        <div className="bm-slot">
          <motion.div
            className="bm-bill"
            initial={{ y: "-100%" }}          // full-ah slot kulla olinjirukku
            animate={{ y: 0 }}                // keezha varum
            transition={{ duration: 2, delay: 0.6, ease: "easeInOut" }}
            onAnimationComplete={fireConfetti} // bill vandhathum confetti
          >
            <div className="bm-icon">🎟️</div>
            <h3 className="bm-title">Thank you!</h3>
            <p className="bm-sub">Your ticket has been issued successfully</p>

            <hr className="bm-line" />

            <div className="bm-row">
              <span className="bm-label">TICKET ID</span>
              <span className="bm-label">AMOUNT</span>
            </div>
            <div className="bm-row">
              <span className="bm-value">8034399434</span>
              <span className="bm-amount">$1099.99</span>
            </div>

            <div className="bm-row">
              <span className="bm-label">DATE &amp; TIME</span>
              <span className="bm-label">STATUS</span>
            </div>
            <div className="bm-row">
              <span className="bm-value">29 Sep 2026 - 20:07</span>
              <span className="bm-status">CONFIRMED</span>
            </div>

            <hr className="bm-line" />

            <p className="bm-user">
              <b>KARTHI</b> &nbsp; •••• 34347
            </p>

            <div className="bm-barcode">
              {BARS.map((w, i) => (
                <div key={i} className="bm-bar" style={{ width: w}} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Proj;