import { HomeOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { CgCommunity } from "react-icons/cg";
import { IoLogoTux } from "react-icons/io5";
import { IoPersonCircle } from "react-icons/io5";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 20px;
  background: #355c7d; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #c06c84,
    #6c5b7b,
    #355c7d
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #c06c84,
    #6c5b7b,
    #355c7d
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
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

export const Logo = styled(IoLogoTux)`
  font-size: 50px;
  box-shadow: 5px 5px 5px 5px gray;
  border-radius: 20px;
  margin-left: 200px;
  cursor: pointer;
  &:hover {
    background-color: white;
  }
`;

export const TitleStyle = styled.h1`
  font-family: "Nanum Pen Script", cursive;
  color: white;
`;

export const MypageStyle = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MyProfile = styled(IoPersonCircle)``;

export const MyProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;
