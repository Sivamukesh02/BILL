import React, { useRef, useState, useEffect } from "react";
import confetti from "canvas-confetti";
import "../assets/Style/style.css";
import { motion, useAnimation } from "framer-motion";
import shop from "../assets/Image/shop.webp";

// barcode kuchi widths
const BARS = [3, 1, 2, 1, 3, 2, 1, 1, 3, 1, 2, 3, 1, 2, 1, 3, 1, 2, 1, 3, 2, 1, 2, 3];

// 3 tickets data (venumna inga maathikalam)
const TICKETS = [
  { id: "8034399434", amount: "$1099.99", date: "29 Sep 2026 - 20:07", card: "34347" },
  { id: "8034399435", amount: "$899.99", date: "29 Sep 2026 - 12:09", card: "28369" },
  { id: "8034399436", amount: "$599.99", date: "29 Sep 2026 - 03:11", card: "59735" },
];

const wait = (ms) => new Promise((res) => setTimeout(res, ms));

function Proj() {
  // machine element -> confetti origin ku
  const btnRef = useRef(null);
  // ippo entha ticket kaatanum (0, 1, 2)
  const [current, setCurrent] = useState(0);
  // bill animation ah control panna
  const controls = useAnimation();

  // ---------- CONFETTI ----------
  const fireConfetti = () => {
    const colors = ["#ffffff", "#4ba36d", "#de0d0d", "#ebe70b", "#22adc5"];
    const rect = btnRef.current.getBoundingClientRect();

    // NADU (machine keezha irundhu)
    confetti({
      particleCount: 190,
      spread: 170,
      startVelocity: 35,
      gravity: 1.1,
      colors,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: rect.bottom / window.innerHeight,
      },
    });

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

  // ---------- 3 TICKETS: vara -> cut -> vilu, aduthu aduthu ----------
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      for (let i = 0; i < TICKETS.length; i++) {
        if (cancelled) return;

        // 1) pudhu ticket ready: slot kulla olinju, data maathu
        controls.set({ y: "-100%", rotate: 0, opacity: 1 });
        setCurrent(i);

        // 2) ticket slot la irundhu keezha varum
        await controls.start({
          y: 0,
          transition: { duration: 2, delay: 0.6, ease: "easeInOut" },
        });
        if (cancelled) return;

        // 3) bill vandhathum confetti
        fireConfetti();

        // 4) last ticket na ippadiye nikkum (mudinjidum)
        if (i === TICKETS.length - 1) return;

        // 5) konjam nikkum, apro CUT (chinna aattam)
        await wait(1200);
        if (cancelled) return;
        await controls.start({
          rotate: [0, -2, 2, -1, 0],
          transition: { duration: 0.4 },
        });
        if (cancelled) return;

        // 6) cut aagi keezha vilum (saanju, fade aagum)
        await controls.start({
          y: 560,
          rotate: 14,
          opacity: 0,
          transition: { duration: 0.9, ease: "easeIn" },
        });
      }
    };

    run();

    // page maarina / component remove aanaa stop pannidum
    return () => {
      cancelled = true;
      controls.stop();
    };
  }, []);

  const t = TICKETS[current];

  return (
    <div className="bm-page">
      <div className="bm-stage">
        {/* 1) BLUR BG IMAGE (image src mattum inline, mathadhu ellam CSS) */}
        <div className="bm-bg " style={{ backgroundImage: `url(${shop})` }} />

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
          <rect x="09" y="45" width="302" height="12" rx="6" fill="#3a2a00" />
        </svg>

        {/* 3) BILL - slot ulla irundhu keezha vara */}
        <div className="bm-slot">
          <motion.div
            className="bm-bill"
            initial={{ y: "-100%" }} // full-ah slot kulla olinjirukku
            animate={controls}       // animation ellam useEffect la controls vazhiya
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
              <span className="bm-value">{t.id}</span>
              <span className="bm-amount">{t.amount}</span>
            </div>

            <div className="bm-row">
              <span className="bm-label">DATE &amp; TIME</span>
              <span className="bm-label">STATUS</span>
            </div>
            <div className="bm-row">
              <span className="bm-value">{t.date}</span>
              <span className="bm-status">CONFIRMED</span>
            </div>

            <hr className="bm-line" />

            <p className="bm-user">
              <b>KARTHI</b> &nbsp; •••• {t.card}
            </p>

            <div className="bm-barcode">
              {BARS.map((w, i) => (
                <div key={i} className="bm-bar" style={{ width: w }} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Proj;