import { useState, useEffect } from "react";

// Release date — the timer counts down to this, then shows "OUT NOW".
// Update this when the next release is scheduled (month is 0-based: 8 = Sept).
const RELEASE_DATE = new Date(2026, 8, 25, 0, 0, 0);

function getTimeRemaining() {
  const diff = RELEASE_DATE.getTime() - Date.now();
  if (diff <= 0) {
    return { out: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  return {
    out: false,
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const pad = (n) => String(n).padStart(2, "0");

// onOut(isOut) lets the parent (HomePage) swap the link between the pre-save
// and the release once the countdown reaches zero.
export const Countdown = ({ onOut }) => {
  // Start null so the server-rendered (build-time) markup and the client's
  // first paint match — the live values only fill in after mount.
  const [time, setTime] = useState(null);

  useEffect(() => {
    const tick = () => {
      const t = getTimeRemaining();
      setTime(t);
      onOut?.(t.out);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [onOut]);

  const text = !time
    ? "--:--:--:--"
    : time.out
      ? "OUT NOW"
      : `${pad(time.days)}:${pad(time.hours)}:${pad(time.minutes)}:${pad(time.seconds)}`;

  return (
    <div
      style={{
        fontFamily: '"WTBobine", sans-serif',
        fontStyle: "italic",
        color: "white",
        fontSize: "clamp(25px, 3.4vw, 44px)",
        lineHeight: 1,
        textAlign: "center",
      }}
    >
      {text}
    </div>
  );
};
