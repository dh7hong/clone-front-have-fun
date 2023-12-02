import { HomeOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { CgCommunity } from "react-icons/cg";
import { IoLogoTux } from "react-icons/io5";
import { IoPersonCircle } from "react-icons/io5";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const HeaderWrapper = styled.div`
  width: 100%;
  background-color: rgb(54, 48, 98);
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
export const HeaderButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const MyProfileStyle = styled.div`
  display: flex;
  cursor: pointer;
  width: 250px;
`;

export const ProfileImage = styled.img`
  box-shadow: 5px 5px 5px 5px gray;
  border-radius: 25px;

  &:hover {
    background-color: black;
  }
`;

export const Logo = styled.img`
  background-image: url("/cyWorldLogo.jpg");
  background-size: cover;
  background-position: bottom;
  width: 500px;
  height: 120px;
  box-shadow: 5px 5px 5px 5px gray;
  border-radius: 20px;
  margin-left: 100px;
  cursor: pointer;
  &:hover {
    background-color: white;
  }
`;

export const TitleStyle = styled.h1`
  font-family: "Nanum Pen Script", cursive;
  color: white;
`;

export const MyProfile = styled(IoPersonCircle)`
  width: 10vw;
  height: 22vh;
  border-radius: 10px;
  `;

export const MyProfileImage = styled.img`
  width: 10vw;
  height: 22vh;
  border-radius: 10px;
`;
