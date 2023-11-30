import React from "react";
import { useNavigate } from "react-router-dom";
import {
  CategoryActivation,
  CategoryDeactivation,
} from "../../shared/style/Category";

const CategoryGroup5 = () => {
  const navigate = useNavigate();

  const handleButtonClick = (path) => {
    navigate(path);
  };

  const memberId = localStorage.getItem("memberId");

  return (
    <div>
      <CategoryDeactivation
        style={{ top: "250px", right: "404px" }}
        onClick={() => handleButtonClick(`/api/users`)}
      >
        홈
      </CategoryDeactivation>
      <CategoryDeactivation
        style={{ top: "300px", right: "404px" }}
        onClick={() => handleButtonClick(`/api/users/${memberId}/profile`)}
      >
        프로필
      </CategoryDeactivation>
      <CategoryDeactivation
        style={{ top: "350px", right: "404px" }}
        onClick={() => handleButtonClick(`/api/users/${memberId}/diary`)}
      >
        다이어리
      </CategoryDeactivation>
      <CategoryDeactivation
        style={{ top: "400px", right: "404px" }}
        onClick={() => handleButtonClick(`/api/users/${memberId}/jukebox`)}
      >
        쥬크박스
      </CategoryDeactivation>
      <CategoryActivation
        style={{ top: "450px", right: "404px" }}
        onClick={() => handleButtonClick(`/api/users/${memberId}/posts`)}
      >
        게시판
      </CategoryActivation>
      <CategoryDeactivation
        style={{ top: "500px", right: "404px" }}
        onClick={() => handleButtonClick(`/api/users/${memberId}/guestbook`)}
      >
        방명록
      </CategoryDeactivation>
    </div>
  );
};

export default CategoryGroup5;
