import React from "react";
import styled from "./EmptyShelf.module.css";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";

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
        <p className="para">{props.message}</p>
        <Button onClick={handleClick}>{props.button}</Button>
      </article>
    </section>
  );
};

export default EmptyShelf;
