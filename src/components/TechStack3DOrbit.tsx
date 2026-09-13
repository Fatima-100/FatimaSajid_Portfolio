import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ALL_TECH_ORBIT_NODES, createTechBadgeTexture, TechOrbitNode } from '../utils/techTexture';
import { Sparkles, Layers, Eye, RotateCw, Zap } from 'lucide-react';

interface TechStack3DOrbitProps {
  activeTechStack: string[];
  activeProjectName: string | null;
  onSelectTech?: (techName: string) => void;
}

export const TechStack3DOrbit: React.FC<TechStack3DOrbitProps> = ({
  activeTechStack,
  activeProjectName,
  onSelectTech,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  // References for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const badgesGroupRef = useRef<THREE.Group | null>(null);
  const monolithGroupRef = useRef<THREE.Group | null>(null);
  const laserLinesGroupRef = useRef<THREE.Group | null>(null);
  const reactorLightRef = useRef<THREE.PointLight | null>(null);

  const badgeMeshesRef = useRef<{
    mesh: THREE.Mesh;
    node: TechOrbitNode;
    basePos: THREE.Vector3;
    targetPos: THREE.Vector3;
    targetScale: number;
    targetOpacity: number;
    rimMesh: THREE.Mesh;
    isMatching: boolean;
  }[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Perspective Camera
    const camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.8);
    cameraRef.current = camera;

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = false;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Obsidian & Rose Gold Lighting
    const ambientLight = new THREE.AmbientLight(0xfff6f0, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff0ea, 2.2);
    keyLight.position.set(5, 7, 6);
    scene.add(keyLight);

    const roseGoldLight = new THREE.DirectionalLight(0xdfb098, 1.6);
    roseGoldLight.position.set(-5, -3, 4);
    scene.add(roseGoldLight);

    const rimBackLight = new THREE.DirectionalLight(0xc9a0dc, 1.0);
    rimBackLight.position.set(0, -6, -4);
    scene.add(rimBackLight);

    // 5. Central Holographic Tech Monolith / Core Reactor
    const monolithGroup = new THREE.Group();
    scene.add(monolithGroup);
    monolithGroupRef.current = monolithGroup;

    // 5a. Faceted Obsidian Crystal Prism
    const monolithGeometry = new THREE.CylinderGeometry(0.65, 0.9, 2.5, 6, 1);
    const monolithMaterial = new THREE.MeshStandardMaterial({
      color: 0x161324,
      roughness: 0.18,
      metalness: 0.85,
      transparent: true,
      opacity: 0.85,
    });
    const monolithMesh = new THREE.Mesh(monolithGeometry, monolithMaterial);
    monolithGroup.add(monolithMesh);

    // 5b. Rose Gold Chamfered Bevel Wireframe
    const wireframeGeo = new THREE.EdgesGeometry(monolithGeometry);
    const wireframeMat = new THREE.LineBasicMaterial({
      color: 0xdfb098,
      linewidth: 2,
      transparent: true,
      opacity: 0.9,
    });
    const wireframeMesh = new THREE.LineSegments(wireframeGeo, wireframeMat);
    monolithGroup.add(wireframeMesh);

    // 5c. Pulsing Inner Reactor Heart
    const coreGeo = new THREE.IcosahedronGeometry(0.35, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xdfb098,
      emissive: 0xdfb098,
      emissiveIntensity: 1.8,
      roughness: 0.1,
      metalness: 0.9,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    monolithGroup.add(coreMesh);

    // Dynamic Reactor Light
    const reactorLight = new THREE.PointLight(0xdfb098, 2.5, 7);
    reactorLight.position.set(0, 0, 0);
    monolithGroup.add(reactorLight);
    reactorLightRef.current = reactorLight;

    // 5d. Dual Gyroscopic Orbital Rings with Rose Gold Metallic Luster
    const ringGeo1 = new THREE.TorusGeometry(1.28, 0.018, 16, 64);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0xdfb098,
      metalness: 0.95,
      roughness: 0.2,
      emissive: 0xdfb098,
      emissiveIntensity: 0.4,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    monolithGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(1.5, 0.015, 16, 64);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0xc9a0dc,
      metalness: 0.9,
      roughness: 0.25,
      emissive: 0xc9a0dc,
      emissiveIntensity: 0.35,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 4;
    monolithGroup.add(ring2);

    // 6. Laser Energy Lines Group (Connecting Monolith to Active Front Badges)
    const laserLinesGroup = new THREE.Group();
    scene.add(laserLinesGroup);
    laserLinesGroupRef.current = laserLinesGroup;

    // 7. Tech Badges Group
    const badgesGroup = new THREE.Group();
    scene.add(badgesGroup);
    badgesGroupRef.current = badgesGroup;

    // Badges: Upright high-res PlaneGeometry with 100% horizontal, right-side-up UV mapping
    const discGeometry = new THREE.PlaneGeometry(1.42, 1.42);
    const rimGeometry = new THREE.TorusGeometry(0.68, 0.038, 16, 48);

    const totalNodes = ALL_TECH_ORBIT_NODES.length;
    const radius = 3.3;

    const meshes: typeof badgeMeshesRef.current = [];

    ALL_TECH_ORBIT_NODES.forEach((node, idx) => {
      const angle = (idx / totalNodes) * Math.PI * 2;
      const yOffset = ((idx % 3) - 1) * 1.35 + Math.sin(idx * 1.4) * 0.35;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius * 0.7;

      const basePos = new THREE.Vector3(x, yOffset, z);

      const texture = createTechBadgeTexture(
        node.name,
        node.color,
        node.symbol,
        node.customDraw
      );

      const frontMat = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.22,
        metalness: 0.35,
        transparent: true,
        opacity: 0.95,
      });

      const rimMat = new THREE.MeshStandardMaterial({
        color: 0xdfb098,
        roughness: 0.25,
        metalness: 0.85,
        emissive: node.hexColor,
        emissiveIntensity: 0.45,
      });

      const discMesh = new THREE.Mesh(discGeometry, frontMat);
      discMesh.position.copy(basePos);
      discMesh.userData = { id: node.id, name: node.name, color: node.color };

      const rimMesh = new THREE.Mesh(rimGeometry, rimMat);
      discMesh.add(rimMesh);

      badgesGroup.add(discMesh);

      meshes.push({
        mesh: discMesh,
        node,
        basePos: basePos.clone(),
        targetPos: basePos.clone(),
        targetScale: 1,
        targetOpacity: 0.95,
        rimMesh,
        isMatching: false,
      });
    });

    badgeMeshesRef.current = meshes;

    // 8. Raycaster for hover & click
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-1000, -1000);
    let isDragging = false;
    let previousMouseX = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDragging) {
        const deltaX = e.clientX - previousMouseX;
        badgesGroup.rotation.y += deltaX * 0.008;
        monolithGroup.rotation.y += deltaX * 0.005;
        previousMouseX = e.clientX;
      }
    };

    const onPointerDown = (e: MouseEvent) => {
      isDragging = true;
      previousMouseX = e.clientX;
      setIsAutoRotating(false);
    };

    const onPointerUp = () => {
      isDragging = false;
      setTimeout(() => setIsAutoRotating(true), 3500);
    };

    const onClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(
        meshes.map((m) => m.mesh),
        false
      );
      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        if (hit.userData?.name && onSelectTech) {
          onSelectTech(hit.userData.name);
        }
      }
    };

    container.addEventListener('mousemove', onPointerMove);
    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mouseup', onPointerUp);
    container.addEventListener('click', onClick);

    // 9. Resize Handling
    const resizeObserver = new ResizeObserver(() => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(container);

    // 10. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Rotate Monolith core reactor
      monolithMesh.rotation.y += delta * 0.35;
      wireframeMesh.rotation.y += delta * 0.35;
      coreMesh.rotation.x += delta * 0.6;
      coreMesh.rotation.y += delta * 0.8;

      // Gyroscope rings rotation
      ring1.rotation.z += delta * 0.4;
      ring2.rotation.z -= delta * 0.3;

      // Pulse reactor light and core scale
      const pulse = Math.sin(elapsed * 4) * 0.15 + 1.0;
      coreMesh.scale.set(pulse, pulse, pulse);
      if (reactorLightRef.current) {
        reactorLightRef.current.intensity = 2.0 + Math.sin(elapsed * 5) * 0.8;
      }

      // Gentle auto-rotation of orbit when not dragging and no active selection
      if (isAutoRotating && (!activeTechStack || activeTechStack.length === 0)) {
        badgesGroup.rotation.y += delta * 0.2;
      }

      // Check hovered item
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(
        meshes.map((m) => m.mesh),
        false
      );
      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        setHoveredTech(hit.userData?.name || null);
      } else {
        setHoveredTech(null);
      }

      // Lerp meshes to target positions & billboard
      meshes.forEach((item) => {
        item.mesh.position.lerp(item.targetPos, delta * 4.8);

        const currentScale = item.mesh.scale.x;
        const newScale = THREE.MathUtils.lerp(currentScale, item.targetScale, delta * 5.5);
        item.mesh.scale.set(newScale, newScale, newScale);

        // Billboard alignment with slight dynamic sway
        item.mesh.quaternion.copy(camera.quaternion);

        if (item.targetScale > 1.1) {
          item.mesh.position.y += Math.sin(elapsed * 3.5 + item.mesh.id) * 0.002;
        }

        const mat = item.mesh.material as THREE.MeshStandardMaterial;
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, item.targetOpacity, delta * 4.5);
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener('mousemove', onPointerMove);
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('click', onClick);
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, []);

  // Update target positions & regenerate laser beams whenever activeTechStack changes!
  useEffect(() => {
    const meshes = badgeMeshesRef.current;
    const laserGroup = laserLinesGroupRef.current;
    if (!meshes || meshes.length === 0) return;

    // Clear old laser transmission beams
    if (laserGroup) {
      while (laserGroup.children.length > 0) {
        const child = laserGroup.children[0];
        laserGroup.remove(child);
      }
    }

    const hasActiveStack = activeTechStack && activeTechStack.length > 0;

    if (!hasActiveStack) {
      meshes.forEach((item) => {
        item.targetPos.copy(item.basePos);
        item.targetScale = 1;
        item.targetOpacity = 0.95;
        item.isMatching = false;
        const rimMat = item.rimMesh.material as THREE.MeshStandardMaterial;
        rimMat.emissiveIntensity = 0.35;
      });
      return;
    }

    // Filter matching vs non-matching
    const matchingMeshes: typeof meshes = [];
    const nonMatchingMeshes: typeof meshes = [];

    meshes.forEach((item) => {
      const isMatch = activeTechStack.some((tech) => {
        const lowerTech = tech.toLowerCase().trim();
        return (
          item.node.name.toLowerCase() === lowerTech ||
          item.node.aliasPatterns.some((pattern) =>
            lowerTech.includes(pattern) || pattern.includes(lowerTech)
          )
        );
      });

      item.isMatching = isMatch;
      if (isMatch) {
        matchingMeshes.push(item);
      } else {
        nonMatchingMeshes.push(item);
      }
    });

    // Bring matching tech logos straight into the FRONT ROW near the camera!
    const matchCount = matchingMeshes.length;
    const arcRadius = 2.45;
    const arcSpan = Math.min(Math.PI * 0.78, matchCount * 0.42);

    matchingMeshes.forEach((item, i) => {
      const t = matchCount === 1 ? 0 : i / (matchCount - 1) - 0.5;
      const angle = t * arcSpan;

      const x = Math.sin(angle) * arcRadius;
      const y = (i % 2 === 0 ? 0.35 : -0.35) * (matchCount > 3 ? 1 : 0);
      const z = 2.85 - Math.cos(angle) * 0.38;

      item.targetPos.set(x, y, z);
      item.targetScale = 1.38; // Highlighted scale
      item.targetOpacity = 1.0;

      const rimMat = item.rimMesh.material as THREE.MeshStandardMaterial;
      rimMat.emissiveIntensity = 1.4; // Glowing rose gold rim

      // Generate Radiant Holographic Laser Transmission Beam from Core (0,0,0) to badge!
      if (laserGroup) {
        const points = [
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(x * 0.5, y * 0.5, z * 0.5),
          new THREE.Vector3(x, y, z),
        ];
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
        const lineMat = new THREE.LineBasicMaterial({
          color: 0xdfb098,
          transparent: true,
          opacity: 0.75,
          linewidth: 2,
        });
        const line = new THREE.Line(lineGeo, lineMat);
        laserGroup.add(line);
      }
    });

    // Push non-matching logos deeper into the background obsidian depths
    nonMatchingMeshes.forEach((item, i) => {
      const angle = (i / nonMatchingMeshes.length) * Math.PI * 2;
      const x = Math.cos(angle) * 4.0;
      const y = ((i % 3) - 1) * 1.65;
      const z = -2.9 + Math.sin(angle) * 0.5;

      item.targetPos.set(x, y, z);
      item.targetScale = 0.65;
      item.targetOpacity = 0.28;

      const rimMat = item.rimMesh.material as THREE.MeshStandardMaterial;
      rimMat.emissiveIntensity = 0.15;
    });
  }, [activeTechStack, activeProjectName]);

  return (
    <div className="relative w-full h-full select-none">
      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Top Holographic Monolith Status Pill */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#161324]/85 border border-white/10 backdrop-blur-md shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#dfb098] animate-pulse" />
          <span className="text-[11px] font-bold text-[#f4f2f8] tracking-wider uppercase">
            {activeProjectName ? 'Reactor Transmitting' : 'Monolith Orbit Active'}
          </span>
        </div>

        {activeProjectName && (
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#2a1d2f]/90 border border-[#dfb098]/40 text-[#dfb098] text-[10px] font-bold backdrop-blur-md shadow-md">
            <Zap className="w-3 h-3 fill-current" />
            <span>Front Row Laser Sync</span>
          </div>
        )}
      </div>

      {/* Hovered Badge Callout Pill */}
      {hoveredTech && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 pointer-events-none transition-all">
          <div className="px-3.5 py-1.5 rounded-full bg-[#181528]/95 border border-[#dfb098] shadow-2xl backdrop-blur-xl flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#dfb098]" />
            <span className="text-xs font-bold text-[#f4f2f8] tracking-wide">
              {hoveredTech}
            </span>
          </div>
        </div>
      )}

      {/* Bottom Hint */}
      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[10px] text-[#9e97af] pointer-events-none font-medium px-1">
        <span>Click & Drag to rotate 3D Monolith</span>
        <span className="hidden sm:inline">3D Tech Stack Alignment</span>
      </div>
    </div>
  );
};
