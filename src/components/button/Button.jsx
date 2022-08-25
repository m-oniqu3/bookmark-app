import React from "react";
import styled from "./Button.module.css";

const Button = (props) => {
  const handleButtonClick = () => props.onClick();

  return (
    <button
      type={props.type}
      onClick={handleButtonClick}
      className={`${styled.button} ${props.className}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
