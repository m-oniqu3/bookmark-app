import React, { useEffect, useState } from "react";
import { RiAddCircleLine } from "react-icons/ri";
import { MdInfoOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import CreateShelf from "./CreateShelf";
import { useNavigate } from "react-router-dom";
import { checkIfUserHasShelves } from "../../store/features/shelf/shelfSlice";
import Modal from "../helpers/modal/Modal";
import AddToShelf from "./AddToShelf";

const ShelfActions = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isShelfEmpty } = useSelector((state) => state.bookShelf);
  const [openModal, setOpenModal] = useState(false);
  const [openShelfModal, setOpenShelfModal] = useState(false);

  const addToShelfHandler = () => {
    if (isShelfEmpty) setOpenModal((state) => !state);
    else if (!isShelfEmpty) setOpenShelfModal((state) => !state);
  };

  //check if user has shelves
  useEffect(() => {
    dispatch(checkIfUserHasShelves());
  }, [dispatch, openModal]);

  //navigate to the book details page for the specified book
  const handleDetails = () => navigate(`/details/${props.book.id}`);

  return (
    <section>
      <div className="actions">
        {/* Button to add to library */}
        <p onClick={addToShelfHandler}>
          <RiAddCircleLine size="25px" fontWeight="700" />
          Add to Shelf
        </p>

        {/* Button to add to get more details */}
        <p onClick={handleDetails}>
          <MdInfoOutline size="25px" fontWeight="700" />
          Details & More
        </p>
      </div>

      {openModal && (
        <Modal setOpenModal={setOpenModal} openModal={openModal}>
          <CreateShelf setOpenModal={setOpenModal} />
        </Modal>
      )}

      {openShelfModal && (
        <Modal setOpenModal={setOpenShelfModal} openModal={openShelfModal}>
          <AddToShelf
            book={props.book}
            setOpenModal={setOpenShelfModal}
            closeModal={props.closeModal}
          />
        </Modal>
      )}
    </section>
  );
};

export default ShelfActions;
