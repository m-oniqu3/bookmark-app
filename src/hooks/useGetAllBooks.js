import { useSelector } from "react-redux";
import Books from "../components/books/Books";

// custom hook to get all books in the user's library
const useGetAllBooks = () => {
  // retrieve the library from the store
  const { library } = useSelector((state) => state.bookStore);

  //map over each book record in the current user's library and return a Book
  const AllBooks = library.map((record) => {
    return (
      <Books
        key={record.bookData.id}
        book={record.bookData}
        showDeleteIcon={true}
        component="library"
      />
    );
  });

  return AllBooks;
};

export default useGetAllBooks;
