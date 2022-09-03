import React from "react";
import ExploreContent from "../explore/ExploreContent";
import ExploreNav from "../explore/ExploreNav";
import Container from "../helpers/container/Container";
import Footer from "../nav/Footer";

const Explore = () => {
  const explore = { position: "relative", top: "10vh" };

  return (
    <div style={explore}>
      <Container>
        <ExploreNav />
        <ExploreContent />
      </Container>
      <Footer />
    </div>
  );
};

export default Explore;
