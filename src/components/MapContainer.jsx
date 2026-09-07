import MapCanvas from './MapCanvas';

<<<<<<< HEAD
export default function MapContainer({ routePlanner, currentStepIndex }) {
=======
export default function MapContainer({ fromNode, toNode }) {
>>>>>>> ef2fa6991b94f3d561441eb2fc7b00b7085406b1
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#020617',
        borderRadius: '12px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
<<<<<<< HEAD
      <MapCanvas routePlanner={routePlanner} currentStepIndex={currentStepIndex} />
=======
      <MapCanvas fromNode={fromNode} toNode={toNode} />
>>>>>>> ef2fa6991b94f3d561441eb2fc7b00b7085406b1
    </div>
  );
}