import styled from 'styled-components';

export const DiarySection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f0f0f0; /* Light gray background */
  padding: 10px 20px;
  margin: 20px 0;
`;

export const DiaryInputField = styled.input`
  flex-grow: 1;
  margin-right: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const DiaryButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff; /* Bootstrap primary blue */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3; /* Darker blue on hover */
  }
`;

export const DiaryTitle = styled.h2`
  margin: 0;
  color: #333;
`;

export const DiaryEntry = styled.div`
  background-color: #fff; /* Adjust the color to match your design */
  border-bottom: 1px solid #ccc;
  padding: 10px;
  &:last-child {
    border-bottom: none;
  }
`;

// Date of the diary entry
export const DiaryDate = styled.div`
  color: #666; /* Adjust the color to match your design */
  font-size: 0.9em;
`;

// Contents of the diary entry
export const DiaryContent = styled.p`
  color: #333; /* Adjust the color to match your design */
`;