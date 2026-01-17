import {BrowserRouter,Routes,Route, Navigate} from "react-router-dom"
import { useState } from "react"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import Home from "./Pages/Home"
import RefreshHandler from "./RefreshHandler"
 import "./App.css"
function App() {
  const [isAuthenticated,setIsAuthenticated] = useState(false);
  const PrivateRoute = ({element})=>{
      return isAuthenticated ? element : <Navigate to="/login" />
  }
  return (
    <div className="app">
      <RefreshHandler  setIsAuthenticated ={setIsAuthenticated}/>
     <Routes>
        <Route path="/" element ={<Navigate  to="/login"/>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/home" element ={<PrivateRoute element={<Home />} />}></Route>
     </Routes>
    </div>
  )
}

export default App
