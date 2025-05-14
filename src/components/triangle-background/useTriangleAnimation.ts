
import { useRef, useEffect } from 'react';
import { Triangle, MousePosition } from './types';
import { drawTriangle, initializeTriangles, updateTrianglePositions, setReducedMotion } from './utils';

interface UseTriangleAnimationProps {
  triangleCount: number;
  theme: 'dark' | 'light';
}

export const useTriangleAnimation = ({ triangleCount, theme }: UseTriangleAnimationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trianglesRef = useRef<Triangle[]>([]);
  const mousePositionRef = useRef<MousePosition>({ x: -100, y: -100 }); // Start offscreen
  const lastScrollYRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      trianglesRef.current = initializeTriangles(canvas, triangleCount, theme);
    };

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Get current scroll
      const currentScrollY = window.scrollY;
      const scrollSpeed = currentScrollY - lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;
      
      // Update triangle positions
      updateTrianglePositions(
        trianglesRef.current, 
        mousePositionRef.current, 
        canvas, 
        scrollSpeed, 
        theme
      );
      
      // Draw triangles
      trianglesRef.current.forEach(triangle => {
        drawTriangle(ctx, triangle, theme);
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
    const handleReducedMotion = (event: MediaQueryListEvent | MediaQueryList) => {
      setReducedMotion(trianglesRef.current, event.matches);
    };
    
    if (prefersReducedMotion.matches) {
      handleReducedMotion(prefersReducedMotion);
    }
    
    prefersReducedMotion.addEventListener('change', handleReducedMotion);
    
    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      prefersReducedMotion.removeEventListener('change', handleReducedMotion);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [theme, triangleCount]);

  return { canvasRef };
};
