import axios from "axios";

export const userList = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_AUTH_URL}/api/users`
  );
  return response.data;
};

export const sendFriendRequest = async (senderId, receiverId) => {
  try {
    console.log("Sending friend request to:", receiverId);
    const response = await axios.post(
      `${process.env.REACT_APP_AUTH_URL}/api/users/${receiverId}/sendFriendRequest`,
      { senderId, receiverId }
    );
    return response.data;
  } catch (error) {
    console.error("Error sending friend request:", error);
    throw error;
  }
};

export const respondToFriendRequest = async (memberId, senderId, accept) => {
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_AUTH_URL}/api/users/${memberId}/respondToFriendRequest`,
      { senderId, accept }
    );
    return response.data;
  } catch (error) {
    console.error("Error responding to friend request:", error);
    throw error;
  }
};

export const fetchIncomingFriendRequests = async (memberId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_AUTH_URL}/api/users/${memberId}/incomingFriendRequests`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching incoming friend requests:", error);
    return []; // Return an empty array or handle the error as appropriate
  }
};

export const fetchFriendRequests = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_AUTH_URL}/api/users/friendRequests`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching all friend requests:", error);
    return []; // Return an empty array or handle the error as appropriate
  }
}