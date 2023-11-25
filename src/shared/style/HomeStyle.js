import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HomeWrapper = styled.div`
  width: 100vw;
  height: 75vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BoardWrapper = styled.div`
  width: 1028px;
  background-color: rgb(54, 48, 98);
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border: 2px solid black;
`;

export const BoardTitle = styled.span`
  width: 100px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-weight: bolder;
  color: white;
`;

export const BoardTitleStyle = styled.div`
  width: 300px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-weight: bolder;
  color: white;
`;

export const PostStyle = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
  flex-direction: column;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  width: 1028px;
  justify-content: space-around;
  align-items: center;
`;

export const SearchInput = styled.input`
  width: 200px;
  height: 30px;
  border-radius: 20px;
  margin-right: 10px;
`;

export const AllPostBtn = styled.button`
  width: 100px;
  height: 30px;
  margin-right: 10px;
`;

export const SubmitBtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  width: 1028px;
`;
