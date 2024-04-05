import React from "react";
import { Link } from "react-router-dom";
import dashboard from "../assets/dashboard.png";
import log from "../assets/log.png";
import list from "../assets/list.png";

export default function Nav(){

  return(
        <div className="navbar">
           <ul className="nav-links">
              <Link to="/"> <img src={dashboard} alt= "Dashboard"/> </Link>
              <Link to="/login"> <img src={log} alt= "Login"/> </Link>                  
           </ul>
        </div>
  );

}