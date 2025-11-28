import React from "react";

const serverComponent = () => {
  if (typeof window === "undefined") {
    console.log("running as a server component");
  } else {
    console.log("running as a client component");
  }

  const programs = [
    "web development",
    "app development",
    "graphic designing",
    "UI/UX",
  ];
  return (
    <div>
      <h3>serverComponent</h3>
      {programs?.map((val) => (
        <p key={val}>{val}</p>
      ))}
    </div>
  );
};

export default serverComponent;
