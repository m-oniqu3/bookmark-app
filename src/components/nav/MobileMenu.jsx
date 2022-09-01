import React from "react";
import styled from "./MobileMenu.module.css";
import ReactDOM from "react-dom";
import Container from "../helpers/container/Container";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { VscClose } from "react-icons/vsc";
import bookmark from "../../images/bookmark.png";

const MobileMenu = (props) => {
  const { isSignedIn } = useSelector((state) => state.auth);
  //close menu
  const handleClose = () => props.setOpenMenu((state) => !state);

  return ReactDOM.createPortal(
    <div className={styled.menu}>
      <Container>
        <div className={styled.menu__header}>
          <figure className={styled.menu__logo}>
            <img src={bookmark} alt="Bookmark Logo" />
          </figure>

          <div className={styled.menu__icons} onClick={handleClose}>
            <VscClose size={35} color="var(--yellow)" />
          </div>
        </div>
        <ul className={styled.menu__list}>
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
          {!isSignedIn ? <p>Login</p> : <p>Logout</p>}
        </ul>
      </Container>
    </div>,
    document.querySelector("#nav")
  );
};

export default MobileMenu;
