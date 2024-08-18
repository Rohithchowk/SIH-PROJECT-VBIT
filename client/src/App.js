import Home from "./components/Home";
import React from "react";
import Login from "./components/LoginPage";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Register from "./components/Register";
import Landing from "./components/Landing";

const App=()=>{

  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/Home" element={<Home/>}/>
      <Route path="/AdminLogin" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>
    </BrowserRouter>
  )

}

export default App;