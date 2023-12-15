import React, { useState, useEffect } from "react";
import * as S from "./GuestListStyle";
import { getDateTime } from "../../util/getDateTime";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/button";
import {
  sendFriendRequest,
  respondToFriendRequest,
} from "../../api/userService";
import { useDispatch, useSelector } from "react-redux";
import {
  addFriendRequest,
  updateFriendRequestStatus,
} from "../../redux/modules/friendshipSlice";
export default function GuestList({
  user,
  profileData,
  currentUserFriends,
  incomingFriendRequests,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const moveToDetailedPage = () => () => {
    navigate(`/api/users/${user.memberId}/posts`);
    // window.location.reload();
  };
  const incomingRequest = incomingFriendRequests.find(
    (request) => request.senderId == user.memberId
  );
  const hasPendingRequest = incomingFriendRequests.some(
    (request) => request.senderId == user.memberId
  );
  const isFriend = currentUserFriends.includes(user.memberId);
  const friendRequests = useSelector(
    (state) => state.friendship.friendRequests
  );

  const senderId = localStorage.getItem("memberId");
  const requestStatus = friendRequests[user.memberId]?.status;

  const handleAddFriendClick = async () => {
    try {
      const status = await sendFriendRequest(senderId, user.memberId);
      dispatch(
        addFriendRequest({ memberId: user.memberId, name: user.name, status })
      );
    } catch (error) {
      console.error("Error handling add friend:", error);
    }
  };

  const handleRespondToRequest = async (accept) => {
    const currentUserId = localStorage.getItem("memberId");

    if (incomingRequest) {
      try {
        await respondToFriendRequest(
          currentUserId,
          incomingRequest.senderId,
          accept
        );
        console.log(`Friend request ${accept ? "accepted" : "rejected"}`);
        // Update UI or state as needed
      } catch (error) {
        console.error("Failed to respond to friend request:", error);
        // Handle error
      }
    }
    dispatch(
      updateFriendRequestStatus({
        memberId: user.memberId,
        status: accept ? "accepted" : "rejected",
      })
    );
  };
  useEffect(() => {
    console.log("Friend Requests State: ", friendRequests);
  }, [friendRequests]);
  const handleButtonClick = () => {
    if (isFriend) {
      navigate(`/api/users/${user.memberId}/posts`);
    }
  };

  const imageUrl =
    profileData[user.memberId]?.imageUrl || "/images/default.png";

  let buttonComponent;
  if (hasPendingRequest || requestStatus === "pending") {
    buttonComponent = (
      <>
        <Button onClick={() => handleRespondToRequest(true)}>Accept</Button>
        <Button onClick={() => handleRespondToRequest(false)}>Reject</Button>
      </>
    );
  } else if (requestStatus === "accepted" || isFriend) {
    buttonComponent = <Button onClick={handleButtonClick}>Friends</Button>;
  } else {
    buttonComponent = (
      <Button onClick={handleAddFriendClick}>Add Friend</Button>
    );
  }
  return (
    <S.PostStyle>
      <S.RowStyle>
        <S.RowTitle>
          <S.MyProfileImage src={imageUrl} alt="Profile" />
        </S.RowTitle>
        <S.RowTitle>{user.id}</S.RowTitle>
        <S.RowTitle>{user.nickname}</S.RowTitle>
        <S.RowTitle>{user.name}</S.RowTitle>
        <S.RowTitle>{profileData[user.memberId]?.message}</S.RowTitle>
        <S.RowTitle>{buttonComponent}</S.RowTitle>
      </S.RowStyle>
    </S.PostStyle>
  );
}
