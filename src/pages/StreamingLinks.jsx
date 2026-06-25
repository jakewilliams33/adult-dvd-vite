import "../styles/listen.css";
import logo from "../images/adult-dvd-logo.svg";
import { Helmet } from "react-helmet-async";
import pinkObjects from "../images/pink-objects.webp";

const current = {
  spotify: "https://open.spotify.com/artist/1lT3vDbjqz299SxePec6ZG",
  apple: "https://music.apple.com/gb/artist/adult-dvd/1550456447?app=music",
  youtube: "https://youtube.com/channel/UCakmVX0tf0TdJfO8g1JCd2Q",
  soundcloud: "https://soundcloud.com/adult-dvd",
  tidal: "https://tidal.com/browse/artist/23201828",
  deezer: "https://deezer.com/artist/121127372",
  amazon:
    "https://music.amazon.co.uk/artists/B08TV78J8F/adult-dvd?marketplaceId=A1F83G8C2ARO7P&musicTerritory=GB&ref=dm_sh_y6L9rncT16xJ3RVHqAy0JCheJ",
  bandcamp:
    "https://adultdvd.bandcamp.com/?from=search&search_item_id=3458032651&search_item_type=b&search_match_part=%3F&search_page_id=2552049260&search_page_no=1&search_rank=1&search_sig=522b1de8bbb4315624551e209b71a28a",
  qobuz: "https://open.qobuz.com/artist/8792592",
};

// On-dark logos so they read on the black panel.
const SERVICES = [
  { key: "spotify", label: "Spotify", logo: "logo_spotify_ondark.svg" },
  { key: "apple", label: "Apple Music", logo: "logo_applemusic_ondark.svg" },
  { key: "bandcamp", label: "Bandcamp", logo: "logo_bandcamp_ondark.svg" },
  { key: "youtube", label: "YouTube", logo: "logo_youtube_ondark.svg" },
  { key: "tidal", label: "Tidal", logo: "logo_tidal_ondark.svg" },
  { key: "amazon", label: "Amazon Music", logo: "logo_amazonmusic_ondark.svg" },
  { key: "deezer", label: "Deezer", logo: "logo_deezer_ondark.svg" },
  { key: "qobuz", label: "Qobuz", logo: "logo_qobuz_ondark.svg" },
];

export const StreamingLinks = () => {
  return (
    <>
      <Helmet>
        <title>ADULT DVD</title>
        <meta
          name="description"
          content="Listen to ADULT DVD on your favourite platform."
        />
      </Helmet>
      <img src={pinkObjects} alt="" aria-hidden="true" className="objects-bg" />

      <div className="listen-panel">
        <div className="listen-header">
          <img className="listen-logo" src={logo} alt="Adult DVD" />
        </div>

        <div className="listen-links">
          {SERVICES.filter((s) => current[s.key]).map((s) => (
            <a
              key={s.key}
              className="listen-link"
              href={current[s.key]}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={`https://services.linkfire.com/${s.logo}`}
                alt={s.label}
              />
            </a>
          ))}
        </div>
      </div>
    </>
  );
};
