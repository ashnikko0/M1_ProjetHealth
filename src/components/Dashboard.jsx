import "../index.css";

import ClientList from "./ClientList.jsx";
import SearchBar from "./SearchBar.jsx"

function Dashboard() {

    return (
        <div>
        <SearchBar />;
        <ClientList />
        </div>
    )
/*TODO faire que la recherche est lancé via une requete à l'API, on cherche le nom OU le prénom */
}

export default Dashboard;