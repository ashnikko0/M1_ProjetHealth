import React from "react";
import { Link } from "react-router-dom";
import dashboard from "../assets/dashboard.png";
import log from "../assets/log.png";
import list from "../assets/list.png";

export default function Nav(){

  return(
        <div className="navbar">
           <ul className="nav-links">
              <Link to="/">TableauDeBord</Link>
                  <img src={dashboard} alt= "TableauDeBord"/>
              <Link to="/login">Login</Link>
                  <img src={log} alt= "Login"/>
              <Link to="/clients_list">Clients List</Link>
                  <img src={list} alt= "ListeClients"/>
           </ul>
        </div>
  );

}