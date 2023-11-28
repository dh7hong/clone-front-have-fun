import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  deletePost,
  getOnePost,
  getPost,
  // plusLikeCount,
} from "../api/posts";
import { editPost as editPostAPI } from "../api/posts"; // Renamed API function
import { useDispatch } from "react-redux";
import { editPost } from "../redux/modules/postSlice";
import * as S from "../shared/style/DetailedPage";
import * as T from "../shared/style/NewPostStyle";
import { getDateTime } from "../util/getDateTime";
import CommentForm from "./CommentForm";
import CommentsList from "./CommentsList";
import { Button } from "../components/button";

export default function DetailedPage() {
  const navigate = useNavigate();
  const { memberId, postId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContents, setEditedContents] = useState("");
  const queryClient = useQueryClient();

  console.log("postId", postId);

  const { data: detailedInfo } = useQuery(["post", postId, memberId], () =>
    getOnePost(postId, memberId)
  );

  console.log("detailedInfo", detailedInfo);
  
  const deleteMutation = useMutation(() => deletePost(postId, memberId), {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
      navigate(`/api/users/${memberId}/posts`);
    },
  });

  const deleteBtn = () => {
    deleteMutation.mutate();
  };

  const dispatch = useDispatch();

  const id = localStorage.getItem("id");
  const createdAt = getDateTime();

  const submitEdit = async () => {
    const updatedPostData = {
      title: editedTitle,
      contents: editedContents,
      id,
      nickname: localStorage.getItem("nickname"),
      name: localStorage.getItem("name"),
      createdAt,
      memberId
      // Include other fields if necessary
    };

    try {
      await editPostAPI(postId, updatedPostData, memberId); // Directly await the API call without assigning it to a variable
      dispatch(editPost({ postId, ...updatedPostData })); // Dispatch Redux action
      setIsEditing(false); // Exit editing mode
      queryClient.invalidateQueries(["post", postId, memberId]); // Refetch the post data
    } catch (error) {
      console.error("Error updating post:", error);
      // Handle the error appropriately
    }
  };

  const enterEditMode = () => {
    if (detailedInfo) {
      setIsEditing(true);
      setEditedTitle(detailedInfo.title);
      setEditedContents(detailedInfo.contents);
    }
  };

  const moveToList = () => {
    navigate(`/api/users/${memberId}/posts`);
  };

  return (
    <S.DetailedPageWrapper>
      <h2 style={{ color: "white" }}>게시물 등록</h2>
      {isEditing ? (
        <T.ContentsBody>
          <T.TitleWrapper>
            <h3>제목</h3>
            <T.TitleInput
              maxLength={30}
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          </T.TitleWrapper>
          <T.ContentsWrapper>
            <h3>내용</h3>
            <T.ContentsInput
              value={editedContents}
              onChange={(e) => setEditedContents(e.target.value)}
            />
          </T.ContentsWrapper>
          <S.ButtonWrapper>
            <Button onClick={submitEdit}>저장하기</Button>
            <Button onClick={() => setIsEditing(false)}>취소하기</Button>
          </S.ButtonWrapper>
        </T.ContentsBody>
      ) : (
        <T.ContentsBody>
          <S.NewBoardWrapper>
            <h2>제목</h2>
            <S.TitleStyle>{detailedInfo?.title}</S.TitleStyle>
            <h2>내용</h2>
            <S.ContentsStyle> {detailedInfo?.contents}</S.ContentsStyle>
          </S.NewBoardWrapper>

          <S.ButtonWrapper>
            <Button onClick={moveToList}>목록으로</Button>
            <Button onClick={enterEditMode}>수정하기</Button>
            <Button onClick={deleteBtn}>삭제하기</Button>
          </S.ButtonWrapper>
        </T.ContentsBody>
      )}
      <div>
        <h2 style={{ color: "white" }}>댓글</h2>
      </div>
      <CommentForm />
      <CommentsList />
    </S.DetailedPageWrapper>
  );
}
