import React from "react";
import "./FilterDate.css";

const FilterDate = ({ searchQuery, setSearchQuery }) => (
  <div className="filter-date">
    <input
      className="date-input"
      value={searchQuery}
      onInput={e => setSearchQuery(e.target.value)}
      onKeyDown={e => setSearchQuery(e.target.value)}
      type="date"
      min="2006-03-24" max="2022-12-31"/>
  </div>
);

export default FilterDate;