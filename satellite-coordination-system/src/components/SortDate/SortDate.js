import React from 'react'
import "./SortDate.css";

const SortDate = ({isOn, handleToggle}) => {
  return (
    <div className="switch">
      <input
        className="sort-switch-checkbox"
        checked={isOn}
        onChange={handleToggle}
        id={`sort-switch-new`}
        type="checkbox"
      /> 
      <label
        style={{ background: isOn && "#0c489c"}}
        className="sort-switch-label"
        htmlFor={`sort-switch-new`}
      > 
        <span className={`sort-switch-button`} />
      </label>
    </div> 
  )
}

export default SortDate