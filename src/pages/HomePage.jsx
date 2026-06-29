import { useState, useEffect, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { HomePageSocials } from "../components/HomePageSocials";
import { Helmet } from "react-helmet-async";
import logo from "../images/adult-dvd-logo.svg";
import { Countdown } from "../components/Countdown";

// WebGL/three only exist in the browser, so the 3D scene is loaded and
// rendered on the client only. This keeps it out of the prerender (SSG)
// pass entirely, while the rest of the home page still renders server-side.
const ThreeScene = lazy(() => import("../ThreeScene"));

// The logo + countdown is a single link. Before release it points at the
// pre-save (placeholder: the streaming-links page); once the countdown hits
// zero and flips to "OUT NOW", it points at the release (placeholder: Spotify).
const PRESAVE_LINK = "https://adultdvd.ffm.to/adultdvd";
const OUT_NOW_LINK = "https://adultdvd.ffm.to/adultdvd";

export const HomePage = ({ setSignUpVisible }) => {
  // autoRotate lives here so the rotate button can sit inside the sidebar
  // (HomePageSocials) while the 3D scene still reads/uses the value.
  const [autoRotate, setAutoRotate] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isOut, setIsOut] = useState(false);

  useEffect(() => setMounted(true), []);

  // /signup serves the same home page with the sign-up modal open. Give it its
  // own title/description so it's a distinct, indexable result rather than a
  // duplicate of /.
  const { pathname } = useLocation();
  const isSignup = pathname.replace(/\/$/, "") === "/signup";

  const pageTitle = isSignup ? "Sign Up | ADULT DVD" : "ADULT DVD";
  const pageDescription = isSignup
    ? "Sign up to the ADULT DVD mailing list for new releases, tour dates and news."
    : "Adult DVD - Official Website";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
      </Helmet>

      {/* White logo + countdown, centred in the area right of the sidebar,
          above the model. The pair is one link: the pre-save while counting
          down, or the release once it shows OUT NOW. */}
      <div
        style={{
          position: "fixed",
          top: "7vh",
          left: "var(--bar-width)",
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pointerEvents: "none",
          zIndex: 50,
        }}
      >
        <a
          href={isOut ? OUT_NOW_LINK : PRESAVE_LINK}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            pointerEvents: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.4vh",
            textDecoration: "none",
          }}
        >
          <img
            src={logo}
            alt="Adult DVD"
            style={{
              width: "min(52vw, 460px)",
              // recolour the black logo to white
              filter: "brightness(0) invert(1)",
              opacity: 0.95,
            }}
          />
          <Countdown onOut={setIsOut} />
        </a>
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
