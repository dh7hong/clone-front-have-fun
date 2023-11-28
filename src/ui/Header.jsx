import React, { useState, useEffect } from "react";
import * as S from "../shared/style/HeaderStyle";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { logout } from "../redux/modules/userSlice";
// import { authUser } from "../api/authService";
import axios from "axios";
import { Button } from "../components/button";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const imageArr = useSelector((state) => state.image.imageArr);
  const queryClient = useQueryClient();

  const handleLogout = () => {
    queryClient.clear();
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("nickname");
    localStorage.removeItem("name");
    localStorage.removeItem("memberId");
    localStorage.clear();
    delete axios.defaults.headers.common["Authorization"];
    dispatch(logout());
    setIsLoggedIn(false);
    console.log(isLoggedIn);
    navigate("/api/login"); // Navigate to login page on logout
    window.location.reload();  
  };

  const moveToHome = () => {
    navigate("/");
  };
  const image = localStorage.getItem("image");

  const handleLogin = () => {
    navigate("/api/login");
    
  };
  return (
    <S.Wrapper>
      <S.HeaderWrapper>
        <S.Logo onClick={moveToHome} />
        <S.TitleStyle>Hanghae Community</S.TitleStyle>
        <S.MyProfileStyle>
          {imageArr && (
            <S.MyProfileImage
              src={imageArr}
              alt="엑박"
            />
          )}
          {!imageArr && (
            <div>
              {!image && (
                <S.MyProfile
                  size={60}
                  alt="마이페이지"
                />
              )}
              {image && (
                <S.MyProfileImage
                  src={image}
                  size={60}
                  alt="마이페이지"
                />
              )}
            </div>
          )}
          
            <S.MypageStyle>
              <Button onClick={handleLogin}>로그인</Button>
              <Button onClick={handleLogout}>로그아웃</Button>
            </S.MypageStyle>
          
        </S.MyProfileStyle>
      </S.HeaderWrapper>
    </S.Wrapper>
  );
}
