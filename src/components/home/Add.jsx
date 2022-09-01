import React from "react";
import styled from "./Add.module.css";
import { useNavigate } from "react-router-dom";
import Container from "../helpers/container/Container";
import Heading from "../helpers/heading/Heading";
import Button from "../button/Button";
import add from "../../images/add.png";

const Add = () => {
  const navigate = useNavigate();

  //navigate to explore page
  const handleClick = () => navigate("/explore");

  return (
    <section className={styled.add}>
      <Container className={styled.wrap}>
        <article className={styled["add-info"]}>
          <Heading
            className="heading-md"
            text={
              <>
                Add to your <span> library</span>
              </>
            }
          />
          <p className="para">
            Add to your library and create shelves to keep track of your
            reading. Categorize your books so you can easily find them when you
            want to re-read a favorite or find a new book in a genre you enjoy.
          </p>
          <Button onClick={handleClick}>Get Started</Button>
        </article>

        <figure>
          <img src={add} alt="illustration of a girl with a checklist " />
        </figure>
      </Container>
    </section>
  );
};

export default Add;
