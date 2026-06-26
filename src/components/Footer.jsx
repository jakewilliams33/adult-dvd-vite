const footerStyle = {
  textAlign: "right",
  padding: "0.2rem",
  paddingRight: "0.5rem",
  boxSizing: "border-box",
  fontSize: "0.5rem",
  color: "rgb(255, 255, 255)",
  fontFamily: "WTBobine-Italic",
  fontStyle: "italic",
  letterSpacing: "0.05em",
  width: "100%",
};

export const Footer = ({ fixed = false }) => (
  <footer
    style={{
      ...footerStyle,
      ...(fixed
        ? {
            position: "fixed",
            bottom: 0,
            left: 0,
            zIndex: 10,
            pointerEvents: "none",
          }
        : {}),
    }}
  >
    BUILT BY JAKE WILLIAMS
  </footer>
);
