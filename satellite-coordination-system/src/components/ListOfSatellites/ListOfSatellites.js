import React from "react";
import "./ListOfSatellites.css";
import Switch from "../Switch/Switch.js";
import Search from "../Search/Search.js";
import FilterDate from "../FilterDate/FilterDate.js";
import {useEffect, useState, useRef} from 'react';

export default function ListOfSattellites() {
	const [list, setList] = useState([]);
  const [value, setValue] = useState(false);

	useEffect(()=>{
		fetch('https://api.spacexdata.com/v5/launches/')
			.then(response => response.json())
			.then(setList);

    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    }}, []);

  const filterNames = (names, query) => {
    if (!query) {
        return names;
    }

    return names.filter((item) => {
        const postItem = item.name.toLowerCase();
        return postItem.includes(query) || item.name.includes(query);
        // return postItem <= query || item.name <= query;
    });
  };

  const filterDates = (dates, query) => {
    console.log(query)
    if (!query) {
        return dates;
    }

    return dates.filter((item) => {
        return item.date_utc > query;
    });
  };

  const { search } = window.location;
  const query = new URLSearchParams(search).get('s');
  const [searchName, setSearchName] = useState(query || '');
  const [searchDate, setSearchDate] = useState(query || '');
  var filteredData = filterNames(list, searchName);
  filteredData = filterDates(filteredData, searchDate);

	return (
		<div>
      <Search
        searchQuery={searchName}
        setSearchQuery={setSearchName}
        placeholder="Search a satellite name"
      />
      <FilterDate
        searchQuery={searchDate}
        setSearchQuery={setSearchDate}
        placeholder="Search for launched after utc date"
      />
      <table className="table_fixed_header">
    		<thead>
    			<tr>
    				<th>Name</th>
    				<th>UTC Date</th>
            <th>Succesful</th>
    			</tr>
    		</thead>
    		<tbody>
    			{filteredData.sort((a, b) => a.name.localeCompare(b.name))
            .map((item) => (
              (value && item.success &&
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{item.date_utc}</td>
                <td>{(item.success && "Yes") || "No"}</td>
              </tr>) || 
              (!value &&
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{item.date_utc}</td>
                <td>{(item.success && "Yes") || "No"}</td>
              </tr>)
    			))}
    		</tbody>
    	</table>
      <div className="container"> 
        <label className="switch-label">Show only successful launches</label>
        {Switch(value, () => setValue(!value))} 
      </div> 
    </div>
	)
}