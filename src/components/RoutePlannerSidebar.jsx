<<<<<<< HEAD
import './RoutePlannerSidebar.css';

export default function RoutePlannerSidebar({ routePlanner, currentStepIndex, onNext, onPrev }) {
  return (
    <div className="left" style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '15px' }}>
      
      {/* Upper Container (40% height) */}
      <div className="up search-route-card" style={{ height: '40%', background: 'white', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', padding: '20px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="route-inputs-container">
          {/* Left Icons Column */}
          <div className="route-icons">
            <div className="icon-row top-icon-row">
              <span className="drag-icon">⠿</span>
              <span className="circle-icon"></span>
            </div>
            <div className="dots-row">
              <span className="vertical-dots">⋮</span>
            </div>
            <div className="icon-row bottom-icon-row">
              <span className="pin-icon">
                <span className="pin-inner-dot"></span>
              </span>
            </div>
          </div>

          {/* Middle Inputs Column */}
          <div className="route-inputs">
            <div className="input-box start-box">
              <input 
                type="text" 
                placeholder="Choose starting point, or click on the map" 
                defaultValue="Main Entrance"
              />
              <span className="search-icon">🔍</span>
            </div>
            
            <div className="input-box dest-box">
              <input 
                type="text" 
                placeholder="Choose destination..." 
                defaultValue="Sarasawti Library"
              />
            </div>
          </div>

          {/* Right Swap Column */}
          <div className="route-swap">
            <button className="swap-btn" title="Reverse starting point and destination">
              ⇅
            </button>
          </div>
        </div>
      </div>

      {/* Lower Container (60% height) */}
      <div className="down" style={{ height: '60%', background: 'white', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', padding: '20px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
        <h4 style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#333' }}>Navigation Steps</h4>
        
        <div style={{ flexGrow: 1, overflowY: 'hidden', position: 'relative' }}>
          {routePlanner.map((step, index) => {
            const isCurrent = index === currentStepIndex;
            const isNext = index === currentStepIndex + 1;
            
            let dir = 'Go Straight';
            let arrow = '↑';
            const lowerInst = step.instruction.toLowerCase();
            if (lowerInst.includes('left')) { dir = 'Turn Left'; arrow = '←'; }
            else if (lowerInst.includes('right')) { dir = 'Turn Right'; arrow = '→'; }
            else if (lowerInst.includes('arrive') || lowerInst.includes('reach')) { dir = 'Arrive'; arrow = '📍'; }
            else if (lowerInst.includes('start')) { dir = 'Start'; arrow = '🚶'; }

            return (
              <div
                key={index}
                style={{
                  padding: isCurrent || isNext ? '15px' : '0px 15px',
                  margin: isCurrent || isNext ? '0 0 12px 0' : '0',
                  backgroundColor: isCurrent ? '#fff' : '#f8f9fa',
                  borderRadius: '10px',
                  border: isCurrent ? '2px solid #1a73e8' : '2px solid transparent',
                  opacity: isCurrent ? 1 : (isNext ? 0.4 : 0),
                  maxHeight: isCurrent ? '200px' : (isNext ? '65px' : '0px'),
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
                  boxShadow: isCurrent ? '0 6px 16px rgba(26, 115, 232, 0.15)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold', fontSize: '18px', color: isCurrent ? '#1a73e8' : '#555', whiteSpace: 'nowrap' }}>
                  <span style={{ fontSize: '22px' }}>{arrow}</span>
                  <span>{dir}</span>
                </div>
                <div style={{ fontSize: '14px', color: '#666', lineHeight: '1.4' }}>
                  {step.instruction}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Buttons */}
        <div style={{ display: 'flex', gap: '10px', marginTop: 'auto', paddingTop: '15px' }}>
          <button 
            onClick={onPrev}
            disabled={currentStepIndex === 0}
            style={{ 
              flex: 1, 
              padding: '12px', 
              backgroundColor: currentStepIndex === 0 ? '#f0f0f0' : '#e8eaed', 
              color: currentStepIndex === 0 ? '#aaa' : '#333', 
              border: 'none', 
              borderRadius: '8px', 
              cursor: currentStepIndex === 0 ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              fontSize: '16px',
              transition: 'background-color 0.2s'
            }}
          >
            Previous
          </button>
          <button 
            onClick={onNext}
            disabled={currentStepIndex >= routePlanner.length - 1}
            style={{ 
              flex: 1, 
              padding: '12px', 
              backgroundColor: currentStepIndex >= routePlanner.length - 1 ? '#ccc' : '#1a73e8', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px', 
              cursor: currentStepIndex >= routePlanner.length - 1 ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              fontSize: '16px',
              transition: 'background-color 0.2s'
            }}
          >
            {currentStepIndex >= routePlanner.length - 1 ? "Arrived" : "Next"}
          </button>
        </div>
=======
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
>>>>>>> ef2fa6991b94f3d561441eb2fc7b00b7085406b1
      </div>
    </div>
  );
}