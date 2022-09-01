import React from "react";
import Container from "../helpers/container/Container";
import Heading from "../helpers/heading/Heading";
import Recommendations from "./Recommendations";
import styled from "./TopPicks.module.css";

const TopPicks = (props) => {
  return (
    <section className={styled["top-picks"]}>
      <Container>
        <article className={styled["top-picks-info"]}>
          <Heading className="heading-md" text={props.text} />
          <p className="para">{props.paragraph}</p>
        </article>

        <Recommendations />
      </Container>
    </section>
  );
};

export default TopPicks;
