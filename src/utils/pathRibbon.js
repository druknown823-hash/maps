import * as THREE from 'three';

export default function createMapRibbon(points, ribbonWidth = 0.2) {
  const curve = new THREE.CatmullRomCurve3(points);
  const curvePoints = curve.getPoints(100);

  const vertices = [];
  const indices = [];
  const halfWidth = ribbonWidth / 2;

  for (let i = 0; i < curvePoints.length; i++) {
    const current = curvePoints[i];
    const next = curvePoints[i + 1] || current;
    const prev = curvePoints[i - 1] || current;

    const dir = new THREE.Vector3().subVectors(next, prev).normalize();
    const perp = new THREE.Vector3(-dir.y, dir.x, 0).multiplyScalar(halfWidth);

    vertices.push(current.x + perp.x, current.y + perp.y, current.z);
    vertices.push(current.x - perp.x, current.y - perp.y, current.z);
  }

  for (let i = 0; i < curvePoints.length - 1; i++) {
    const base = i * 2;
    indices.push(base, base + 1, base + 2);
    indices.push(base + 1, base + 3, base + 2);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  return geometry;
}