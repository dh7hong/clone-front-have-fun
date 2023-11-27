// api/friends.js
import axios from "axios";

export const addFriend = async (memberId, friendNickname) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/users/${memberId}/friends`,
      { friendNickname }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding friend:", error);
  }
};
