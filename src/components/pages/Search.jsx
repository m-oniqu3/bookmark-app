import React, { useState } from "react";
import { useGetSearchResultsQuery } from "../../store/features/api/apiSlice";
import Container from "../helpers/container/Container";

const Search = () => {
  const [term, setTerm] = useState("");
  const [skip, setSkip] = useState(true);
  const { data, isSuccess } = useGetSearchResultsQuery(term, {
    skip,
  });

  const handleTerm = (e) => setTerm(e.target.value);
  console.log(skip);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(term);
    setSkip((state) => !state);
    // console.log(data);
    setTerm("");
  };
  if (isSuccess) console.log(data);

  return (
    <Container>
      <form>
        <input type="text" value={term} onChange={handleTerm} />
        <button type="submit" onClick={handleSubmit}>
          submit
        </button>
      </form>
    </Container>
  );
};

export default Search;
