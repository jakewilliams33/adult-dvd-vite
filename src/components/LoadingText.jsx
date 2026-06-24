import cdb from "../images/cdb.webp";

export const LoadingText = () => {
  return (
    <>
      <div className="loading-container">
        <div className="cd-spinner">
          <div className="side-view"></div>
          <div className="image-container">
            <img className="ringed-image-a" src={cdb} alt="Loading" />
          </div>
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
