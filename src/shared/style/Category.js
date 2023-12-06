import styled from "styled-components";

export const CategoryActivation = styled.button`
  background-color: white;
  position: absolute;
  width: 100px;
  height: 40px;
  border-radius: 0 7px 7px 0;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-family: "Hi Melody", sans-serif;
  font-size: 20px;
  border: 2px solid #d4d4d4;
  border-left: none;
  cursor: pointer; /* Add cursor style to indicate it's clickable */
  transition: background-color 0.3s ease; /* Add a smooth transition effect */
`;

export const CategoryDeactivation = styled.button`
  background-color: #359dc2;
  position: absolute;
  width: 100px;
  height: 40px;
  border-radius: 0 7px 7px 0;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-family: "Hi Melody", sans-serif;
  font-size: 20px;
  border: 1px solid black;
  border-left: none;
  cursor: pointer;
  transition: background-color 0.3s ease; /* Add a smooth transition effect */
`;

export const RightSideContainer = styled.div`
  position: relative; // Add relative positioning
  display: flex;
`;
