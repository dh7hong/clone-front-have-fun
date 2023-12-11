import React, { useState, useEffect} from "react";
import Header from "./Header";
import Login from "../pages/auth/Login";
import { Outlet, useLocation } from "react-router-dom";
import Base from "../pages/layout/Base";
import styled from "styled-components";

// Styled container that scales its content
const StyledContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transform: scale(${props => props.scaleFactor});
  transform-origin: top left;
`;


export default function Layout() {
  const { pathname } = useLocation();
  /* need some adjustments here maybe */
  const isMyPage = pathname === "/api/users/:memberId";

  // Scale factor for the container
  const [scalefactor, setScalefactor] = useState(1);

  useEffect(() => {
    function handleResize() {
      // Calculate scale factor based on window size
      const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
      setScalefactor(scale);
    }

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <StyledContainer scalefactor={scalefactor}>
      <Outlet />
    </StyledContainer>
  );
};

    // <div
    //   style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    // >
   
    //   <div
    //     style={{
    //       flex: 1,
    //       display: "flex",
    //       justifyContent: "center",
    //       alignItems: "center",
    //       zIndex: 0,
          
    //     }}
    //   >
        
    //   </div>
    // </div>
 