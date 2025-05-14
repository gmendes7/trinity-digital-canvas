
import { useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeProvider';
import { cn } from '@/lib/utils';

const FeaturedTriangle = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const triangleRef = useRef<SVGPathElement>(null);
  const textRef = useRef<SVGTextElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    const svg = svgRef.current;
    const triangle = triangleRef.current;
    const text = textRef.current;
    
    if (!svg || !triangle || !text) return;
    
    // Get triangle path length for animation
    const length = triangle.getTotalLength();
    
    // Set initial properties for triangle animation
    triangle.style.strokeDasharray = `${length}`;
    triangle.style.strokeDashoffset = `${length}`;
    
    // Reset animation if needed
    triangle.style.animation = 'none';
    text.style.animation = 'none';
    
    // Set initial visibility
    triangle.style.opacity = '1';
    text.style.opacity = '0';
    svg.style.opacity = '1';
    
    // Trigger reflow
    void triangle.offsetWidth;
    void text.offsetWidth;
    
    // Start animations
    triangle.style.animation = `drawTriangle 2s ease-out forwards`;
    text.style.animation = `fadeIn 1s ease-out 1.5s forwards`;
    
    // Create animation keyframes if they don't exist
    if (!document.querySelector('#triangle-animations')) {
      const style = document.createElement('style');
      style.id = 'triangle-animations';
      style.textContent = `
        @keyframes drawTriangle {
          0% {
            stroke-dashoffset: ${length};
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes dissolve {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    // After animation completes, add dissolve effect
    const dissolveTimeout = setTimeout(() => {
      svg.style.animation = 'dissolve 1.5s ease-out forwards';
    }, 5000);
    
    return () => {
      clearTimeout(dissolveTimeout);
    };
  }, []);
  
  return (
    <div className="flex justify-center items-center h-screen w-full absolute top-0 left-0 z-20 pointer-events-none">
      <svg
        ref={svgRef}
        width="240"
        height="260"
        viewBox="0 0 240 260"
        className="opacity-100"
        style={{ opacity: 1 }}
      >
        <path
          ref={triangleRef}
          d="M120,40 L220,200 L20,200 Z"
          fill="none"
          strokeWidth="4"
          stroke={theme === 'dark' ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.9)'}
          style={{ opacity: 1 }}
          className={cn(
            "opacity-100",
            theme === 'dark' ? "stroke-white" : "stroke-black"
          )}
        />
        <text
          ref={textRef}
          x="120"
          y="230"
          textAnchor="middle"
          fontSize="22"
          fontWeight="bold"
          className={cn(
            theme === 'dark' ? "fill-white" : "fill-black"
          )}
          style={{ opacity: 0 }}
        >
          TRINITY TECNOLOGIAS
        </text>
      </svg>
    </div>
  );
};

export default FeaturedTriangle;
