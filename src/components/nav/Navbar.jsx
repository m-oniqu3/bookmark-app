import React, { useEffect, useState } from "react";
import styled from "./Navbar.module.css";
import Container from "../helpers/container/Container";
import { AiOutlineMenu } from "react-icons/ai";
import bookmark from "../../images/bookmark.png";
import MobileMenu from "./MobileMenu";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "../search/SearchBar";
import Button from "../button/Button";

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
          <div className={styled.nav__logo}>
            <figure>
              <img src={bookmark} alt="Bookmark Logo" />
            </figure>
            <span>Bookmark</span>
          </div>

          <ul className={styled.nav__list}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/explore">Explore</Link>
            </li>
            <li>
              <Link to="/library">Library</Link>
            </li>
            <li>
              <Link to="/shelves">Shelf</Link>
            </li>
          </ul>

          <div className={styled.nav__group}>
            <SearchBar />
            <Button>Sign in</Button>
          </div>

          <AiOutlineMenu
            className={styled.nav__menu}
            size={35}
            onClick={handleMenu}
          />
        </nav>
      </Container>

      {openMenu && <MobileMenu setOpenMenu={setOpenMenu} />}
    </div>
  );
};

export default Navbar;
