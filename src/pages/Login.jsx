import React, { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { setToken, setMemberId, setNickname } from "../redux/modules/userSlice";
import { loginUser } from "../api/authService";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  InputStyle,
  BoxStyle,
  ClickBoxStyle,
  ClickBox,
  IdPwBox,
} from "./styles";

function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Hook to navigate programmatically
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token"); // Ensure the key is consistent
    const memberId = localStorage.getItem("memberId"); // Retrieve userId from localStorage
    if (token) {
      alert("You are already logged in.");
      navigate(`/api/users/${memberId}/posts`); // Redirect to home page
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const memberId = localStorage.getItem("memberId"); // Retrieve userId from localStorage
    if (token && memberId) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      dispatch(setToken(token));
      dispatch(setMemberId(memberId));
      setIsLoggedIn(true);
    }
  }, [dispatch]);

  const { mutate: login } = useMutation(loginUser, {
    onSuccess: (data) => {
      if (data && data.token && data.id && data.nickname && data.memberId) {
        // Destructure only if all properties are available
        const { token, id, nickname, memberId } = data;
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        handleLoginSuccess(token, id, nickname, memberId);
      } else {
        console.error("Login unsuccessful or data missing");
      }
    },
  });

  const handleLogin = (event) => {
    event.preventDefault();
    login({ id, password });
    navigate(`/`);
  };

  const handleLoginSuccess = (token, id, nickname, memberId) => {
    localStorage.setItem("token", token);
    localStorage.setItem("id", id);
    localStorage.setItem("nickname", nickname);
    localStorage.setItem("memberId", memberId);

    console.log("from Login token", token);
    console.log("from Login id", id);
    console.log("from Login nickname", nickname);
    console.log("from Login memberId", memberId);

    // dispatch(setToken(token));
    // // dispatch(setId(id));
    // dispatch(setNickname(nickname));
    dispatch(setMemberId(memberId));
  
    // Then navigate to the user-specific page
    navigate(`/api/users/${memberId}/posts`, { replace: true });
  };
  const handleRegisterPageLinkClick = () => {
    navigate(`/api/register`);
  };

  return (
    <Container>
      <BoxStyle>
        {!isLoggedIn && (
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
              </ClickBox>
            </form>
          </div>
        )}
      </BoxStyle>
    </Container>
  );
}

export default Login;
