import React, { useState, useEffect } from "react";
import ad from "../images/adorange.webp";
import envelope from "../images/envelopeorange.webp";
import monkey from "../images/monkeyorange.webp";
import barcode from "../images/barcode.webp";
import "../styles/sign-up.css";
import { IoMdClose } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

export const SignUpForm = ({ setSignUpVisible, signUpVisible }) => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleClose = () => {
    setEmail("");
    setSent(false); // Reset sent status
    setSignUpVisible(false);
    // Remove the modal state from history
    history.replaceState({}, document.title);
  };

  useEffect(() => {
    const handlePopstate = () => {
      if (signUpVisible) {
        handleClose(); // Close the modal if it's open
      }
    };

    window.addEventListener("popstate", handlePopstate);

    // Push a new state when the modal opens
    if (signUpVisible) {
      history.pushState({ modalOpen: true }, "");
    }

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [signUpVisible]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      api_key: "3vg62o6wu9CG0xf0H1NYMA",
      email,
      tags: [],
    };

    try {
      const response = await fetch(
        "https://api.convertkit.com/v3/forms/6835440/subscribe",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      result.subscription ? setSent(true) : alert("Subscription failed");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <>
      {" "}
      <Helmet>
        <title>Sign Up</title>
        <meta name="description" content="Mailing List" />
      </Helmet>
      <AnimatePresence mode="wait">
        {signUpVisible && (
          <motion.div
            key={"a"}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.1 }}
            style={{
              width: "100%",
              height: "100%",
              zIndex: 1000000,
              position: "absolute",
              backgroundColor: "rgba(0, 0, 0, 0.45)",
              backdropFilter: "blur(10px)",
            }}
          >
            <IoMdClose
              style={{ position: "absolute", right: 10, top: 10 }}
              size={40}
              fill="#FB6127"
              className="cross"
              onClick={handleClose}
            />
            <div className={sent ? "sign-up-sent" : "form-container-sign-up"}>
              <div
                className="inner-box inner-box-sign-up"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div className="top-banner-sign-up">
                  <div style={{ borderRight: "#fb772b solid 1.4pt" }}>
                    <img
                      style={{ width: "80px", marginLeft: "5px" }}
                      src={ad}
                      alt="ad"
                    />
                  </div>
                  <img
                    style={{ width: "115px" }}
                    src={envelope}
                    alt="envelope"
                  />
                  <img
                    loading="eager"
                    style={{ width: "80px" }}
                    src={monkey}
                    alt="monkey"
                  />
                </div>
                <div className="information">
                  <p style={{ fontWeight: "bold" }}>
                    SIGN UP TO THE A.D POSTAL SERVICE
                  </p>
                </div>
                <form
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                  onSubmit={handleSubmit}
                >
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "93%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <label style={{ marginTop: "20px" }} htmlFor="email">
                          Email:
                        </label>
                        <input
                          style={{ width: "100%", marginBottom: "25px" }}
                          className="feedback-input"
                          type="email"
                          id="email"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div className="dividers"></div>
                      {sent && (
                        <>
                          <h2 style={{ marginTop: "5px" }}>SIGNED UP!</h2>
                          <p
                            onClick={handleClose}
                            style={{
                              cursor: "pointer",
                              textDecoration: "underline",
                              fontWeight: "bold",
                              marginBottom: "5px",
                            }}
                          >
                            close
                          </p>
                        </>
                      )}

                      <button
                        type="submit"
                        style={{
                          marginBottom: "10px",
                          height: "50px",
                          width: "93%",
                        }}
                      >
                        Sign Up
                      </button>
                      <div className="dividers"></div>
                    </div>

                    <p className="a-adultdvd">a/ ADULT DVD</p>
                    <img
                      loading="eager"
                      style={{
                        marginBottom: "10px",
                        height: "70px",
                        width: "63%",
                        maxWidth: "280px",
                      }}
                      src={barcode}
                      alt="barcode"
                    />
                    <div className="dividers"></div>
                    <div
                      style={{
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <p className="priority-mail">
                        Priority mail is a registered trademark of the A.D.
                        Postal Service
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
