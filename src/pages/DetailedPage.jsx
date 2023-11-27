import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  deletePost,
  getOnePost,
  getPost,
  // plusLikeCount,
} from "../api/posts";
import * as S from "../shared/style/DetailedPage";
import { getDate } from "../util/Date";
import CommentForm from "./CommentForm";
import CommentsList from "./CommentsList";
import { Button } from "../components/button";

export default function DetailedPage() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const queryClient = useQueryClient();

  console.log("postId", postId);

  const { data: detailedInfo } = useQuery(["post", postId], () =>
    getOnePost(postId)
  );

  console.log("detailedInfo", detailedInfo);

  const deleteMutation = useMutation(() => deletePost(postId), {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
      navigate("/api/users/" + memberId + "/posts");
    },
  });

  const deleteBtn = () => {
    deleteMutation.mutate();
  };
  const memberId = localStorage.getItem("memberId");
  const moveToList = () => {
    navigate("/api/users/" + memberId + "/posts");
  };

  return (
    <S.DetailedPageWrapper>
      <h2 style={{ color: "white" }}>게시물 등록</h2>
      <S.NewBoardWrapper>
        <h2>제목</h2>
        <S.TitleStyle>{detailedInfo?.data.title}</S.TitleStyle>
        <h2>내용</h2>
        <S.ContentsStyle> {detailedInfo?.data.contents}</S.ContentsStyle>
      </S.NewBoardWrapper>
      <S.ButtonWrapper>
        <Button onClick={moveToList}>목록으로</Button>
        <Button onClick={deleteBtn}>삭제하기</Button>
      </S.ButtonWrapper>
      <div>
        <h2 style={{ color: "white" }}>댓글</h2>
      </div>
      <CommentForm />
      <CommentsList />
    </S.DetailedPageWrapper>
  );
}
