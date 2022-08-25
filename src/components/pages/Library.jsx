import React from "react";
import { useSearchParams } from "react-router-dom";
import Container from "../helpers/container/Container";
import LibraryNav from "../library/LibraryNav";

const Library = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <Container>
      <LibraryNav
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
    </Container>
  );
};

export default Library;
