import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "../styles/music.css";
import fm from "front-matter";
import markdownContent from "../content/releases.md?url&raw";
import { convertToId } from "../Hooks/convertToId";
import { Helmet } from "react-helmet-async";

const { releases } = fm(markdownContent).attributes;

export const MusicPage = ({ slide }) => {
  return (
    <>
      <Helmet>
        <title>Music</title>
        <meta name="description" content="Music" />
      </Helmet>
      <motion.div
        variants={slide}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.3 }}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
      >
        <section className="o-page__section--discography">
          <div className="titleSection"></div>
          <div className="c-releases">
            {releases.map(({ image, title, displayOnMusicPage }) => {
              if (displayOnMusicPage === "yes") {
                return (
                  <div key={image} className="release">
                    <motion.div
                      initial={{ opacity: 0, y: "20%", scale: "90%" }}
                      whileInView={{ opacity: 1, y: 0, scale: "100%" }}
                      transition={{ duration: 1 }}
                    >
                      <div className="packshot">
                        <Link to={`/listen/${convertToId(title)}`}>
                          <img
                            alt="Album art"
                            className="pictures"
                            src={image}
                          ></img>
                        </Link>
                      </div>
                    </motion.div>
                    <div className="info">
                      <motion.div
                        initial={{ opacity: 0, y: "20%" }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5 }}
                      >
                        <h3>{title}</h3>

                        <div>
                          <Link
                            to={`/listen/${convertToId(title)}`}
                            style={{ color: "white", textDecoration: "none" }}
                          >
                            <p>Listen</p>
                          </Link>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </section>
      </motion.div>
    </>
  );
};
