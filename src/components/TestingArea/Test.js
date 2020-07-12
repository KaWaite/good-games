import React from "react";
// import LoadingAnimation from "./LoadingAnimation";
import svg from "./test.svg";

export default function Test() {
  return (
    <div style={{ background: "red", height: "200px" }}>
      <img
        src={svg}
        alt="testing"
        style={{ height: "45rem", width: "100vw" }}
      />
    </div>
  );
}
