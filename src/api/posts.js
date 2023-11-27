import axios from "axios";

export const AddPost = async (newPost) => {
  const memberId = localStorage.getItem("memberId");
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/users/${memberId}/posts`,
      newPost
    );

    return response.data;
  } catch (error) {
    if (error.response) {
    }
  }
};

export const getOnePost = async (postId) => {
  const memberId = localStorage.getItem("memberId");
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/users/${memberId}/posts/${postId}`
    );
    return response;
  } catch (error) {}
};

export const getPost = async () => {
  const memberId = localStorage.getItem("memberId");
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/users/${memberId}/posts`
    );
    return response.data;
  } catch (error) {}
};

export const deletePost = async (postId) => {
  const memberId = localStorage.getItem("memberId");
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/api/users/${memberId}/posts/${postId}`
    );

    return response;
  } catch (error) {}
};
