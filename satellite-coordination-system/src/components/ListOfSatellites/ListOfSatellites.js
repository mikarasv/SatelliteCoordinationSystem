import React from "react";
import "./ListOfSatellites.css";
import Modal from "../Modal/Modal.js";
import Switch from "../Switch/Switch.js";
import Search from "../Search/Search.js";
import FilterDate from "../FilterDate/FilterDate.js";
import {useEffect, useState} from 'react';
import useCollapse from 'react-collapsed';

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
    });
  };

  const filterDates = (dates, query) => {
    if (!query) {
        return dates;
    }

    return dates.filter((item) => {
        return item.date_utc > query;
    });
  };

  const openModal = (item) => {
    setOpen(true);
    setInfo(item)
  }

  const { search } = window.location;
  const query = new URLSearchParams(search).get('s');
  const [searchName, setSearchName] = useState(query || '');
  const [searchDate, setSearchDate] = useState(query || '');
  var filteredData = filterNames(list, searchName);
  filteredData = filterDates(filteredData, searchDate);
  const [open, setOpen] = useState(false)
  const [info, setInfo] = useState([])


	return (
		<div>
      <div className="functional">
        <Search
          searchQuery={searchName}
          setSearchQuery={setSearchName}
          placeholder="Search for a satellite name"
        />
        <div className="tooltip">
          <span className="tooltiptext">Search for satellites launched after</span>
          <FilterDate
            searchQuery={searchDate}
            setSearchQuery={setSearchDate}
            placeholder="Search for launched after utc date"
          />
        </div>
        <div className="tooltip">
          <span className="tooltiptext">Show only succesful satellites</span>
          <Switch
            isOn ={value}
            handleToggle= {() => setValue(!value)}
          />
        </div>
      </div>
      <div className="table_container">
        <table className="table_fixed_header">
      		<thead>
      			<tr>
      				<th>Name</th>
      				<th>UTC Date</th>
              <th>Patch</th>
              <th>Succesful</th>
              <th>More</th>
      			</tr>
      		</thead>
      		<tbody>
      			{filteredData.sort((a, b) => a.name.localeCompare(b.name))
              .map((item) => (
                (value && item.success &&
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    {item.date_utc.substr(0, 4) + "/" +item.date_utc.substr(5, 2)
                    + "/" + item.date_utc.substr(8, 2) + " - " +
                    item.date_utc.substr(11, 5)}</td>
                  <td className="satllite-image">
                    <img width="50" height="50" src={item.links.patch.small}/>
                  </td>
                  <td>Yes</td>
                  <td>
                    <button id={item.id} className="more-info" 
                    onClick={() => openModal(item)}> +info </button>
                  </td>
                </tr>) || 
                (!value &&
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    {item.date_utc.substr(0, 4) + "/" +item.date_utc.substr(5, 2)
                    + "/" + item.date_utc.substr(8, 2) + " - " +
                    item.date_utc.substr(11, 5)}</td>
                  <td>
                    <img width="50" height="50" src={item.links.patch.small}/>
                  </td>
                  <td>{(item.success && "Yes") || "No"}</td>
                  <td>
                    <button id={item.id} className="more-info" 
                    onClick={() => openModal(item)}> +info </button>
                  </td>
                </tr>)
      			))}
      		</tbody>
      	</table>
        <Modal isOpen={open} onClose={()=> setOpen(false)}>
          {info}
        </Modal>
      </div>
    </div>
	)
}