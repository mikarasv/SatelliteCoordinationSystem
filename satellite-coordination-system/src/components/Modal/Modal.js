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
        <h1> {children.name} </h1>
        <img width="25%" height="50%" className="img-position" src={children.links.patch.small}/>
        <p> <span>ID</span>: {children.id} </p>
        {(children.failures.length==0 && <p><span>Failures</span>: Never failed</p>) ||
          <div>
            <p> <span>Failure reason</span>: {children.failures[0].reason} </p>
          </div>}
        {(children.failures.length==0 && <p><span>Details</span>: No details</p>) ||
          <p> <span>Details</span>: {children.details} </p>}
        <p> <span>Local date</span>: 
          {children.date_utc.substr(0, 4) + "/" +children.date_utc.substr(5, 2)
          + "/" + children.date_utc.substr(8, 2) + " - " +
          children.date_utc.substr(11, 5)} </p>
        {(children.links.webcast==null && <p><span>Webcast</span>: No webcast available</p>) ||
        <p> <span>webcast</span>: 
          <a className="link-style" href={children.links.webcast} target="_blank" >{children.links.webcast}</a>
        </p>}
        {(children.links.article==null && <p><span>Article</span>: No article available</p>) ||
        <p> <span>Article</span>: 
          <a className="link-style" href={children.links.article} target="_blank" >{children.links.article}</a>
        </p>}
        {(children.links.wikipedia==null && <p><span>Wikipedia</span>: No link available</p>) ||
        <p> <span>Wikipedia</span>: 
          <a className="link-style" href={children.links.wikipedia} target="_blank" >{children.links.wikipedia}</a>
        </p>}
        {(children.links.reddit.launch==null && <p><span>Reddit</span>: No link available</p>) ||
        <p> <span>reddit</span>: 
          <a className="link-style" href={children.links.reddit.launch} target="_blank" >{children.links.reddit.launch}</a>
        </p>}
      </div>
    </div>,
    document.getElementById('portal')
  )
}

