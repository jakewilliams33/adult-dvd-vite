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
import "../styles/loading-spinner.css";
import { IoIosMail } from "react-icons/io";

export const HomePageSocials = ({ setSignUpVisible }) => {
  return (
    <>
      <div
        style={{
          position: "fixed",
          display: "flex",
          height: "min(max(330px,50vw), 86%)",
          left: "12px",
          marginTop: "12px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <a href="fb://page/105580344839479" target="_blank">
            <FontAwesomeIcon
              className="icons-home"
              icon={faFacebook}
              key="facebook"
            />
          </a>
          <a href="https://www.instagram.com/adultdvdmenu/" target="_blank">
            <FontAwesomeIcon
              className="icons-home"
              icon={faInstagram}
              key="instagram"
            />
          </a>
          <a href="https://twitter.com/DvdAdult" target="_blank">
            <FontAwesomeIcon
              className="icons-home"
              icon={faTwitter}
              key="twitter"
            />
          </a>
          <a href="https://www.tiktok.com/@adultdvdmenu" target="_blank">
            <FontAwesomeIcon
              className="icons-home"
              icon={faTiktok}
              key="apple"
            />
          </a>
          <a
            href="https://www.youtube.com/channel/UCmGiw0z6dRClNlIFMCnS8Zw"
            target="_blank"
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
          >
            <FontAwesomeIcon
              className="icons-home"
              icon={faApple}
              key="apple"
            />
          </a>
          {/* <div
            style={{ cursor: "pointer" }}
            onClick={() => setSignUpVisible(true)}
          >
            <IoIosMail className="icons-home" key="mail" />
          </div> */}
        </div>
      </div>
    </>
  );
};
