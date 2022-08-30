import React from "react";
import styled from "./ExploreNav.module.css";
import { HashLink as Link } from "react-router-hash-link";

const exploreLinks = [
  { linkName: "Romance Picks", link: "romance" },
  { linkName: "BookTok Sensations", link: "BookTok" },
  { linkName: "Spicy Book Recs ", link: "spice" },
  { linkName: "Fantasy Picks", link: "fantasy" },
  { linkName: "Fiction Picks", link: "fiction" },
  { linkName: "Easy Reads", link: "easy-reads" },
];

const ExploreNav = () => {
  const links = exploreLinks.map(({ linkName, link }) => {
    return (
      <li key={linkName}>
        <Link
          to={`#${link}`}
          scroll={(el) =>
            el.scrollIntoView({ behavior: "smooth", block: "center" })
          }
        >
          {linkName}
        </Link>
      </li>
    );
  });

  return (
    <nav className={styled["explore-nav"]}>
      <h2 className={styled.title}>Categories</h2>
      <ul className={styled.links}>{links}</ul>
    </nav>
  );
};

export default ExploreNav;
