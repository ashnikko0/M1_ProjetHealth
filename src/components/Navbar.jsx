import React from "react";
import { Link } from "react-router-dom";

export default function Nav(){

  return(
        <div className="navbar">
           <ul className="nav-links">
              <Link to="/">TableauDeBord</Link>
                  <img src={"../assets/dashboard.png"} alt= "TableauDeBord"/> //ici ça link avec les img
              <Link to="/login">Login</Link>
                  <img src={"../assets/log.png"} alt= "Login"/>
              <Link to="/clients_list">Clients List</Link>
                  <img src={"../assets/list.png"} alt= "ListeClients"/>
           </ul>
        </div>
  );

}