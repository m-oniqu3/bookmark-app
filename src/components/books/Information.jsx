import React from "react";
import styled from "./Information.module.css";
import Summary from "./Summary";
import { MdCancel } from "react-icons/md";

const Information = (props) => {
  const handleClose = () => props.setOpenModal(false);

  return (
    <section className={styled["information-container"]}>
      <section className={styled.information}>
        <MdCancel size="30px" className="close-icon" onClick={handleClose} />
        <Summary book={props.book} />
        <>{props.actionsComponent}</>
      </section>
    </section>
  );
};

export default Information;
