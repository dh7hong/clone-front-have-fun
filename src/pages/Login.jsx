import React, { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { setToken, setUserId, setUsername } from "../redux/modules/userSlice";
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
    if (token) {
      alert("You are already logged in.");
      navigate("/"); // Redirect to home page
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage
    if (token && userId) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      dispatch(setToken(token));
      dispatch(setUserId(userId));
      setIsLoggedIn(true);
    }
  }, [dispatch]);

  const { mutate: login } = useMutation(loginUser, {
    onSuccess: (data) => {
      if (data && data.token && data.userId && data.username) {
        // Destructure only if all properties are available
        const { token, userId, username } = data;
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        handleLoginSuccess(token, userId, username);
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

  const handleLoginSuccess = (token, userId, username) => {
    localStorage.setItem("username", username);
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId); // Store userId in localStorage
    console.log("token", token);
    console.log("userId", userId);
    console.log("username", username);
    dispatch(setToken(token));
    dispatch(setUserId(userId));
    dispatch(setUsername(username));
    setIsLoggedIn(true);
    navigate("/");
  };

  const handleRegisterPageLinkClick = () => {
    navigate(`/register`);
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
