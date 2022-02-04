import React from "react";
import "./ListOfSatellites.css";
import {useEffect, useState, useRef} from 'react';

export default function ListOfSattellites() {
	const [list, setList] = useState([]);
	useEffect(()=>{
		fetch('https://api.spacexdata.com/v5/launches/')
			.then(response => response.json())
			.then(setList);
		}, []);

	return (
		<table className="table">
			<thead>
				<tr>
					<th>Name</th>
					<th>Id</th>
					<th>Flight Number</th>
          <th>Succesfull</th>
				</tr>
			</thead>
			<tbody>
				{list.map((item) => ( 
					<tr key={item.name}>
						<td>{item.name}</td>
						<td>{item.id}</td>
            <td>{item.flight_number}</td>
						<td>
              <input type="checkbox" className="check"/>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}