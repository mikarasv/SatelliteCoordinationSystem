import './App.css';
import ListOfSatellites from './components/ListOfSatellites/ListOfSatellites.js';

function App() {
  return (
    <div className="background">
      <div className="header">
        Satellite Coordination System
      </div>
      <ListOfSatellites/>
    </div>
  );
}

export default App;
