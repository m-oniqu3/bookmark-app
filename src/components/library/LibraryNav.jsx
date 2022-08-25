import React, { useEffect, useState } from "react";
import styled from "./LibraryNav.module.css";

const links = ["All", "TBR", "In Progress", "Completed", "DNF"];

const LibraryNav = ({ searchParams, setSearchParams }) => {
  const [link, setlink] = useState("");

  //get the category from the url
  let urlParam = searchParams?.get("category");

  const handleLink = (link) => setlink(link);

  //update the search params when the link changes
  useEffect(() => {
    if (link) {
      setSearchParams({ category: link });
    }
  }, [link, setSearchParams]);

  const navLinks = links.map((link) => {
    const active =
      urlParam === link || (urlParam === "To Be Read" && link === "TBR");
    return (
      <p
        key={link}
        onClick={() => handleLink(link)}
        className={active ? styled.active : styled.link}
      >
        {link}
      </p>
    );
  });

  return (
    <nav className={styled["library-navbar"]}>
      <h1>Your Library</h1>
      <div className={styled["library-links"]}>{navLinks}</div>
    </nav>
  );
};

export default LibraryNav;
