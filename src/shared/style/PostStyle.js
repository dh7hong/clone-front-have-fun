import styled from "styled-components";

export const PostStyle = styled.div`
  /* width: 50vw; */
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// export const Row = styled.span`
//   width: 100px;
//   height: 50px;
//   text-align: center;
//   line-height: 50px;
//   color: black;
// `;

// export const RowStyle = styled.div`
//   width: 1028px;
//   display: flex;
//   justify-content: space-around;
//   border-bottom: 2px solid black;
//   background-color: white;
// `;

export const RowStyle = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 3fr 2fr 2fr 1fr; // Must be identical to BoardWrapper
  gap: 10px; // Adjust the gap to your preference
  width: 100%;
  align-items: center;
  padding: 10px 0px; // Add padding to match the BoardWrapper layout
  // rest of your styles
`;

// export const detailedBtnWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

export const detailedBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 0px;
  margin-left: 0px;
  border-left: 10px;
  // Adjust padding to ensure alignment
  // rest of your styles
`;

// export const RowTitle = styled.span`
//   width: 300px;
//   height: 50px;
//   text-align: center;
//   line-height: 50px;
//   color: black;
// `;

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
