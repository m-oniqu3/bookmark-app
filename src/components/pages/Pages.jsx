import React from "react";
import Navbar from "../nav/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Library from "./Library";

import Search from "./Search";
import Explore from "./Explore";
import Shelves from "./Shelves";

const Pages = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/library" element={<Library />} />
        <Route path="/shelves" element={<Shelves />} />
        <Route path="/search/:query" element={<Search />} />
        <Route path="/explore" element={<Explore />} />
      </Routes>
    </>
  );
};

export default Pages;
