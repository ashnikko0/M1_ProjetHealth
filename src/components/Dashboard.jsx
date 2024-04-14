import "../index.css";

import ClientList from "./ClientList.jsx";
import SearchBar from "./SearchBar.jsx"
import { useParams } from 'react-router-dom';

function Dashboard() {

    const { searchQuery } = useParams();
      
    return (
        <div>
            <SearchBar />
            <ClientList searchQuery={searchQuery} />
        </div>
    )
/*TODO faire que la recherche est lancé via une requete à l'API, on cherche le nom OU le prénom */
}

export default Dashboard;