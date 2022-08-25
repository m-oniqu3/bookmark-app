import React from "react";
import styled from "./EmptyShelf.module.css";
// import Button from "../button/Button";
import { useNavigate } from "react-router-dom";

const EmptyShelf = (props) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(`${props.route}`);

  return (
    <section className={styled["empty-shelf"]}>
      <figure>
        <img src={props.src} alt="Illustration of a girl searching the web." />
      </figure>

      <article>
        <h2> {props.heading}</h2>
        <p>{props.message}</p>
        <button onClick={handleClick}>{props.button}</button>
      </article>
    </section>
  );
};

export default EmptyShelf;
