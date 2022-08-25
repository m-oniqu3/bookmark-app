import React, { useMemo } from "react";
import styled from "./AddToLibrary.module.css";
import readingNook from "../../images/reading_svg.png";

// import //   addBookToLibrary,
// //   checkIfBookAlreadyExistsInCurrentUserLibrary,
// "../../store/features/library/librarySlice";
import { MdCancel } from "react-icons/md";

const libraryCategories = ["To Be Read", "In Progress", "Completed", "DNF"];

const AddToLibrary = (props) => {
  const book = props.selectedBook;

  //return empty string if the data is undefined
  const bookCategory = book.categories === undefined ? "" : book.categories;
  const info = book.searchInfo === undefined ? "" : book.searchInfo;

  const bookData = useMemo(() => {
    return {
      id: book.id,
      title: book.title,
      authors: book.authors,
      publishedDate: book.publishedDate,
      imageLinks: book.imageLinks,
      categories: bookCategory,
      searchInfo: info,
    };
  }, [book, bookCategory, info]);

  //function to add the user and the selected book to the library
  //   const addToLibrary = (category) => {
  //     dispatch(
  //       addBookToLibrary({
  //         selectedBook: { bookData, category, timeAdded: Date.now() },
  //         user: currentUser.email,
  //       })
  //     );

  //     //close the modal
  //     props.setOpenModal(false);
  //   };

  const handleClose = () => props.setOpenModal(false);

  // when a user want to add a book, check if the selected book is already in their library
  //   useEffect(() => {
  //     dispatch(
  //       checkIfBookAlreadyExistsInCurrentUserLibrary({
  //         bookData,
  //         user: currentUser.email,
  //       })
  //     );
  //   }, [bookData, currentUser, dispatch]);

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
            <div>
              {/* if the isCurrentCategory is the same as the current category then let the buttons reflect that and apply the correct styles */}
              {libraryCategories.map((category) => {
                // const isCurrentCategory =
                //   bookAlreadyInLibraryCategory === category;
                return (
                  <p
                    key={category}
                    // className={isCurrentCategory ? styled.exist : ""}
                    // onClick={() => addToLibrary(category)}
                  >
                    {category}
                  </p>
                );
              })}
            </div>
          </article>
        </article>
      </section>
    </section>
  );
};

export default AddToLibrary;
