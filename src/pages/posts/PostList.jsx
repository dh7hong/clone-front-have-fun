import React, { useState, useEffect } from "react";
import * as S from "../../shared/style/PostStyle";
import { getDateTime } from "../../util/getDateTime";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/button";

export default function PostList({ post }) {
  const navigate = useNavigate();
  const { memberId } = useParams();
  const moveToDetailedPage = (postId) => () => {
    navigate(`/api/users/${memberId}/posts/${postId}`);
    // window.location.reload();
  };

  return (
    <S.PostStyle>
      <S.RowStyle>
        <S.RowTitle>{post.postId}</S.RowTitle>
        <S.RowTitle>{post.title}</S.RowTitle>
        <S.RowTitle>{post.name}</S.RowTitle>
        <S.RowTitle>{post.createdAt}</S.RowTitle>
        <S.detailedBtnWrapper>
          <Button onClick={moveToDetailedPage(post.postId)}>상세보기</Button>
        </S.detailedBtnWrapper>
      </S.RowStyle>
    </S.PostStyle>
  );
}
