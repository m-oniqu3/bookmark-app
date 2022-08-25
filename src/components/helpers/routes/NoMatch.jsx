import React from "react";
import EmptyShelf from "../../books/EmptyShelf";
import noMatch from "../../../images/404.svg";
import Container from "../container/Container";

const heading = "Oops! Page not found.";
const message =
  "Sorry, either you typed the wrong URL or the page you are looking for doesn't exist. Try going back to the home page.";

const NoMatch = () => {
  return (
    <Container>
      <EmptyShelf
        src={noMatch}
        heading={heading}
        message={message}
        button="Home"
        route="/"
      />
    </Container>
  );
};

export default NoMatch;
