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
import { Store } from "./pages/Store";
import { PageNotFound } from "./pages/PageNotFound";

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const [signUpVisible, setSignUpVisible] = useState(false);

  return (
    <>
      <div className="App">
        <MenuButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        <Menu
          setSignUpVisible={setSignUpVisible}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />

        <div className="main-border"></div>

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
            <Route exact path={"/music"} element={<MusicPage />} />
            <Route exact path={"/tour"} element={<TourPage />} />
            <Route exact path={"/contact"} element={<ContactPage />} />
            <Route
              exact
              path={"/listen/:url_release_id"}
              element={<ListenPage />}
            />
            <Route path={"/store"} element={<Store />} />
            <Route path="/streaming_links" element={<StreamingLinks />} />
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
