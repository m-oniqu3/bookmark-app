import React from "react";
import loading from "../../../images/blocks-wave.svg";
import styled from "./Loading.module.css";

const Loading = () => {
  return (
    <div style={{ position: "relative", height: "90vh" }}>
      <figure className={styled.loading}>
        <img src={loading} alt="Loading icon" />
      </figure>
    </div>
  );
};

export default Loading;
