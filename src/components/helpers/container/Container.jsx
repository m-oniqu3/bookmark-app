import React from "react";
import styled from "./Container.module.css";

const Container = ({ children }) => {
  return <div className={styled.container}>{children}</div>;
};

export default Container;
