
import { useTheme } from '@/context/ThemeProvider';
import { useTriangleAnimation } from './useTriangleAnimation';

const TriangleBackground = () => {
  const { theme } = useTheme();
  // Fixed number of triangles as requested
  const TRIANGLE_COUNT = 100;
  
  const { canvasRef } = useTriangleAnimation({
    triangleCount: TRIANGLE_COUNT,
    theme
  });

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default TriangleBackground;
