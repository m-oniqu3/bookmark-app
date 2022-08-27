import React from "react";
import { useParams } from "react-router-dom";
import styled from "./BookDetails.module.css";
import webSearch from "../../images/web_search.svg";
import server from "../../images/server_down.svg";
import ShowBookDetails from "./ShowBookDetails";
import { useGetBookDetailsQuery } from "../../store/features/api/apiSlice";
import { useSelector } from "react-redux";
import EmptyShelf from "./EmptyShelf";
import Container from "../helpers/container/Container";
import Loading from "../helpers/loading/Loading";

//component to show book details
const BookDetails = () => {
  const { bookId } = useParams();
  const { library } = useSelector((state) => state.bookStore);

  //check if the book is in the library
  const isInLibrary = library?.find((book) => book.bookData.id === bookId);

  // hook to get book details
  const { data, isLoading, isSuccess, isError, error } =
    useGetBookDetailsQuery(bookId);

  const details = { selectedBook: data, isInLibrary };

  if (data === [] && !isError) {
    return (
      <Container className={styled.info}>
        <EmptyShelf
          src={webSearch}
          heading="No results found."
          message="Try searching for another book or visit the Explore page."
          button="Explore"
          route="/explore"
        />
      </Container>
    );
  }

  const errorHeading = error?.data?.error?.message
    ? `${error?.data?.error?.message}`
    : "There was an error when trying to fetch the data.";

  if (isError) {
    return (
      <Container className={styled.info}>
        <EmptyShelf
          src={server}
          heading={errorHeading}
          message="Try searching for another book or visit the Explore page."
          button="Explore"
          route="/explore"
        />
      </Container>
    );
  }

  return (
    <section className={styled.info}>
      {isLoading && <Loading />}
      {isSuccess && <ShowBookDetails details={details} />}
    </section>
  );
};

export default BookDetails;
