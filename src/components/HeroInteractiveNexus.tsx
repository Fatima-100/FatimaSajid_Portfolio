import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Zap, Eye, Cpu, Radio, RotateCcw, Activity } from 'lucide-react';

type NexusMode = 'cielab' | 'socket' | 'algorithm';

interface ModeConfig {
  id: NexusMode;
  name: string;
  tagline: string;
  primaryColor: number;
  cssColor: string;
  badge: string;
  metrics: { label: string; value: string }[];
  icon: React.ComponentType<{ className?: string }>;
}

const MODES: ModeConfig[] = [
  {
    id: 'cielab',
    name: 'CIELAB Vision Matrix',
    tagline: 'Illuminant-Invariant Color Perception & K-Means Skin Clustering',
    primaryColor: 0xdfb098,
    cssColor: '#dfb098',
    badge: 'ChromaMatch AI',
    metrics: [
      { label: 'Delta-E (CIE2000)', value: '< 1.2' },
      { label: 'Skin Wavelength', value: '584 nm' },
      { label: 'Invariance', value: '99.4%' },
    ],
    icon: Eye,
  },
  {
    id: 'socket',
    name: 'Real-Time Socket Nexus',
    tagline: 'Bi-Directional State Stream & Distributed Event Pipeline',
    primaryColor: 0x8c52ff,
    cssColor: '#c9a0dc',
    badge: 'Trip-Share & QuantumChat',
    metrics: [
      { label: 'Socket Latency', value: '16 ms' },
      { label: 'Handshake', value: 'WSS TLS 1.3' },
      { label: 'Sync Rate', value: '60 Hz' },
    ],
    icon: Radio,
  },
  {
    id: 'algorithm',
    name: 'Algorithmic DSA Core',
    tagline: 'Self-Balancing AVL Trees & A* Pathfinding in C++20',
    primaryColor: 0x38bdf8,
    cssColor: '#38bdf8',
    badge: 'TrapScape & Systems',
    metrics: [
      { label: 'Complexity', value: 'O(log N)' },
      { label: 'Tree Height', value: 'Balanced' },
      { label: 'Memory Footprint', value: '0 STL Alloc' },
    ],
    icon: Cpu,
  },
];

export const HeroInteractiveNexus: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState<NexusMode>('cielab');
  const [pulseCount, setPulseCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const crystalMeshRef = useRef<THREE.Mesh | null>(null);
  const wireframeMeshRef = useRef<THREE.LineSegments | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const ring1Ref = useRef<THREE.Mesh | null>(null);
  const ring2Ref = useRef<THREE.Mesh | null>(null);
  const ring3Ref = useRef<THREE.Mesh | null>(null);
  const coreLightRef = useRef<THREE.PointLight | null>(null);
  const targetRotationRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const mousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const shockwavePulseRef = useRef<number>(0);

  const currentConfig = MODES.find((m) => m.id === activeMode) || MODES[0];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 340;
    const height = container.clientHeight || 260;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.2);
    cameraRef.current = camera;

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff0ea, 2.2);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xdfb098, 1.6);
    rimLight.position.set(-4, -3, -2);
    scene.add(rimLight);

    const coreLight = new THREE.PointLight(currentConfig.primaryColor, 3.5, 8);
    scene.add(coreLight);
    coreLightRef.current = coreLight;

    // 5. Central Polyhedron Crystal (Geodesic Dodecahedron / Icosahedron)
    const crystalGeo = new THREE.IcosahedronGeometry(1.15, 1);
    const crystalMat = new THREE.MeshStandardMaterial({
      color: 0x141024,
      roughness: 0.18,
      metalness: 0.9,
      transparent: true,
      opacity: 0.92,
    });
    const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
    scene.add(crystalMesh);
    crystalMeshRef.current = crystalMesh;

    // Wireframe edges for high-tech precision look
    const wireGeo = new THREE.EdgesGeometry(crystalGeo);
    const wireMat = new THREE.LineBasicMaterial({
      color: currentConfig.primaryColor,
      linewidth: 1.5,
      transparent: true,
      opacity: 0.95,
    });
    const wireMesh = new THREE.LineSegments(wireGeo, wireMat);
    crystalMesh.add(wireMesh);
    wireframeMeshRef.current = wireMesh;

    // Inner Glowing Core
    const innerGeo = new THREE.OctahedronGeometry(0.55, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: currentConfig.primaryColor,
      emissive: currentConfig.primaryColor,
      emissiveIntensity: 1.4,
      metalness: 0.95,
      roughness: 0.1,
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    crystalMesh.add(innerCore);

    // 6. Orbital Gyroscopic Rings
    const ringGeo1 = new THREE.TorusGeometry(1.65, 0.022, 16, 64);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0xdfb098,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0xdfb098,
      emissiveIntensity: 0.35,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 2.8;
    scene.add(ring1);
    ring1Ref.current = ring1;

    const ringGeo2 = new THREE.TorusGeometry(1.95, 0.016, 16, 64);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0xc9a0dc,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0xc9a0dc,
      emissiveIntensity: 0.3,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 3;
    ring2.rotation.x = -Math.PI / 6;
    scene.add(ring2);
    ring2Ref.current = ring2;

    const ringGeo3 = new THREE.TorusGeometry(2.25, 0.012, 16, 64);
    const ringMat3 = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.9,
      roughness: 0.3,
      transparent: true,
      opacity: 0.45,
    });
    const ring3 = new THREE.Mesh(ringGeo3, ringMat3);
    ring3.rotation.z = Math.PI / 4;
    scene.add(ring3);
    ring3Ref.current = ring3;

    // 7. Swarming Particle Constellation
    const particleCount = 120;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.6 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
      particleScales[i] = Math.random();
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: currentConfig.primaryColor,
      size: 0.065,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // 8. Interaction: Mouse Move & Drag
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mousePosRef.current = { x, y };

      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        targetRotationRef.current.y += deltaX * 0.012;
        targetRotationRef.current.x += deltaY * 0.012;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }
    };

    const onPointerDown = (e: MouseEvent) => {
      setIsDragging(true);
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onPointerUp = () => {
      setIsDragging(false);
    };

    const onPointerEnter = () => setIsHovered(true);
    const onPointerLeave = () => {
      setIsHovered(false);
      setIsDragging(false);
      mousePosRef.current = { x: 0, y: 0 };
    };

    container.addEventListener('mousemove', onPointerMove);
    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mouseup', onPointerUp);
    container.addEventListener('mouseenter', onPointerEnter);
    container.addEventListener('mouseleave', onPointerLeave);

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
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Shockwave decay
      if (shockwavePulseRef.current > 0) {
        shockwavePulseRef.current = Math.max(0, shockwavePulseRef.current - delta * 2.8);
      }
      const pulseFactor = shockwavePulseRef.current * 0.35;

      // Crystal rotation with cursor inertia
      const mouseTiltX = mousePosRef.current.y * 0.45;
      const mouseTiltY = mousePosRef.current.x * 0.55;

      crystalMesh.rotation.y += delta * 0.45 + (mouseTiltY - crystalMesh.rotation.y * 0.2) * 0.04;
      crystalMesh.rotation.x = THREE.MathUtils.lerp(
        crystalMesh.rotation.x,
        mouseTiltX + targetRotationRef.current.x,
        0.05
      );
      crystalMesh.rotation.y += targetRotationRef.current.y * 0.05;
      targetRotationRef.current.x *= 0.95;
      targetRotationRef.current.y *= 0.95;

      // Inner core counter-rotation & pulsation
      innerCore.rotation.x -= delta * 0.8;
      innerCore.rotation.z += delta * 0.6;
      const breathe = Math.sin(elapsed * 3.5) * 0.08 + 1.0 + pulseFactor;
      crystalMesh.scale.set(breathe, breathe, breathe);

      // Gyroscopic rings rotation
      ring1.rotation.z += delta * 0.5;
      ring2.rotation.y -= delta * 0.4;
      ring2.rotation.z += delta * 0.3;
      ring3.rotation.x += delta * 0.25;

      // Ring pulse on click
      const ringScale = 1.0 + pulseFactor * 0.2;
      ring1.scale.set(ringScale, ringScale, ringScale);
      ring2.scale.set(ringScale, ringScale, ringScale);

      // Orbiting particles
      particles.rotation.y += delta * 0.15;
      particles.rotation.x = Math.sin(elapsed * 0.5) * 0.15;

      // Dynamic light intensity
      coreLight.intensity = 3.2 + Math.sin(elapsed * 4) * 0.8 + shockwavePulseRef.current * 4.0;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      container.removeEventListener('mousemove', onPointerMove);
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('mouseenter', onPointerEnter);
      container.removeEventListener('mouseleave', onPointerLeave);

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [activeMode, isDragging]);

  // Color updates when mode changes
  useEffect(() => {
    if (!wireframeMeshRef.current || !coreLightRef.current || !particlesRef.current) return;

    const lineMat = wireframeMeshRef.current.material as THREE.LineBasicMaterial;
    lineMat.color.setHex(currentConfig.primaryColor);

    coreLightRef.current.color.setHex(currentConfig.primaryColor);

    const pMat = particlesRef.current.material as THREE.PointsMaterial;
    pMat.color.setHex(currentConfig.primaryColor);
  }, [activeMode, currentConfig]);

  // Trigger pulse wave on click
  const triggerPulse = () => {
    shockwavePulseRef.current = 1.0;
    setPulseCount((prev) => prev + 1);
  };

  const IconComponent = currentConfig.icon;

  return (
    <div
      id="hero-interactive-nexus"
      className={`relative flex flex-col items-center max-w-lg w-full group ${className}`}
    >
      {/* Ambient Radial Aura behind Nexus */}
      <div
        className="absolute -inset-4 rounded-3xl blur-3xl opacity-60 transition-all duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${currentConfig.cssColor}35 0%, #8c52ff20 45%, transparent 70%)`,
        }}
      />

      {/* Main Glassmorphic Reactor Container */}
      <div className="relative w-full rounded-3xl p-3 sm:p-4 bg-[#130f24]/80 backdrop-blur-2xl border border-white/12 shadow-[0_20px_50px_rgba(0,0,0,0.7),0_1px_0_rgba(255,255,255,0.15)_inset] overflow-hidden transition-all duration-300 hover:border-[#dfb098]/50">
        
        {/* Specular Edge Highlight */}
        <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

        {/* Top Telemetry Header */}
        <div className="flex items-center justify-between px-2 pb-2 mb-1 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full animate-pulse shadow-sm"
              style={{ backgroundColor: currentConfig.cssColor }}
            />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#dfb098]">
              Interactive Holographic Core
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={triggerPulse}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold text-[#f4f2f8] bg-[#221c38]/90 hover:bg-[#2e264d] border border-white/10 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
              title="Send an energetic pulse wave through the 3D core"
            >
              <Zap className="w-3 h-3 text-amber-300" />
              <span>Pulse Core</span>
            </button>
            <span className="text-[10px] font-mono text-[#9e97af] hidden sm:inline">
              360° Drag
            </span>
          </div>
        </div>

        {/* 3D WebGL Canvas Stage */}
        <div
          onClick={triggerPulse}
          className="relative w-full h-[220px] sm:h-[250px] rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing bg-gradient-to-b from-[#0a0815]/90 via-[#100c1e]/90 to-[#0b0817]/95 border border-white/5 shadow-inner"
        >
          <div ref={containerRef} className="w-full h-full" />

          {/* Floating Live Badge Overlay on Stage */}
          <div className="absolute top-3 left-3 pointer-events-none z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181329]/85 backdrop-blur-md border border-[#dfb098]/40 shadow-lg">
            <IconComponent className="w-3.5 h-3.5 text-[#dfb098]" />
            <span className="text-xs font-bold text-[#f4f2f8]">
              {currentConfig.badge}
            </span>
          </div>

          {/* Live Pulse Count Badge */}
          {pulseCount > 0 && (
            <div className="absolute top-3 right-3 pointer-events-none z-10 px-2 py-0.5 rounded-full text-[10px] font-mono text-emerald-300 bg-emerald-950/70 border border-emerald-500/40 backdrop-blur-md animate-in fade-in zoom-in duration-200">
              ⚡ Pulse x{pulseCount}
            </div>
          )}

          {/* Bottom Interactive Hint */}
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[10px] text-[#9e97af] pointer-events-none">
            <span className="flex items-center gap-1">
              <Activity className="w-3 h-3 text-[#dfb098]" />
              <span className="hidden sm:inline">Quantum Telemetry:</span> 60 FPS Online
            </span>
            <span className="text-[#dfb098] font-medium">
              Click to pulse • Drag to inspect
            </span>
          </div>
        </div>

        {/* Mode Selector Segmented Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1 mt-2.5 rounded-xl bg-[#0e0b1a]/90 border border-white/10">
          {MODES.map((mode) => {
            const isCurrent = mode.id === activeMode;
            const MIcon = mode.icon;
            return (
              <button
                key={mode.id}
                onClick={() => setActiveMode(mode.id)}
                className={`py-2 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-[#261f38] text-[#f4f2f8] shadow-md border border-[#dfb098]/50'
                    : 'text-[#9e97af] hover:text-[#f4f2f8] hover:bg-white/5'
                }`}
              >
                <MIcon
                  className="w-3.5 h-3.5"
                  style={{ color: isCurrent ? mode.cssColor : undefined }}
                />
                <span className="truncate">{mode.id.toUpperCase()}</span>
              </button>
            );
          })}
        </div>

        {/* Real-time Engineering Metrics Bar */}
        <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-white/10 text-center">
          {currentConfig.metrics.map((metric, idx) => (
            <div key={idx} className="p-1.5 rounded-lg bg-[#181329]/60 border border-white/5">
              <div
                className="text-xs font-bold font-mono"
                style={{ color: currentConfig.cssColor }}
              >
                {metric.value}
              </div>
              <div className="text-[10px] text-[#8c849e] truncate mt-0.5">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
