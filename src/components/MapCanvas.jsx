import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import createMapRibbon from '../utils/pathRibbon';
import { findShortestPath } from '../data/nodesData';

export default function MapCanvas({ fromNode, toNode }) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const pathMeshRef = useRef(null);

  // Main Three.js setup effect
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#020617');
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, -3.5, 3.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Controls
    const control = new OrbitControls(camera, renderer.domElement);
    control.enableDamping = true;
    control.dampingFactor = 0.08;
    control.target.set(0, 0, 0);

    // Lighting
    const ambientLight = new THREE.AmbientLight('#ffffff', 1.2);
    scene.add(ambientLight);

    // Map Plane Texture
    const textureLoader = new THREE.TextureLoader();
    const planeGeometry = new THREE.PlaneGeometry(4, 4);
    const imageTexture1 = textureLoader.load('image.jpg');
    const planeMaterial1 = new THREE.MeshStandardMaterial({
      map: imageTexture1,
      side: THREE.DoubleSide,
    });
    const imagePlane1 = new THREE.Mesh(planeGeometry, planeMaterial1);
    imagePlane1.position.set(0, 0, 0);
    scene.add(imagePlane1);

    // Render Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      control.update();
      renderer.render(scene, camera);
    };
    animate();

    // Resize handling
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      planeGeometry.dispose();
      planeMaterial1.dispose();
      imageTexture1.dispose();
      control.dispose();
    };
  }, []);

  // Update Path Ribbon whenever selection changes
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    // Clear previous ribbon
    if (pathMeshRef.current) {
      scene.remove(pathMeshRef.current);
      pathMeshRef.current.geometry.dispose();
      pathMeshRef.current.material.dispose();
      pathMeshRef.current = null;
    }

    if (!fromNode || !toNode) return;

    // Compute route
    const pathNodes = findShortestPath(fromNode, toNode);
    if (pathNodes.length < 2) return;

    // Convert nodes to path points
    const points = pathNodes.map((node) => new THREE.Vector3(node.x, node.y, node.z + 0.01));

    // Draw path
    const pathGeometry = createMapRibbon(points, 0.08);
    const pathMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
    });
    const pathMesh = new THREE.Mesh(pathGeometry, pathMaterial);
    scene.add(pathMesh);
    pathMeshRef.current = pathMesh;
  }, [fromNode, toNode]);

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    />
  );
}