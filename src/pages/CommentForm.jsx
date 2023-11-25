import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../redux/modules/commentSlice";
import { useParams } from "react-router-dom";
import { addNewComment } from "../api/comments";
import * as S from "../shared/style/CommentStyle";
import { Button } from "../components/button";

const CommentForm = () => {
  const [username, setUsername] = useState("");
  const [contents, setContents] = useState("");
  const dispatch = useDispatch();
  const { postId } = useParams();

  const generateUniqueId = () => {
    let now = new Date();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let milliseconds = now.getMilliseconds();

    return minutes * 60000 + seconds * 1000 + milliseconds;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const uniqueId = generateUniqueId();
    const username = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");
    dispatch(addComment({ commentId: uniqueId, postId, userId, username, contents }));

    const commentData = { commentId: uniqueId, postId, userId, username, contents };

    addNewComment(postId, commentData);

    setUsername("");
    setContents("");
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <input
        type="text"
        placeholder="Nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      /> */}
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
