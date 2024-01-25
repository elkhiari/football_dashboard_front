import { Route , Routes, Navigate  } from "react-router-dom"
import Login from '../pages/Login'
import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import Home from "../pages/Home";
import Teams from "../pages/Teams";
import Channel from "../pages/Channel";
import Matches from "../pages/Matches";
import Category from "../pages/category";
import Resume from "../pages/Movie";
import Users from "../pages/Users";
import League from "../pages/League";


function Routing() {
    const {
    token,
    user
    } = useContext(AuthContext);

   
  return (
    <>
        
        <Routes>
            <Route path="/login" element={token?<Navigate to={"/"} />:<Login/>} />
            <Route path="/" element={token?<Home />: <Navigate to={"/login"} />} />
            <Route path="/category" element={token?<Category />: <Navigate to={"/login"} />} />
            <Route path="/teams" element={token?<Teams />: <Navigate to={"/login"} />} />
            <Route path="/channel" element={token?<Channel />: <Navigate to={"/login"} />} />
            <Route path="/matches" element={token?<Matches />: <Navigate to={"/login"} />} />
            <Route path="/resume" element={token?<Resume />: <Navigate to={"/login"} />} />
            <Route path="/users" element={token && user.role === "admin"?<Users />: <Navigate to={"/login"} />} />
            <Route path="/league" element={token?<League />: <Navigate to={"/login"} />} />
            <Route path="*" element={<h1>Hello</h1>} />
        </Routes>
    </>
  )
}

export default Routing