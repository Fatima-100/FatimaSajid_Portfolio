import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Project } from '../types';
import { findTechOrbitNode, createTechBadgeTexture } from '../utils/techTexture';
import { RotateCw, Zap, Sparkles, Layers, Eye } from 'lucide-react';

interface Project3DStageProps {
  project: Project;
  heightClass?: string;
  isCompact?: boolean;
}

export const Project3DStage: React.FC<Project3DStageProps> = ({
  project,
  heightClass = 'h-[260px] sm:h-[300px]',
  isCompact = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const monolithGroupRef = useRef<THREE.Group | null>(null);
  const orbitGroupRef = useRef<THREE.Group | null>(null);
  const laserGroupRef = useRef<THREE.Group | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 400;
    let height = container.clientHeight || 280;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Perspective Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.8);
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

    // 4. Rose Gold & Obsidian Lighting
    const ambientLight = new THREE.AmbientLight(0xfff5ee, 1.3);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff0ea, 2.0);
    keyLight.position.set(4, 6, 5);
    scene.add(keyLight);

    const roseGoldLight = new THREE.DirectionalLight(0xdfb098, 1.4);
    roseGoldLight.position.set(-4, -2, 4);
    scene.add(roseGoldLight);

    // 5. Central 3D Monolith Reactor Group
    const monolithGroup = new THREE.Group();
    scene.add(monolithGroup);
    monolithGroupRef.current = monolithGroup;

    // Core Monolith Prism (Faceted Obsidian with Rose-Gold Chamfered edges)
    const prismGeometry = new THREE.CylinderGeometry(0.48, 0.68, 1.8, 6, 1);
    const prismMaterial = new THREE.MeshStandardMaterial({
      color: 0x161324,
      roughness: 0.16,
      metalness: 0.88,
      transparent: true,
      opacity: 0.9,
    });
    const prismMesh = new THREE.Mesh(prismGeometry, prismMaterial);
    monolithGroup.add(prismMesh);

    // Wireframe edges
    const wireframeGeo = new THREE.EdgesGeometry(prismGeometry);
    const wireframeMat = new THREE.LineBasicMaterial({
      color: 0xdfb098,
      linewidth: 1.5,
      transparent: true,
      opacity: 0.85,
    });
    const wireframeMesh = new THREE.LineSegments(wireframeGeo, wireframeMat);
    monolithGroup.add(wireframeMesh);

    // Glowing Inner Reactor Core
    const coreGeo = new THREE.IcosahedronGeometry(0.26, 1);
    const coreColor = project.category === 'AI & Vision' ? 0xdfb098 : 0xc9a0dc;
    const coreMat = new THREE.MeshStandardMaterial({
      color: coreColor,
      emissive: coreColor,
      emissiveIntensity: 1.6,
      roughness: 0.1,
      metalness: 0.9,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    monolithGroup.add(coreMesh);

    // Point light radiating from reactor
    const coreLight = new THREE.PointLight(coreColor, 2.2, 6);
    monolithGroup.add(coreLight);

    // Gyroscopic Orbital Rings around core
    const ringGeo1 = new THREE.TorusGeometry(0.95, 0.014, 16, 48);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0xdfb098,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0xdfb098,
      emissiveIntensity: 0.3,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    monolithGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(1.15, 0.012, 16, 48);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0xc9a0dc,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0xc9a0dc,
      emissiveIntensity: 0.25,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 4;
    monolithGroup.add(ring2);

    // 6. Laser Beams Group
    const laserGroup = new THREE.Group();
    scene.add(laserGroup);
    laserGroupRef.current = laserGroup;

    // 7. 3D Orbiting Badges Group for THIS Project's Tech Stack
    const orbitGroup = new THREE.Group();
    scene.add(orbitGroup);
    orbitGroupRef.current = orbitGroup;

    const projectTechNodes = project.tech.map((t) => findTechOrbitNode(t));
    const totalTech = projectTechNodes.length;
    const orbitRadius = Math.min(2.55, 2.1 + totalTech * 0.08);

    // Geometry for badges: PlaneGeometry ensures 100% horizontal, upright UV mapping
    const badgeFaceGeo = new THREE.PlaneGeometry(1.22, 1.22);
    const badgeRimGeo = new THREE.TorusGeometry(0.58, 0.03, 16, 40);

    interface BadgeItem {
      mesh: THREE.Mesh;
      rimMesh: THREE.Mesh;
      laserLine: THREE.Line;
      nodeName: string;
      brandColor: string;
      baseAngle: number;
      yOffset: number;
    }

    const badgeItems: BadgeItem[] = [];

    projectTechNodes.forEach((node, idx) => {
      const angle = (idx / totalTech) * Math.PI * 2;
      const yOffset = ((idx % 2 === 0 ? 1 : -1) * 0.45) + Math.sin(idx * 1.8) * 0.2;
      const x = Math.cos(angle) * orbitRadius;
      const z = Math.sin(angle) * orbitRadius * 0.65;

      const texture = createTechBadgeTexture(
        node.name,
        node.color,
        node.symbol,
        node.customDraw
      );

      const frontMat = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.25,
        metalness: 0.35,
        transparent: true,
        opacity: 0.96,
        side: THREE.DoubleSide,
      });

      const rimMat = new THREE.MeshStandardMaterial({
        color: 0xdfb098,
        roughness: 0.2,
        metalness: 0.9,
        emissive: node.hexColor,
        emissiveIntensity: 0.4,
      });

      const badgeMesh = new THREE.Mesh(badgeFaceGeo, frontMat);
      badgeMesh.position.set(x, yOffset, z);
      badgeMesh.userData = { name: node.name, color: node.color, id: node.id };

      const rimMesh = new THREE.Mesh(badgeRimGeo, rimMat);
      badgeMesh.add(rimRimOrNot(rimMesh));

      orbitGroup.add(badgeMesh);

      // Create laser beam connecting Monolith reactor to this badge
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(x, yOffset, z),
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: node.hexColor,
        transparent: true,
        opacity: 0.4,
        linewidth: 1.5,
      });
      const laserLine = new THREE.Line(lineGeo, lineMat);
      laserGroup.add(laserLine);

      badgeItems.push({
        mesh: badgeMesh,
        rimMesh,
        laserLine,
        nodeName: node.name,
        brandColor: node.color,
        baseAngle: angle,
        yOffset,
      });
    });

    function rimRimOrNot(mesh: THREE.Mesh) {
      return mesh;
    }

    // 8. Interaction: Pointer Drag & Hover Raycaster
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-1000, -1000);
    let isDragging = false;
    let prevMouseX = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        orbitGroup.rotation.y += deltaX * 0.009;
        monolithGroup.rotation.y += deltaX * 0.005;
        prevMouseX = e.clientX;
      }
    };

    const onPointerDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const onClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(
        badgeItems.map((b) => b.mesh),
        false
      );
      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        const name = hit.userData?.name;
        if (name) {
          setSelectedTech(name === selectedTech ? null : name);
        }
      }
    };

    container.addEventListener('mousemove', onPointerMove);
    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mouseup', onPointerUp);
    container.addEventListener('click', onClick);

    // 9. Intersection Observer (Pause rendering when card is off-screen)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // 10. Resize Handling
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

    // 11. Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Monolith rotation
      prismMesh.rotation.y += delta * 0.3;
      wireframeMesh.rotation.y += delta * 0.3;
      coreMesh.rotation.x += delta * 0.6;
      coreMesh.rotation.y += delta * 0.8;

      // Gyroscope rings rotation
      ring1.rotation.z += delta * 0.45;
      ring2.rotation.z -= delta * 0.35;

      // Reactor pulse
      const pulse = Math.sin(elapsed * 4) * 0.12 + 1.0;
      coreMesh.scale.set(pulse, pulse, pulse);
      coreLight.intensity = 2.0 + Math.sin(elapsed * 5) * 0.6;

      // Auto-rotate orbit when not dragging
      if (isAutoRotating && !isDragging) {
        orbitGroup.rotation.y += delta * 0.22;
      }

      // Check hovered badge
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(
        badgeItems.map((b) => b.mesh),
        false
      );

      let currentHoveredName: string | null = null;
      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        currentHoveredName = hit.userData?.name || null;
      }
      setHoveredTech(currentHoveredName);

      // Update badge meshes: billboarding & dynamic laser lines
      const worldPos = new THREE.Vector3();
      badgeItems.forEach((b) => {
        // Billboard so badge face always directly faces camera upright
        b.mesh.quaternion.copy(camera.quaternion);

        const isHovered = b.nodeName === currentHoveredName;
        const isSelected = b.nodeName === selectedTech;
        const targetScale = isHovered || isSelected ? 1.25 : 1.0;

        b.mesh.scale.lerp(
          new THREE.Vector3(targetScale, targetScale, targetScale),
          delta * 8.0
        );

        // Update laser line end-point in world/local space
        b.mesh.getWorldPosition(worldPos);
        const positions = (b.laserLine.geometry as THREE.BufferGeometry).attributes
          .position as THREE.BufferAttribute;

        positions.setXYZ(0, 0, 0, 0); // Origin at reactor core
        positions.setXYZ(1, worldPos.x, worldPos.y, worldPos.z);
        positions.needsUpdate = true;

        // Laser intensity
        const lineMat = b.laserLine.material as THREE.LineBasicMaterial;
        lineMat.opacity = isHovered || isSelected ? 0.95 : 0.35;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      resizeObserver.disconnect();
      container.removeEventListener('mousemove', onPointerMove);
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('click', onClick);

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [project, isAutoRotating, selectedTech]);

  return (
    <div
      id={`project-3d-stage-${project.id}`}
      className={`relative w-full ${heightClass} rounded-2xl overflow-hidden bg-gradient-to-b from-[#0a0815] via-[#120f22] to-[#0c0a16] border border-[#dfb098]/30 shadow-inner group`}
    >
      {/* Three.js Container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Overlay Badge & Telemetry */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#1a152e]/90 text-[#dfb098] border border-[#dfb098]/30 backdrop-blur-md shadow-md">
            <Sparkles className="w-3 h-3 text-[#dfb098]" />
            <span>3D Tech Matrix</span>
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono text-[#c5bed5] bg-black/40 border border-white/10 backdrop-blur-md">
            <Zap className="w-2.5 h-2.5 text-amber-400" />
            {project.tech.length} Nodes
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 pointer-events-auto">
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            title={isAutoRotating ? 'Pause rotation' : 'Resume auto-rotation'}
            className={`p-1.5 rounded-lg text-xs transition-all backdrop-blur-md border ${
              isAutoRotating
                ? 'bg-[#221a35]/80 text-[#dfb098] border-[#dfb098]/30 hover:bg-[#2e2348]'
                : 'bg-black/50 text-[#9e97af] border-white/10 hover:text-white'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${isAutoRotating ? 'animate-spin-slow' : ''}`} />
          </button>
        </div>
      </div>

      {/* Active Hover / Selection Telemetry Pill */}
      {hoveredTech && (
        <div className="absolute bottom-3 left-3 z-10 pointer-events-none animate-in fade-in duration-200">
          <div className="px-3 py-1.5 rounded-xl bg-[#171328]/95 border border-[#dfb098]/50 shadow-xl backdrop-blur-md flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#dfb098] animate-ping" />
            <span className="text-xs font-bold text-[#f4f2f8]">
              {hoveredTech}
            </span>
            <span className="text-[10px] font-mono text-[#dfb098] bg-[#291e35] px-1.5 py-0.5 rounded border border-[#dfb098]/30">
              Linked
            </span>
          </div>
        </div>
      )}

      {/* Subtle Drag Hint at Bottom Right */}
      <div className="absolute bottom-2.5 right-3 text-[10px] font-medium text-white/40 pointer-events-none">
        Drag to spin 3D Monolith
      </div>
    </div>
  );
};
