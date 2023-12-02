import axios from "axios";

// api/posts.js

export const getPost = async (memberId) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/${memberId}/posts`);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

export const addPost = async (newPost, memberId) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/users/${memberId}/posts`, newPost);
    return response.data;
  } catch (error) {
    console.error("Error adding post:", error);
  }
};

export const getOnePost = async (postId, memberId) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/${memberId}/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching one post:", error);
  }
};

export const deletePost = async (postId, memberId) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/api/users/${memberId}/posts/${postId}`
    );

    return response;
  } catch (error) {}
};

export const editPost = async (postId, updatedPostData, memberId) => {
  try {
    const response = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/api/users/${memberId}/posts/${postId}`, updatedPostData);
    return response.data;
  } catch (error) {
    console.error("Error updating post:", error);
  }
};