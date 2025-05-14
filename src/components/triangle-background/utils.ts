import { Triangle, MousePosition } from './types';

export const drawTriangle = (
  ctx: CanvasRenderingContext2D, 
  triangle: Triangle,
  theme: 'dark' | 'light'
): void => {
  ctx.save();
  ctx.translate(triangle.x, triangle.y);
  
  // Draw inverted triangle (pointing down)
  ctx.beginPath();
  ctx.moveTo(0, triangle.size); // Bottom point (centered)
  ctx.lineTo(triangle.size/2, -triangle.size/2); // Top right
  ctx.lineTo(-triangle.size/2, -triangle.size/2); // Top left
  ctx.closePath();
  
  // Apply stroke based on theme
  if (theme === 'dark') {
    ctx.strokeStyle = `rgba(255, 255, 255, ${triangle.opacity})`;
  } else {
    ctx.strokeStyle = `rgba(0, 0, 0, ${triangle.opacity})`;
  }
  
  ctx.lineWidth = triangle.strokeWidth;
  ctx.stroke();
  
  ctx.restore();
};

export const initializeTriangles = (
  canvas: HTMLCanvasElement,
  triangleCount: number,
  theme: 'dark' | 'light'
): Triangle[] => {
  const triangles: Triangle[] = [];

  // Criando uma grade imaginária para distribuir os triângulos de forma mais equilibrada
  const gridCols = Math.ceil(Math.sqrt(triangleCount * canvas.width / canvas.height));
  const gridRows = Math.ceil(triangleCount / gridCols);
  
  const cellWidth = canvas.width / gridCols;
  const cellHeight = canvas.height / gridRows;

  for (let i = 0; i < triangleCount; i++) {
    // Calcula a posição da célula na grade
    const col = i % gridCols;
    const row = Math.floor(i / gridCols);
    
    // Adiciona aleatoriedade dentro de cada célula da grade
    const xOffset = Math.random() * cellWidth * 0.8;
    const yOffset = Math.random() * cellHeight * 0.8;
    
    // Posição base do triângulo (mais distribuída)
    const x = col * cellWidth + xOffset + cellWidth * 0.1;
    const y = row * cellHeight + yOffset + cellHeight * 0.1;
    
    // Ajusta o tamanho em proporção à tela para manter consistência visual
    const screenFactor = Math.min(1, (canvas.width * canvas.height) / (1920 * 1080));
    const baseSize = 5 + Math.random() * 15;
    const size = baseSize * screenFactor * 1.2; // Ligeiramente maior para compensar telas pequenas
    
    triangles.push({
      x,
      y,
      baseX: x,
      baseY: y,
      size,
      angle: Math.random() * Math.PI * 2,
      speed: 0.5 + Math.random() * 1,
      strokeWidth: 1 + Math.random() * 0.5,
      opacity: theme === 'dark' ? 0.2 + Math.random() * 0.3 : 0.5 + Math.random() * 0.4
    });
  }
  
  return triangles;
};

export const updateTrianglePositions = (
  triangles: Triangle[],
  mousePosition: MousePosition,
  canvas: HTMLCanvasElement,
  scrollSpeed: number,
  theme: 'dark' | 'light'
): void => {
  triangles.forEach((triangle) => {
    // 1. Handle mouse/lantern effect
    const dx = mousePosition.x - triangle.x;
    const dy = mousePosition.y - triangle.y;
    const distanceToMouse = Math.sqrt(dx * dx + dy * dy);
    
    const lanternRadius = 150; // 150px radius as specified
    
    if (distanceToMouse < lanternRadius && (theme === 'dark' || distanceToMouse < 50)) {
      // Triangle flees from cursor (stronger in dark mode)
      const fleeForce = theme === 'dark' ? 0.05 : 0.02;
      triangle.x -= dx * fleeForce;
      triangle.y -= dy * fleeForce;
    } else {
      // Return to original position smoothly when not fleeing
      triangle.x += (triangle.baseX - triangle.x) * 0.02;
      triangle.y += (triangle.baseY - triangle.y) * 0.02;
    }
    
    // 2. Handle scroll effect
    if (Math.abs(scrollSpeed) > 0.1) {
      // Direction-based movement
      const direction = scrollSpeed > 0 ? 1 : -1;
      // Apply slight horizontal scatter based on scroll direction
      triangle.x += direction * (Math.random() - 0.5) * Math.abs(scrollSpeed) * 0.1;
      // Vertical movement based on scroll speed
      triangle.y -= direction * Math.abs(scrollSpeed) * 0.2 * triangle.speed;
    }
    
    // 3. Add subtle ambient movement
    if (Math.random() < 0.01) {
      triangle.angle += (Math.random() - 0.5) * 0.05;
    }
    
    // Keep triangles within canvas bounds with wrap-around
    if (triangle.x < -triangle.size) triangle.x = canvas.width + triangle.size;
    if (triangle.x > canvas.width + triangle.size) triangle.x = -triangle.size;
    if (triangle.y < -triangle.size) triangle.y = canvas.height + triangle.size;
    if (triangle.y > canvas.height + triangle.size) triangle.y = -triangle.size;
  });
};

export const setReducedMotion = (triangles: Triangle[], matches: boolean): void => {
  triangles.forEach(triangle => {
    triangle.speed = matches ? 0.1 : 0.5 + Math.random() * 1;
  });
};
