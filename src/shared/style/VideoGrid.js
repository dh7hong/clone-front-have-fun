import styled from 'styled-components';

export const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); // This will create a grid with each item having a minimum width of 250px
  grid-gap: 10px; // This adds space between the grid items
  margin: 20px; // Margin around the grid
  position: relative; // Relative positioning for the grid container
  width: calc(100% - 40px); // Width of the grid container minus the margin
  height: auto; // Height of the grid container to fit the content
`;
