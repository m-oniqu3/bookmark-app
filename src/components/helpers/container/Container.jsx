import React from "react";
import styled from "./Container.module.css";

const Container = ({ children, className }) => {
  return <div className={`${styled.container} ${className}`}>{children}</div>;
};

export default Container;
