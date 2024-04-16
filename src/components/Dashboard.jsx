import "../index.css";

import ClientList from "./ClientList.jsx";
import SearchBar from "./SearchBar.jsx"
import { useState } from "react";

function Dashboard() {

    const [keyword, setKeyword] = useState([]);

    const updateKeyword = (keyword) => {
        setKeyword(keyword);
    }
      
    return (
        <div>
            <SearchBar keyword={keyword} onChange={updateKeyword} />
            <ClientList searchQuery={keyword} />
        </div>
    )
}

export default Dashboard;