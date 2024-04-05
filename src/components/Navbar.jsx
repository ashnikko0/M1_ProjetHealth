import React from "react";
import { Link } from "react-router-dom";

export default function Nav(){

  return(
        <div className="navbar">
           <ul className="nav-links">
              <Link to="/">TableauDeBord</Link>
              <Link to="/login">Login</Link>
              <Link to="/clients_list">Clients List</Link>
           </ul>
        </div>
  );

}