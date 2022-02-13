import React from 'react'
import "./Switch.css";

const Switch = ({isOn, handleToggle}) => {
  return (
    <div className="switch">
      <input
        className="react-switch-checkbox"
        checked={isOn}
        onChange={handleToggle}
        id={`react-switch-new`}
        type="checkbox"
      /> 
      <label
        style={{ background: isOn && "#0c489c"}}
        className="react-switch-label"
        htmlFor={`react-switch-new`}
      > 
        <span className={`react-switch-button`} />
      </label>
    </div> 
  )
}

export default Switch;