import React, { useEffect, useState } from "react";
import styled from "./Navbar.module.css";
import Container from "../helpers/container/Container";
import { RiMenuFill } from "react-icons/ri";
import bookmark from "../../images/bookmark.png";
import MobileMenu from "./MobileMenu";
import { useLocation } from "react-router-dom";
import SearchBar from "../search/SearchBar";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { pathname } = useLocation();

  // handle menu open/close
  const handleMenu = () => setOpenMenu((state) => !state);

  //if openMenu is true, prevent scrolling on body
  useEffect(() => {
    if (openMenu) document.body.style.overflow = "hidden";
    else if (!openMenu) document.body.style.overflow = "auto";
  }, [openMenu]);

  //close menu when route changes
  useEffect(() => {
    setOpenMenu(false);
  }, [pathname]);

  return (
    <div className={styled.nav__container}>
      <Container>
        <nav className={styled.nav}>
          <p className={styled.nav__logo}>
            <figure>
              <img src={bookmark} alt="Bookmark Logo" />
            </figure>
            <span>Bookmark</span>
          </p>
          <SearchBar />

          <RiMenuFill size={30} color="var(--yellow)" onClick={handleMenu} />
        </nav>
      </Container>

      {openMenu && <MobileMenu setOpenMenu={setOpenMenu} />}
    </div>
  );
};

export default Navbar;
