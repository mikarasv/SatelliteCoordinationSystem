import {React, useState} from 'react'
import Modal from "../Modal/Modal.js";
import './Table.css'

export default function Table({filteredData, noInfo}) {
  //Used for modal
  const [open, setOpen] = useState(false)
  const [info, setInfo] = useState([])

  const openModal = (item) => {
    setOpen(true);
    setInfo(item);
  }

  return (
    <div className="table_container">
      {
        filteredData.length == 0 ? noInfo() :
        <table className="table_fixed_header">
          <thead>
            <tr>
              <th>Name</th>
              <th>UTC Date</th>
              <th>Patch</th>
              <th>Successful</th>
              <th>More</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.sort((a, b) => a.name.localeCompare(b.name))
              .map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    {item.date_utc.substr(0, 4) + "/" +item.date_utc.substr(5, 2)
                    + "/" + item.date_utc.substr(8, 2) + " - " +
                    item.date_utc.substr(11, 5)}</td>
                  <td>
                    <img width="50" height="50" src={item.links.patch.small}/>
                  </td>
                  <td>{(item.success ? "Yes" : "No")}</td>
                  <td>
                    <button className="more-info" onClick={() => openModal(item)}>
                      +info
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table> 
      }
      <Modal isOpen={open} onClose={()=> setOpen(false)}>
        {info}
      </Modal>
    </div>
  )
}
