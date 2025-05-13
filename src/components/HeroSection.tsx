
import { cn } from '@/lib/utils';

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center z-10">
        <h1 className={cn(
          "text-4xl md:text-6xl lg:text-7xl font-bold mb-8",
          "animate-fade-in-slow"
        )}>
          <span className="inline-block">Somos a </span>
          <span className="inline-block font-black">TRINITY </span>
          <span className="inline-block">TECNOLOGIAS.</span>
        </h1>
        <p className={cn(
          "text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-12 leading-relaxed",
          "animate-fade-in"
        )}>
          Criamos soluções digitais com propósito e precisão.
        </p>
        <div className="animate-fade-in" style={{animationDelay: '0.4s'}}>
          <a 
            href="#projects" 
            className="inline-block bg-black text-white px-8 py-4 rounded-md font-medium hover:bg-gray-800 transition-colors"
          >
            Conheça nossos projetos
          </a>
        </div>
      </div>
      <div className="absolute bottom-12 left-0 right-0 mx-auto text-center animate-pulse-subtle">
        <div className="inline-block w-8 h-12 border-2 border-black rounded-full relative">
          <div className="w-1 h-3 bg-black rounded-full absolute left-1/2 top-2 -translate-x-1/2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
