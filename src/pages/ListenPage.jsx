import { useParams } from "react-router-dom";
import "../styles/listen.css";
import fm from "front-matter";
import markdownContent from "../content/releases.md?url&raw";
import { convertToId } from "../Hooks/convertToId";
import { PageNotFound } from "./PageNotFound";
import pinkObjects from "../images/pink-objects.webp";

const { releases } = fm(markdownContent).attributes;

// Streaming services in display order. `logo` uses linkfire's on-dark variant
// so the logos read on the black panel.
const SERVICES = [
  { key: "spotify", label: "Spotify", logo: "logo_spotify_ondark.svg" },
  { key: "apple", label: "Apple Music", logo: "logo_applemusic_ondark.svg" },
  { key: "bandcamp", label: "Bandcamp", logo: "logo_bandcamp_ondark.svg" },
  { key: "youtube", label: "YouTube", logo: "logo_youtube_ondark.svg" },
  { key: "tidal", label: "Tidal", logo: "logo_tidal_ondark.svg" },
  { key: "amazon", label: "Amazon Music", logo: "logo_amazonmusic_ondark.svg" },
  { key: "deezer", label: "Deezer", logo: "logo_deezer_ondark.svg" },
  { key: "qobuz", label: "qobuz", logo: "logo_qobuz_ondark.svg" },
];

const releasesLookup = releases.reduce((acc, item) => {
  acc[convertToId(item.title)] = item;
  return acc;
}, {});

export const ListenPage = () => {
  const { url_release_id } = useParams();
  // Resolve the release during the first render so there's no flash of
  // PageNotFound before an effect runs.
  const current = releasesLookup[url_release_id] || {};

  if (!current || Object.keys(current).length === 0) return <PageNotFound />;

  return (
    <>
      {" "}
      <img src={pinkObjects} alt="" aria-hidden="true" className="objects-bg" />
      <div className="listen-panel">
        <div className="listen-header">
          {current.image && (
            <img
              className="listen-art"
              src={current.image}
              alt={current.title}
            />
          )}
          <h1 className="listen-title">{current.title}</h1>
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
