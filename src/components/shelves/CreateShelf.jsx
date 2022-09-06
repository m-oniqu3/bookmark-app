import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { GiBookshelf } from "react-icons/gi";
import styled from "./CreateShelf.module.css";
import { MdCancel } from "react-icons/md";
import { createShelf } from "../../store/features/shelf/shelfSlice";
import { toast } from "react-toastify";

const CreateShelf = (props) => {
  const dispatch = useDispatch();
  const [newShelf, setNewShelf] = useState("");

  const handleShelfName = (e) => setNewShelf(e.target.value);

  const handleCreateShelf = (e) => {
    e.preventDefault();
    if (newShelf === "") {
      toast.warning("Please enter a shelf name", { autoClose: 5000 });
      return;
    } else {
      dispatch(createShelf(newShelf));
      setNewShelf("");
      props.setOpenModal(false);
    }
  };

  const handleClose = () => props.setOpenModal(false);

  return (
    <section className={styled["create-shelf-container"]}>
      <article className={styled["create-shelf"]}>
        <MdCancel size="30px" className="close-icon" onClick={handleClose} />
        <GiBookshelf size="50px" style={{ color: "var(--yellow)" }} />
        <h2>Create New Shelf</h2>
        <p>
          Get creative and place the books in your library in custom shelves.
        </p>
        <form
          onSubmit={handleCreateShelf}
          className={styled["create-shelf-form"]}
        >
          <input
            type="text"
            placeholder="Eg. My Mafia Faves"
            value={newShelf}
            onChange={(e) => handleShelfName(e)}
            required
            maxLength="40"
            autoFocus
          />

          <div className={`${styled.actions} button-actions`}>
            <button type="submit">Create</button>
            <button onClick={() => props.setOpenModal(false)}>Cancel</button>
          </div>
        </form>
      </article>
    </section>
  );
};

export default CreateShelf;
