import styled from "styled-components";

export const Button = styled.button`
  width: 100px;
  height: 50px;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "rgb(238, 245, 255)"};
  color: ${(props) => (props.color ? props.color : "deepgray")};

  font-weight: 700;
  &:hover {
    background-color: ${(props) =>
      props.hoverColor ? props.hoverColor : "rgb(192, 192, 192)"};
    color: black;
    font-weight: bolder;
  }
  cursor: pointer;

  margin: 0px 10px;
`;
