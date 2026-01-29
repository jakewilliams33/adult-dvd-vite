import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { MenuButton } from "./components/MenuButton";
import { Menu } from "./components/Menu";
import { MusicPage } from "./pages/MusicPage";
import { TourPage } from "./pages/TourPage";
import { ContactPage } from "./pages/ContactPage";
import { ListenPage } from "./pages/ListenPage";
import { SignUpForm } from "./components/SignUpForm";
import { StreamingLinks } from "./pages/StreamingLinks";
import { PageNotFound } from "./pages/PageNotFound";
import { useEffect } from "react";
import crt from "./images/crt.png";

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const [signUpVisible, setSignUpVisible] = useState(false);

  useEffect(() => {
    if (location.pathname === "/signup") {
      setSignUpVisible(true);
    }
  }, [location]);

  return (
    <>
      <div className="App">
        <MenuButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        <Menu
          setSignUpVisible={setSignUpVisible}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundImage: `url(${crt})`,
            backgroundRepeat: "repeat", // or "no-repeat"
            backgroundSize: "auto", // or "cover"
            backgroundPosition: "center",
            opacity: 0.11,
            pointerEvents: "none",
            zIndex: 3,
          }}
        />

        <div
          style={{
            top: 0,
            left: 0,
            boxSizing: "border-box",
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <SignUpForm
            signUpVisible={signUpVisible}
            setSignUpVisible={setSignUpVisible}
          />
          <Routes location={location} key={location.pathname}>
            <Route
              exact
              path={"/"}
              element={<HomePage setSignUpVisible={setSignUpVisible} />}
            />
            <Route
              exact
              path={"/signup"}
              element={<HomePage setSignUpVisible={setSignUpVisible} />}
            />
            <Route exact path={"/music"} element={<MusicPage />} />
            <Route exact path={"/tour"} element={<TourPage />} />
            <Route exact path={"/contact"} element={<ContactPage />} />
            <Route
              exact
              path={"/listen/:url_release_id"}
              element={<ListenPage />}
            />
            <Route path="/streaming_links" element={<StreamingLinks />} />
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
