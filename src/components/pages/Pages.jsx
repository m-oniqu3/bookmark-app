import React from "react";
import Navbar from "../nav/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Library from "./Library";
import Search from "./Search";
import Explore from "./Explore";
import Shelves from "./Shelves";
import NoMatch from "../helpers/routes/NoMatch";
import BookDetails from "../books/BookDetails";
import ProtectedRoute from "../helpers/routes/ProtectedRoute";

const Pages = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route
          path="/library"
          element={
            <ProtectedRoute>
              <Library />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shelves"
          element={
            <ProtectedRoute>
              <Shelves />
            </ProtectedRoute>
          }
        />
        <Route path="/search/:query" element={<Search />} />
        <Route path="/details/:bookId" element={<BookDetails />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
};

export default Pages;
