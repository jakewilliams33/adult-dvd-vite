import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "../styles/music.css";
import fm from "front-matter";
import markdownContent from "../content/releases.md?url&raw";
import { convertToId } from "../Hooks/convertToId";
import { Helmet } from "react-helmet-async";
import { Footer } from "../components/Footer";

const { releases } = fm(markdownContent).attributes;

export const MusicPage = () => {
  return (
    <>
      <Helmet>
        <title>Music | ADULT DVD</title>
        <meta
          name="description"
          content="Stream ADULT DVD's discography — singles, EPs and releases."
        />
      </Helmet>
      <div
        style={{
          width: "100vw",
          height: "100%",
          backgroundColor: "black",
          position: "fixed",
          zIndex: "-1",
          opacity: 0.5,
        }}
      ></div>
      <div>
        <div className="music-overlay" />
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
                            alt={title}
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
      </div>
      <Footer />
    </>
  );
};
