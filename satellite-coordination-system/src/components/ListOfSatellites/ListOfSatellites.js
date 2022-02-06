import React from "react";
import "./ListOfSatellites.css";
import Switch from "../Switch/Switch.js";
import SearchName from "../SearchName/SearchName.js";
import {useEffect, useState, useRef} from 'react';

export default function ListOfSattellites() {
	const [list, setList] = useState([]);
  const [value, setValue] = useState(false);

	useEffect(()=>{
		fetch('https://api.spacexdata.com/v5/launches/')
			.then(response => response.json())
			.then(setList);
		}, []);

  const { search } = window.location;
  const query = new URLSearchParams(search).get('s');

	return (
		<div>
      <SearchName/> 
      <table className="table_fixed_header">
    		<thead>
    			<tr>
    				<th>Name</th>
    				<th>UTC Date</th>
            <th>Succesfull</th>
    			</tr>
    		</thead>
    		<tbody>
    			{list.sort((a, b) => a.name.localeCompare(b.name)).map((item) => ((value && item.success &&
                      <tr key={item.name}>
                        <td>{item.name}</td>
                        <td>{item.date_utc}</td>
                        <td>{(item.success && "Yes") || "No"}</td>
                      </tr>) || (!value &&
                      <tr key={item.name}>
                        <td>{item.name}</td>
                        <td>{item.date_utc}</td>
                        <td>{(item.success && "Yes") || "No"}</td>
                      </tr>)
    			))}
    		</tbody>
    	</table>
      <div className="container">
        {Switch(value, () => setValue(!value))} Show only successful launches
      </div>
    </div>
	)
}