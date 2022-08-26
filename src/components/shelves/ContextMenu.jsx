import React from "react";
import styled from "./ContextMenu.module.css";

const ContextMenu = (props) => {
  const handleRenaming = (e) => {
    props.setOpenMenuAction((state) => !state);
    props.setAction(e.target.innerText);
  };

  const menuStyle = {
    top: props.positions.top + 20 + "px",
    left: props.positions.left - 40 + "px",
  };

  return (
    <div
      onClick={handleRenaming}
      className={styled["context-menu"]}
      style={menuStyle}
    >
      <p>Rename Shelf</p>
      <p>Remove Shelf</p>
    </div>
  );
};

export default ContextMenu;
