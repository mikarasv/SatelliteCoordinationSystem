import React from "react";
import "./FilterDate.css";

const FilterDate = ({ searchQuery, setSearchQuery }) => (
  <div>
    <input 
      className="filter-date"
      format="YYYY-MM-DD"
      value={searchQuery}
      onInput={e => setSearchQuery(e.target.value)}
      onKeyDown={e => setSearchQuery(e.target.value)}
      type="date" id="start" name="date-filter"
      min="2006-03-24" max="2022-12-31"/>
  </div>
);

export default FilterDate;