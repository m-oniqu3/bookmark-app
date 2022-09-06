import React, { useEffect, useState } from "react";
import styled from "./ShelfNav.module.css";
import { IoAddCircleSharp } from "react-icons/io5";
import { useSelector } from "react-redux";

import Modal from "../helpers/modal/Modal";
import CreateShelf from "./CreateShelf";
import ContextMenu from "./ContextMenu";
import ContextMenuAction from "./ContextMenuAction";

const ShelfNav = ({ searchParams, setSearchParams }) => {
  //states and context
  const { shelf } = useSelector((state) => state.bookShelf);
  const [shelfName, setShelfName] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [positions, setPositions] = useState({ top: 0, left: 0 });
  const [selectedShelf, setSelectedShelf] = useState(null);
  const [openMenuAction, setOpenMenuAction] = useState(false);
  const [action, setAction] = useState(null);

  //functions
  const addHandler = () => setOpenModal((state) => !state);
  const handleShelfName = (shelf) => setShelfName(shelf);

  //function to open context menu and set the position of the menu
  const handleContextMenu = (e) => {
    e.preventDefault();
    setShowContextMenu(true);
    setSelectedShelf(e.target.innerText);
    setPositions({ top: e.pageY, left: e.pageX });
  };

  //function to close the context menu
  useEffect(() => {
    const closeContextMenu = () => setShowContextMenu(false);
    window.addEventListener("click", closeContextMenu);

    //cleanup function to remove the event listener
    return () => window.removeEventListener("click", closeContextMenu);
  }, [showContextMenu]);

  //get current shelf from url
  const currentShelf = searchParams.get("shelf");

  //update the search params when the shelf changes
  useEffect(() => {
    if (shelfName) {
      setSearchParams({ shelf: shelfName });
    }
  }, [shelfName, setSearchParams]);

  // get the shelves created by the user and apply correct className to the current shelf
  const links = shelf?.shelves?.map((shelf) => (
    <p
      key={shelf}
      onClick={() => handleShelfName(shelf)}
      className={currentShelf === shelf ? styled.active : ""}
      onContextMenu={handleContextMenu}
    >
      {shelf}
    </p>
  ));

  return (
    <>
      <nav className={styled["shelf-navbar"]}>
        <h2
          onClick={() => setShelfName("All")}
          className={currentShelf === "All" ? styled.active : ""}
        >
          Books
        </h2>
        <div className={styled["shelf-links"]}>{links}</div>
        <div className={styled.add} onClick={addHandler}>
          <IoAddCircleSharp size="28px" color="#3f3d56" />
        </div>
      </nav>

      {openModal && (
        <Modal setOpenModal={setOpenModal} openModal={openModal}>
          <CreateShelf setOpenModal={setOpenModal} />
        </Modal>
      )}

      {/* show custom context menu */}
      {showContextMenu && (
        <ContextMenu
          setAction={setAction}
          positions={positions}
          setOpenMenuAction={setOpenMenuAction}
        />
      )}

      {/* show rename shelf modal */}
      {openMenuAction && (
        <Modal setOpenModal={setOpenMenuAction} openModal={openMenuAction}>
          <ContextMenuAction
            action={action}
            selectedShelf={selectedShelf}
            setSearchParams={setSearchParams}
            setOpenMenuAction={setOpenMenuAction}
            searchParams={searchParams}
          />
        </Modal>
      )}
    </>
  );
};

export default ShelfNav;
