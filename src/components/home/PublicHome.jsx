import React from "react";
import reading_svg from "../../images/reading_svg.png";
import covers from "../../images/covers.png";
import Hero from "./Hero";
import Genre from "./Genre";
import TopPicks from "./TopPicks";
import Booktok from "./BookTok";
import Review from "./Review.jsx";

// props to pass to the genre component
const genreList = [
  "Fiction",
  "Fantasy",
  "Romance",
  "Humour",
  "Horror",
  "New Adult",
  "Non-Fiction",
  "Mystery",
];

const PublicHome = () => {
  //Hero Props
  const heroHeading = (
    <>
      Your <span>online</span> bookshelf
    </>
  );

  const heroText =
    "The preferred bookmarking app for book lovers. Create your online bookshelf and add to your library anytime, anywhere. Stay organized with shelves and never lose track of a book again!";

  const buttonText = "Start Organizing";

  // props to pass to the genre component
  const text = (
    <>
      All your favourites in <span>one</span> place
    </>
  );

  // props to pass to the genre component
  const paragraph =
    "If you're looking for a way to keep track of all your favorite books, then BookMark is the app for you! Access all your favorites in one central location. Create your bookshelf and add all your favorite titles to it.";

  // props to pass to the top picks component

  return (
    <section>
      <Hero
        src={covers}
        text={heroText}
        buttonText={buttonText}
        heroHeading={heroHeading}
      />
      <Genre
        genreList={genreList}
        headingClassName="heading-md"
        headingText={text}
        src={reading_svg}
        alt="person reading a book"
        paragraph={paragraph}
      />
      <TopPicks
        text={
          <>
            Top picks of the <span>month</span>
          </>
        }
        paragraph="These books are all great reads that will keep you entertained for hours on end. If you're looking for something new to read, be sure to check out one of these books!"
      />
      <Booktok />
      <Review />
    </section>
  );
};

export default PublicHome;
