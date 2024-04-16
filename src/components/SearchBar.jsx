function SearchBar({ keyword, onChange }) {

    return (
        <input
            type="text"
            id="header-search"
            placeholder="Rechercher un client"
            name="s" 
            className="search-input"
            value={keyword}
            onChange={(e) => onChange(e.target.value)}
        />);
};

export default SearchBar;