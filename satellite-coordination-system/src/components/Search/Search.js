import React from "react";
import "./Search.css";


const Search = ({ searchQuery, setSearchQuery, placeholder }) => (
    <div className = 'search-box'>
        <input
            type="text"
            id="inputID"
            className = "search-text" 
            value={searchQuery}
            onInput={e => setSearchQuery(e.target.value)}
            onKeyDown={e => setSearchQuery(e.target.value)}
            type="text"
            placeholder={placeholder}
            // name="s" 
         />
        <a href="#" className = "search-btn">
        </a>
     </div>
);

export default Search;