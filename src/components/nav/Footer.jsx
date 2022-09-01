import React from "react";
import styled from "./Footer.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "../helpers/container/Container";

const Footer = () => {
  const { isSignedIn } = useSelector((state) => state.auth);

  return (
    <footer className={styled["footer-container"]}>
      <Container className={styled.footer}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/explore">Explore</Link>
          </li>

          {isSignedIn && (
            <li>
              <Link to="/library">Library</Link>
            </li>
          )}

          {isSignedIn && (
            <li>
              <Link to="/shelves">Shelves</Link>
            </li>
          )}
        </ul>
      </Container>
      <p className={styled.copyright}>&copy; 2020 Bookmark</p>
    </footer>
  );
};

export default Footer;
