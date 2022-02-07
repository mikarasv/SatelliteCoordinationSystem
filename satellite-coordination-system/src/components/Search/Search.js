import React from "react";
import "./Search.css";


const Search = ({ searchQuery, setSearchQuery, placeholder }) => (
    <div>
        <label>Search for satellites names:</label>
        <input
            className="searcher"
            value={searchQuery}
            onInput={e => setSearchQuery(e.target.value)}
            onKeyDown={e => setSearchQuery(e.target.value)}
            type="text"
            // id="header-search"
            placeholder={placeholder}
            // name="s" 
        />
    </div>
);

export default Search;