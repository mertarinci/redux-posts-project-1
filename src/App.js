import React from "react";
import Homepage from "./pages/Homepage";
import {BrowserRouter, Routes , Route} from "react-router-dom";
import Userpage from "./pages/Userpage";



function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/"  element={<Homepage />} />
        <Route path="/user/:userId" element={<Userpage />} />

      </Routes>
      </BrowserRouter>
  );
}

export default App;
