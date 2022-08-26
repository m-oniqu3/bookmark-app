import { useSelector } from "react-redux";
import Books from "../components/books/Books";
import LibraryActions from "../components/library/LibraryActions";

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
        actionsComponent={<LibraryActions book={record.bookData} />}
      />
    );
  });

  return AllBooks;
};

export default useGetAllBooks;
