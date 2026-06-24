import React, { useState, useEffect } from "react";
import "../styles/sign-up.css";
import { IoMdClose } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";

export const SignUpForm = ({ setSignUpVisible, signUpVisible }) => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleClose = () => {
    setEmail(""); // Reset email input
    setSent(false); // Reset sent status
    setSignUpVisible(false); // Close the modal
    window.history.replaceState({}, document.title, "/");
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
      <AnimatePresence mode="wait">
        {signUpVisible && (
          <motion.div
            key="signup-overlay"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.15 }}
            className="signup-overlay"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) handleClose();
            }}
          >
            <div className="signup-modal">
              <button
                type="button"
                className="signup-close"
                aria-label="Close"
                onClick={handleClose}
              >
                <IoMdClose size={26} />
              </button>

              <div className="signup-header">
                <h2 className="signup-title">Sign Up</h2>
              </div>

              <div className="signup-body">
                {sent ? (
                  <div className="signup-success">
                    <p className="signup-success-text">Signed up!</p>
                    <button
                      type="button"
                      className="signup-send"
                      onClick={handleClose}
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <form className="signup-form" onSubmit={handleSubmit}>
                    <label className="signup-label" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="signup-input"
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <button type="submit" className="signup-send">
                      Send
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
