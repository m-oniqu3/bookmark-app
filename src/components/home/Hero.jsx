import React, { useState } from "react";

import styled from "./Hero.module.css";
import { useNavigate } from "react-router-dom";
import Container from "../helpers/container/Container";
import Heading from "../helpers/heading/Heading";
import Button from "../button/Button";
import Modal from "../helpers/modal/Modal";
import Login from "../user/Login";
import { useSelector } from "react-redux";

const Hero = (props) => {
  const navigate = useNavigate();
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const { isSignedIn } = useSelector((state) => state.auth);

  //navigate to explore page or show login prompt
  const handleClick = () => {
    if (isSignedIn) navigate("/explore");
    else setOpenLoginModal((state) => !state);
  };

  const heroStyle = { backgroundImage: `url(${props.src})` };
  return (
    <>
      <section
        style={heroStyle}
        className={`${styled.hero} ${styled[props.className]}`}
      >
        <Container>
          <article className={styled["hero-text"]}>
            <Heading className="heading-lg" text={props.heroHeading} />
            <p className="para">{props.text}</p>
            <Button onClick={handleClick}>{props.buttonText}</Button>
          </article>
        </Container>
      </section>

      {/* open modal if user is not logged in */}
      {openLoginModal && (
        <Modal openModal={openLoginModal} setOpenModal={setOpenLoginModal}>
          <Login setOpenModal={setOpenLoginModal} />
        </Modal>
      )}
    </>
  );
};

export default Hero;
