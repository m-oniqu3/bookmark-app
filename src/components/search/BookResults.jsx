import React from "react";
import Books from "../books/Books";
import LibraryActions from "../library/LibraryActions";

const BookResults = ({ bookResults, searchQuery }) => {
  //filter the results to return only books thar have images
  const results = bookResults
    ?.filter((book) => book.volumeInfo.imageLinks?.smallThumbnail !== undefined)
    .map((book) => {
      const { id, searchInfo } = book;
      const { title, authors, publishedDate, categories, imageLinks } =
        book.volumeInfo;

      const bookData = {
        id,
        searchInfo,
        title,
        authors,
        publishedDate,
        categories,
        imageLinks,
      };
      return (
        <Books
          key={book.id}
          book={bookData}
          actionsComponent={<LibraryActions book={bookData} />}
          showLibraryBookmark={true}
        />
      );
    });

  return (
    <>
      <p style={{ textAlign: "center", paddingBottom: "1rem" }}>
        Showing results for<span>{searchQuery}</span>
      </p>
      <div className="books-grid">{results}</div>
    </>
  );
};

export default BookResults;
