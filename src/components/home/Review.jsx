import React, { useState } from "react";
import styled from "./Review.module.css";
import { GoStar } from "react-icons/go";
import Container from "../helpers/container/Container";
import Heading from "../helpers/heading/Heading";
import Button from "../button/Button";
import Modal from "../helpers/modal/Modal";
import Login from "../user/Login";
import { reviews } from "./review";

const Review = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false);

  // for loop to create 5 star icon and add them to the array
  let stars = [];
  for (let index = 0; index < 5; index++) {
    stars.push(<GoStar size="22px" style={{ color: ` var(--yellow)` }} />);
  }

  // map over the stars array and place each element with a span
  const starsList = stars.map((star, index) => <span key={index}>{star}</span>);

  const handleClick = () => setOpenLoginModal((state) => !state);

  //props for heading component
  const heading = (
    <>
      See what <span> others </span>
      are saying
    </>
  );

  //only return 3 random reviews
  const limitReviews = reviews.sort(() => Math.random() - 0.5).slice(0, 3);

  const reviewList = limitReviews.map((review) => {
    return (
      <article key={review.id} className={styled.review}>
        <p>
          <b>{review.name}</b>
        </p>
        {starsList}
        <p className="para">{review.review}</p>
      </article>
    );
  });

  return (
    <>
      <section className={styled.reviews}>
        <Container>
          <article className={styled["reviews-info"]}>
            <Heading className="heading-md" text={heading} />

            <p className="para">
              Here are some reviews from users who have used BookMark.
            </p>

            <Button onClick={handleClick}>Start Organizing</Button>
          </article>
          <section className={styled["review-list"]}>{reviewList}</section>
        </Container>
      </section>

      {/* open modal to prompt user to sign in */}
      {openLoginModal && (
        <Modal openModal={openLoginModal} setOpenModal={setOpenLoginModal}>
          <Login setOpenModal={setOpenLoginModal} />
        </Modal>
      )}
    </>
  );
};

export default Review;
