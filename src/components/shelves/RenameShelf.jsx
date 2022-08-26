import React, { useState } from "react";
import { useDispatch } from "react-redux";

import styled from "./RenameShelf.module.css";
import { BiRename } from "react-icons/bi";
import { MdCancel } from "react-icons/md";
import { renameShelf } from "../../store/features/shelf/shelfSlice";

const RenameShelf = (props) => {
  const dispatch = useDispatch();

  const [newShelfName, setNewShelfName] = useState(props.selectedShelf);
  const urlParams = props.searchParams.get("shelf");

  //dispatch the action to rename the shelf
  const handleRenaming = (e) => {
    e.preventDefault();

    dispatch(renameShelf({ oldShelfName: props.selectedShelf, newShelfName }));

    //if the shelf in the url is the same as the shelf being renamed, update the url
    if (urlParams === props.selectedShelf) {
      props.setSearchParams({ shelf: newShelfName });
    }

    //close the modal
    props.setOpenMenuAction(false);
  };

  const handleClose = () => props.setOpenMenuAction(false);

  return (
    <div className={styled["rename-container"]}>
      <MdCancel size="30px" className="close-icon" onClick={handleClose} />
      <form onSubmit={handleRenaming} className={styled.rename}>
        <BiRename size="50px" style={{ color: "var(--yellow)" }} />
        <h2>Rename Shelf</h2>
        <p>What would you like to rename this shelf to?</p>

        <input
          type="text"
          placeholder="New Shelf Name"
          onChange={(e) => setNewShelfName(e.target.value)}
          value={newShelfName}
          autoFocus
        />

        <div className="button-actions">
          <button type="submit">Rename</button>
          <button onClick={() => props.setOpenMenuAction(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default RenameShelf;
