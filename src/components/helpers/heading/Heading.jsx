import React from "react";
import styled from "./Heading.module.css";

const Heading = (props) => {
  return (
    <h1 className={`${styled[`${props.className}`]} ${styled.heading}`}>
      {props.text}
    </h1>
  );
};

export default Heading;
