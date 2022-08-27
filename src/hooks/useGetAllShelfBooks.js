import { useSelector } from "react-redux";
import Books from "../components/books/Books";
import ShelfActions from "../components/shelves/ShelfActions";

const useGetAllShelfBooks = () => {
  const { library } = useSelector((state) => state.bookStore);

  const books = library.map((record) => {
    return (
      <Books
        key={record.bookData.id}
        book={record.bookData}
        actionsComponent={<ShelfActions book={record.bookData} />}
        showShelfBookmark={true}
      />
    );
  });

  return books;
};

export default useGetAllShelfBooks;
