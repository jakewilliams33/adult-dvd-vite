import { Link } from "react-router-dom";
import "../styles/menu.css";
import {
  faApple,
  faBandcamp,
  faFacebook,
  faInstagram,
  faSpotify,
  faTwitter,
  faYoutube,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const NavList = ({ menuOpen, setMenuOpen, setSignUpVisible }) => {
  const handleClose = () => {
    setMenuOpen(false);
    document.body.style.overflow = "visible";
  };

  return (
    <nav className="list">
      <ul>
        <li style={{ color: "white" }}>
          <Link
            aria-label="Home"
            style={{ textDecoration: "none", color: "white" }}
            onClick={handleClose}
            to="/"
          >
            HOME
          </Link>
        </li>
        <li style={{ color: "white" }}>
          <Link
            aria-label="Store"
            onClick={handleClose}
            style={{ textDecoration: "none", color: "white" }}
            to="store"
          >
            STORE
          </Link>
        </li>
        <li style={{ color: "white" }}>
          <Link
            aria-label="Tour"
            style={{ textDecoration: "none", color: "white" }}
            onClick={handleClose}
            to="tour"
          >
            TOUR
          </Link>
        </li>
        <li style={{ color: "white" }}>
          <Link
            aria-label="Music"
            style={{ textDecoration: "none", color: "white" }}
            onClick={handleClose}
            to="music"
          >
            MUSIC
          </Link>
        </li>

        <li style={{ color: "white" }}>
          <Link
            aria-label="Sign Up"
            style={{ textDecoration: "none", color: "white" }}
            onClick={() => setSignUpVisible(true)}
            to="#"
          >
            SIGN UP
          </Link>
        </li>
        <li style={{ color: "white" }}>
          <Link
            aria-label="Contact"
            style={{ textDecoration: "none", color: "white" }}
            onClick={handleClose}
            to="contact"
          >
            CONTACT
          </Link>
        </li>
      </ul>
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <div className="icon-container">
          <a
            href="fb://page/105580344839479"
            target="_blank"
            aria-label="Facebook Page"
          >
            <FontAwesomeIcon
              className="icons"
              icon={faFacebook}
              color={"white"}
              key="facebook"
            />
          </a>
          <a
            href="https://www.instagram.com/adultdvdmenu/"
            target="_blank"
            aria-label="Instagram Profile"
          >
            <FontAwesomeIcon
              className="icons"
              icon={faInstagram}
              color={"white"}
              key="instagram"
            />
          </a>
          <a
            href="https://twitter.com/DvdAdult"
            target="_blank"
            aria-label="Twitter Profile"
          >
            <FontAwesomeIcon
              className="icons"
              icon={faTwitter}
              color={"white"}
              key="twitter"
            />
          </a>
          <a
            href="https://www.youtube.com/channel/UCmGiw0z6dRClNlIFMCnS8Zw"
            target="_blank"
            aria-label="YouTube Channel"
          >
            <FontAwesomeIcon
              className="icons"
              icon={faYoutube}
              color={"white"}
              key="youtube"
            />
          </a>
          <a
            href="https://open.spotify.com/artist/1lT3vDbjqz299SxePec6ZG?si=G6ESp6laRuyyfr8QzaV4wQ"
            target="_blank"
            aria-label="Spotify Profile"
          >
            <FontAwesomeIcon
              className="icons"
              icon={faSpotify}
              color={"white"}
              key="spotify"
            />
          </a>
          <a
            href="https://adultdvd.bandcamp.com/?from=search&search_item_id=3458032651&search_item_type=b&search_match_part=%3F&search_page_id=2244543721&search_page_no=0&search_rank=1&logged_out_menubar=true"
            target="_blank"
            aria-label="Bandcamp Profile"
          >
            <FontAwesomeIcon
              className="icons"
              icon={faBandcamp}
              color={"white"}
              key="bandcamp"
            />
          </a>
          <a
            href="https://music.apple.com/gb/artist/adult-dvd/1550456447"
            target="_blank"
            aria-label="Apple Music Profile"
          >
            <FontAwesomeIcon
              className="icons"
              icon={faApple}
              color={"white"}
              key="apple"
            />
          </a>
          <a
            href="https://www.tiktok.com/@adultdvdmenu"
            target="_blank"
            aria-label="TikTok Profile"
          >
            <FontAwesomeIcon
              className="icons"
              icon={faTiktok}
              color={"white"}
              key="tiktok"
            />
          </a>
        </div>
      </div>
    </nav>
  );
};
