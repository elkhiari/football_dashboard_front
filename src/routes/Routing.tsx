import { Route , Routes, Navigate,useLocation  } from "react-router-dom"
import Login from '../pages/Login'
import { useContext, useEffect } from "react"
import { AuthContext } from "../contexts/AuthContext"
import Home from "../pages/Home";
import Teams from "../pages/Teams";
import Channel from "../pages/Channel";
import Matches from "../pages/Matches";
import Resume from "../pages/Resume";
import Users from "../pages/Users";
import League from "../pages/League";
import Loading from "../pages/loading";


function Routing() {
    const {
    token,
    loading,
    user
    } = useContext(AuthContext);
    const location = useLocation()

    useEffect(() => {
        if (location.pathname.split("/")[1] === "") {
            document.title = "Home"
        } else document.title = location.pathname.split("/")[1].charAt(0).toUpperCase() + location.pathname.split("/")[1].slice(1)
    },[location.pathname])

   
  return (
    <>
        {
            loading ?<Loading />
        :
        <Routes>
            <Route path="/login" element={token?<Navigate to={"/"} />:<Login/>} />
            <Route path="/" element={token?<Home />: <Navigate to={"/login"} />} />
            <Route path="/teams" element={token?<Teams />: <Navigate to={"/login"} />} />
            <Route path="/channel" element={token?<Channel />: <Navigate to={"/login"} />} />
            <Route path="/matches" element={token?<Matches />: <Navigate to={"/login"} />} />
            <Route path="/resume" element={token?<Resume />: <Navigate to={"/login"} />} />
            <Route path="/users" element={token && user.role === "admin"?<Users />: <Navigate to={"/login"} />} />
            <Route path="/league" element={token?<League />: <Navigate to={"/login"} />} />
        </Routes>
}
    </>
  )
}

export default Routing