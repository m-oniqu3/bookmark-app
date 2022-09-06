import React from "react";
import useFilterShelf from "../../hooks/useFilterShelf";
import useGetAllShelfBooks from "../../hooks/useGetAllShelfBooks";
import shelves from "../../images/shelves.svg";
import EmptyShelf from "../books/EmptyShelf";

const BooksForShelves = ({ searchParams }) => {
  const allBooksInLibrary = useGetAllShelfBooks();
  const urlParams = searchParams.get("shelf");
  const booksOnSelectedShelf = useFilterShelf(urlParams);

  let books = [];
  let heading = "";
  let message = "";

  if (!urlParams || urlParams === "" || urlParams === "All") {
    books = allBooksInLibrary;
    heading = "There are no books here as yet.";
    message =
      "Search for a book to add it to your Library or visit the Explore page to find more books.";
  } else if (urlParams) {
    books = booksOnSelectedShelf;
    heading = `There are no books on this shelf as yet.`;
    message =
      "Looks like you haven't added any books to this shelf yet. Try exploring or use the books in your library to populate this shelf.";
  }

  if (!books || books.length === 0) {
    return (
      <EmptyShelf
        src={shelves}
        heading={heading}
        message={message}
        button="Explore"
        route="/explore"
      />
    );
  }

  return <section className="books-grid">{books}</section>;
};

export default BooksForShelves;
