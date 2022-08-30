import { useSelector } from "react-redux";
import Books from "../components/books/Books";

const useGetAllShelfBooks = () => {
  const { library } = useSelector((state) => state.bookStore);

  const books = library.map((record) => {
    return (
      <Books
        key={record.bookData.id}
        book={record.bookData}
        component="shelf"
        showShelfBookmark={true}
      />
    );
  });

  return books;
};

export default useGetAllShelfBooks;
