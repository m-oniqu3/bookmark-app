import React from "react";
import styled from "./Booktok.module.css";
import booktok from "../../images/booktok2.jpg";
import Container from "../helpers/container/Container";
import Heading from "../helpers/heading/Heading";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";

const Booktok = () => {
  const navigate = useNavigate();

  const handleClick = () => navigate("/explore");

  // props for heading component
  const heading = (
    <>
      What side of <span>tiktok</span> are you on?
    </>
  );

  return (
    <>
      <section className={styled.booktok}>
        <figure className={styled.bookmark}>
          <img src={booktok} alt="books banner from tubefilter.com" />
        </figure>
        <Container>
          <article className={styled["booktok-info"]}>
            <Heading className="heading-md" text={heading} />

            <p className="para">
              TikTok made me read it! We are staying up to date with #BookTok
              and we've made it easier for you to see what's going viral. Add
              these popular books to your collection and stay up-to-date on the
              latest must-reads.
            </p>
            <Button onClick={handleClick}>Explore</Button>
          </article>
        </Container>
      </section>
    </>
  );
};

export default Booktok;
