import React from "react";
import RemoveShelf from "./RemoveShelf";
import RenameShelf from "./RenameShelf";

const ContextMenuAction = (props) => {
  if (props.action.includes("Rename")) {
    return (
      <RenameShelf
        selectedShelf={props.selectedShelf}
        setOpenMenuAction={props.setOpenMenuAction}
        searchParams={props.searchParams}
        setSearchParams={props.setSearchParams}
      />
    );
  }

  if (props.action.includes("Remove")) {
    return (
      <RemoveShelf
        selectedShelf={props.selectedShelf}
        setOpenMenuAction={props.setOpenMenuAction}
        searchParams={props.searchParams}
        setSearchParams={props.setSearchParams}
      />
    );
  }
};

export default ContextMenuAction;
