// GuestHome.jsx
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
  const [currentUserFriends, setCurrentUserFriends] = useState([]);
  const [incomingFriendRequests, setIncomingFriendRequests] = useState([]);

  const loggedInMemberId = localStorage.getItem("memberId");

  const getUsersData = async () => {
    try {
      const response = await userList();
      const data = response;
      console.log("API's response.data looks like:", data);

      if (data) {
        console.log("API's response.data looks like:", data);
        setUsers(response);
      } else {
        console.error("API's response.data looks like:", response.data);
      }
    } catch (error) {
      console.error("Error retrieving Data:", error);
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
    }
  };

  const memberId = localStorage.getItem("memberId");

  const fetchCurrentUserFriends = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_AUTH_URL}/api/users/${memberId}/friends`
      );
      setCurrentUserFriends(response.data.friends);
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };

  const fetchIncomingFriendRequests = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_AUTH_URL}/api/users/${memberId}/incomingFriendRequests`,
        {}
      );
      console.log("incoming friend requests:", response.data);
      setIncomingFriendRequests(response.data);
    } catch (error) {
      console.error("Error fetching incoming friend requests:", error);
    }
  };

  useEffect(() => {
    getUsersData();
    fetchCurrentUserFriends();
    fetchIncomingFriendRequests();
  }, []);

  useEffect(() => {
    users.forEach((user) => {
      fetchProfileData(user.memberId);
    });
  }, [users]);

  return (
    <>
      <SecondGridArea>
        {/* <S.BoardWrapper>
          <S.BoardTitle>Profile Image</S.BoardTitle>
          <S.BoardTitle>ID</S.BoardTitle>
          <S.BoardTitle>Nickname</S.BoardTitle>
          <S.BoardTitle>Name</S.BoardTitle>
          <S.BoardTitle>Message</S.BoardTitle>
          <S.BoardTitle>Friends</S.BoardTitle>
        </S.BoardWrapper> */}

        <S.PostStyle>
          {users
            .filter(
              (user) => parseInt(user.memberId) !== parseInt(loggedInMemberId)
            ) // Filter out the logged-in user
            .map((user) => (
              <GuestList
                key={user.memberId}
                user={user}
                profileData={profileData}
                currentUserFriends={currentUserFriends}
                incomingFriendRequests={incomingFriendRequests}
              />
            ))}
        </S.PostStyle>
      </SecondGridArea>
    </>
  );
}
