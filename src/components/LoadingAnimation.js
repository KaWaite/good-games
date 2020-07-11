import React from "react";
import ReactLoading from "react-loading";

const LoadingAnimation = ({ type, color }) => (
  <ReactLoading type={type} color={color} height={667} width={375} />
);

export default LoadingAnimation;
