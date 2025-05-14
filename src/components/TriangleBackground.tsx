import { useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeProvider';

interface Triangle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  angle: number;
  speed: number;
  strokeWidth: number;
  opacity: number;
}

const TriangleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trianglesRef = useRef<Triangle[]>([]);
  const mousePositionRef = useRef({ x: -100, y: -100 }); // Start offscreen
  const lastScrollYRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const { theme } = useTheme();

  // Número fixo de triângulos
  const TRIANGLE_COUNT = 100;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initTriangles();
    };

    // Initialize triangles
    const initTriangles = () => {
      trianglesRef.current = [];

      // Criando uma grade imaginária para distribuir os triângulos de forma mais equilibrada
      const gridCols = Math.ceil(Math.sqrt(TRIANGLE_COUNT * canvas.width / canvas.height));
      const gridRows = Math.ceil(TRIANGLE_COUNT / gridCols);
      
      const cellWidth = canvas.width / gridCols;
      const cellHeight = canvas.height / gridRows;

      for (let i = 0; i < TRIANGLE_COUNT; i++) {
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
        
        trianglesRef.current.push({
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
    };

    // Draw an inverted triangle (pointing down)
    const drawTriangle = (triangle: Triangle) => {
      if (!ctx) return;
      
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

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Get current scroll
      const currentScrollY = window.scrollY;
      const scrollSpeed = currentScrollY - lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;
      
      // Update and draw triangles
      trianglesRef.current.forEach((triangle) => {
        // 1. Handle mouse/lantern effect
        const dx = mousePositionRef.current.x - triangle.x;
        const dy = mousePositionRef.current.y - triangle.y;
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
        
        // Draw the triangle
        drawTriangle(triangle);
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };
    
    // Track scroll for subtle movement
    const handleScroll = () => {
      // Logic moved to the animation loop for smoother effect
    };

    // Set canvas dimensions and initialize
    setCanvasDimensions();
    
    // Add event listeners
    window.addEventListener('resize', setCanvasDimensions);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    // Support prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const setReducedMotion = (matches: boolean) => {
      trianglesRef.current.forEach(triangle => {
        triangle.speed = matches ? 0.1 : 0.5 + Math.random() * 1;
      });
    };
    
    if (prefersReducedMotion.matches) {
      setReducedMotion(true);
    }
    
    prefersReducedMotion.addEventListener('change', (event) => {
      setReducedMotion(event.matches);
    });
    
    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      prefersReducedMotion.removeEventListener('change', (event) => {
        setReducedMotion(event.matches);
      });
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [theme, TRIANGLE_COUNT]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default TriangleBackground;
