import axios from "axios";

export const addNewComment = async (postId, commentData, memberId) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/users/${memberId}/posts/${postId}/comments`, commentData);
    return response.data;
  } catch (error) {
    console.error("Error posting comment:", error);
  }
};

export const getCommentsByPostId = async (postId, memberId) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/${memberId}/posts/${postId}/comments`);
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
};

