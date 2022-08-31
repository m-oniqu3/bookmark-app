import React, { useEffect, useMemo } from "react";
import styled from "./AddToLibrary.module.css";
import readingNook from "../../images/reading_svg.png";
import { MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  addBookToLibrary,
  checkIfBookAlreadyExists,
} from "../../store/features/library/librarySlice";

const libraryCategories = ["To Be Read", "In Progress", "Completed", "DNF"];

const AddToLibrary = (props) => {
  const book = props.selectedBook;
  const dispatch = useDispatch();
  const { bookAlreadyInLibraryCategory } = useSelector(
    (state) => state.bookStore
  );

  //return empty string if the data is undefined
  const bookCategory = book?.categories === undefined ? "" : book.categories;
  const info = book?.searchInfo === undefined ? "" : book.searchInfo;
  const desc = book?.description === undefined ? "" : book.description;

  const bookData = useMemo(() => {
    return {
      id: book.id,
      title: book?.title,
      authors: book.authors,
      publishedDate: book.publishedDate,
      imageLinks: book.imageLinks,
      categories: bookCategory,
      searchInfo: info,
      description: desc,
    };
  }, [book, bookCategory, info, desc]);

  // function to add the user and the selected book to the library
  const addToLibrary = (category) => {
    dispatch(addBookToLibrary({ bookData, category, timeAdded: Date.now() }));
    props.setOpenModal(false);
    if (props.closeModal) props.closeModal(false);
  };

  const handleClose = () => props.setOpenModal(false);

  // when a user want to add a book, check if the selected book is already in their library
  useEffect(() => {
    dispatch(checkIfBookAlreadyExists(bookData));
  }, [bookData, dispatch]);

  // if book already in library, highlight the category that it is in
  const categories = libraryCategories.map((category) => {
    const isCurrentCategory = bookAlreadyInLibraryCategory === category;
    return (
      <p
        key={category}
        className={isCurrentCategory ? styled.exist : ""}
        onClick={() => addToLibrary(category)}
      >
        {category}
      </p>
    );
  });

  return (
    <section className={styled["library-container"]}>
      <section className={styled.library}>
        <MdCancel
          size="30px"
          className={styled["close-icon"]}
          onClick={handleClose}
        />
        <article>
          <h2>
            Where would you like to add <span>{bookData.title}</span> ?
          </h2>
          <article className={styled.libraryCategory}>
            <figure>
              <img src={readingNook} alt="illustation of a bookshelf" />
            </figure>
            <div>{categories}</div>
          </article>
        </article>
      </section>
    </section>
  );
};

export default AddToLibrary;
