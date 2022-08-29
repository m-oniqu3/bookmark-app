import React from "react";
import Container from "../helpers/container/Container";
import { useSelector } from "react-redux";

const Home = () => {
  const { isSignedIn } = useSelector((state) => state.auth);
  //top 10vh
  const home = {
    position: "relative",
    top: "10vh",
  };

  return (
    <div style={home}>
      <Container>
        {isSignedIn ? <p>Welcome to Bookmark</p> : <p>Log in </p>}
      </Container>
    </div>
  );
};

export default Home;
