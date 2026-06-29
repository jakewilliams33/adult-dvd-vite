import "../styles/menu.css";
import { DvdBackground } from "./DvdBackground";
import { AnimatePresence, motion } from "framer-motion";
import { NavList } from "./NavList";

export const Menu = ({ menuOpen, setMenuOpen, setSignUpVisible }) => {
  // Menu slides in horizontally from the left (hamburger's side).
  // PREVIOUS behaviour — slid DOWN from the top — to revert, swap x → y:
  //   hidden: { y: "-100%" }, visible: { y: 0 }
  // (and revert the matching `.nav-container` top/left rules in menu.css)
  const slideIn = {
    hidden: {
      x: "-100%",
    },
    visible: {
      x: 0,
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
            variants={slideIn}
            transition={{
              duration: 0.3,
            }}
            style={{
              position: "fixed",
              boxSizing: "border-box",
              backgroundColor: "rgba(0, 0, 0, 0.93)",
              backdropFilter: "blur(10px)" /* applies the blur effect */,
              height: "calc(100% + 1px)",
              width: "100vw",
              zIndex: 2000,
              overflow: "hidden",
              opacity: 1,
            }}
          >
            <DvdBackground />
          </motion.div>
        )}
      </AnimatePresence>
      <div data-nosnippet className={menuOpen ? "nav-container active" : "nav-container"}>
        <NavList
          setMenuOpen={setMenuOpen}
          menuOpen={menuOpen}
          setSignUpVisible={setSignUpVisible}
        />
      </div>
    </>
  );
};
