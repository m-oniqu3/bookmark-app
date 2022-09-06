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
      <ul className={styled.copyright}>
        <li>&copy; 2020 Bookmark </li>
        <li>
          <a
            target="_blank"
            href="https://github.com/m-oniqu3?tab=repositories"
            rel="noreferrer"
          >
            Designed & Developed by Monique
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
