import Books from "../components/books/Books";
import { exploreBooks } from "../components/explore/exploreBooks";

const useExplore = (subject) => {
  const results = exploreBooks?.filter((book) =>
    book.subject?.includes(subject)
  );

  /**map over the array and return a Book with the info
   * destucture properties from the book object and pass them as props
   */
  const allBooks = results?.map((book) => {
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
        key={id}
        book={bookData}
        component="library"
        showLibraryBookmark={true}
      />
    );
  });

  return allBooks;
};

export default useExplore;
