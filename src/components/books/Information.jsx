import React from "react";
import styled from "./Information.module.css";
import Summary from "./Summary";
import { MdCancel } from "react-icons/md";
import LibraryActions from "../library/LibraryActions";
import ShelfActions from "../shelves/ShelfActions";

const Information = (props) => {
  const handleClose = () => props.setOpenModal(false);
  let component;

  if (props.component === "library")
    component = (
      <LibraryActions book={props.book} closeModal={props.setOpenModal} />
    );
  else if (props.component === "shelf")
    component = (
      <ShelfActions book={props.book} closeModal={props.setOpenModal} />
    );

  return (
    <section className={styled["information-container"]}>
      <section className={styled.information}>
        <MdCancel size="30px" className="close-icon" onClick={handleClose} />
        <Summary book={props.book} />
        <>{component}</>
      </section>
    </section>
  );
};

export default Information;
