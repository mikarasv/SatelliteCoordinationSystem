import {React, useEffect, useState} from 'react';
import Switch from "../Switch/Switch.js";
import Search from "../Search/Search.js";
import SortDate from "../SortDate/SortDate.js";
import FilterDate from "../FilterDate/FilterDate.js";
import Table from "../Table/Table.js";
import "./ListOfSatellites.css";

export default function ListOfSattellites() {
  const [list, setList] = useState([]);      //Used to save fetched data
  const [value, setValue] = useState(false);  //used for switch
  const [sortDate, setSortDate] = useState(false);  //used for switch

  useEffect(()=>{
    fetch('https://api.spacexdata.com/v5/launches/')
      .then(response => response.json())
      .then(setList);

    //For enter to do nothing
    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    }
  }, []);

  const filterNames = (names, query) => {
    if (!query) {
        return names;
    }
    return names.filter((item) => {
        const postItem = item.name.toLowerCase();
        return postItem.substr(0, query.length).includes(query.toLowerCase());
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

  const filterSwitch = (dates) => {
    return dates.filter((item) => {
        return value ? item.success : item;
    });
  };

  const sortByDate = (dates) => {
    return sortDate ? 
      dates.sort((a, b) => a.date_utc.localeCompare(b.date_utc))
      : dates.sort((a, b) =>  a.name.localeCompare(b.name));
    ;
  };

  //Used for filtering name and data
  const { search } = window.location;
  const query = new URLSearchParams(search).get('s');
  const [searchName, setSearchName] = useState(query || '');
  const [searchDate, setSearchDate] = useState(query || '');
  var filteredData = filterNames(list, searchName);
  filteredData = filterDates(filteredData, searchDate);
  filteredData = filterSwitch(filteredData);
  filteredData = sortByDate(filteredData);

  return (
    <div>
      <div className="functional">
        <Search
          searchQuery={searchName}
          setSearchQuery={setSearchName}
          placeholder="Search for a satellite name"
        />
        <div className="tooltip">
          <span className="tooltiptext">
            Click on calendar or search for satellites launched after utc date:
          </span>
          <FilterDate
            searchQuery={searchDate}
            setSearchQuery={setSearchDate}
          />
        </div>
        <div className="tooltip">
          <span className="tooltiptext">
            Show only successful satellites
          </span>
          <Switch
            isOn ={value}
            handleToggle= {() => setValue(!value)}
          />
        </div>
        <div className="tooltip">
          <span className="tooltiptext">
            Sort by date
          </span>
          <SortDate
            isOn ={sortDate}
            handleToggle= {() => setSortDate(!sortDate)}
          />
        </div>
      </div>
      <Table
        filteredData = {filteredData}
      />
    </div>
  )
}