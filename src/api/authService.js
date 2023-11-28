import axios from "axios";
import { store } from "../redux/config/configStore";
import {
  setToken,
  setId,
  setName,
  setNickname,
  setMemberId,
} from "../redux/modules/userSlice";

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
      `${process.env.REACT_APP_AUTH_URL}/api/register`,
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
      `${process.env.REACT_APP_AUTH_URL}/api/login`,
      userData
    );
    console.log(`response ${response.data}`);
    
    const token = response.data.token;
    const id = response.data.data.id;
    const nickname = response.data.data.nickname;
    const memberId = response.data.data.memberId;
    const name = response.data.data.name;
    
    console.log(`at authService token ${token}`);
    console.log(`at authService id ${id}`);
    console.log(`at authService nickname ${nickname}`);
    console.log(`at authService memberId ${memberId}`);
    console.log(`at authService name ${name}`);

    localStorage.setItem("token", token);
    localStorage.setItem("id", id);
    localStorage.setItem("nickname", nickname);
    localStorage.setItem("memberId", memberId);
    localStorage.setItem("name", name);

    store.dispatch(setToken(token));
    store.dispatch(setId(id));
    store.dispatch(setNickname(nickname));
    store.dispatch(setMemberId(memberId));
    store.dispatch(setName(name));

    return { token, id, nickname, memberId , name};
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
