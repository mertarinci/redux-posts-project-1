import React from "react";
import Homepage from "./pages/Homepage";
import {BrowserRouter, Routes , Route} from "react-router-dom";
import Userpage from "./pages/Userpage";
import NotFound from "./pages/NotFound";




function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" exact element={<Homepage />} />
        <Route path="/user/:userId" element={<Userpage />} />
        <Route path ="*" element={<NotFound />} ></Route>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
