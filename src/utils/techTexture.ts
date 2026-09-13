import * as THREE from 'three';

// Texture cache to prevent redundant canvas operations across multiple 3D viewports
const textureCache = new Map<string, THREE.CanvasTexture>();

// Draws crisp, high-DPI circular badges for technologies onto HTML5 Canvases
export function createTechBadgeTexture(
  techName: string,
  brandColor: string,
  symbolText: string,
  isSpecialIcon?: (ctx: CanvasRenderingContext2D, size: number) => void
): THREE.CanvasTexture {
  const cacheKey = `${techName}_${brandColor}_${symbolText}`;
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    const fallbackTexture = new THREE.CanvasTexture(canvas);
    return fallbackTexture;
  }

  // Clear
  ctx.clearRect(0, 0, size, size);

  // Outer obsidian circular disc body
  const grad = ctx.createRadialGradient(size / 2, size / 2, 40, size / 2, size / 2, size / 2);
  grad.addColorStop(0, '#221e35');
  grad.addColorStop(0.85, '#151322');
  grad.addColorStop(1, '#0c0a14');

  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - 16, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();

  // Subtle Rose Gold outer bezel
  ctx.lineWidth = 10;
  ctx.strokeStyle = '#dfb098';
  ctx.stroke();

  // Inner accent ring in brand color
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - 28, 0, Math.PI * 2);
  ctx.lineWidth = 5;
  ctx.strokeStyle = brandColor;
  ctx.stroke();

  // Draw custom vector icon or clean typography
  if (isSpecialIcon) {
    isSpecialIcon(ctx, size);
  } else {
    // Default logo symbol
    ctx.fillStyle = brandColor;
    ctx.font = 'bold 130px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(symbolText, size / 2, size / 2 - 24);
  }

  // Label text at bottom of badge in crisp white/rose-gold - strictly horizontal & upright
  ctx.fillStyle = '#f4f2f8';
  ctx.font = 'bold 42px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(techName, size / 2, size / 2 + 130);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  textureCache.set(cacheKey, texture);
  return texture;
}

export interface TechOrbitNode {
  id: string;
  name: string;
  aliasPatterns: string[];
  color: string;
  hexColor: number;
  symbol: string;
  category: 'frontend' | 'backend' | 'database' | 'systems';
  customDraw?: (ctx: CanvasRenderingContext2D, size: number) => void;
}

export const ALL_TECH_ORBIT_NODES: TechOrbitNode[] = [
  {
    id: 'react',
    name: 'React',
    aliasPatterns: ['react'],
    color: '#087ea4',
    hexColor: 0x087ea4,
    symbol: '⚛',
    category: 'frontend',
    customDraw: (ctx, size) => {
      const cx = size / 2;
      const cy = size / 2 - 24;
      ctx.strokeStyle = '#087ea4';
      ctx.lineWidth = 12;
      ctx.fillStyle = '#087ea4';

      // Center atom
      ctx.beginPath();
      ctx.arc(cx, cy, 22, 0, Math.PI * 2);
      ctx.fill();

      // Orbits
      for (let angle = 0; angle < Math.PI; angle += Math.PI / 3) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.ellipse(0, 0, 110, 42, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
    },
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    aliasPatterns: ['next.js', 'next.js 14', 'next'],
    color: '#000000',
    hexColor: 0x222222,
    symbol: 'N',
    category: 'frontend',
    customDraw: (ctx, size) => {
      const cx = size / 2;
      const cy = size / 2 - 24;
      ctx.fillStyle = '#111111';
      ctx.beginPath();
      ctx.arc(cx, cy, 90, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = '900 120px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('N', cx - 10, cy);
    },
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    aliasPatterns: ['typescript', 'ts'],
    color: '#3178c6',
    hexColor: 0x3178c6,
    symbol: 'TS',
    category: 'frontend',
    customDraw: (ctx, size) => {
      const cx = size / 2;
      const cy = size / 2 - 24;
      ctx.fillStyle = '#3178c6';
      ctx.beginPath();
      ctx.roundRect(cx - 85, cy - 85, 170, 170, 30);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 90px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('TS', cx, cy + 5);
    },
  },
  {
    id: 'cpp',
    name: 'C++20',
    aliasPatterns: ['c++', 'c++20', 'cpp'],
    color: '#00599c',
    hexColor: 0x00599c,
    symbol: 'C++',
    category: 'systems',
    customDraw: (ctx, size) => {
      const cx = size / 2;
      const cy = size / 2 - 24;
      ctx.fillStyle = '#00599c';
      ctx.beginPath();
      ctx.roundRect(cx - 85, cy - 85, 170, 170, 30);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = '800 80px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('C++', cx, cy + 5);
    },
  },
  {
    id: 'python',
    name: 'Python',
    aliasPatterns: ['python', 'python 3', 'django'],
    color: '#3776ab',
    hexColor: 0x3776ab,
    symbol: 'Py',
    category: 'backend',
    customDraw: (ctx, size) => {
      const cx = size / 2;
      const cy = size / 2 - 24;
      // Dual-tone pill
      ctx.fillStyle = '#3776ab';
      ctx.beginPath();
      ctx.arc(cx - 20, cy - 20, 60, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffcf3e';
      ctx.beginPath();
      ctx.arc(cx + 20, cy + 20, 60, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 70px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('PY', cx, cy);
    },
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    aliasPatterns: ['node.js', 'node'],
    color: '#539e43',
    hexColor: 0x539e43,
    symbol: 'Node',
    category: 'backend',
    customDraw: (ctx, size) => {
      const cx = size / 2;
      const cy = size / 2 - 24;
      ctx.fillStyle = '#539e43';
      ctx.beginPath();
      // Hexagon
      const r = 90;
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3;
        const x = cx + r * Math.cos(a);
        const y = cy + r * Math.sin(a);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 55px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('NODE', cx, cy);
    },
  },
  {
    id: 'express',
    name: 'Express',
    aliasPatterns: ['express', 'express.js'],
    color: '#333333',
    hexColor: 0x333333,
    symbol: 'ex',
    category: 'backend',
    customDraw: (ctx, size) => {
      const cx = size / 2;
      const cy = size / 2 - 24;
      ctx.fillStyle = '#222222';
      ctx.beginPath();
      ctx.roundRect(cx - 80, cy - 80, 160, 160, 30);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 85px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('ex', cx, cy + 6);
    },
  },
  {
    id: 'mysql',
    name: 'MySQL',
    aliasPatterns: ['mysql'],
    color: '#00758f',
    hexColor: 0x00758f,
    symbol: 'SQL',
    category: 'database',
    customDraw: (ctx, size) => {
      const cx = size / 2;
      const cy = size / 2 - 24;
      ctx.fillStyle = '#00758f';
      ctx.beginPath();
      ctx.arc(cx, cy, 85, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#f29111';
      ctx.font = '800 60px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('MySQL', cx, cy);
    },
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    aliasPatterns: ['mongodb', 'mongo'],
    color: '#13aa52',
    hexColor: 0x13aa52,
    symbol: 'Mongo',
    category: 'database',
    customDraw: (ctx, size) => {
      const cx = size / 2;
      const cy = size / 2 - 24;
      ctx.fillStyle = '#13aa52';
      ctx.beginPath();
      ctx.arc(cx, cy, 85, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 50px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('MONGO', cx, cy);
    },
  },
  {
    id: 'socketio',
    name: 'Socket.io',
    aliasPatterns: ['socket.io', 'websocket', 'websockets'],
    color: '#010101',
    hexColor: 0x111111,
    symbol: '⚡',
    category: 'backend',
    customDraw: (ctx, size) => {
      const cx = size / 2;
      const cy = size / 2 - 24;
      ctx.fillStyle = '#111111';
      ctx.beginPath();
      ctx.arc(cx, cy, 85, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 85px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('⚡', cx, cy + 8);
    },
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    aliasPatterns: ['tailwind css', 'tailwind', 'tailwindcss'],
    color: '#06b6d4',
    hexColor: 0x06b6d4,
    symbol: 'TW',
    category: 'frontend',
    customDraw: (ctx, size) => {
      const cx = size / 2;
      const cy = size / 2 - 24;
      ctx.fillStyle = '#06b6d4';
      ctx.beginPath();
      ctx.arc(cx, cy, 85, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = '900 80px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('~', cx, cy - 5);
    },
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    aliasPatterns: ['git', 'github', 'git / github'],
    color: '#f05032',
    hexColor: 0xf05032,
    symbol: 'Git',
    category: 'systems',
    customDraw: (ctx, size) => {
      const cx = size / 2;
      const cy = size / 2 - 24;
      ctx.fillStyle = '#f05032';
      ctx.beginPath();
      ctx.roundRect(cx - 80, cy - 80, 160, 160, 30);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 70px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('GIT', cx, cy + 6);
    },
  },
  {
    id: 'opencv',
    name: 'OpenCV',
    aliasPatterns: ['opencv', 'computer vision', 'vision'],
    color: '#00ff00',
    hexColor: 0x00ff00,
    symbol: 'CV',
    category: 'systems',
    customDraw: (ctx, size) => {
      const cx = size / 2;
      const cy = size / 2 - 24;
      // 3 intersecting circles
      ctx.fillStyle = '#ff3333';
      ctx.beginPath();
      ctx.arc(cx, cy - 35, 26, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#33ff33';
      ctx.beginPath();
      ctx.arc(cx - 30, cy + 22, 26, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#3388ff';
      ctx.beginPath();
      ctx.arc(cx + 30, cy + 22, 26, 0, Math.PI * 2);
      ctx.fill();

      // Hollow inner holes
      ctx.fillStyle = '#151322';
      ctx.beginPath();
      ctx.arc(cx, cy - 35, 12, 0, Math.PI * 2);
      ctx.arc(cx - 30, cy + 22, 12, 0, Math.PI * 2);
      ctx.arc(cx + 30, cy + 22, 12, 0, Math.PI * 2);
      ctx.fill();
    },
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    aliasPatterns: ['fastapi', 'fastapi & rest'],
    color: '#059669',
    hexColor: 0x059669,
    symbol: 'API',
    category: 'backend',
    customDraw: (ctx, size) => {
      const cx = size / 2;
      const cy = size / 2 - 24;
      ctx.fillStyle = '#059669';
      ctx.beginPath();
      ctx.arc(cx, cy, 80, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      // lightning bolt
      ctx.moveTo(cx + 10, cy - 45);
      ctx.lineTo(cx - 30, cy + 5);
      ctx.lineTo(cx - 5, cy + 5);
      ctx.lineTo(cx - 10, cy + 45);
      ctx.lineTo(cx + 30, cy - 5);
      ctx.lineTo(cx + 5, cy - 5);
      ctx.closePath();
      ctx.fill();
    },
  },
  {
    id: 'cielab',
    name: 'CIELAB Color',
    aliasPatterns: ['cielab', 'cielab color space', 'color spaces (cielab/hsv)', 'color theory'],
    color: '#dfb098',
    hexColor: 0xdfb098,
    symbol: 'LAB',
    category: 'systems',
    customDraw: (ctx, size) => {
      const cx = size / 2;
      const cy = size / 2 - 24;
      const grad = ctx.createLinearGradient(cx - 70, cy - 70, cx + 70, cy + 70);
      grad.addColorStop(0, '#f59e0b');
      grad.addColorStop(0.5, '#ec4899');
      grad.addColorStop(1, '#3b82f6');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, 78, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#151322';
      ctx.beginPath();
      ctx.arc(cx, cy, 32, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#dfb098';
      ctx.font = 'bold 36px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('L*a*b*', cx, cy);
    },
  },
  {
    id: 'sfml',
    name: 'SFML 3',
    aliasPatterns: ['sfml', 'sfml 3'],
    color: '#8cc445',
    hexColor: 0x8cc445,
    symbol: 'SFML',
    category: 'systems',
    customDraw: (ctx, size) => {
      const cx = size / 2;
      const cy = size / 2 - 24;
      ctx.fillStyle = '#2e3842';
      ctx.beginPath();
      ctx.roundRect(cx - 85, cy - 85, 170, 170, 30);
      ctx.fill();

      ctx.fillStyle = '#8cc445';
      ctx.font = 'bold 50px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('SFML', cx, cy + 6);
    },
  },
  {
    id: 'dsa',
    name: 'Data Structures',
    aliasPatterns: ['custom dsa', 'data structures', 'graph algorithms', 'dsa'],
    color: '#845bb0',
    hexColor: 0x845bb0,
    symbol: 'DSA',
    category: 'systems',
    customDraw: (ctx, size) => {
      const cx = size / 2;
      const cy = size / 2 - 24;
      ctx.fillStyle = '#845bb0';
      ctx.beginPath();
      ctx.arc(cx, cy, 85, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = '900 60px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('DSA', cx, cy + 4);
    },
  },
  {
    id: 'django',
    name: 'Django',
    aliasPatterns: ['django', 'django rest framework'],
    color: '#092e20',
    hexColor: 0x092e20,
    symbol: 'dj',
    category: 'backend',
    customDraw: (ctx, size) => {
      const cx = size / 2;
      const cy = size / 2 - 24;
      ctx.fillStyle = '#092e20';
      ctx.beginPath();
      ctx.arc(cx, cy, 85, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 85px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('dj', cx, cy + 6);
    },
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    aliasPatterns: ['postgresql', 'postgres'],
    color: '#336791',
    hexColor: 0x336791,
    symbol: 'PG',
    category: 'database',
    customDraw: (ctx, size) => {
      const cx = size / 2;
      const cy = size / 2 - 24;
      ctx.fillStyle = '#336791';
      ctx.beginPath();
      ctx.arc(cx, cy, 85, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 70px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('PG', cx, cy + 4);
    },
  },
  {
    id: 'fcm',
    name: 'FCM Push',
    aliasPatterns: ['fcm', 'firebase cloud messaging', 'push notifications'],
    color: '#ffca28',
    hexColor: 0xffca28,
    symbol: 'FCM',
    category: 'backend',
    customDraw: (ctx, size) => {
      const cx = size / 2;
      const cy = size / 2 - 24;
      ctx.fillStyle = '#ffca28';
      ctx.beginPath();
      ctx.arc(cx, cy, 85, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#100e1b';
      ctx.font = '900 55px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('FCM', cx, cy + 4);
    },
  },
  {
    id: 'jwt',
    name: 'JWT Auth',
    aliasPatterns: ['jwt', 'json web tokens', 'auth'],
    color: '#d63aff',
    hexColor: 0xd63aff,
    symbol: 'JWT',
    category: 'backend',
    customDraw: (ctx, size) => {
      const cx = size / 2;
      const cy = size / 2 - 24;
      ctx.fillStyle = '#291738';
      ctx.beginPath();
      ctx.arc(cx, cy, 85, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#d63aff';
      ctx.lineWidth = 6;
      ctx.stroke();

      ctx.fillStyle = '#d63aff';
      ctx.font = 'bold 55px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('JWT', cx, cy + 4);
    },
  },
  {
    id: 'rest',
    name: 'REST APIs',
    aliasPatterns: ['rest apis', 'rest api', 'rest', 'apis'],
    color: '#6366f1',
    hexColor: 0x6366f1,
    symbol: 'REST',
    category: 'backend',
    customDraw: (ctx, size) => {
      const cx = size / 2;
      const cy = size / 2 - 24;
      ctx.fillStyle = '#6366f1';
      ctx.beginPath();
      ctx.roundRect(cx - 80, cy - 80, 160, 160, 24);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 48px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('REST', cx, cy + 4);
    },
  },
  {
    id: 'graph',
    name: 'Graph Algos',
    aliasPatterns: ['graph algorithms', 'graph', 'a* pathfinding', 'bfs/dfs'],
    color: '#ec4899',
    hexColor: 0xec4899,
    symbol: 'Graph',
    category: 'systems',
    customDraw: (ctx, size) => {
      const cx = size / 2;
      const cy = size / 2 - 24;
      ctx.fillStyle = '#1c152b';
      ctx.beginPath();
      ctx.arc(cx, cy, 85, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#ec4899';
      ctx.lineWidth = 5;
      // Connect 3 nodes
      ctx.beginPath();
      ctx.moveTo(cx - 40, cy + 30);
      ctx.lineTo(cx, cy - 35);
      ctx.lineTo(cx + 40, cy + 30);
      ctx.stroke();

      // Nodes
      ctx.fillStyle = '#ec4899';
      [[-40, 30], [0, -35], [40, 30]].forEach(([nx, ny]) => {
        ctx.beginPath();
        ctx.arc(cx + nx, cy + ny, 16, 0, Math.PI * 2);
        ctx.fill();
      });
    },
  },
];

/**
 * Finds or synthesizes a TechOrbitNode for any given technology string
 */
export function findTechOrbitNode(name: string): TechOrbitNode {
  const query = name.trim().toLowerCase();
  const matched = ALL_TECH_ORBIT_NODES.find(
    (n) =>
      n.name.toLowerCase() === query ||
      n.aliasPatterns.some((pattern) => query.includes(pattern) || pattern.includes(query))
  );

  if (matched) return matched;

  // Fallback graceful procedural node with rose-gold metallic styling
  const initials = name
    .split(/[\s-]+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();

  return {
    id: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    name: name,
    aliasPatterns: [query],
    color: '#dfb098',
    hexColor: 0xdfb098,
    symbol: initials || 'DEV',
    category: 'backend',
  };
}

