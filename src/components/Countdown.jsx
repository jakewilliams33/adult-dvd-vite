import { useState, useEffect } from "react";

// Time remaining until the next 25th of September (this year, or next year if
// we're already past it).
function getTimeUntilSeptember() {
  const now = new Date();
  let target = new Date(now.getFullYear(), 8, 25, 0, 0, 0); // month 8 = September
  if (now >= target) {
    target = new Date(now.getFullYear() + 1, 8, 25, 0, 0, 0);
  }
  const diff = Math.max(0, target - now);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const pad = (n) => String(n).padStart(2, "0");

export const Countdown = () => {
  const [time, setTime] = useState(getTimeUntilSeptember);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeUntilSeptember()), 1000);
    return () => clearInterval(id);
  }, []);

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
      {pad(time.days)}:{pad(time.hours)}:{pad(time.minutes)}:{pad(time.seconds)}
    </div>
  );
};
