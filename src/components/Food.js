import React from "react";

function Food({ position }) {
  return (
    <div
      style={{
        width: "15px",
        height: "15px",
        backgroundColor: "#E21818",
        margin: "3px",
        position: "absolute",
        left: `${position.x}%`,
        top: `${position.y}%`,
        zIndex: 0,
      }}
    />
  );
}

export default Food;
