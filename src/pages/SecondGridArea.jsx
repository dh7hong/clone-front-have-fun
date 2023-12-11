import React, { useState, useEffect } from "react";
import * as S from "../shared/style/SecondGridArea";
import axios from "axios";
import { userList } from "../api/userService";
import { Button } from "../components/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/modules/userSlice";
import { useQueryClient } from "react-query";

const SecondGridArea = ({ children }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    const getUsersData = async () => {
      try {
        const response = await userList();
        const data = response;
        console.log("API 응답 구조가 예상과 같습니다:", data);
        // Assuming there's only one user in the response data array
        for (let i = 0; i < data.length; i++) {
          if (data[i].memberId == localStorage.getItem("memberId")) {
            setName(data[i].name);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getUsersData();
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    navigate("/api/users");
  };
  const image = localStorage.getItem("image");

  const handleLogin = () => {
    navigate("/api/login");
  };

  return (
    <>
      <S.LiName>
        <S.Container2>
         
          <S.HeaderContainer>
            <S.Title
              style={{
                color: "#4682B4",
                fontSize: "25px",
                marginBottom: "10px",
                padding: "3px",
              }}
            >
              {name ? `${name}'s space` : "Loading..."}
            </S.Title>
            <S.Navigation>
              <Button onClick={handleLogin}>Login</Button>
              <Button onClick={handleLogout}>Logout</Button>
              <S.Link href="https://github.com/dh7hong">My Github</S.Link>
            </S.Navigation>
          </S.HeaderContainer>

          <S.Item4>{children}</S.Item4>
        </S.Container2>
      </S.LiName>
    </>
  );
};

export default SecondGridArea;
