import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCommentsByPostId } from "../../api/comments";
import { setComments } from "../../redux/modules/commentSlice";
import { getDateTime } from "../../util/getDateTime";

const CommentsList = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const comments = useSelector((state) =>
    state.comments.comments.filter((comment) => comment.postId === postId)
  );

  useEffect(() => {
    const fetchComments = async () => {
      const fetchedComments = await getCommentsByPostId(postId);
      dispatch(setComments(fetchedComments)); // Update comments in Redux store
    };
    fetchComments();
  }, [postId, dispatch]);
  console.log("comments", comments);
  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.commentId}>
          <strong>{comment.id}:</strong> {comment.contents}
          {`nickname ${comment.nickname}`} {`name ${comment.name}`}
        </div>
      ))}
    </div>
  );
};

export default CommentsList;
