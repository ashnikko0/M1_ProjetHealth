import React from "react";
import { Link } from "react-router-dom";

export default function Nav(){

  return(
        <div className="navbar">
           <ul className="nav-links">
              <Link to="/">TableauDeBord</Link>
                  <img src={dashboard.png} alt= "TableauDeBord"/>
              <Link to="/login">Login</Link>
                  <img src={log.png} alt= "Login"/>
              <Link to="/clients_list">Clients List</Link>
                  <img src={stats.png} alt= "ListeClients"/>
           </ul>
        </div>
  );

}