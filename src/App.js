import React from "react";
import Homepage from "./pages/Homepage";
import {BrowserRouter, Routes , Route, Navigate} from "react-router-dom";
import Userpage from "./pages/Userpage";
import NotFound from "./pages/NotFound";
import PostDetail from "./pages/PostDetail";
import CreatePost from "./pages/CreatePost";
import PleaseLogin from "./pages/PleaseLogin";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/RegisterPage";




function App() {

  const user = localStorage.getItem("token")

  const createPostAuth = () => {

    if (user) {
      return <CreatePost />
    }else{
      return <PleaseLogin />
    }
  }



  return (
    <BrowserRouter>
      <Routes>

                  {/* Exact Routes */}

        <Route path="/" exact element={<Homepage />} />
        <Route path="/user/:userId" element={<Userpage />} />
        <Route path="/posts/:postId" element= {<PostDetail />} />
        <Route path="/posts/createPost" element={createPostAuth()} />
        { !user && <Route path="/login" element={<LoginPage />}/>}
        <Route path="/register" element={<Register />} />
        <Route path ="*" element={<NotFound />} ></Route>



                {/* Replacement Routes */}

        {<Route path="/login" element={<Navigate replace to="/" />} />}


      </Routes>
      </BrowserRouter>
  );
}

export default App;
