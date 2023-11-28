import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { setToken, setMemberId, setNickname, logout } from "../../redux/modules/userSlice";
import { loginUser } from "../../api/authService";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, InputStyle, BoxStyle, ClickBoxStyle, ClickBox, IdPwBox } from "../styles";

function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: login } = useMutation(loginUser, {
    onSuccess: (data) => {
      // Check if data is defined and has the required properties
      if (data?.token && data?.id && data?.name && data?.nickname && data?.memberId) {
        const { token, id, nickname, name, memberId } = data;
        // Set axios defaults and localStorage
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage.setItem("token", token);
        localStorage.setItem("id", id);
        localStorage.setItem("name", name);
        localStorage.setItem("nickname", nickname);
        localStorage.setItem("memberId", memberId);
  
        // Dispatch Redux actions
        dispatch(setToken(token));
        dispatch(setMemberId(memberId));
  
        // Navigate to the user's posts page
        navigate(`/api/users/${memberId}`);
      } else {
        // Handle case where data is not in the expected format
        console.error("Login unsuccessful or data missing");
      }
    },
    // Add onError to handle API errors
    onError: (error) => {
      console.error("Login error:", error);
    }
  });

  const handleLogin = (event) => {
    event.preventDefault();
    login({ id, password });
  };

  const handleRegisterPageLinkClick = () => {
    navigate(`/api/register`);
  };

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
    navigate("/api/login", { replace: true }); // Navigate to login page on logout
    window.location.reload();
  };

  return (
    <Container>
      <BoxStyle>
        <div>
          <form onSubmit={handleLogin}>
            <h1>Login</h1>
            <IdPwBox>
              <p>ID</p>
              <InputStyle
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="ID"
              />
              <p>Password</p>
              <InputStyle
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </IdPwBox>
            <ClickBox>
              <div>
                <ClickBoxStyle type="submit">Login</ClickBoxStyle>
              </div>
              <div>
                <ClickBoxStyle onClick={handleRegisterPageLinkClick}>
                  Register
                </ClickBoxStyle>
              </div>
              <div>
                <ClickBoxStyle onClick={handleLogout}>
                  Logout
                </ClickBoxStyle>
              </div>
            </ClickBox>
          </form>
        </div>
      </BoxStyle>
    </Container>
  );
}

export default Login;
