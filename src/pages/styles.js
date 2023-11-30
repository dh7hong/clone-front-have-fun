import styled from "styled-components";

const Container = styled.div`
  background-image: url("/background.png");
  background-size: cover; /* fallback for old browsers */ /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const InputStyle = styled.input`
  width: 300px;
  height: 40px;
  margin-bottom: 20px;
  display: flex;
  background: rgba(black, 0.1);
`;

const BoxStyle = styled.div`
  border: 1px solid black;
  width: 700px;
  height: 700px;
  padding: 24px;
  position: relative;
  display: flex;
  justify-content: center;
  border-radius: 500px;
  background-color: white;
`;

const ClickBoxStyle = styled.button`
  outline: none;
  background: $accent;
  width: 100%;
  border: 0;
  border-radius: 4px;
  padding: 12px 20px;
  color: $white;
  font-family: inherit;
  font-size: inherit;
  font-weight: $semibold;
  line-height: inherit;
  text-transform: uppercase;
  cursor: pointer;
  margin-top: 20px;
`;

const ClickBox = styled.div`
  margin-top: 30px;
`;

const IdPwBox = styled.div`
  margin-top: 50px;
`;

export { Container, InputStyle, BoxStyle, ClickBoxStyle, ClickBox, IdPwBox };
