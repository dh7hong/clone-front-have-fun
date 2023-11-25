import axios from "axios";

export const AddPost = async (newPost) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_GAME_URL}/api/posts`,
      newPost
    );

    return response.data;
  } catch (error) {
    if (error.response) {
    }
  }
};

export const getOnePost = async (postId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_GAME_URL}/api/posts/${postId}`
    );
    return response;
  } catch (error) {}
};

export const getPost = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_GAME_URL}/api/posts`
    );
    return response.data;
  } catch (error) {}
};

export const deletePost = async (postId) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_GAME_URL}/api/posts/${postId}`
    );

    return response;
  } catch (error) {}
};

export const addComment = async (target) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_GAME_URL}/api/posts/${target.id}/comments`,
      target.newComment
    );

    return response;
  } catch (error) {}
};
