import React from "react";
import styled from "./ExploreContent.module.css";
import useExploreContent from "../../hooks/useExploreContent";

const ExploreContent = () => {
  //custom hook to fetch books
  const contents = useExploreContent();

  const renderContents = contents?.map((content) => {
    return (
      <div key={content.title} id={content.link}>
        <section>
          <h2 className={styled.title}>{content.title}</h2>
          <div className={styled["explore-books"]}>{content.books}</div>
        </section>
      </div>
    );
  });

  return (
    <section className={styled["explore-content"]}>{renderContents}</section>
  );
};

export default ExploreContent;
