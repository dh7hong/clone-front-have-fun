import styled from "styled-components";

export const NewPostWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 500px;
  width: 1900px;
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
  width: 200px;
  height: 40px;
  border-radius: 20px;
`;

export const ContentsInput = styled.textarea`
  width: 200px;
  height: 100px;
  border-radius: 10px;
`;

export const ContentsBody = styled.div`
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border: 3px solid black;
  border-radius: 20px;
  justify-content: center;
`;
