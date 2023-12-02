import axios from "axios";

export const updateProfileMessage = async (profileMessage, memberId) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_AUTH_URL}/api/users/${memberId}/profile`,
      { message: profileMessage },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(`respose from updateProfileMessage ${response}`);
    return response.data;
  } catch (error) {
    console.error("Error adding post:", error);
  }
};
