import React, { useState, useEffect } from "react";
import * as S from "../shared/style/PostStyle";
import { getDate } from "../util/Date";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/button";

export default function PostList({ post, keyWord }) {

  const navigate = useNavigate();

  const moveToDetailedPage = (postId) => () => {
    const memberId = localStorage.getItem("memberId");
    navigate(`api/users/${memberId}/posts/${postId}`);
  };


  return (
    <S.PostStyle>
      <S.RowStyle>
        <S.Row>{post.postId}</S.Row>
        <S.RowTitle>
          {post.title
            .replaceAll(keyWord, `!@#${keyWord}!@#`)
            .split("!@#")
            .map((el) => (
              <span
                key={post.postId}
                style={{ color: el === keyWord ? "red" : "black" }}
              >
                {el}
              </span>
            ))}
        </S.RowTitle>
        <S.Row>{post.username}</S.Row>
        <S.Row>{post.userId}</S.Row>
        <S.Row>{getDate()}</S.Row>
        <S.detailedBtnWrapper>
          <Button onClick={moveToDetailedPage(post.postId)}>상세보기</Button>
        </S.detailedBtnWrapper>
      </S.RowStyle>
    </S.PostStyle>
  );
}
