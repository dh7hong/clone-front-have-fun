import styled from "styled-components";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa";

export const DetailedPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 1000px;
  align-items: center;
`;

export const NewBoardWrapper = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border: 3px solid black;
  border-radius: 20px;
  justify-content: center;
`;

export const TitleStyle = styled.div`
  width: 90%;
  height: 50px;
  border: 1px solid white;
  margin-bottom: 20px;
  color: black;
  text-align: center;
`;

export const ContentsStyle = styled.div`
  width: 90%;
  height: 100px;
  border: 1px solid white;
  color: black;
  text-align: center;
`;

export const ThumbsWrapper = styled.div`
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ThumbsDownStyle = styled(FaRegThumbsDown)`
  cursor: pointer;
`;

export const ColoredThumbsUp = styled(FaThumbsUp)`
  cursor: pointer;
`;

export const ThumbsUpStyle = styled(FaRegThumbsUp)`
  cursor: pointer;
`;

export const ButtonWrapper = styled.button`
  display: flex;
  background: #355c7d; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #c06c84,
    #6c5b7b,
    #355c7d
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #c06c84, #6c5b7b, #355c7d);

  margin: 10px 0px;
`;
