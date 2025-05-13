
import { useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeProvider';

interface Triangle {
  x: number;
  y: number;
  size: number;
  angle: number;
  speed: number;
  targetX: number;
  targetY: number;
}

const TriangleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trianglesRef = useRef<Triangle[]>([]);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);
  const { theme } = useTheme();

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
      // Increase triangle count for more mini triangles
      const trianglesCount = Math.max(100, Math.floor(canvas.width * canvas.height / 10000));
      trianglesRef.current = [];

      for (let i = 0; i < trianglesCount; i++) {
        trianglesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          // Make triangles smaller
          size: Math.random() * 15 + 3,
          angle: Math.random() * Math.PI * 2,
          speed: 0.2 + Math.random() * 0.5,
          targetX: Math.random() * canvas.width,
          targetY: Math.random() * canvas.height
        });
      }
    };

    // Draw a single triangle
    const drawTriangle = (x: number, y: number, size: number, angle: number) => {
      if (!ctx) return;
      
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      
      ctx.beginPath();
      ctx.moveTo(0, -size / 2);
      ctx.lineTo(size / 2, size / 2);
      ctx.lineTo(-size / 2, size / 2);
      ctx.closePath();
      
      const distanceToMouse = Math.hypot(x - mousePositionRef.current.x, y - mousePositionRef.current.y);
      // Lantern effect: triangles are visible near mouse, fade out further away
      const visibilityRadius = 300;
      const alpha = theme === 'dark' 
        ? Math.min(1, Math.max(0.05, 1 - (distanceToMouse / visibilityRadius))) 
        : Math.min(0.7, Math.max(0.05, distanceToMouse / 300));
      
      // White triangles for dark mode, dark triangles for light mode
      const color = theme === 'dark' ? 'rgba(255, 255, 255, ' : 'rgba(20, 20, 20, ';
      ctx.fillStyle = `${color}${alpha})`;
      ctx.fill();
      
      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw triangles
      trianglesRef.current.forEach((triangle) => {
        // Calculate distance to mouse
        const dx = mousePositionRef.current.x - triangle.x;
        const dy = mousePositionRef.current.y - triangle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Enhanced fleeing effect
        if (distance < 300) {
          const angle = Math.atan2(dy, dx);
          const force = (300 - distance) / 5;
          
          // Triangles flee from the mouse (reverse direction)
          triangle.x -= Math.cos(angle) * force * triangle.speed;
          triangle.y -= Math.sin(angle) * force * triangle.speed;
          
          // Keep triangles within canvas
          if (triangle.x < 0) triangle.x = canvas.width;
          if (triangle.x > canvas.width) triangle.x = 0;
          if (triangle.y < 0) triangle.y = canvas.height;
          if (triangle.y > canvas.height) triangle.y = 0;
        } else {
          // Gentle random movement when not affected by mouse
          triangle.angle += (Math.random() - 0.5) * 0.01;
          
          // Update position with random movement
          if (Math.random() < 0.01) {
            triangle.targetX = Math.random() * canvas.width;
            triangle.targetY = Math.random() * canvas.height;
          }
          
          // Move towards target
          const tx = triangle.targetX - triangle.x;
          const ty = triangle.targetY - triangle.y;
          const dist = Math.sqrt(tx * tx + ty * ty);
          
          if (dist > 1) {
            triangle.x += (tx / dist) * triangle.speed * 0.5;
            triangle.y += (ty / dist) * triangle.speed * 0.5;
          }
        }
        
        // Draw triangle
        drawTriangle(triangle.x, triangle.y, triangle.size, triangle.angle);
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

    // Set canvas dimensions and initialize
    setCanvasDimensions();
    
    // Add event listeners
    window.addEventListener('resize', setCanvasDimensions);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [theme]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
};

export default TriangleBackground;
