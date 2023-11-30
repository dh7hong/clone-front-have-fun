import React from "react";
import { BookCover, BookDot, MainStyle } from "../../shared/style/Base";
import FirstGridArea from "../FirstGridArea";

const Base = ({ children }) => {
  return (
    <>
      <MainStyle>
        <BookCover>
          <BookDot>{children}</BookDot>
        </BookCover>
      </MainStyle>
    </>
  );
};

export default Base;
