import React from "react";
import { useSelector } from "react-redux";
import PublicHome from "../home/PublicHome";

const Home = () => {
  const { isSignedIn } = useSelector((state) => state.auth);
  //top 10vh
  const home = {
    position: "relative",
    top: "10vh",
  };

  return (
    <div style={home}>
      {isSignedIn ? <p>Welcome to Bookmark</p> : <PublicHome />}
    </div>
  );
};

export default Home;
