import React from "react";
import Container from "../helpers/container/Container";
import Heading from "../helpers/heading/Heading";
import styled from "./Genre.module.css";

const Genre = (props) => {
  //  map over the genrelist recieved from props and return them in a paragraph
  const genres = props.genreList?.map((genre) => {
    return (
      <p key={genre} className={styled["genre-item"]}>
        {genre}
      </p>
    );
  });

  return (
    <section className={styled.genre}>
      <Container className={styled.wrap}>
        <article>
          <Heading
            className={props.headingClassName}
            text={props.headingText}
          />

          {props.paragraph && (
            <p className={`para ${styled.paragraph}`}>{props.paragraph}</p>
          )}
          <div className={styled["genre-group"]}>{genres}</div>
        </article>

        {/* image */}
        <figure
          className={`${styled["genre-img"]} ${styled[props.imgClassName]}`}
        >
          <img src={`${props.src}`} alt={props.alt} />
        </figure>
      </Container>
    </section>
  );
};

export default Genre;
