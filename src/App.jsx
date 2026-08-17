import { useState } from 'react';
import Navbar from './components/Navbar';
import RoutePlannerSidebar from './components/RoutePlannerSidebar';
import MapContainer from './components/MapContainer';
import './asset.css';

export default function App() {
  const [fromNode, setFromNode] = useState('Entrance');
  const [toNode, setToNode] = useState('Exit');

  return (
    <div id="body">
      <Navbar />
      <div className="main">
        <RoutePlannerSidebar
          fromNode={fromNode}
          toNode={toNode}
          setFromNode={setFromNode}
          setToNode={setToNode}
        />

        <div className="right">
          <MapContainer fromNode={fromNode} toNode={toNode} />
        </div>
      </div>
    </div>
  );
}