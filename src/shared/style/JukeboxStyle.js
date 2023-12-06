import styled from 'styled-components';

export const Layout = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr; // Sidebar width of 250px and rest for content
  gap: 20px; // Space between sidebar and main content
  padding: 20px;
`;

export const Sidebar = styled.aside`
  background-color: #f0f0f0; // Example background color
  padding: 20px;
`;

export const MainContent = styled.main`
  display: grid;
  grid-template-columns: repeat(4, 1fr); // 4 videos in a row
  grid-gap: 20px; // 20px gap between videos both rows and columns
`;

export const VideoIframe = styled.div`
  overflow: hidden; // This will keep the iframe contained within the div
  padding-top: 56.25%; // Aspect ratio for 16:9 videos
  position: relative; // For absolute positioning of the iframe
  height: 0; // Collapse the div to just the padding size
`;

