import ReactDOM from "react-dom";
import React from "react";
import "./Modal.css";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null
  var crew = [];
  for (var i=0; i < children.crew.length; i++) {
    crew.push(children.crew[i].Role +", ");
  }
  return ReactDOM.createPortal(
    <div className="overlay-style">
      <div className="modal">
        <button onClick={onClose}>X</button>
        <h1> Name: {children.name} </h1>
        <img width="25%" height="50%" className="img-position" src={children.links.patch.small}/>
        <p> <b>ID</b>: {children.id} </p>
        {(children.failures.length==0 && <p><b>Failures</b>: Never failed</p>) ||
          <div>
            <p> <b>Failure reason</b>: {children.failures[0].reason} </p>
          </div>}
        {(children.failures.length==0 && <p><b>Details</b>: No details</p>) ||
          <p> <b>Details</b>: {children.details} </p>}
        <p> <b>Local date</b>: 
          {children.date_utc.substr(0, 4) + "/" +children.date_utc.substr(5, 2)
          + "/" + children.date_utc.substr(8, 2) + " - " +
          children.date_utc.substr(11, 5)} </p>
        {(children.links.webcast==null && <p><b>Webcast</b>: No webcast available</p>) ||
        <p> <b>webcast</b>: 
          <a className="link-style" href={children.links.webcast} target="_blank" >{children.links.webcast}</a>
        </p>}
        {(children.links.article==null && <p><b>Article</b>: No article available</p>) ||
        <p> <b>Article</b>: 
          <a className="link-style" href={children.links.article} target="_blank" >{children.links.article}</a>
        </p>}
        {(children.links.wikipedia==null && <p><b>Wikipedia</b>: No link available</p>) ||
        <p> <b>Wikipedia</b>: 
          <a className="link-style" href={children.links.wikipedia} target="_blank" >{children.links.wikipedia}</a>
        </p>}
        {(children.links.reddit.launch==null && <p><b>Reddit</b>: No link available</p>) ||
        <p> <b>reddit</b>: 
          <a className="link-style" href={children.links.reddit.launch} target="_blank" >{children.links.reddit.launch}</a>
        </p>}
      </div>
    </div>,
    document.getElementById('portal')
  )
}

