import { useState } from 'react';
import Navbar from './components/Navbar';
import RoutePlannerSidebar from './components/RoutePlannerSidebar';
import MapContainer from './components/MapContainer';
<<<<<<< HEAD
import { NODES } from './data/nodesData';
import './asset.css';

// Helper function to easily fetch coordinates by node ID
const getNode = (id) => NODES.find(n => n.id === id) || { x: 0, y: 0 };

// Mock route data using the points we just added to nodesData.js
const MOCK_ROUTE = [
  { lat: getNode('PointA').x, lng: getNode('PointA').y, instruction: "Start at the Main Entrance." },
  { lat: getNode('PointB').x, lng: getNode('PointB').y, instruction: "Head straight towards MediSquare-1." },
  { lat: getNode('PointC').x, lng: getNode('PointC').y, instruction: "Turn left into MediSquare-2 corridor." },
  { lat: getNode('PointD').x, lng: getNode('PointD').y, instruction: "Continue past the MS-Library." },
  { lat: getNode('PointE').x, lng: getNode('PointE').y, instruction: "Arrive at Sarasawti Library." },
  { lat: getNode('PointG').x, lng: getNode('PointG').y, instruction: "Turn right and walk down the main hall." },
  { lat: getNode('PointI').x, lng: getNode('PointI').y, instruction: "Approach the crossing." },
  { lat: getNode('PointP').x, lng: getNode('PointP').y, instruction: "Final Destination reached." }
];

export default function App() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  
  const handleNextStep = () => {
    if (currentStepIndex < MOCK_ROUTE.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };
  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };
=======
import './asset.css';

export default function App() {
  const [fromNode, setFromNode] = useState('Entrance');
  const [toNode, setToNode] = useState('Exit');
>>>>>>> ef2fa6991b94f3d561441eb2fc7b00b7085406b1

  return (
    <div id="body">
      <Navbar />
      <div className="main">
        <RoutePlannerSidebar
<<<<<<< HEAD
          routePlanner={MOCK_ROUTE}
          currentStepIndex={currentStepIndex}
          onNext={handleNextStep}
          onPrev={handlePrevStep}
        />
        <div className="right">
          <MapContainer 
            routePlanner={MOCK_ROUTE} 
            currentStepIndex={currentStepIndex} 
          />
=======
          fromNode={fromNode}
          toNode={toNode}
          setFromNode={setFromNode}
          setToNode={setToNode}
        />

        <div className="right">
          <MapContainer fromNode={fromNode} toNode={toNode} />
>>>>>>> ef2fa6991b94f3d561441eb2fc7b00b7085406b1
        </div>
      </div>
    </div>
  );
}