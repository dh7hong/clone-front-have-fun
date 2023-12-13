import React, { useState, useEffect } from "react";
import * as S from "./GuestListStyle";
import { getDateTime } from "../../util/getDateTime";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/button";


export default function GuestList({ user, profileData }) {
  const navigate = useNavigate();
  const moveToDetailedPage = () => () => {
    navigate(`/api/users/${user.memberId}/posts`);
    // window.location.reload();
  };
  const addFriend = (memberId) => () => {}

  const Friends = () => {};

  const imageUrl = profileData[user.memberId]?.imageUrl || "/images/default.png";

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
        <S.RowTitle>
          <Button onClick={addFriend(user.memberId)}>Add Friend</Button>
        </S.RowTitle>
      </S.RowStyle>
    </S.PostStyle>
  );
}
