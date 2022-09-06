import React, { useEffect } from "react";
import useFilterLibrary from "../../hooks/useFilterLibrary";
import useGetAllBooks from "../../hooks/useGetAllBooks";
import search from "../../images/search.svg";
import EmptyShelf from "../books/EmptyShelf";

//props for empty shelf
const heading = "There are no books here as yet.";
const message =
  "Search for a book to add it to your Library or visit the Explore page to find more books.";

const BooksForLibrary = ({ searchParams, setSearchParams }) => {
  let AllBooks = useGetAllBooks();

  const urlParam = searchParams?.get("category");
  const initial = useFilterLibrary(urlParam);
  let books = [];
  books = initial;

  //if the search param = TBR set the urlParam to To Be Read
  useEffect(() => {
    if (urlParam === "TBR") setSearchParams({ category: "To Be Read" });
  }, [setSearchParams, urlParam]);

  //return all books for the current user
  if (!urlParam || urlParam === "" || urlParam === "All") {
    books = AllBooks;
  }

  const empty = !books || books.length === 0 || books === undefined;

  return (
    <div>
      {/* if there are no books in the library show the empty shelf */}
      {empty ? (
        <EmptyShelf
          src={search}
          heading={heading}
          message={message}
          button="Explore"
          route="/explore"
        />
      ) : (
        <section className="books-grid">{books}</section>
      )}
    </div>
  );
};

export default BooksForLibrary;
