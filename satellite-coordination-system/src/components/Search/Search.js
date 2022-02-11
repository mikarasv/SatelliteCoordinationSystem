import React from "react";
import "./Search.css";


const Search = ({ searchQuery, setSearchQuery, placeholder }) => (
    <div className="container-search">
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
         <div className="search"></div>
     </div>
);

export default Search;
