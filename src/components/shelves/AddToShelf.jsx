import React, { useEffect } from "react";
import styled from "./AddToShelf.module.css";
import { useDispatch, useSelector } from "react-redux";
import shelves from "../../images/shelves.svg";
import { MdCancel } from "react-icons/md";
import {
  addToShelf,
  getShelvesForCurrentBook,
} from "../../store/features/shelf/shelfSlice";

const AddToShelf = (props) => {
  const { shelf, currentBookShelves } = useSelector((state) => state.bookShelf);
  const dispatch = useDispatch();

  //function to dispatch action to add book to shelf
  const handleSelectedShelf = (shelf) => {
    dispatch(
      addToShelf({ bookData: props.book, shelf, timeAdded: Date.now() })
    );

    //close modal
    props.setOpenModal(false);
    props.closeModal(false);
  };

  //everytime there is a change in the shelf, check if the selected book is already in the current user shelf
  useEffect(() => {
    dispatch(getShelvesForCurrentBook(props.book));
  }, [dispatch, props.book, shelf]);

  //get all the shelves created by the current user
  const AllShelves = shelf?.shelves?.map((shelf) => {
    //check if the selected book is already in the shelf
    const exists = currentBookShelves?.includes(shelf);

    return (
      <p
        key={shelf}
        className={exists ? styled.onShelf : styled.offShelf}
        onClick={() => handleSelectedShelf(shelf)}
      >
        {shelf}
      </p>
    );
  });

  const handleClose = () => props.setOpenModal(false);

  return (
    <section className={styled["add-to-shelf-container"]}>
      <MdCancel size="30px" className="close-icon" onClick={handleClose} />
      <section className={styled["add-to-shelf"]}>
        <h2>
          Which shelf would you like to place <span>{props.book.title} </span>
          on?
        </h2>
        <figure>
          <img
            src={shelves}
            alt="Illustration of a girl placing a book on a shelf"
          />
        </figure>

        <div className={styled.allShelves}>{AllShelves}</div>
      </section>
    </section>
  );
};

export default AddToShelf;
