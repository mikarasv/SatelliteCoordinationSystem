import {React, useEffect, useState} from 'react';
import Switch from "../Switch/Switch.js";
import Search from "../Search/Search.js";
import FilterDate from "../FilterDate/FilterDate.js";
import Table from "../Table/Table.js";
import icon from '../Images/satellite.png';
import icon2 from '../Images/not_found.png';
import icon3 from '../Images/not_found2.png';
import "./ListOfSatellites.css";

export default function ListOfSattellites() {
  const [list, setList] = useState([]);      //Used to save fetched data
  const [value, setValue] = useState(false);  //used for switch

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

  const filterSwitch = (dates, bool) => {
    return dates.filter((item) => {
        return value && item.success || !value;
    });
  };

  const noInfo = () => {
    return(
      <div className="not-found">
        <div className="not-found-description">
          No satellite found
        </div>
        <img width="250" src={icon}/>
      </div>
    )
  }

  //Used for filtering name and data
  const { search } = window.location;
  const query = new URLSearchParams(search).get('s');
  const [searchName, setSearchName] = useState(query || '');
  const [searchDate, setSearchDate] = useState(query || '');
  var filteredData = filterNames(list, searchName);
  filteredData = filterDates(filteredData, searchDate);
  filteredData = filterSwitch(filteredData, value);

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
      </div>
      <Table
        filteredData = {filteredData}
        noInfo={noInfo}
      />
    </div>
  )
}