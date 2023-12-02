import styled from "styled-components";

export const MainStyle = styled.div`
  position: fixed;
  width: 70vw;
  height: 84vh;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 100px;
  left: 100px;
  overflow: hidden;
`;

export const BookCover = styled.div`
  background-color: #b4d1da;
  border-radius: 9px;
  border: 1px solid #738186;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  `;

export const BookDot = styled.div`
  
  border: 2px dashed white;
  border-radius: 9px;
  left: 15px;
  top: 15px;
  right: 15px;
  bottom: 15px;
  position: absolute;
  display: flex;
  justify-content: center;
  padding: 10px;
  overflow: auto;
`;

export const FlexJustAlignCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MainBookDot = styled.div`
  border: 2px dashed white;
  border-radius: 9px;
  left: 15px;
  top: 15px;
  right: 15px;
  bottom: 15px;
  position: absolute;
  padding: 10px;
  overflow: hidden;
`;