import React, { useEffect, useState, useCallback } from "react";
import "../styles/listen.css";
import ad from "../images/adorange.png";
import monkey from "../images/monkeyorange.png";
import "../styles/postage-label.css";
import barcode from "../images/barcode.png";
import envelope from "../images/envelopeorange.png";

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
};

export const StreamingLinks = () => {
  // Preprocess into a lookup object

  return (
    <>
      <div>
        <div className="link-container">
          <div className="top-banner-tour">
            <div style={{ borderRight: "#fb772b solid 1.4pt" }}>
              <img style={{ width: "63px", marginLeft: "5px" }} src={ad}></img>
            </div>
            <img style={{ width: "89px" }} src={envelope} alt="envelope" />

            <img style={{ width: "57px" }} src={monkey}></img>
          </div>
          <div className="inner-box-scroll-listen custom-scroll">
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
    </>
  );
};
