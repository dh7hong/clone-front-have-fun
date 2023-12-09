import React, { useState, useEffect } from "react";
import { BookCover, BookDot, MainStyle } from "../../shared/style/Base";
import {
  CategoryActivation,
  CategoryDeactivation,
  RightSideContainer,
} from "../../shared/style/Category";
import { useNavigate, useLocation } from "react-router-dom";

const Base = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("");

  const memberId = localStorage.getItem("memberId");

  // Set the activePage state to the current pathname
  useEffect(() => {
    setActivePage(location.pathname);
    console.log("location.pathname:", location.pathname);
  }, [location]);

  const handleButtonClick = (path) => {
    navigate(path);
  };

  // Function to check if the path matches the active page
  const isActive = (path) => {
    return location.pathname === path;
  };

  const CustomButton = ({ path, children, top }) => {
    const ButtonComponent = isActive(path)
      ? CategoryActivation
      : CategoryDeactivation;
    return (
      <ButtonComponent
        style={{
          position: "absolute",
          top: `${top}px`,
          right: "-17px",
          zIndex: "1000",
        }}
        onClick={() => handleButtonClick(path)}
      >
        {children}
      </ButtonComponent>
    );
  };

  return (
    <>
      <RightSideContainer>
        <MainStyle>
          <BookCover>
            <BookDot>{children}</BookDot>
            <CustomButton path="/api/users" top={200}>
              Home
            </CustomButton>
            <CustomButton path={`/api/users/${memberId}/profile`} top={250}>
              Profile
            </CustomButton>
            <CustomButton path={`/api/users/${memberId}/diary`} top={300}>
              Diary
            </CustomButton>
            <CustomButton path={`/api/users/${memberId}/jukebox`} top={350}>
              JukeBox
            </CustomButton>
            <CustomButton path={`/api/users/${memberId}/posts`} top={400}>
              Board
            </CustomButton>
            <CustomButton path={`/api/users/${memberId}/guestbook`} top={450}>
              Visitors
            </CustomButton>
            <CustomButton path={`/api/users/${memberId}/album`} top={500}>
              Album
            </CustomButton>
          </BookCover>
        </MainStyle>
      </RightSideContainer>
    </>
  );
};

export default Base;
