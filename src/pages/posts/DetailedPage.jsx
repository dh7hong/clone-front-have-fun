import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  deletePost,
  getOnePost,
  getPost,
  // plusLikeCount,
} from "../../api/posts";
import { editPost as editPostAPI } from "../../api/posts"; // Renamed API function
import { useDispatch } from "react-redux";
import { editPost } from "../../redux/modules/postSlice";
import * as S from "../../shared/style/DetailedPage";
import * as T from "../../shared/style/NewPostStyle";
import { getDateTime } from "../../util/getDateTime";
import CommentForm from "./CommentForm";
import CommentsList from "./CommentsList";
import { Button } from "../../components/button";
import Base from "../layout/Base";
import FirstGridArea from "../FirstGridArea";
import SecondGridArea from "../SecondGridArea";
import * as F from "../../shared/style/FirstGridArea";
import * as K from "../../shared/style/SecondGridArea";

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
      memberId,
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
    <>
      <Base>
        <FirstGridArea />
        <SecondGridArea>
          {isEditing ? (
            
            <T.InputWrapper>
              <S.NewBoardWrapper>
              <h3>Title</h3>
              <input               
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                />


              <h3>Contents</h3>
              <textarea
                value={editedContents}
                onChange={(e) => setEditedContents(e.target.value)}
              />
              
              <S.ButtonWrapper>
                <Button onClick={submitEdit}>Save</Button>
                <Button onClick={() => setIsEditing(false)}>Cancel</Button>
              </S.ButtonWrapper>
              </S.NewBoardWrapper>
            </T.InputWrapper>
            
          ) : (
            
            <T.InputWrapper>
              <S.NewBoardWrapper>
                <h2>Title</h2>
                <S.TitleStyle>{detailedInfo?.title}</S.TitleStyle>
                <h2>Contents</h2>
                <S.ContentsStyle> {detailedInfo?.contents}</S.ContentsStyle>
              

              <S.ButtonWrapper>
                <Button onClick={moveToList}>Go Back</Button>
                <Button onClick={enterEditMode}>Edit</Button>
                <Button onClick={deleteBtn}>Delete</Button>
              </S.ButtonWrapper>
              </S.NewBoardWrapper>
              <div>
            <h2>Comments</h2>
          </div>
          <CommentForm />
          <CommentsList />
            </T.InputWrapper>
            
          )}
          
          </SecondGridArea>
      </Base>
    </>
  );
}
