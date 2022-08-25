import React, { useState } from "react";
import styled from "./Books.module.css";
// import Information from "./Information";
// import RemoveBook from "./RemoveBook";
import { RiBookmarkFill } from "react-icons/ri";

// component to show each book it receives
const Books = (props) => {
  // state and props

  const [openModal, setOpenModal] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const { imageLinks, title } = props.book;

  // set the modal state
  const handleGetBookInfo = () => setOpenModal((state) => !state);
  const handleDelete = () => setOpenRemoveModal((state) => !state);

  const src = imageLinks
    ? imageLinks.smallThumbnail
    : "https://via.placeholder.com/128x193";

  return (
    <>
      <section
        className={styled.books}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <figure onClick={handleGetBookInfo}>
          <img src={src} alt={title} />
        </figure>

        {props.showDeleteIcon && isHovering && (
          <div className={styled.delete} onClick={handleDelete}>
            <RiBookmarkFill style={{ color: "var(--yellow)" }} size="35px" />
          </div>
        )}
      </section>
    </>
  );
};

export default Books;
