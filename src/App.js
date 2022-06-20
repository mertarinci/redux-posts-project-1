import React from "react";
import Controllers from "./features/posts/Controllers";
import Posts from "./features/posts/Posts";
import Navbar from "./features/navbar/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Controllers />
      <Posts />
    </div>
  );
}

export default App;
