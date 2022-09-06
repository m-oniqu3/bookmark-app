import React from "react";
import { useSelector } from "react-redux";
import PrivateHome from "../home/PrivateHome";
import PublicHome from "../home/PublicHome";
import Footer from "../nav/Footer";

const Home = () => {
  const { isSignedIn } = useSelector((state) => state.auth);

  const home = { position: "relative", top: "10vh" };

  return (
    <div style={home}>
      {isSignedIn ? <PrivateHome /> : <PublicHome />}
      <Footer />
    </div>
  );
};

export default Home;
