// MenuButton.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/menu-button.css";

export const MenuButton = ({ setMenuOpen, menuOpen }) => {
  const location = useLocation();

  useEffect(() => {
    const handlePopstate = () => {
      if (menuOpen) {
        setMenuOpen(false);
        document.body.style.overflow = "visible";
      }
    };

    window.addEventListener("popstate", handlePopstate);
    return () => window.removeEventListener("popstate", handlePopstate);
  }, [menuOpen, setMenuOpen]);

  // Close menu on route change (optional but usually desired)
  useEffect(() => {
    if (menuOpen) {
      setMenuOpen(false);
      document.body.style.overflow = "visible";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleToggle = () => {
    setMenuOpen((prev) => {
      const next = !prev;
      document.body.style.overflow = next ? "hidden" : "visible";
      return next;
    });
  };

  return (
    <button
      type="button"
      aria-label="Toggle menu"
      aria-expanded={menuOpen}
      onClick={handleToggle}
      className={`menu-button ${menuOpen ? "open" : ""}`}
      style={{ zIndex: 200000 }}
    >
      <svg
        className="menu-icon"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <g className="line l1">
          <line
            className="outline"
            x1="10"
            y1="50"
            x2="90"
            y2="50"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
          />
          <line
            className="fill"
            x1="10"
            y1="50"
            x2="90"
            y2="50"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
          />
        </g>

        <g className="line l2">
          <line
            className="outline"
            x1="10"
            y1="50"
            x2="90"
            y2="50"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
          />
          <line
            className="fill"
            x1="10"
            y1="50"
            x2="90"
            y2="50"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
          />
        </g>

        <g className="line l3">
          <line
            className="outline"
            x1="10"
            y1="50"
            x2="90"
            y2="50"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
          />
          <line
            className="fill"
            x1="10"
            y1="50"
            x2="90"
            y2="50"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </button>
  );
};
