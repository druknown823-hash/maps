export const NODES = [
  { id: 'Entrance', name: 'Main Entrance', color: '#ff4d4d', x: -1.5, y: -1.5, z: 0.02 },
  { id: 'Plaza', name: 'Central Plaza', color: '#ffe135', x: -0.8, y: -0.5, z: 0.02 },
  { id: 'Hub', name: 'Main Hub', color: '#de3163', x: -0.2, y: 0.8, z: 0.02 },
  { id: 'Station', name: 'Station Alpha', color: '#4b0082', x: 0.5, y: -0.5, z: 0.02 },
  { id: 'Kiosk', name: 'Kiosk Beta', color: '#8ee53f', x: 1.0, y: 0.6, z: 0.02 },
  { id: 'Exit', name: 'Main Exit', color: '#fff44f', x: 1.5, y: 1.5, z: 0.02 },
];

const EDGES = [
  ['Entrance', 'Plaza'],
  ['Plaza', 'Hub'],
  ['Plaza', 'Station'],
  ['Hub', 'Kiosk'],
  ['Station', 'Kiosk'],
  ['Kiosk', 'Exit'],
];

// Helper to get 2D distance
function getDistance(n1, n2) {
  const dx = n1.x - n2.x;
  const dy = n1.y - n2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

// Build adjacency list
const adjacencyList = {};
NODES.forEach(node => {
  adjacencyList[node.id] = [];
});

EDGES.forEach(([fromId, toId]) => {
  const nodeA = NODES.find(n => n.id === fromId);
  const nodeB = NODES.find(n => n.id === toId);
  if (nodeA && nodeB) {
    const dist = getDistance(nodeA, nodeB);
    adjacencyList[fromId].push({ id: toId, weight: dist });
    adjacencyList[toId].push({ id: fromId, weight: dist });
  }
});

export function findShortestPath(startNodeId, endNodeId) {
  if (!startNodeId || !endNodeId) return [];
  if (startNodeId === endNodeId) {
    const node = NODES.find(n => n.id === startNodeId);
    return node ? [node] : [];
  }

  const distances = {};
  const previous = {};
  const unvisited = new Set();

  NODES.forEach(node => {
    distances[node.id] = Infinity;
    previous[node.id] = null;
    unvisited.add(node.id);
  });

  distances[startNodeId] = 0;

  while (unvisited.size > 0) {
    let currentId = null;
    let smallestDist = Infinity;

    unvisited.forEach(id => {
      if (distances[id] < smallestDist) {
        smallestDist = distances[id];
        currentId = id;
      }
    });

    if (currentId === null || currentId === endNodeId) break;

    unvisited.delete(currentId);

    const neighbors = adjacencyList[currentId] || [];
    for (const neighbor of neighbors) {
      if (unvisited.has(neighbor.id)) {
        const newDist = distances[currentId] + neighbor.weight;
        if (newDist < distances[neighbor.id]) {
          distances[neighbor.id] = newDist;
          previous[neighbor.id] = currentId;
        }
      }
    }
  }

  const path = [];
  let curr = endNodeId;
  if (distances[endNodeId] === Infinity) return [];

  while (curr !== null) {
    const node = NODES.find(n => n.id === curr);
    if (node) path.unshift(node);
    curr = previous[curr];
  }

  return path;
}