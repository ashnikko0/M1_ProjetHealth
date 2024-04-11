import searchIcon from "../assets/searchIcon.svg";

const SearchBar = () => (
    <form action="/" method="get" className="search-bar">
        <label htmlFor="header-search">
        </label>
        <input
            type="text"
            id="header-search"
            placeholder="Rechercher un client"
            name="s" 
            className="search-input"
        />
        <button type="submit"><img src={searchIcon} alt="searchIcon" className="search-icon"/></button>
    </form>
);

export default SearchBar;