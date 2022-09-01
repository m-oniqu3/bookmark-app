import React, { useEffect, useState } from "react";
import styled from "./Navbar.module.css";
import Container from "../helpers/container/Container";
import { AiOutlineMenu } from "react-icons/ai";
import bookmark from "../../images/bookmark.png";
import MobileMenu from "./MobileMenu";
import { NavLink as Link, useLocation } from "react-router-dom";
import SearchBar from "../search/SearchBar";
import Button from "../button/Button";
import Modal from "../helpers/modal/Modal";
import Login from "../user/Login";
import { useSelector } from "react-redux";
import Logout from "../user/Logout";

const Navbar = () => {
  const { isSignedIn } = useSelector((state) => state.auth);
  const [openMenu, setOpenMenu] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const { pathname } = useLocation();

  // handle menu open/close
  const handleMenu = () => setOpenMenu((state) => !state);
  const handleLogin = () => setOpenModal((state) => !state);
  const handleLogout = () => setOpenLogoutModal((state) => !state);

  //if openMenu is true, prevent scrolling on body
  useEffect(() => {
    if (openMenu) document.body.style.overflow = "hidden";
    else if (!openMenu) document.body.style.overflow = "auto";
  }, [openMenu]);

  //close menu when route changes
  useEffect(() => {
    setOpenMenu(false);
  }, [pathname]);

  //active link style
  const navStyle = ({ isActive }) => {
    return {
      color: isActive ? " var(--dark-blue)" : "var(--med-grey)",
      fontWeight: isActive ? "bold" : "500",
    };
  };

  return (
    <>
      <div className={styled.nav__container}>
        <Container>
          <nav className={styled.nav}>
            <div className={styled.nav__logo}>
              <figure>
                <img src={bookmark} alt="Bookmark Logo" />
              </figure>
              <span>Bookmark</span>
            </div>

            <ul className={styled.nav__list}>
              <li>
                <Link style={navStyle} to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link style={navStyle} to="/explore">
                  Explore
                </Link>
              </li>

              {isSignedIn && (
                <li>
                  <Link style={navStyle} to="/library">
                    Library
                  </Link>
                </li>
              )}
              {isSignedIn && (
                <li>
                  <Link style={navStyle} to="/shelves">
                    Shelves
                  </Link>
                </li>
              )}
            </ul>

            <div className={styled.nav__group}>
              <SearchBar />
              {!isSignedIn ? (
                <Button onClick={handleLogin}>Login</Button>
              ) : (
                <Button onClick={handleLogout}>Logout</Button>
              )}
            </div>

            <div onClick={handleMenu} className={styled.nav__menu}>
              <AiOutlineMenu />
            </div>
          </nav>
        </Container>

        {openMenu && <MobileMenu setOpenMenu={setOpenMenu} />}
      </div>

      {/* show login modal */}
      {openModal && (
        <Modal setOpenModal={setOpenModal} openModal={openModal}>
          <Login setOpenModal={setOpenModal} />
        </Modal>
      )}

      {openLogoutModal && (
        <Modal setOpenModal={setOpenLogoutModal} openModal={openLogoutModal}>
          <Logout setOpenLogoutModal={setOpenLogoutModal} />
        </Modal>
      )}
    </>
  );
};

export default Navbar;
