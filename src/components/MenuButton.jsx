import React, { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/menu-button.css";

export const MenuButton = ({ setMenuOpen, menuOpen }) => {
  const imgButton = useRef();
  const location = useLocation();

  useEffect(() => {
    const handlePopstate = () => {
      if (menuOpen) {
        setMenuOpen(false); // Close the menu if it's open
      }
    };

    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [menuOpen, setMenuOpen]);

  const handleToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <>
      <div
        onClick={handleToggle}
        alt="menu button"
        ref={imgButton}
        className={!menuOpen ? "case" : "caseOpen"}
        style={{ zIndex: 200000 }}
      ></div>
    </>
  );
};
