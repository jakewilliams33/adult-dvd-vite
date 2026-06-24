import {
  faApple,
  faBandcamp,
  faFacebook,
  faSpotify,
  faYoutube,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/loading-spinner.css";
import rotate from "../images/arrow.svg";
import pause from "../images/pause.svg";

// Custom Instagram glyph (replaces the FontAwesome one). Styled like the other
// sidebar icons: white, --icon-size tall, same .icons-home spacing. viewBox is
// cropped so the glyph fills the box like the FA icons, and the path's stroke
// is cleared so the .icons-home black edge (tuned for FA's large viewBox)
// doesn't draw on this 24-unit icon.
const InstagramIcon = () => (
  <svg
    className="icons-home"
    viewBox="2 2 20 20"
    fill="currentColor"
    aria-hidden="true"
    style={{
      width: "1em",
      height: "1em",
      verticalAlign: "-0.125em",
      display: "inline-block",
      overflow: "visible",
    }}
  >
    <path
      style={{ stroke: "none" }}
      d="M 8 3 C 5.239 3 3 5.239 3 8 L 3 16 C 3 18.761 5.239 21 8 21 L 16 21 C 18.761 21 21 18.761 21 16 L 21 8 C 21 5.239 18.761 3 16 3 L 8 3 z M 18 5 C 18.552 5 19 5.448 19 6 C 19 6.552 18.552 7 18 7 C 17.448 7 17 6.552 17 6 C 17 5.448 17.448 5 18 5 z M 12 7 C 14.761 7 17 9.239 17 12 C 17 14.761 14.761 17 12 17 C 9.239 17 7 14.761 7 12 C 7 9.239 9.239 7 12 7 z M 12 9 A 3 3 0 0 0 9 12 A 3 3 0 0 0 12 15 A 3 3 0 0 0 15 12 A 3 3 0 0 0 12 9 z"
    />
  </svg>
);

export const HomePageSocials = ({
  autoRotate,
  setAutoRotate,
  setSignUpVisible,
}) => {
  return (
    <>
      {/* Full-height black sidebar on the left. The hamburger (top) and rotate
          button (bottom) are pinned to the corners; the social icons fill the
          space between, spreading responsively and ending up evenly spaced with
          the hamburger/rotate once they reach their max spread. */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "var(--bar-width)",
          zIndex: 100,
          backgroundColor: "black",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // Top-anchored: on narrow screens the icons bunch near the top (below
          // the hamburger); as the width grows the column grows downward toward
          // the rotate button, ending evenly spaced at max.
          justifyContent: "flex-start",
          // Reserve room for the hamburger (top) and rotate (bottom) so the
          // space-evenly column stays evenly spaced with BOTH of them at EVERY
          // width. Each pad = (icon centre offset from that edge) + half a social
          // anchor. Both the hamburger/rotate centre and the anchor height scale
          // with the viewport, so the pad must too — a fixed value only lines up
          // at one width and leaves a gap on narrow screens:
          //   hamburger / rotate centre = var(--bar-width) / 2
          //   half social anchor        = var(--icon-size) / 2 + ~15px
          //   → 74px at max width, shrinking correctly as it narrows.
          paddingTop:
            "calc(var(--bar-width) / 2 + var(--icon-size) / 2 + 15px)",
          paddingBottom:
            "calc(var(--bar-width) / 2 + var(--icon-size) / 2 + 15px)",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
            // Fill the full height between the reserved hamburger/rotate spots
            // so space-evenly spreads the socials evenly across it at EVERY
            // size — no gap before the rotate button at wide viewports.
            height: "100%",
          }}
        >
          <a
            href="https://www.instagram.com/adultdvdmenu/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Profile"
          >
            <InstagramIcon />
          </a>

          <a
            href="https://www.youtube.com/channel/UC56vESvDBh8Vrj_Kb2jdwZg"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube Channel"
          >
            <FontAwesomeIcon
              className="icons-home"
              icon={faYoutube}
              key="youtube"
            />
          </a>
          <a
            href="https://open.spotify.com/artist/1lT3vDbjqz299SxePec6ZG?si=G6ESp6laRuyyfr8QzaV4wQ"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Spotify Profile"
          >
            <FontAwesomeIcon
              className="icons-home"
              icon={faSpotify}
              key="spotify"
            />
          </a>
          <a
            href="https://adultdvd.bandcamp.com/?from=search&search_item_id=3458032651&search_item_type=b&search_match_part=%3F&search_page_id=2244543721&search_page_no=0&search_rank=1&logged_out_menubar=true"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Bandcamp Profile"
          >
            <FontAwesomeIcon
              className="icons-home"
              icon={faBandcamp}
              key="bandcamp"
            />
          </a>
          <a
            href="https://music.apple.com/gb/artist/adult-dvd/1550456447"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Apple Music Profile"
          >
            <FontAwesomeIcon
              className="icons-home"
              icon={faApple}
              key="apple"
            />
          </a>
          <a
            href="https://www.tiktok.com/@adultdvdmenu"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok Profile"
          >
            <FontAwesomeIcon
              className="icons-home"
              icon={faTiktok}
              key="tiktok"
            />
          </a>

          <a
            href="https://www.facebook.com/105580344839479"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook Page"
          >
            <FontAwesomeIcon
              className="icons-home"
              icon={faFacebook}
              color="white"
            />
          </a>

          <a
            onClick={() => setSignUpVisible(true)}
            style={{ cursor: "pointer" }}
            aria-label="Sign up to mailing list"
          >
            <FontAwesomeIcon
              className="icons-home"
              icon={faEnvelope}
              key="envelope"
            />
          </a>
        </div>
      </div>

      {/* Rotate / pause toggle, pinned to the bottom of the sidebar, centred */}
      <img
        alt="toggle rotation"
        src={autoRotate ? pause : rotate}
        onClick={() => setAutoRotate((v) => !v)}
        style={{
          position: "fixed",
          // Equidistant from the bottom and left: the bottom offset matches the
          // horizontal centring gap, so it mirrors the hamburger in the top corner.
          bottom: "calc((var(--bar-width) - var(--icon-size)) / 2)",
          left: "calc(var(--bar-width) / 2)",
          transform: "translateX(-50%)",
          width: "var(--icon-size)",
          zIndex: 101,
          cursor: "pointer",
          opacity: 0.9,
        }}
      />
    </>
  );
};
