import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiAddCircleLine } from "react-icons/ri";
import { MdInfoOutline } from "react-icons/md";
import AddToLibrary from "./AddToLibrary";
import Modal from "../helpers/modal/Modal";
import Login from "../user/Login";
import { useSelector } from "react-redux";

const LibraryActions = (props) => {
  const { isSignedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);

  //navigate to the book details page for the specified book
  const handleDetails = () => navigate(`/details/${props.book.id}`);

  // show either add to library/login component
  const handleLibrary = () => {
    if (isSignedIn) setOpenModal((state) => !state);
    else setOpenLoginModal((state) => !state);
  };

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
          <AddToLibrary
            selectedBook={props.book}
            setOpenModal={setOpenModal}
            closeModal={props.closeModal}
          />
        </Modal>
      )}

      {openLoginModal && (
        <Modal setOpenModal={setOpenLoginModal} openModal={openLoginModal}>
          <Login setOpenModal={setOpenLoginModal} />
        </Modal>
      )}
    </>
  );
};

export default LibraryActions;
