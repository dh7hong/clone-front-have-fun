import styled from "styled-components";

export const UpdatedNews = styled.div`
  display: flex;
  border-bottom: 1px groove gray;
  margin-top: 15px;
  margin-left: 15px;
  margin-bottom: 15px;
  margin-right: 15px;
  font-family: "Do Hyeon", sans-serif;
  color: deepskyblue;
  font-size: 20px;
  padding-bottom: 5px;
`;

export const MiniroomImage = styled.img`
  background-image: url("/miniroom.gif");
  background-size: cover;
  margin-left: 15px;
  width: 40vw;
  height: 40vh;
`;

export const UpdateImage = styled.span`
  background-image: url("/new.png");
  background-size: cover;
  border-radius: 5px;
  width: 15px;
  height: 15px;
  margin-left: 2px;
  margin-top: 2px;
`;

export const UpdateNewsContent = styled.div`
  flex: 0.3;
  display: flex;
  flex-direction: row;
  margin-left: 15px;
  margin-bottom: 5px;
  text-decoration: underline;
  cursor: pointer;
`;

export const UpdateNews = styled.div`
  flex: 0.3;
  display: flex;
  flex-direction: row;
  margin-left: 15px;
  margin-bottom: 5px;
  text-decoration: underline;
  cursor: pointer;
`;

export const NewsBox = styled.span`
  background-color: #6d96cc;
  width: 40px;
  height: 18px;
  margin-top: 4px;
  margin-right: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  text-decoration: none;
  color: white;
`;
