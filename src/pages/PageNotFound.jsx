import React from "react";
import errorImg from "../images/errorPage.webp";

export const PageNotFound = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <img
        alt="page not found"
        src={errorImg}
        style={{
          width: "70%",
          paddingTop: "50px",
          marginLeft: "-30px",
          minWidth: "450px",
        }}
      ></img>
    </div>
  );
};
