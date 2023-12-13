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

export const VideoContainer = styled.div`
  display: flex; 
  flex-direction: column; // Remove this if using grid
  max-height: 500px; // Set this to the height that you want
  overflow-y: auto; // This will enable scrolling
`;

export const PostStyle = styled.div`
  /* width: 50vw; */
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const RowStyle = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr; // Must be identical to BoardWrapper
  gap: 10px; // Adjust the gap to your preference
  width: 100%;
  align-items: center;
  padding: 10px 0px; // Add padding to match the BoardWrapper layout
  // rest of your styles
`;

export const detailedBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 0px;
  margin-left: 0px;
  border-left: 10px;
`;

export const Row = styled.span`
  flex: 1;
  text-align: center;
  // rest of your styles
`;

export const RowTitle = styled(Row)`
  // Ensure RowTitle extends Row
  padding-left: 0px; // Adds some padding on the sides
  font-size: 20px; // Adjust font size if necessary
`;

export const BookDot = styled.div`
  
  border: 2px dashed white;
  border-radius: 9px;
  left: 15px;
  top: 15px;
  right: 15px;
  bottom: 15px;
  position: absolute;
  display: flex;
  justify-content: center;
  padding: 10px;
  overflow: visible;
`;

export const LiName = styled.div`
  background-color: #f1f1f1;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

export const Container1 = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  margin-top: 15px;
  margin-bottom: 15px;
  margin-right: 15px;
  width: 100%;
`;