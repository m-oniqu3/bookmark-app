import React from "react";
import { useSearchParams } from "react-router-dom";
import Container from "../helpers/container/Container";
import BooksForLibrary from "../library/BooksForLibrary";
import LibraryNav from "../library/LibraryNav";

const Library = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const library = { position: "relative", top: "10vh" };

  return (
    <div style={library}>
      <Container>
        <LibraryNav
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
        <BooksForLibrary
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </Container>
    </div>
  );
};

export default Library;
