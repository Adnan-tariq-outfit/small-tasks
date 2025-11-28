import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <h1>Header</h1>
      <div>{children}</div>
      <h1>footer</h1>
    </div>
  );
};

export default layout;
