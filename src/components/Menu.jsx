import "../styles/menu.css";
import { DvdBackground } from "./DvdBackground";
import { AnimatePresence, motion } from "framer-motion";
import { NavList } from "./NavList";
import border from "../images/border.jpg";

export const Menu = ({ menuOpen, setMenuOpen }) => {
  const dropDown = {
    hidden: {
      y: "-100%",
    },
    visible: {
      y: 0,
    },
  };

  return (
    <>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="menu-background"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={dropDown}
            transition={{
              duration: 0.5,
            }}
            style={{
              position: "fixed",
              boxSizing: "border-box",
              backgroundColor: "black",
              height: "calc(100% + 1px)",
              width: "100vw",

              zIndex: 2000,
              overflow: "hidden",
              opacity: 1,
              borderBottom: "1px solid transparent",
              borderImage: `url(${border}) 30 round`,
            }}
          >
            <DvdBackground />
          </motion.div>
        )}
      </AnimatePresence>
      <div className={menuOpen ? "nav-container active" : "nav-container"}>
        <NavList setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
      </div>
    </>
  );
};
