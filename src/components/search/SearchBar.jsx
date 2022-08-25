import React, { useState } from "react";
import styled from "./SearchBar.module.css";
import { BiSearch } from "react-icons/bi";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleQuery = (e) => setQuery(e.target.value);
  return (
    <form className={styled.search}>
      <input
        type="text"
        value={query}
        onChange={handleQuery}
        placeholder="Search"
      />
      {/* <BiSearch size={20} className={styled.search__icon} /> */}
    </form>
  );
};

export default SearchBar;
