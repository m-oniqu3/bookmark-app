import React from "react";
import Books from "../books/Books";

const BookResults = ({ bookResults, searchQuery }) => {
  //filter the results to return only books thar have images
  const results = bookResults
    ?.filter((book) => book.volumeInfo.imageLinks?.smallThumbnail !== undefined)
    .map((book) => {
      const { id, searchInfo } = book;
      const {
        title,
        authors,
        publishedDate,
        categories,
        imageLinks,
        description,
      } = book.volumeInfo;

      const bookData = {
        id,
        searchInfo,
        title,
        authors,
        publishedDate,
        categories,
        imageLinks,
        description,
      };
      return (
        <Books
          key={book.id}
          book={bookData}
          component="library"
          showLibraryBookmark={true}
        />
      );
    });

  return (
    <>
      <p
        style={{
          textAlign: "center",
          padding: "1rem",
          marginBottom: "1rem",
          background: "var(--light-yellow)",
          color: "var(--yellow)",
          borderRadius: "5px",
        }}
      >
        Showing results for<span>{searchQuery}</span>
      </p>
      <div className="books-grid">{results}</div>
    </>
  );
};

export default BookResults;
