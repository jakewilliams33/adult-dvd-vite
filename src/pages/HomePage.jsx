import { useState, useEffect, lazy, Suspense } from "react";
import { HomePageSocials } from "../components/HomePageSocials";
import { Helmet } from "react-helmet-async";
import logo from "../images/adult-dvd-logo.svg";
import { Countdown } from "../components/Countdown";

// WebGL/three only exist in the browser, so the 3D scene is loaded and
// rendered on the client only. This keeps it out of the prerender (SSG)
// pass entirely, while the rest of the home page still renders server-side.
const ThreeScene = lazy(() => import("../ThreeScene"));

export const HomePage = ({ setSignUpVisible }) => {
  // autoRotate lives here so the rotate button can sit inside the sidebar
  // (HomePageSocials) while the 3D scene still reads/uses the value.
  const [autoRotate, setAutoRotate] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <>
      <Helmet>
        <title>ADULT DVD</title>
        <meta name="description" content="Adult DVD - Official Website" />
      </Helmet>

      {/* White logo + countdown, centred in the area right of the sidebar,
          above the model */}
      <div
        style={{
          position: "fixed",
          top: "7vh",
          left: "var(--bar-width)",
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.4vh",
          pointerEvents: "none",
          zIndex: 50,
        }}
      >
        <img
          src={logo}
          alt="Adult DVD"
          style={{
            width: "min(62%, 460px)",
            // recolour the black logo to white
            filter: "brightness(0) invert(1)",
            opacity: 0.95,
          }}
        />
        <Countdown />
      </div>

      <HomePageSocials
        autoRotate={autoRotate}
        setAutoRotate={setAutoRotate}
        setSignUpVisible={setSignUpVisible}
      />
      {mounted && (
        <Suspense fallback={null}>
          <ThreeScene
            setSignUpVisible={setSignUpVisible}
            autoRotate={autoRotate}
            setAutoRotate={setAutoRotate}
          />
        </Suspense>
      )}
    </>
  );
};
