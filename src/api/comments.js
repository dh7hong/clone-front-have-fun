import axios from "axios";

export const addNewComment = async (postId, commentData) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_GAME_URL}/api/posts/${postId}/comments`,
      commentData
    );
    return response.data;
  } catch (error) {
    // handle error
    console.error("Error posting comment:", error);
  }
};

export const getCommentsByPostId = async (postId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_GAME_URL}/api/posts/${postId}/comments`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
};
