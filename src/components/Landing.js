import React from "react";
import Form from "./Form";

function Landing() {
  const formStyle = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  };
  return (
    <main className="landing">
      <div>
        <h1>Enter a City and State</h1>
        <Form style={formStyle} />
      </div>
    </main>
  );
}

export default Landing;
