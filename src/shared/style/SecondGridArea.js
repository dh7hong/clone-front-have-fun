import styled from "styled-components";

export const Container2 = styled.div`
  width: 50vw;
  flex: 2;
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  margin-top: 15px;
  margin-bottom: 15px;
  margin-right: 15px;
  justify-content: center;
  
  height: 95%;
`;

export const Item3 = styled.div`
  flex: 0.1;
  border: none;
  padding: 5px;
  display: flex;
  justify-content: space-between;
`;

export const Item4 = styled.div`
  flex: 2;
  border: 2px solid #d4d4d4;
  height: 0px;
  border-radius: 20px;
  background-color: white;
  margin-right: 15px;
  overflow: auto;
  position: relative;
  padding-left: 20px;
  padding-right: 20px;
`;

export const Tab = styled.a`
  margin-left: 70px;
  display: flex;
  justify-content: flex-end;
  margin-left: 300px;
  color: #4682b4;
`;

export const FlexBox = styled.div`
  display: flex;
`;

export const ImageUploadBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StatusMessageTextarea = styled.textarea`
  width: 10vw;
  height: 20vh;
  border-radius: 5px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0px;
  font-family: "Hi Melody", sans-serif;
`;

export const ModifyButton = styled.button`
  width: 70px;
  height: 30px;
  margin: 40px 0 0 10px;
  cursor: pointer;
`;
