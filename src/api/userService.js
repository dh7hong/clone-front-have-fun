import axios from 'axios';

export const userList = async () => {
    const response = await axios.get(`${process.env.REACT_APP_AUTH_URL}/api/users`);
    return response.data;
  }

