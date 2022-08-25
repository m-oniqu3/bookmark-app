import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiAddCircleLine } from "react-icons/ri";
import { MdInfoOutline } from "react-icons/md";

import AddToLibrary from "./AddToLibrary";
import Modal from "../helpers/modal/Modal";
// import Login from "../login/Login";

const LibraryActions = (props) => {
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  //   const [openLoginModal, setOpenLoginModal] = useState(false);

  //navigate to the book details page for the specified book
  const handleDetails = () => navigate(`/results/${props.book.id}`);

  /**
   * if user is signed in, open the add to library modal
   * if user is not signed in, open the login modal
   */
  const handleLibrary = () => setOpenModal((state) => !state);

  return (
    <>
      <div className="actions">
        {/* Button to add to library */}
        <p onClick={handleLibrary}>
          <RiAddCircleLine size="25px" fontWeight="700" />
          Add to Library
        </p>

        {/* Button to add to get more details */}
        <p onClick={handleDetails}>
          <MdInfoOutline size="25px" fontWeight="700" />
          Details & More
        </p>
      </div>

      {/**show options to add to library
       * pass the currently selected book to the library
       */}
      {openModal && (
        <Modal setOpenModal={setOpenModal} openModal={openModal}>
          <AddToLibrary selectedBook={props.book} setOpenModal={setOpenModal} />
        </Modal>
      )}

      {/* {openLoginModal && (
        <Modal setOpenModal={setOpenLoginModal} openModal={openLoginModal}>
          <Login setOpenModal={setOpenLoginModal} />
        </Modal>
      )} */}
    </>
  );
};

export default LibraryActions;
