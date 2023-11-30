import React from "react";
import { Spring } from "../../shared/style/Spring";

const SpringGroup = () => {
  return (
    <div>
      <Spring style={{ position: "absolute", top: "270px", left: "445px" }} />
      <Spring style={{ position: "absolute", top: "300px", left: "445px" }} />
      <Spring style={{ position: "absolute", top: "780px", left: "445px" }} />
      <Spring style={{ position: "absolute", top: "810px", left: "445px" }} />
    </div>
  );
};

export default SpringGroup;
