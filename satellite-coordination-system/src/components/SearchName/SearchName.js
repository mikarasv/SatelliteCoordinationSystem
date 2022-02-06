import React from "react";
import "./SearchName.css";


const SearchBar = () => (
    <form action="/" method="get">
        <label htmlFor="header-search">
            <span className="visually-hidden"></span>
        </label>
        <input
            className="searcher"
            type="text"
            id="header-search"
            placeholder="Search a satellite name"
            name="s" 
        />
        <button type="submit" className="button" >Search</button>
    </form>
);

export default SearchBar;