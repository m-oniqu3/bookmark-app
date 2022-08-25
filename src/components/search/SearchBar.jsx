import React, { useState } from "react";
import styled from "./SearchBar.module.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  //update query
  const handleQuery = (e) => setQuery(e.target.value);

  // navigate to search page
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query === "") return;
    navigate(`/search/${query}`);
    setQuery("");
  };

  return (
    <form className={styled.search} onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={handleQuery}
        placeholder="Search Bookmark"
      />
    </form>
  );
};

export default SearchBar;
