<<<<<<< HEAD
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default function MapCanvas({ routePlanner = [], currentStepIndex = 0 }) {
  const mountRef = useRef(null);
  const engineRef = useRef(null);

  useEffect(() => {
    const currentContainer = mountRef.current;
    const width = currentContainer.clientWidth;
    const height = currentContainer.clientHeight;
    
    //! SCENE
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a1a);

    //! CAMERA  
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 20, 0);

    //! OFFSET CAMERA TO ACCOUNT FOR FLOATING UI
    // Left panel is ~370px wide (350 + 20 margin), Navbar is ~60px tall
    // We shift the principal point to center the remaining space
    const offsetCamera = (w, h) => {
      const leftPanelWidth = 370;
      const navbarHeight = 60;
      // We want to shift the view so the center of the screen is moved right and down
      camera.setViewOffset(w, h, -leftPanelWidth / 2, -navbarHeight / 2, w, h);
    };
    offsetCamera(width, height);

    //! RENDER
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentContainer.appendChild(renderer.domElement);

    //! CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2;

    //! LIGHTING
    const light = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(light);
=======
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default function App() {
  const mountRef = useRef(null);

  useEffect(() => {
    //? DOM element ref
    const currentContainer = mountRef.current
    const width = currentContainer.clientWidth
    const height = currentContainer.clientHeight
    
    //! SCENE
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x1a1a1a)

    //! CAMERA  
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
    camera.position.set(0, 20, 0)

    //! RENDER
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    currentContainer.appendChild(renderer.domElement);

    //! CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true  
    controls.dampingFactor = 0.05
    controls.maxPolarAngle = Math.PI / 2

    //! LIGHTING
    const light = new THREE.AmbientLight(0xffffff, 1.5)
    scene.add(light)
>>>>>>> ef2fa6991b94f3d561441eb2fc7b00b7085406b1
    
    //! MAP PLANE WITH DYNAMIC ASPECT RATIO
    const MAP_BASE_WIDTH = 100;
    const textureLoader = new THREE.TextureLoader();

<<<<<<< HEAD
    // Store objects for external updates
    engineRef.current = { camera, controls, mapToWorld: null, scene, offsetCamera, targetCameraPos: null, targetControlsTarget: null };
=======
    const create2DRibbon = (points, ribbonWidth, yOffset = 0.05, color = 0x00aaff) => {
      if (!points || points.length < 2) return new THREE.Group();

      const vertices = [];
      const indices = [];
      const uvs = [];

      for (let i = 0; i < points.length; i++) {
        const current = points[i];
        const dir = new THREE.Vector2();

        // Compute 2D direction vector (XZ plane)
        if (i < points.length - 1) {
          dir.set(points[i + 1].x - current.x, points[i + 1].z - current.z);
        } else {
          dir.set(current.x - points[i - 1].x, current.z - points[i - 1].z);
        }
        dir.normalize();

        // Calculate perpendicular vector (-z, x)
        const normal = new THREE.Vector2(-dir.y, dir.x);
        const halfWidth = ribbonWidth / 2;

        // Compute left and right vertex positions
        const leftX = current.x + normal.x * halfWidth;
        const leftZ = current.z + normal.y * halfWidth;
        const rightX = current.x - normal.x * halfWidth;
        const rightZ = current.z - normal.y * halfWidth;

        // Push positions elevated slightly above map
        vertices.push(leftX, yOffset, leftZ);
        vertices.push(rightX, yOffset, rightZ);

        // UV mapping
        const progress = i / (points.length - 1);
        uvs.push(0, progress);
        uvs.push(1, progress);

        // Build quad faces
        if (i < points.length - 1) {
          const baseIndex = i * 2;
          indices.push(baseIndex, baseIndex + 1, baseIndex + 2);
          indices.push(baseIndex + 1, baseIndex + 3, baseIndex + 2);
        }
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
      geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
      geometry.setIndex(indices);

      const material = new THREE.MeshBasicMaterial({
        color: color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.9
      });

      return new THREE.Mesh(geometry, material);
    };
>>>>>>> ef2fa6991b94f3d561441eb2fc7b00b7085406b1

    textureLoader.load('/photo.png', (mapTexture) => {
      const imageWidth = mapTexture.image.width;
      const imageHeight = mapTexture.image.height;
      const aspectRatio = imageHeight / imageWidth;

      const mapWidth = MAP_BASE_WIDTH;
      const mapHeight = MAP_BASE_WIDTH * aspectRatio;

      const planeGeo = new THREE.PlaneGeometry(mapWidth, mapHeight);
      const planeMat = new THREE.MeshBasicMaterial({ map: mapTexture });
      const mapMesh = new THREE.Mesh(planeGeo, planeMat);
      
      mapMesh.rotation.x = -Math.PI / 2;
      scene.add(mapMesh);
      
      //! SCALE CONVERTER
      const mapToWorld = (u, v) => {
        const x = (u - 0.5) * mapWidth;
        const z = (v - 0.5) * mapHeight;
        return new THREE.Vector3(x, 0.5, z);
      };

<<<<<<< HEAD
      engineRef.current.mapToWorld = mapToWorld;

      //! PLOT POINTS HELPER
      const point = (position, hexColor) => {
        const geo = new THREE.SphereGeometry(0.5, 16, 16);
        const mat = new THREE.MeshBasicMaterial({ color: hexColor });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.copy(position);
        scene.add(mesh);
        return mesh;
      };
      
      //! PLOT ROUTE POINTS
      const red = 0xff0000;
      const pur = 0x8000ff;
      const routePoints3D = routePlanner.map(p => mapToWorld(p.lat, p.lng));
      
      routePoints3D.forEach((p, idx) => point(p, idx === 0 || idx === routePoints3D.length - 1 ? pur : red));
      
      //! GENERATE ARROW TEXTURE
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#00aaff';
      ctx.fillRect(0, 0, 128, 128);
      ctx.fillStyle = '#00ff00';
      ctx.beginPath();
      ctx.moveTo(32, 32);
      ctx.lineTo(96, 64);
      ctx.lineTo(32, 96);
      ctx.lineTo(48, 64);
      ctx.fill();
      const arrowTexture = new THREE.CanvasTexture(canvas);
      arrowTexture.wrapS = THREE.RepeatWrapping;
      arrowTexture.wrapT = THREE.RepeatWrapping;
      engineRef.current.pathTexture = arrowTexture;

      //! ROUTE LINE (2D Ribbon)
      if (routePoints3D.length > 1) {
        const ribbonWidth = 1.5;
        const vertices = [];
        const indices = [];
        const uvs = [];
        let distance = 0;

        for (let i = 0; i < routePoints3D.length; i++) {
          const p = routePoints3D[i];
          const next = routePoints3D[i + 1] || p;
          const prev = routePoints3D[i - 1] || p;
          
          if (i > 0) {
             distance += Math.hypot(p.x - prev.x, p.z - prev.z);
          }

          let dir;
          if (i === 0) dir = new THREE.Vector2(next.x - p.x, next.z - p.z).normalize();
          else if (i === routePoints3D.length - 1) dir = new THREE.Vector2(p.x - prev.x, p.z - prev.z).normalize();
          else dir = new THREE.Vector2(next.x - prev.x, next.z - prev.z).normalize();

          const normal = new THREE.Vector2(-dir.y, dir.x).multiplyScalar(ribbonWidth / 2);

          vertices.push(p.x + normal.x, 0.1, p.z + normal.y);
          vertices.push(p.x - normal.x, 0.1, p.z - normal.y);

          const u = distance * 0.3; // scale factor for repeat
          uvs.push(u, 1);
          uvs.push(u, 0);

          if (i < routePoints3D.length - 1) {
=======
      //! PLOT POINTS HELPER
      const point = (position , hexColor) => {
        const geo = new THREE.SphereGeometry(0.8, 16, 16);
        const mat = new THREE.MeshBasicMaterial({ color: hexColor});
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.copy(position);
        scene.add(mesh);
        return mesh; // FIXED: Changed renderer.mesh to mesh
      };
      
      //! POINTS CREATION
      const pointA = mapToWorld(0.22,0.935); // Center
      const pointB = mapToWorld(0.32, 0.711); // MediSquare-1
      const pointC = mapToWorld(0.351, 0.661); // MediSquare-2
      const pointD = mapToWorld(0.398, 0.546); // MS-library
      const pointE = mapToWorld(0.501, 0.607); // sarasawti-library
      const pointF = mapToWorld(0.503, 0.64); // Bottom-right
      const pointG = mapToWorld(0.523, 0.590); // Bottom-right
      const pointH = mapToWorld(0.528, 0.662); // Bottom-right                            
      const pointI = mapToWorld(0.546, 0.605); // Bottom-right
      const pointJ = mapToWorld(0.504, 0.748); // Bottom-right

      const pointK = mapToWorld(0.272, 0.413); // Bottom-right
      const pointL = mapToWorld(0.271, 0.384); // Bottom-right
      const pointM = mapToWorld(0.323, 0.250); // Bottom-right
      const pointN = mapToWorld(0.475, 0.347); // Bottom-right
      const pointO = mapToWorld(0.651, 0.466); // Bottom-right
      const pointP = mapToWorld(0.568, 0.543); // Bottom-right
      const pointQ = mapToWorld(0.158, 0.462); // Bottom-right
      const pointR = mapToWorld(0.116, 0.513); // Bottom-right
      const pointS = mapToWorld(0.097, 0.501); // Bottom-right
      const pointT = mapToWorld(0.672, 0.477); // Bottom-right
      const pointU = mapToWorld(0.682, 0.442); // Bottom-right
      const pointV = mapToWorld(0.674, 0.422); // Bottom-right
      const pointW = mapToWorld(0.697, 0.346); // Bottom-right
      const pointX = mapToWorld(0.716, 0.335); // Bottom-right
      const pointY = mapToWorld(0.753, 0.221); // Bottom-right
      const pointZ = mapToWorld(0.504, 0.206); // Bottom-right
      
      const red = 0xff0000
      const pur = 0x8000ff

      point(pointA , red); 
      point(pointB , pur); 
      point(pointC , red); 
      point(pointD , red); 
      point(pointE , red); 
      // point(pointF , pur); 
      point(pointG , red); 
      // point(pointH , red); 
      point(pointI , red); 
      // point(pointJ , red); 
      // point(pointK , red); 
      // point(pointL , red); 
      // point(pointM , red); 
      // point(pointN , red); 
      // point(pointO , red); 
      point(pointP , red); 
      // point(pointQ , red); 
      // point(pointR , red); 
      // point(pointS , red); 
      // point(pointT , red); 
      // point(pointU , red); 
      // point(pointV , red); 
      // point(pointW , red); 
      // point(pointX , red); 
      // point(pointY , red); 
      // point(pointZ , red); 


      
      //! ROUTE LINE
      //! ROUTE LINE (2D Ribbon)
        const routePoints = [pointA, pointB, pointC, pointD, pointE, pointG, pointI, pointP];
        const ribbonWidth = 1.2;
        const vertices = [];
        const indices = [];

        // Calculate 2D offset vertices along the path
        for (let i = 0; i < routePoints.length; i++) {
          const p = routePoints[i];
          const next = routePoints[i + 1] || p;
          const prev = routePoints[i - 1] || p;
          
          const dir = new THREE.Vector2(next.x - prev.x, next.z - prev.z).normalize();
          const normal = new THREE.Vector2(-dir.y, dir.x).multiplyScalar(ribbonWidth / 2);

          // Left & Right vertices (Y = 0.1 elevates ribbon above image plane)
          vertices.push(p.x + normal.x, 0.1, p.z + normal.y);
          vertices.push(p.x - normal.x, 0.1, p.z - normal.y);

          if (i < routePoints.length - 1) {
>>>>>>> ef2fa6991b94f3d561441eb2fc7b00b7085406b1
            const idx = i * 2;
            indices.push(idx, idx + 1, idx + 2, idx + 1, idx + 3, idx + 2);
          }
        }

<<<<<<< HEAD
        const pathGeo = new THREE.BufferGeometry();
        pathGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        pathGeo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
        pathGeo.setIndex(indices);
        const pathMat = new THREE.MeshBasicMaterial({ 
          map: arrowTexture, 
          transparent: true,
          side: THREE.DoubleSide,
          depthWrite: false,
          color: 0xffffff,
          opacity: 0.8
        });
        scene.add(new THREE.Mesh(pathGeo, pathMat));
      }

      // Initial trigger for step 0
      window.dispatchEvent(new CustomEvent('mapLoaded'));
=======
        // 1. Updated Geometry
        const pathGeo = new THREE.BufferGeometry();
        pathGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        pathGeo.setIndex(indices);

        // 2. Updated Material
        const pathMat = new THREE.MeshBasicMaterial({
          color: 0x00aaff,
          side: THREE.DoubleSide
        })
      const pathMesh = new THREE.Mesh(pathGeo, pathMat);
      scene.add(pathMesh);


      //! FIXED: 3D Vector calculation on XZ plane with Y elevation
      function getOuterPoint(targetPoint, nextNode, distance = 15, elevation = 10) {
        // Calculate direction vector along the XZ plane
        const dx = nextNode.x - targetPoint.x;
        const dz = nextNode.z - targetPoint.z;

        const length = Math.hypot(dx, dz);

        if (length === 0) {
          throw new Error("targetPoint and nextNode cannot be identical.");
        }

        // Push back along the line from nextNode -> targetPoint
        const x = targetPoint.x - distance * (dx / length);
        const z = targetPoint.z - distance * (dz / length);
        const y = targetPoint.y + elevation; // Set camera height above the ground

        return new THREE.Vector3(x, y, z);
      }

      // Usage inside textureLoader callback:
      const targetPoint = pointC;
      const nextNode = pointJ;

      // Pass custom distance away from point and camera height elevation
      const cameraPos = getOuterPoint(pointC, pointD, 15, 7); 

      // Update camera and controls correctly
      camera.position.copy(cameraPos);
      controls.target.copy(targetPoint);
      controls.update();

>>>>>>> ef2fa6991b94f3d561441eb2fc7b00b7085406b1
    }); 

    //! RESIZE HANDLER
    const handleResize = () => {
<<<<<<< HEAD
      const w = currentContainer.clientWidth;
      const h = currentContainer.clientHeight;
      camera.aspect = w / h;
      offsetCamera(w, h);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);
=======
      const w = currentContainer.clientWidth
      const h = currentContainer.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener('resize', handleResize)
>>>>>>> ef2fa6991b94f3d561441eb2fc7b00b7085406b1

    //! ANIMATION LOOP
    let animationFrameID;
    const animate = () => {
<<<<<<< HEAD
      animationFrameID = requestAnimationFrame(animate);
      if (engineRef.current?.targetCameraPos && engineRef.current?.targetControlsTarget) {
        camera.position.lerp(engineRef.current.targetCameraPos, 0.05);
        controls.target.lerp(engineRef.current.targetControlsTarget, 0.05);
      }
      if (engineRef.current?.pathTexture) {
        engineRef.current.pathTexture.offset.x -= 0.02;
      }
      controls.update();
      renderer.render(scene, camera);      
    };
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameID);
      controls.dispose();
      renderer.dispose();
      if (currentContainer.contains(renderer.domElement)){
        currentContainer.removeChild(renderer.domElement);
      }
    };
  }, [routePlanner]); // Re-init if route changes

  //! Handle Step Updates
  useEffect(() => {
    const updateCamera = () => {
      if (!engineRef.current?.mapToWorld) return;
      const { camera, controls, mapToWorld } = engineRef.current;
      
      const step = routePlanner[currentStepIndex];
      if (!step) return;

      const targetPoint = mapToWorld(step.lat, step.lng);
      const nextStep = routePlanner[currentStepIndex + 1];
      
      let cameraPos;
      if (nextStep) {
        const nextNode = mapToWorld(nextStep.lat, nextStep.lng);
        const dx = nextNode.x - targetPoint.x;
        const dz = nextNode.z - targetPoint.z;
        const length = Math.hypot(dx, dz) || 1;
        const distance = 15;
        const elevation = 7;
        cameraPos = new THREE.Vector3(
          targetPoint.x - distance * (dx / length),
          targetPoint.y + elevation,
          targetPoint.z - distance * (dz / length)
        );
      } else {
        // Last step fallback
        cameraPos = new THREE.Vector3(targetPoint.x, targetPoint.y + 10, targetPoint.z + 15);
      }

      if (!engineRef.current.targetCameraPos) {
        engineRef.current.targetCameraPos = cameraPos.clone();
        engineRef.current.targetControlsTarget = targetPoint.clone();
        camera.position.copy(cameraPos);
        controls.target.copy(targetPoint);
        controls.update();
      } else {
        engineRef.current.targetCameraPos.copy(cameraPos);
        engineRef.current.targetControlsTarget.copy(targetPoint);
      }
    };

    // If map already loaded
    updateCamera();
    
    // In case map is still loading
    window.addEventListener('mapLoaded', updateCamera);
    return () => window.removeEventListener('mapLoaded', updateCamera);
  }, [currentStepIndex, routePlanner]);
=======
      animationFrameID = requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)      
    }
    animate();
    
    return () => {
      //! CLEANUP (strictmode)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameID)
      controls.dispose()
      renderer.dispose()
      if (currentContainer.contains(renderer.domElement)){
        currentContainer.removeChild(renderer.domElement)
      }
    }
  }, [])
>>>>>>> ef2fa6991b94f3d561441eb2fc7b00b7085406b1

  return (
    <div
      ref={mountRef}
<<<<<<< HEAD
      style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
    />
  );
=======
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    />
  )
>>>>>>> ef2fa6991b94f3d561441eb2fc7b00b7085406b1
}