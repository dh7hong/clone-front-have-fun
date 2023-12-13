import React, { useState } from "react";
import { useMutation } from "react-query";
import { registerUser } from "../../api/authService";
import { useNavigate } from "react-router-dom";

import {
  Container,
  InputStyle,
  BoxStyle,
  ClickBoxStyle,
  ClickBox,
  IdPwBox,
} from "../styles";
import { FlexJustAlignCenter } from "../../shared/style/Base";

function Register() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate(); // Hook to navigate programmatically

  const { mutate: register } = useMutation(registerUser);

  const handleRegister = (event) => {
    event.preventDefault();
    register({ id, password, nickname, name });
    alert(`Thanks for signing up! ${name}`);
    setId("");
    setPassword("");
    navigate(`/api/login`);
  };

  const handleLoginPageButtonClick = () => {
    navigate(`/api/login`);
  };

  const homeLink = () => {
    navigate(`/`);
  };

  return (
    <>
      <Container>
        <BoxStyle>
          <FlexJustAlignCenter>
            <form onSubmit={handleRegister}>
              <div
                style={{
                  textAlign: "center",
                  marginTop: "10px",
                  marginBottom: "0px",
                  fontSize: "30px",
                  fontWeight: "bold",
                }}
              >
                Sign Up
              </div>
              <IdPwBox>
                <div>ID</div>
                <InputStyle
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder="Username"
                />
                <div>Password</div>
                <InputStyle
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                <div>Nickname</div>
                <InputStyle
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="Nickname"
                />
                <div>Name</div>
                <InputStyle
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="name"
                />
              </IdPwBox>
              <ClickBox>
                <div>
                  <ClickBoxStyle type="submit">Sign Up</ClickBoxStyle>
                  <ClickBoxStyle
                    type="button"
                    onClick={handleLoginPageButtonClick}
                  >
                    Login
                  </ClickBoxStyle>
                </div>
              </ClickBox>
            </form>
          </FlexJustAlignCenter>
        </BoxStyle>
      </Container>
    </>
  );
}

export default Register;
