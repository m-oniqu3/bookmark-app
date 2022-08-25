import React from "react";
import Container from "../helpers/container/Container";
import { useParams } from "react-router-dom";

const Search = () => {
  const { query } = useParams();

  return <Container>{query}</Container>;
};

export default Search;
