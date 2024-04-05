import React from "react";
import { Link } from "react-router-dom";
import dashboard from "../assets/dashboard.png";
import log from "../assets/log.png";
import list from "../assets/list.png";

export default function Nav(){

  return(
        <div className="navbar">
           <ul className="nav-links">
              <Link to="/"> <img src={dashboard} alt= "TableauDeBord"/> </Link>
                  
              <Link to="/login"> <img src={log} alt= "Login"/> </Link>
                  
              <Link to="/clients_list"> <img src={list} alt= "ListeClients"/> </Link>
                  
           </ul>
        </div>
  );

}