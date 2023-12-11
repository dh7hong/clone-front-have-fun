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
  justify-content: right;
`;

export const Item3_1 = styled.div`
  flex: 0.1;
  border: none;
  padding: 5px;
  display: flex;
  justify-content: right;
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
  display: flex;
  justify-content: flex-end;
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
  width: 13vw;
  height: 10vh;
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

export const LiName = styled.div`
  background-color: #f1f1f1;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  overflow: auto;
  z-index: 1;
`;


export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px; // Or any other padding you prefer
  background: #f0f0f0; // Example background color
  // Add other styles like border, etc.
`;

export const Title = styled.div`
  font-size: 24px; // Example font size
  font-weight: bold;
  // Add other styles for the title
`;

export const Navigation = styled.div`
  display: flex;
  gap: 10px;
  // Add other styles for navigation buttons/links
`;

export const Button = styled.button`
  // Style your button
`;

export const Link = styled.a`
  // Style your link
  text-decoration: none;
  color: blue;
  &:hover {
    color: darkblue;
  }
`;