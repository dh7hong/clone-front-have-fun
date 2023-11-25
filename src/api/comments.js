import axios from "axios";

export const addNewComment = async (postId, commentData) => {
  const memberId = localStorage.getItem("memberId");
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_GAME_URL}/api/users/${memberId}/posts/${postId}/comments`,
      commentData
    );
    console.log("Server response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error posting comment:", error);
  }
};

export const getCommentsByPostId = async (postId) => {
  const memberId = localStorage.getItem("memberId");
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_GAME_URL}/api/users/${memberId}/posts/${postId}/comments`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
};
