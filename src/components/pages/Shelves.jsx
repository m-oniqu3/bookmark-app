import React from "react";
import styled from "../shelves/Shelves.module.css";
import { useSearchParams } from "react-router-dom";
import Container from "../helpers/container/Container";
import ShelfNav from "../shelves/ShelfNav";

const Shelves = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <Container>
      <section className={styled.shelves}>
        <ShelfNav
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </section>
    </Container>
  );
};

export default Shelves;
