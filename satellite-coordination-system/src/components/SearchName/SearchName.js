import React from "react";
import "./SearchName.css";


const SearchBar = ({ searchQuery, setSearchQuery }) => (
    <form action="/" method="get">
        <label htmlFor="header-search">
            <span className="visually-hidden"></span>
        </label>
        <input
            value={searchQuery}
            onInput={e => setSearchQuery(e.target.value)}
            onKeyDown={e => setSearchQuery(e.target.value)}
            className="searcher"
            type="text"
            // id="header-search"
            placeholder="Search a satellite name"
            // name="s" 
        />
    </form>
);

export default SearchBar;