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
    console.log(`response from updateProfileMessage ${response}`);
    return response.data;
  } catch (error) {
    console.error("Error adding post:", error);
  }
};

export const getProfileMessage = async (memberId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_AUTH_URL}/api/users/${memberId}/profile`
    );
    console.log(`response from getProfileMessage ${response.data.message}`);
    return response.data;
  } catch (error) {
    console.error("Error getting profile message", error);
  }
}

export const getProfileFeeling = async (memberId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_AUTH_URL}/api/users/${memberId}/feeling`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting feeling", error);
  }
};

export const updateProfileFeeling = async (feeling, memberId) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_AUTH_URL}/api/users/${memberId}/feeling`,
      { feeling: feeling }
    );
    console.log(`response from updateProfileFeeling ${response.data}`);
    return response.data;
  } catch (error) {
    console.error("Error updating feeling:", error);
  }
};
