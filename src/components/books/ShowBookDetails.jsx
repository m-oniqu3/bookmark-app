import React, { useEffect, useRef, useState } from "react";
import styled from "./BookDetails.module.css";
import { RiBookmarkFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Container from "../helpers/container/Container";
import Modal from "../helpers/modal/Modal";
import AddToLibrary from "../library/AddToLibrary";
import { IoAddCircleSharp } from "react-icons/io5";
import Login from "../user/Login";
import { useSelector } from "react-redux";

const ShowBookDetails = (props) => {
  const { isSignedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [openLibraryModal, setOpenLibraryModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const descriptionRef = useRef("");

  const { selectedBook, isInLibrary } = props.details;
  const {
    authors,
    description,
    subtitle,
    title,
    categories,
    imageLinks,
    publishedDate,
  } = selectedBook?.volumeInfo;
  const { id, searchInfo } = selectedBook;

  const bookData = {
    id,
    searchInfo,
    title,
    authors,
    publishedDate,
    categories,
    imageLinks,
    description,
  };

  //if the selectedBook is not empty, update the innerHTML value with the given data since the description includes html tags
  useEffect(() => {
    if (description && descriptionRef.current) {
      descriptionRef.current.innerHTML = `${description}`;
    }
  }, [description]);

  /** if user is signed in, open the add to library modal
   * if user is not signed in, open the login modal
   */
  const handleLibrary = () => {
    if (isSignedIn) setOpenLibraryModal((state) => !state);
    else setOpenLoginModal((state) => !state);
  };

  const handleAuthor = () => {
    if (authors) navigate(`/search/${authors[0]}`);
  };

  //remove duplicate categories
  const categorySet = new Set(categories);
  const allCategories = [...categorySet]?.map((category, index) => {
    return (
      <p className={styled.category} key={Date.now() + index}>
        {category}
      </p>
    );
  });

  // bookmark icon
  const bookmark = (
    <div className={styled.bookmarked}>
      <RiBookmarkFill
        className={styled.icon}
        style={{ color: "var(--yellow)" }}
        size="35px"
      />
    </div>
  );

  const src = imageLinks?.thumbnail
    ? `${imageLinks?.thumbnail}`
    : "https://via.placeholder.com/150";
  return (
    <>
      <Container className={styled.book__details}>
        <div className={styled.image}>
          <figure>
            <img src={src} alt={title} />
            {isInLibrary && bookmark}
          </figure>
          <div className={styled.btn} onClick={handleLibrary}>
            <p>Add to Library</p>
            <IoAddCircleSharp size={"2.5rem"} color="var(--dark-blue)" />
          </div>
        </div>

        <article className={styled.intro}>
          <h1 className={styled.title}>{title}</h1>
          {subtitle && <p className={styled.subtitle}>{subtitle}</p>}
          {authors && <p className={styled.author}>{authors[0]}</p>}
          <p className={styled.more} onClick={handleAuthor}>
            More by Author
          </p>

          <div className={styled.btn} onClick={handleLibrary}>
            <IoAddCircleSharp size={"2.5rem"} color="var(--dark-blue)" />
          </div>
        </article>

        <article className={styled.content}>
          {categories && (
            <div className={styled.categories}>{allCategories}</div>
          )}

          <p className={styled.description} ref={descriptionRef}>
            {description === undefined && <p>No description available</p>}
          </p>
        </article>
      </Container>

      {openLibraryModal && (
        <Modal openModal={openLibraryModal} setOpenModal={setOpenLibraryModal}>
          <AddToLibrary
            selectedBook={bookData}
            setOpenModal={setOpenLibraryModal}
          />
        </Modal>
      )}

      {openLoginModal && (
        <Modal openModal={openLoginModal} setOpenModal={setOpenLoginModal}>
          <Login setOpenModal={setOpenLoginModal} />
        </Modal>
      )}
    </>
  );
};

export default ShowBookDetails;
