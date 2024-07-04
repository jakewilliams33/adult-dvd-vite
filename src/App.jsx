import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ThreeScene from "./ThreeScene";
import { MenuButton } from "./components/MenuButton";
import { Menu } from "./components/Menu";
import { MusicPage } from "./pages/MusicPage";
import { TourPage } from "./pages/TourPage";
import { ContactPage } from "./pages/ContactPage";
import { ListenPage } from "./pages/ListenPage";

const App = () => {
  const glbUrl = "/model.glb"; // Replace with your actual GLB file path
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <div className="App">
        <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <MenuButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
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
          <Routes location={location} key={location.pathname}>
            <Route exact path={"/"} element={<ThreeScene glbUrl={glbUrl} />} />
            <Route exact path={"/music"} element={<MusicPage />} />
            <Route exact path={"/tour"} element={<TourPage />} />
            <Route exact path={"/contact"} element={<ContactPage />} />
            <Route
              exact
              path={"/listen/:url_release_id"}
              element={<ListenPage />}
            />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
