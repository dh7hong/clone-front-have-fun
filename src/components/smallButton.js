import styled from "styled-components";

export const Button = styled.button`
  width: 50px;
  height: 30px;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "rgb(238, 245, 255)"};
  color: ${(props) => (props.color ? props.color : "deepgray")};

  font-weight: 700;
  font-size: 3px;
  font-family: "Hi Melody", sans-serif;

  &:hover {
    background-color: ${(props) =>
      props.hoverColor ? props.hoverColor : "rgb(192, 192, 192)"};
    color: black;
    font-weight: bolder;
    font-size: 20px;
    font-family: "Hi Melody", sans-serif;
  }
  cursor: pointer;

  margin: 0px 0px;
`;
