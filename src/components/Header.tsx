
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      if (scrollTop > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const navItems = [
    { name: 'Início', href: '#home' },
    { name: 'Projetos', href: '#projects' },
    { name: 'Equipe', href: '#team' },
    { name: 'Contato', href: '#contact' },
  ];

  return (
    <header 
      className={cn(
        'fixed w-full z-30 transition-all duration-300 px-6 md:px-12',
        isScrolled ? 'py-4 backdrop-blur-md bg-white/80 shadow-sm' : 'py-6'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#home" className="flex items-center">
          <div className="font-bold text-xl tracking-tighter">
            <span className="inline-block transform -skew-x-6">TRINITY</span>
            <span className="text-gray-500 ml-1">TECNOLOGIAS</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-10">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-800 hover:text-black link-underline text-sm font-medium"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Mobile Navigation Toggle */}
        <button 
          className="md:hidden p-2 rounded-md focus:outline-none"
          onClick={toggleMobileNav}
          aria-label="Toggle mobile menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={cn(
              "w-full h-0.5 bg-black transition-all duration-300", 
              isMobileNavOpen && "transform rotate-45 translate-y-2"
            )}></span>
            <span className={cn(
              "w-full h-0.5 bg-black transition-all duration-300", 
              isMobileNavOpen && "opacity-0"
            )}></span>
            <span className={cn(
              "w-full h-0.5 bg-black transition-all duration-300", 
              isMobileNavOpen && "transform -rotate-45 -translate-y-2"
            )}></span>
          </div>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={cn(
        "md:hidden absolute top-full left-0 w-full bg-white shadow-lg transition-all duration-300 ease-in-out z-20",
        isMobileNavOpen ? "max-h-64 py-4" : "max-h-0 overflow-hidden"
      )}>
        <div className="px-6 flex flex-col space-y-4">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-800 hover:text-black py-2 text-sm font-medium"
              onClick={() => setIsMobileNavOpen(false)}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
