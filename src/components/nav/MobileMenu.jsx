import React from "react";
import styled from "./MobileMenu.module.css";
import ReactDOM from "react-dom";
import Container from "../helpers/container/Container";
import { BiSearch } from "react-icons/bi";
import { VscClose } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const MobileMenu = (props) => {
  const { isSignedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  //close menu
  const handleClose = () => props.setOpenMenu((state) => !state);

  const handleSearch = () => navigate("/search");

  return ReactDOM.createPortal(
    <div className={styled.menu}>
      <Container>
        <div className={styled.menu__header}>
          <p className={styled.menu__logo}>Bookmark</p>

          <div className={styled.menu__icons}>
            <BiSearch size={20} onClick={handleSearch} />
            <VscClose size={25} onClick={handleClose} />
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
        </ul>
      </Container>
    </div>,
    document.querySelector("#nav")
  );
};

export default MobileMenu;
