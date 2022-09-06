import { useSelector } from "react-redux";
import Books from "../components/books/Books";

// custom hook to filter the  user's booksOnShelf based on the selected shelf
const useFilterShelf = (selectedShelf) => {
  const { shelf } = useSelector((state) => state.bookShelf);

  /**
   * filter the booksOnShelves by the selected shelf
   * sort the results for the selected shelf by timeAdded (most recent first) in the shelf array
   * map over the resulting array and return the book data (Book component)
   * */
  const filteredThenSortedBooks = shelf.booksOnShelves
    ?.filter((book) => book.shelf.find((item) => item.shelf === selectedShelf))
    .sort((a, b) => {
      const aTime = a.shelf.find(
        (item) => item.shelf === selectedShelf
      ).timeAdded;
      const bTime = b.shelf.find(
        (item) => item.shelf === selectedShelf
      ).timeAdded;
      return bTime - aTime;
    })
    .map((record) => {
      return (
        <Books
          key={record.bookData.id}
          book={record.bookData}
          component="shelf"
        />
      );
    });

  return filteredThenSortedBooks;
};

export default useFilterShelf;
