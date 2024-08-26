import { Helmet } from "react-helmet-async";
import vinyl from "../images/vinyl.webp";
import vinylb from "../images/vinylb.webp";

export const LoadingText = () => {
  return (
    <>
      <div className="loading-container">
        <div className="side-view"></div>
        <div className="image-container">
          <img
            loading="eager"
            className="ringed-image-a"
            src={vinyl}
            alt="Loading"
          />
          <img className="ringed-image-b" src={vinylb} alt="Loading" />
        </div>
        <p className="loading-text">
          loading <span className="dot dot1">.</span>
          <span className="dot dot2">.</span>
          <span className="dot dot3">.</span>
        </p>
      </div>
    </>
  );
};
