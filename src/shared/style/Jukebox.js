import styled from "styled-components";

export const YoutubePlayer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f0f0f0; /* Light gray background */
  padding: 10px 20px;
  margin: 20px 0;
`;

export const YoutubeLinksInput = styled.input`
  flex-grow: 1;
  margin-right: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const YoutubeLinksButton = styled.button`
  padding: 10px 20px;
  background-color: #359dc2; /* Bootstrap primary blue */
  color: white;
  border: none;
  border-radius: 4px;
  margin-right: 5px;
  cursor: pointer;
`;
