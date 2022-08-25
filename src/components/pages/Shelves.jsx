import React from "react";
import { useSearchParams } from "react-router-dom";
import Container from "../helpers/container/Container";
import ShelfNav from "../shelves/ShelfNav";

const Shelves = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <Container>
      <ShelfNav searchParams={searchParams} setSearchParams={setSearchParams} />
    </Container>
  );
};

export default Shelves;
