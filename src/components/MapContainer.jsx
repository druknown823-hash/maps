import MapCanvas from './MapCanvas';

export default function MapContainer({ fromNode, toNode }) {
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
      <MapCanvas fromNode={fromNode} toNode={toNode} />
    </div>
  );
}