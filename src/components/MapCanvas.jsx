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
    
    //! MAP PLANE WITH DYNAMIC ASPECT RATIO
    const MAP_BASE_WIDTH = 100;
    const textureLoader = new THREE.TextureLoader();

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
            const idx = i * 2;
            indices.push(idx, idx + 1, idx + 2, idx + 1, idx + 3, idx + 2);
          }
        }

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

    }); 

    //! RESIZE HANDLER
    const handleResize = () => {
      const w = currentContainer.clientWidth
      const h = currentContainer.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener('resize', handleResize)

    //! ANIMATION LOOP
    let animationFrameID;
    const animate = () => {
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
  )
}