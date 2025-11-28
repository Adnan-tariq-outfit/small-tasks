"use client";
// import ServerComponent from "./serverComponent";

const Client = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h3>This is client Component</h3>
      {/* <ServerComponent /> */}
      {children}
    </div>
  );
};

export default Client;
