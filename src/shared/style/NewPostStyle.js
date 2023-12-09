import styled from "styled-components";

export const NewPostWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 40vh;
  width: 40vw;
`;

export const TitleBox = styled.div`
  width: 1400px;
  height: 50px;
  display: flex;
  align-items: center;
  background-color: skyblue;
  justify-content: center;
`;

export const Title = styled.h2`
  text-align: center;
  width: 300px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const Button = styled.button`
  margin: 0px 10px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TitleInput = styled.input`
  margin-right: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 20vw;
  height: 2vh;
`;

export const ContentsInput = styled.textarea`
  flex-grow: 1;
  margin-right: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 20vw;
  height: 20vh;
`;

export const ContentsBody = styled.div`
  width: 50vw;
  height: 40vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 3px solid white;
  border-radius: 20px;
  justify-content: center;
`;
