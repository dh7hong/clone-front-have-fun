import styled from "styled-components";

export const BookDot = styled.div`
  border: 2px dashed white;
  border-radius: 9px;
  left: 15px;
  top: 15px;
  right: 15px;
  bottom: 15px;
  position: absolute;
  display: grid;
  grid-template-columns: 25% auto 0;
  padding: 10px;
  overflow: hidden;
`;

export const LiName = styled.div`
  background-color: #f1f1f1;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

export const Container1 = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  margin-top: 15px;
  margin-bottom: 10px;
  margin-right: 15px;
  width: 100%;
`;

export const Item1 = styled.div`
  border: none;
  padding: 5px;
  text-align: center;
  font-size: 14px;
`;

export const Item2 = styled.div`
  flex: 2;
  border: 2px solid #d4d4d4;
  border-radius: 20px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 10px;
`;

export const FeelingSelectorBox = styled.div`
  display: flex;
  border: 1px solid black;
  width: 10vw;
  height: 4vh;
  justify-content: center;
  align-items: center;
  font-size: 16px;
`;

export const ProfileImg = styled.div`
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  width: 7vw;
  height: 15vh;
  border: 1px solid black;
  border-radius: 5px;
`;

export const StatusMessage = styled.div`
  width: 10vw;
  height: 10vh;
  border: 1px solid black;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0px;
`;

export const HelpLink = styled.a`
  color: #e8b793;
  text-decoration: none; /* 밑줄 제거 */

  &:visited {
    color: #e8b793; /* 방문한 링크의 색상 지정 */
  }
`;

export const FontStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: "Nanum Pen Script", cursive;
`;
