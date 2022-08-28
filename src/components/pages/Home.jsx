import React from "react";
import Container from "../helpers/container/Container";

const Home = () => {
  //top 10vh
  const home = {
    position: "relative",
    top: "10vh",
  };

  return (
    <div style={home}>
      <Container>Home</Container>;
    </div>
  );
};

export default Home;
