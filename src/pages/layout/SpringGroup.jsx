import React from "react";
import { Spring } from "../../shared/style/Spring";
import useWindowSize from "../../hooks/useWindowSize"; // Import the hook

const SpringGroup = () => {
  // Calculate left positions based on window width
  const calculateLeftPosition = (basePosition, windowSize) => {
    // Example calculation: Adjust based on your layout needs
    return (windowSize / 1000) * basePosition;
  };

  return (
    <div style={{ position: "absolute", top: "20px", left: "20px" }}>
      {/* Adjust top and left values as needed */}
      <Spring style={{ position: "absolute", top: "270px", left: "445px" }} />
      <Spring style={{ position: "absolute", top: "300px", left: "445px" }} />
      <Spring style={{ position: "absolute", top: "600px", left: "445px" }} />
      <Spring style={{ position: "absolute", top: "630px", left: "445px" }} />
    </div>
  );
};

export default SpringGroup;
