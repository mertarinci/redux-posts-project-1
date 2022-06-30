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
import AllUsers from "./pages/AllUsers";
import ResetPassword from "./pages/ResetPassword";
import PrivateRoutes from "./features/context/PrivateRoute";
import TestPage from "./pages/TestPage";
import Chat from "./features/chat/Chat"






function App() {


  const user = localStorage.getItem("user")


  


  return (
    
    <BrowserRouter>

      <Routes>

                  {/* Exact Routes */}

        <Route path="/" exact element={<Homepage />} />
        <Route path="user/:username" element={<Userpage />} />
        <Route path="posts/:postId" element= {<PostDetail />} />
        <Route path="testPage" element={<TestPage /> }/>
        <Route path="chat" element={<Chat />} />



        {/* Protected Routes */}

        <Route path="/"  element={<PrivateRoutes userRole = "user"/>}>

        <Route path="posts/createPost" element={<CreatePost/>} />

        </Route>

        
        <Route path="/"  element={<PrivateRoutes userRole = "admin"/>}>

        <Route path ="allUsers" element={<AllUsers />} />

        </Route>

        




                {/* Replacement Routes */}
        {!user && <Route path="login" element={<LoginPage />}/>}
        {<Route path="login" element={<Navigate replace to="/" />} />}
        {!user && <Route path="register" element={<Register />} />}
        {<Route path="register" element={<Navigate replace to="/" />} />}
        {!user && <Route path="resetPassword" element={<ResetPassword/>} />}
        {<Route path="resetPassword" element={<Navigate replace to="/" />} />}




        <Route path ="*" element={<NotFound />} ></Route>




      </Routes>
      </BrowserRouter>
  );
}

export default App;
