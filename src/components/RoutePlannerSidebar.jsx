import DropdownSearch from './DropdownSearch';

export default function RoutePlannerSidebar({
  fromNode,
  toNode,
  setFromNode,
  setToNode,
}) {
  return (
    <div className="left">
      <div className="up">
        <h2 className="DropSearchHead">Route Planner</h2>

        <DropdownSearch
          label="Starting Node (From):"
          value={fromNode}
          onChange={setFromNode}
          placeholder="Type start location..."
        />

        <DropdownSearch
          label="Destination Node (To):"
          value={toNode}
          onChange={setToNode}
          placeholder="Type end location..."
        />
      </div>

      <div className="down">
        {/* Add your own details or settings here */}
      </div>
    </div>
  );
}