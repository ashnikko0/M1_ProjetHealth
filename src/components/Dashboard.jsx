import "../index.css";

import ClientList from "./ClientList.jsx";
import SearchBar from "./SearchBar.jsx"
import { useState } from "react";
import logo from "../assets/logo.png";

function Dashboard() {

    const [keyword, setKeyword] = useState([]);

    const updateKeyword = (keyword) => {
        setKeyword(keyword);
    }

    return (
        <>
            <div className="titlefit">
                <span className="titlebarre"></span>
                <div className="fitready">Fit'Ready</div>
                <span className="titlebarre"></span>
            </div>
            
            <img src={logo} alt="Logo" className="logodash" />

            <div>
                <SearchBar keyword={keyword} onChange={updateKeyword} />
                <ClientList searchQuery={keyword} />
            </div>


        </>
    )
}

export default Dashboard;