import React, { useState, useEffect, useMemo } from "react";
import * as S from "./GuestListStyle";
import { getDateTime } from "../../util/getDateTime";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/button";
import {
  sendFriendRequest,
  respondToFriendRequest,
  fetchFriendRequests,
} from "../../api/userService";
import { useDispatch, useSelector } from "react-redux";
import { addFriend, receiveFriend } from "../../redux/modules/friendshipSlice";
import { generateRandomId } from "../../util/generateUniqueId";

export default function GuestList({
  user,
  profileData,
  currentUserFriends,
  incomingFriendRequests,
  keyWord,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [outgoingStatus, setOutgoingStatus] = useState(null);
  const [incomingStatus, setIncomingStatus] = useState(null);
  const incomingRequest = incomingFriendRequests.find(
    (request) => request.senderId == user.memberId
  );

  const isFriend = currentUserFriends.includes(user.memberId);

  const handleAddFriendClick = async () => {
    const currentUserId = localStorage.getItem("memberId");
    try {
      await sendFriendRequest(currentUserId, user.memberId);
      console.log("senderId:", currentUserId);
      console.log("receiverId:", user.memberId);

      dispatch(
        addFriend({
          senderId: currentUserId,
          receiverId: user.memberId,
          status: "pending",
        })
      );
    } catch (error) {
      console.error("Error handling add friend:", error);
    }
  };

  const handleRespondToRequest = async (accept) => {
    const currentUserId = localStorage.getItem("memberId");
    if (incomingRequest) {
      try {
        await respondToFriendRequest(currentUserId, user.memberId, accept);
        console.log(`Friend request ${accept ? "accepted" : "rejected"}`);
        if (accept) {
          console.log("receiverId:", currentUserId);
          console.log("senderId:", user.memberId);
          dispatch(
            receiveFriend({
              receiverId: currentUserId,
              senderId: user.memberId,
              status: accept ? "accepted" : "rejected",
            })
          );
        }
      } catch (error) {
        console.error("Failed to respond to friend request:", error);
        // Handle error
      }
    }
  };

  const handleButtonClick = () => {
    if (isFriend) {
      navigate(`/api/users/${user.memberId}/posts`);
    }
  };

  const imageUrl =
    profileData[user.memberId]?.imageUrl || "/images/default.png";

  // let outgoingStatus;
  // let incomingStatus;
  useEffect(() => {
    const friendRequests = async () => {
      try {
        const memberId = localStorage.getItem("memberId");
        const sent = await fetchFriendRequests();
        // outgoingReceiver = sent.map((e) => e.receiverId).includes(user.memberId);
        setOutgoingStatus(
          sent.find(
            (e) => e.receiverId == user.memberId && e.senderId == memberId
          )?.status
        );
        setIncomingStatus(
          sent.find(
            (e) => e.senderId == user.memberId && e.receiverId == memberId
          )?.status
        );

        // outgoingSender = sent.map((e) => e.senderId).includes(memberId);
      } catch (error) {
        console.error("Error fetching friend requests:", error);
      }
    };
    friendRequests();
  }, []);
  let buttonComponent;

  if (outgoingStatus === "pending") {
    buttonComponent = <Button disabled>Pending</Button>;
  } else if (incomingStatus === "pending") {
    buttonComponent = (
      <>
        <Button onClick={() => handleRespondToRequest(true)}>Accept</Button>
        <Button onClick={() => handleRespondToRequest(false)}>Reject</Button>
      </>
    );
  } else if (isFriend) {
    // Already friends
    buttonComponent = <Button onClick={handleButtonClick}>Friends</Button>;
  } else {
    // No existing request
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
        <S.RowTitle>
          {user.name
            .replaceAll(keyWord, `!@#${keyWord}!@#`)
            .split("!@#")
            .map((e) => (
              <span
                key={user.memberId}
                style={{ color: e === keyWord ? "blue" : "black" }}
              >
                {e}
              </span>
            ))}
        </S.RowTitle>
        <S.RowTitle>{profileData[user.memberId]?.message}</S.RowTitle>
        <S.RowTitle>{buttonComponent}</S.RowTitle>
      </S.RowStyle>
    </S.PostStyle>
  );
}
