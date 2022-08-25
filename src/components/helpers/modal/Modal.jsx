import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "./Modal.module.css";
// import { IoCloseCircleSharp } from "react-icons/io5";

const Modal = (props) => {
  const handleClose = () => props.setOpenModal((state) => !state);

  //stop event propagation to prevent closing modal when user clicks inside modal */
  const handleEvent = (e) => e.stopPropagation();

  //if modal is open, prevent scrolling
  useEffect(() => {
    if (props.openModal === true) document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, [props]);

  return ReactDOM.createPortal(
    <div onClick={handleClose} className={styled["modal-background"]}>
      <div
        className={styled["modal-container"]}
        onClick={(e) => handleEvent(e)}
      >
        {props.children}
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
