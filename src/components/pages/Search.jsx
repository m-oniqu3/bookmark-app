import React from "react";
import styled from "../search/Search.module.css";
import Container from "../helpers/container/Container";
import { Navigate, useParams } from "react-router-dom";
import { useGetSearchResultsQuery } from "../../store/features/api/apiSlice";
import Loading from "../helpers/loading/Loading";
import BookResults from "../search/BookResults";
import EmptyShelf from "../books/EmptyShelf";
import server from "../../images/server_down.svg";
import webSearch from "../../images/web_search.svg";

const Search = () => {
  //query from url
  const { query } = useParams();
  let content = null;

  //fetch data when component mounts
  const { data, isLoading, isSuccess, isError, error, isFetching } =
    useGetSearchResultsQuery(query);

  const empty =
    !data?.items || data?.items === undefined || data?.items.length === 0;

  const errorHeading = error?.data?.error?.message
    ? `${error?.data?.error?.message}`
    : "There was an error when trying to fetch the data.";

  if (isSuccess && !empty) {
    content = <BookResults bookResults={data?.items} searchQuery={query} />;
  } else if (isError) {
    content = (
      <EmptyShelf
        src={server}
        heading={errorHeading}
        message="Try searching for another book or visit the Explore page."
        button="Explore"
        route="/explore"
      />
    );
  } else if (empty && !isError && !isLoading) {
    content = (
      <EmptyShelf
        src={webSearch}
        heading="No results found."
        message="Try searching for another book or visit the Explore page."
        button="Explore"
        route="/explore"
      />
    );
  }

  // prevent user from visiting the route manually, without a search query
  if (!query) return <Navigate to="/" />;

  if (isLoading || isFetching) return <Loading />;
  return (
    <section className={styled.results}>
      <Container>{content}</Container>
    </section>
  );
};

export default Search;
