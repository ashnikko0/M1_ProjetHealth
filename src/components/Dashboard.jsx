import { useState, useEffect } from "react";
import logo from "../assets/logo.png";

import ClientList from "./ClientList.jsx";
import SearchBar from "./SearchBar.jsx"
import ScrollUp from "./ScrollUp.jsx";

function Dashboard() {

    const [keyword, setKeyword] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    const updateKeyword = (keyword) => {
        setKeyword(keyword);
    }

    return (
        <>

            <div className="top-band">
                <div className="titlefit">
                    <span className="titlebarre"></span>
                    <div className="fitready">Fit'Ready</div>
                    <span className="titlebarre"></span>
                </div>
            </div>

            <img src={logo} alt="Logo" className="logodash" />

            <div className="dashboardDiv">
                <SearchBar keyword={keyword} onChange={updateKeyword} />
                <ClientList searchQuery={keyword} />
            </div>

            <ScrollUp />

        </>
    )
}

export default Dashboard;