import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HomeWrapper = styled.div`
  width: 100vw;
  height: 75vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// export const BoardWrapper = styled.div`
//   width: 100%;
//   height: 10%;
//   background-color: rgb(54, 48, 98);
//   display: flex;
//   flex-direction: row;
//   justify-content: space-around;
//   border: 2px solid black;
//   font-family: "Hi Melody", sans-serif;
// `;

// export const BoardTitle = styled.div`
//   width: 100px;
//   height: 50px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
//   line-height: 50px;
//   font-family: "Hi Melody", sans-serif;
//   font-weight: bolder;
//   color: white;
//   font-size: 30px;
// `;

// export const BoardTitleStyle = styled.div`
//   width: 300px;
//   height: 50px;
//   text-align: center;
//   line-height: 50px;
//   font-family: "Hi Melody", sans-serif;
//   font-weight: bolder;
//   color: white;
//   font-size: 30px;
// `;

export const BoardWrapper = styled.div`
box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 3fr 2fr 2fr 1fr; // 5 columns with equal width
  gap: 10px; // Adjust the gap to your preference
  width: 100%;
  min-height: 7%;
  background-color: #359dc2;
  justify-content: space-between; // Changed from space-around to space-between
  border: 2px solid black;
  padding: 10px 0px; // Add padding to match the BoardTitleStyle layout
  // rest of your styles
`;

export const BoardTitle = styled.div`
  flex: 1;
  text-align: center;
  padding: 0 0px; // Adds some padding on the sides
  font-size: 20px; // Adjust font size if necessary
  min-width: 100px; // Use min-width to ensure content isn't squished
  height: auto; // Let the height adjust to content
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: normal; // Adjust line height if necessary
  font-family: "Hi Melody", sans-serif;
  font-weight: bolder;
  color: white;
  font-size: 25px;
`;

export const BoardTitleStyle = styled(BoardTitle)`
  min-width: 300px; // Adjust this value based on your content width
`;

export const PostStyle = styled.div`
  /* width: 50vw; */
  height: 430px;
  display: flex;
  flex-direction: column;
  font-size: 15px;
  font-family: "Hi Melody", sans-serif;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SearchInput = styled.input`
  width: 200px;
  height: 30px;
  border-radius: 20px;
  margin-right: 10px;
`;

export const AllPostBtn = styled.button`
  width: 100px;
  height: 30px;
  margin-right: 10px;
`;

export const SubmitBtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  width: 1028px;
`;
