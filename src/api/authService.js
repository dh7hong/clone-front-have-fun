import axios from "axios";
import { store } from "../redux/config/configStore";
import { setToken, setUserId, setUsername, setMemberId } from "../redux/modules/userSlice";

const catchErrors = (error) => {
  if (error.response) {
    console.log("Error response status:", error.response.status);
    console.log("Error response data:", error.response.data.message);
    alert(
      `Error response status: ${error.response.status}\n Error response data: ${error.response.data.message}`
    );
  } else if (error.request) {
    console.log("No response received:", error.request);
    alert(`No response received: ${error.request}`);
  } else {
    console.log("Error message:", error.message);
    alert(`Error message: ${error.message}`);
  }
};

const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/register`,
      userData
    );
    console.log(response);
    return response;
  } catch (error) {
    catchErrors(error);
  }
};

const loginUser = async (userData) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/login`,
      userData
    );
    console.log(`response ${response.data}`);

    const { token, userId, id: username, memberId } = response.data;
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("userId", userId);
    localStorage.setItem("memberId", memberId);

    store.dispatch(setToken(token));
    store.dispatch(setUsername(username));
    store.dispatch(setUserId(userId));
    store.dispatch(setMemberId(memberId));

    return { token, username, userId, memberId };
  } catch (error) {
    catchErrors(error);
  }
};

// const authUser = async () => {
//   const authToken = store.getState().user.token;

//   try {
//     const response = await axios.get(
//       `${process.env.REACT_APP_SERVER_URL}/api/user`,
//       {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       }
//     );

//     if (response.status === 200) {
//       console.log(response.data.message);
//       alert(response.data.message);
//       return response.data;
//     }
//   } catch (error) {
//     catchErrors(error);
//   }
// };

export { registerUser, loginUser };
