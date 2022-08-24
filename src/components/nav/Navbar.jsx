import React, { useEffect, useState } from "react";
import styled from "./Navbar.module.css";
import Container from "../helpers/container/Container";
import { RiMenuFill } from "react-icons/ri";
import { BiSearch } from "react-icons/bi";
import MobileMenu from "./MobileMenu";
import { useLocation } from "react-router-dom";

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
    <>
      <Container>
        <nav className={styled.nav}>
          <p className={styled.nav__logo}>Bookmark</p>

          <div className={styled.nav__icons}>
            <BiSearch size={20} />
            <RiMenuFill size={20} onClick={handleMenu} />
          </div>
        </nav>
      </Container>

      {openMenu && <MobileMenu setOpenMenu={setOpenMenu} />}
    </>
  );
};

export default Navbar;
