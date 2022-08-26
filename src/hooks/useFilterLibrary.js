import { useSelector } from "react-redux";
import Books from "../components/books/Books";
import LibraryActions from "../components/library/LibraryActions";

//custom hook to filter the current user's library based on the category recieved
const useFilterLibrary = (category) => {
  // retrieve the library from the store
  const { library } = useSelector((state) => state.bookStore);

  /**
   * filter the current user's userLibrary based on the category received
   * sort the filtered array by the time the book was added to the library
   * map over the filtered results and return a Book for each record
   */
  const libraryForCurrentUser = library
    .filter((record) => record.category === category)
    .sort((a, b) => b.timeAdded - a.timeAdded)
    .map((record) => {
      return (
        <Books
          key={record.bookData.id}
          book={record.bookData}
          showDeleteIcon={true}
          actionsComponent={<LibraryActions book={record.bookData} />}
        />
      );
    });

  // return the results from the filter and map
  return libraryForCurrentUser;
};

export default useFilterLibrary;
