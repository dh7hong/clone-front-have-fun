import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../../redux/modules/commentSlice";
import { useParams } from "react-router-dom";
import { addNewComment } from "../../api/comments";
import * as S from "../../shared/style/CommentStyle";
import { Button } from "../../components/button";
import { getDateTime } from "../../util/getDateTime";

const CommentForm = () => {
  const [contents, setContents] = useState("");
  const dispatch = useDispatch();
  const { memberId, postId } = useParams();

  const generateUniqueId = () => {
    let now = new Date();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let milliseconds = now.getMilliseconds();

    return minutes * 60000 + seconds * 1000 + milliseconds;
  };

  const createdAt = getDateTime();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uniqueId = generateUniqueId();
    const id = localStorage.getItem("id");
    const nickname = localStorage.getItem("nickname");
    const name = localStorage.getItem("name");

    dispatch(
      addComment({
        commentId: uniqueId,
        postId,
        id,
        nickname,
        name,
        contents,
        memberId,
        createdAt,
      })
    );

    const commentData = {
      commentId: uniqueId,
      postId,
      id,
      nickname,
      name,
      contents,
      memberId,
      createdAt,
    };

    await addNewComment(postId, commentData, memberId);

    setContents("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <br />
      <S.CommentWrapper>
        <textarea
          placeholder="Comment"
          value={contents}
          onChange={(e) => setContents(e.target.value)}
        />

        <br />
        <Button type="submit">Add Comment</Button>
      </S.CommentWrapper>
    </form>
  );
};

export default CommentForm;
