import axios from 'axios';

export const getDiaryEntries = async (memberId) => {
  const response = await axios.get(`${process.env.REACT_APP_AUTH_URL}/api/users/${memberId}/diary`);
  return response.data;
};

export const postDiaryEntry = async (memberId, newEntry) => {
  const response = await axios.post(`${process.env.REACT_APP_AUTH_URL}/api/users/${memberId}/diary`, newEntry);
  return response.data;
};

