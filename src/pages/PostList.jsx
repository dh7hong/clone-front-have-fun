import React, { useState, useEffect } from "react";
import * as S from "../shared/style/PostStyle";
import { getDate } from "../util/Date";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/button";

export default function PostList({ post }) {

  const navigate = useNavigate();
  const { memberId } = useParams();
  const moveToDetailedPage = (postId) => () => {
    
    navigate(`/api/users/${memberId}/posts/${postId}`);
    window.location.reload();
  };


  return (
    <S.PostStyle>
      <S.RowStyle>
        <S.Row>{post.postId}</S.Row>
        <S.RowTitle>{post.title}</S.RowTitle>
        <S.Row>{post.nickname}</S.Row>
        <S.Row>{post.memberId}</S.Row>
        <S.Row>{getDate()}</S.Row>
        <S.detailedBtnWrapper>
          <Button onClick={moveToDetailedPage(post.postId)}>상세보기</Button>
        </S.detailedBtnWrapper>
      </S.RowStyle>
    </S.PostStyle>
  );
}
