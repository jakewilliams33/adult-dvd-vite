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

export const NavList = ({ menuOpen, setMenuOpen }) => {
  const handleClose = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="list">
      <ul>
        <Link style={{ textDecoration: "none" }} onClick={handleClose} to="/">
          <li>HOME</li>
        </Link>
        <a
          style={{ textDecoration: "none" }}
          target="_blank"
          href="https://adultdvd.bandcamp.com/merch"
        >
          <li>STORE</li>
        </a>
        <Link
          style={{ textDecoration: "none" }}
          onClick={handleClose}
          to="tour"
        >
          <li>TOUR</li>
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          onClick={handleClose}
          to="music"
        >
          <li>MUSIC</li>
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          onClick={handleClose}
          to="contact"
        >
          <li>CONTACT</li>
        </Link>
      </ul>
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <div className="icon-container">
          <a href="fb://page/105580344839479" target="_blank">
            <FontAwesomeIcon
              className="icons"
              icon={faFacebook}
              color={"white"}
              key="facebook"
            />
          </a>
          <a href="https://www.instagram.com/adultdvdmenu/" target="_blank">
            <FontAwesomeIcon
              className="icons"
              icon={faInstagram}
              color={"white"}
              key="instagram"
            />
          </a>
          <a href="https://twitter.com/DvdAdult" target="_blank">
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
          >
            <FontAwesomeIcon
              className="icons"
              icon={faApple}
              color={"white"}
              key="apple"
            />
          </a>
          <a
            href="https://music.apple.com/gb/artist/adult-dvd/1550456447"
            target="_blank"
          >
            <FontAwesomeIcon
              className="icons"
              icon={faTiktok}
              color={"white"}
              key="apple"
            />
          </a>
        </div>
      </div>
    </nav>
  );
};
