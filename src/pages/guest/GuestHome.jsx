import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Base from "../layout/Base";
import FirstGridArea from "../layout/FirstGridArea";
import SecondGridArea from "../SecondGridArea";
import * as S from "./GuestHomeStyle";
import {
  MiniroomImage,
  NewsBox,
  UpdateImage,
  UpdateNewsContent,
  UpdatedNews,
  UpdateNews,
} from "../../shared/style/Main";
import { userList } from "../../api/userService";
import GuestList from "./GuestList";

export default function GuestHome() {
  const [users, setUsers] = useState([]);
  const [profileData, setProfileData] = useState({});
  const navigate = useNavigate();

  const getUsersData = async () => {
    try {
      const response = await userList();
      const data = response;
      console.log("API 응답 구조가 예상과 같습니다:", data);
      // API 응답이 예상대로 구조화되었는지 확인
      if (data) {
        console.log("API 응답 구조가 예상과 같습니다:", data);
        setUsers(response);
      } else {
        console.error("API 응답 구조가 예상과 다릅니다:", response.data);
      }
    } catch (error) {
      console.error("데이터를 가져오는 중 오류 발생:", error);
    }
  };

  const fetchProfileData = async (memberId) => {
    try {
      const [messageResponse, imageResponse] = await Promise.all([
        axios.get(
          `${process.env.REACT_APP_AUTH_URL}/api/users/${memberId}/profile`
        ),
        axios.get(
          `${process.env.REACT_APP_AUTH_URL}/api/users/${memberId}/profileImage`
        ),
      ]);

      setProfileData((prevData) => ({
        ...prevData,
        [memberId]: {
          message: messageResponse.data.message,
          imageUrl: imageResponse.data.imageUrl,
        },
      }));
    } catch (error) {
      console.error("Error fetching profile data:", error);
      // Handle error...
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  useEffect(() => {
    users.forEach((user) => {
      fetchProfileData(user.memberId);
    });
  }, [users]);

  return (
    <>
      
        <SecondGridArea>
          <S.BoardWrapper>
            <S.BoardTitle>Profile Image</S.BoardTitle>
            <S.BoardTitle>ID</S.BoardTitle>
            <S.BoardTitle>Nickname</S.BoardTitle>
            <S.BoardTitle>Name</S.BoardTitle>
            <S.BoardTitle>Message</S.BoardTitle>
            <S.BoardTitle>Friends</S.BoardTitle>
          </S.BoardWrapper>

          <S.PostStyle>
            {users.map((user) => (
              <GuestList
                key={user.memberId}
                user={user}
                profileData={profileData}
              />
            ))}
          </S.PostStyle>
        </SecondGridArea>
      
    </>
  );
}
