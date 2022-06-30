import { useSelector } from "react-redux";
import {Outlet} from "react-router-dom"
import PleaseLogin from "../../pages/PleaseLogin";
import Unauthorized from "../../pages/Unauthorized";


const PrivateRoutes = (props) => {

  const  loggedUser  = useSelector(state => state.auth.user);
  const userRole = loggedUser?.data.role

  
  return(
    loggedUser && (userRole === props.userRole || userRole === "admin") ? <Outlet/> :  props.userRole ==="user" ? <PleaseLogin /> : <Unauthorized />
)
}

export default PrivateRoutes;