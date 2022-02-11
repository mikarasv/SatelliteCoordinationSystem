import React from 'react'
import "./Switch.css";

export default function Switch(isOn, handleToggle) {
	return (
		<div className="switch">
			<label className="slabel">Show only successful launches</label>
      <input
        checked={isOn}
        onChange={handleToggle}
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
      /> 
			<label
			  style={{ background: isOn && '#06D6A0' }}
			  className="react-switch-label"
			  htmlFor={`react-switch-new`}
			> 
        <span className={`react-switch-button`} />
      </label>
 		</div> 
	)
}