import React, { useState } from "react";
import styled from "./MobileMenu.module.css";
import ReactDOM from "react-dom";
import Container from "../helpers/container/Container";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { VscClose } from "react-icons/vsc";
import bookmark from "../../images/bookmark.png";
import Modal from "../helpers/modal/Modal";
import Login from "../user/Login";
import Logout from "../user/Logout";

const MobileMenu = (props) => {
  const { isSignedIn } = useSelector((state) => state.auth);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  //close menu
  const handleClose = () => props.setOpenMenu((state) => !state);

  //show either login/logout component
  const handleLogin = () => {
    if (isSignedIn) setOpenLogoutModal((state) => !state);
    else setOpenLoginModal((state) => !state);
  };

  return ReactDOM.createPortal(
    <>
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
            <p onClick={handleLogin}>{!isSignedIn ? "Login" : "Logout"}</p>
          </ul>
        </Container>
      </div>
      {openLoginModal && (
        <Modal setOpenModal={setOpenLoginModal} openModal={openLoginModal}>
          <Login
            setOpenModal={setOpenLoginModal}
            closeMenu={props.setOpenMenu}
          />
        </Modal>
      )}

      {openLogoutModal && (
        <Modal setOpenModal={setOpenLogoutModal} openModal={openLogoutModal}>
          <Logout
            setOpenLogoutModal={setOpenLogoutModal}
            closeMenu={props.setOpenMenu}
          />
        </Modal>
      )}
    </>,
    document.querySelector("#nav")
  );
};

export default MobileMenu;
