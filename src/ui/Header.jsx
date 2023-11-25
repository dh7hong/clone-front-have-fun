import React, { useState } from "react";
import * as S from "../shared/style/HeaderStyle";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { logout } from "../redux/modules/userSlice";
// import { authUser } from "../api/authService";
import axios from "axios";
import { Button } from "../components/button";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);
  const imageArr = useSelector((state) => state.image.imageArr);
  const onClickProfileImage = () => {
    setIsActive((prev) => !prev);
  };

  // const { mutate: auth } = useMutation(authUser);

  // const handleAuth = (event) => {
  //   event.preventDefault();
  //   auth();
  // };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    delete axios.defaults.headers.common["Authorization"];
    dispatch(logout());
    setIsLoggedIn(false);
    console.log(isLoggedIn);
    navigate("/api/login"); // Navigate to login page on logout
  };

  const moveToHome = () => {
    navigate("/");
  };
  const image = localStorage.getItem("image");

  const moveToMyPage = () => {
    navigate("/mypage");
    setIsActive(false);
  };
  return (
    <S.Wrapper>
      <S.HeaderWrapper>
        <S.Logo onClick={moveToHome} />
        <S.TitleStyle>Hanghae Community</S.TitleStyle>
        <S.MyProfileStyle>
          {imageArr && (
            <S.MyProfileImage
              onClick={onClickProfileImage}
              src={imageArr}
              alt="엑박"
            />
          )}
          {!imageArr && (
            <div>
              {!image && (
                <S.MyProfile
                  onClick={onClickProfileImage}
                  size={60}
                  alt="마이페이지"
                />
              )}
              {image && (
                <S.MyProfileImage
                  src={image}
                  onClick={onClickProfileImage}
                  size={60}
                  alt="마이페이지"
                />
              )}
            </div>
          )}
          {isActive && (
            <S.MypageStyle>
              <Button onClick={moveToMyPage}>마이페이지</Button>
              <Button onClick={handleLogout}>로그아웃</Button>
            </S.MypageStyle>
          )}
        </S.MyProfileStyle>
      </S.HeaderWrapper>
    </S.Wrapper>
  );
}
