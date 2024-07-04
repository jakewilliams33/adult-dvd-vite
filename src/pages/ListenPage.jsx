import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import "../styles/listen.css";
import fm from "front-matter";
import markdownContent from "../content/releases.md?url&raw";
import { convertToId } from "../Hooks/convertToId";
import ad from "../images/adorange.png";
import monkey from "../images/monkeyorange.png";
import "../styles/postage-label.css";
import border from "../images/border.jpg";
import barcode from "../images/barcode.png";

const { releases } = fm(markdownContent).attributes;

export const ListenPage = ({ opacity }) => {
  const { url_release_id } = useParams();
  const [current, setCurrent] = useState({});

  // Preprocess into a lookup object
  const releasesLookup = releases.reduce((acc, item) => {
    const id = convertToId(item.title);
    acc[id] = item;
    return acc;
  }, {});

  //Look up match and set as current release
  useEffect(() => {
    const x = releasesLookup[url_release_id];
    setCurrent(x);
  }, [url_release_id, releasesLookup]);

  return (
    <>
      {Object.keys(current).length > 0 ? (
        <div>
          <div className="link-container">
            <div className="top-banner-tour">
              <div style={{ borderRight: "#fb772b solid 1.4pt" }}>
                <img
                  style={{ width: "80px", marginLeft: "5px" }}
                  src={ad}
                ></img>
              </div>
              <img
                style={{
                  width: "90px",
                  maxHeight: "100%",
                  objectFit: "contain",
                  borderImage: `url(${border}) 30 round`,
                  borderRight: "solid 1.4pt",
                  borderLeft: "solid 1.4pt",
                }}
                src={current.image}
              ></img>{" "}
              <img style={{ width: "80px" }} src={monkey}></img>
            </div>
            <div className="inner-box-scroll-listen custom-scroll">
              <h2 className="track-title">{current.title}</h2>
              <ul>
                <li>
                  <div className="dividers"></div>

                  <a target="blank" href={current.spotify}>
                    <img
                      data-test="music-service-item-image"
                      src="https://services.linkfire.com/logo_spotify_onlight.svg"
                      alt="Spotify"
                    ></img>
                  </a>
                </li>
                <div className="dividers"></div>
                {current.apple && (
                  <li>
                    <a target="blank" href={current.apple}>
                      <img
                        data-test="music-service-item-image"
                        src="https://services.linkfire.com/logo_applemusic_onlight.svg"
                        alt="Apple Music"
                      ></img>
                    </a>
                    <div className="dividers"></div>
                  </li>
                )}
                {current.bandcamp && (
                  <li>
                    <a target="blank" href={current.bandcamp}>
                      <img
                        data-test="music-service-item-image"
                        src="https://services.linkfire.com/logo_bandcamp_onlight.svg"
                        alt="bandcamp"
                      ></img>
                    </a>
                    <div className="dividers"></div>
                  </li>
                )}
                {current.youtube && (
                  <li>
                    <a target="blank" href={current.youtube}>
                      <img
                        data-test="music-service-item-image"
                        src="https://services.linkfire.com/logo_youtube_onlight.svg"
                        alt="youtube"
                      ></img>
                    </a>
                    <div className="dividers"></div>
                  </li>
                )}
                <li>
                  <a target="blank" href={current.tidal}>
                    <img
                      data-test="music-service-item-image"
                      src="https://services.linkfire.com/logo_tidal_onlight.svg"
                      alt="tidal"
                    ></img>
                  </a>
                  <div className="dividers"></div>
                </li>
                {current.amazon && (
                  <li>
                    <a target="blank" href={current.amazon}>
                      <img
                        data-test="music-service-item-image"
                        src="https://services.linkfire.com/logo_amazonmusic_onlight.svg"
                        alt="amazon"
                      ></img>
                    </a>
                    <div className="dividers"></div>
                  </li>
                )}
                {current.deezer && (
                  <li>
                    <a target="blank" href={current.deezer}>
                      <img
                        data-test="music-service-item-image"
                        src="https://services.linkfire.com/logo_deezer_onlight.svg"
                        alt="deezer"
                      ></img>
                    </a>
                    <div className="dividers"></div>
                  </li>
                )}
              </ul>
              <p className="a-adultdvd">a/ ADULT DVD</p>
              <img
                style={{ height: "55px", width: "63%", maxWidth: "280px" }}
                src={barcode}
              ></img>

              <div className="dividers"></div>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <p className="priority-mail" style={{}}>
                  Priority mail is a registered trademark of the A.D. Postal
                  Service
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

{
  /* <div
  style={{
    display: "flex",
    alignItems: "center",
    height: "90px",
  }} // Specify a height for the banner
  className="top-banner"
>
  <div
    style={{
      borderImage: `url(${border}) 30 round`,
      borderRight: "solid 1.4pt",
      height: "100%",
      display: "flex",
      alignItems: "center",
    }}
  >
    {" "}
    <img
      style={{
        width: "80px",
        marginLeft: "5px",
        maxHeight: "100%",
        maxWidth: "100%",
      }}
      src={ad}
    ></img>
  </div>
  <div style={{ display: "flex", alignItems: "center" }}>
    <img
      style={{
        width: "90px",
        maxHeight: "100%",
        objectFit: "contain",
        borderImage: `url(${border}) 30 round`,
        borderRight: "solid 1.4pt",
        borderLeft: "solid 1.4pt",
      }}
      src={current.image}
    ></img>{" "}
  </div>
  <img
    style={{
      width: "85px",
      maxHeight: "100%",
      objectFit: "contain",
      marginRight: "5px",
    }}
    src={monkey}
  ></img>{" "}
</div>; */
}
