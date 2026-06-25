import errorImg from "../images/errorPage.png";

export const PageNotFound = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <img
        alt="page not found"
        src={errorImg}
        style={{
          position: "absolute",
          width: "70%",
          minWidth: "450px",

          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      ></img>
    </div>
  );
};
