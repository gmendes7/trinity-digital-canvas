
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '@/context/ThemeProvider';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { theme } = useTheme();

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
    { name: 'Início', href: '/#home' },
    { name: 'Sobre', href: '/#about' },
    { name: 'Projetos', href: '/#projects' },
    { name: 'Equipe', href: '/#team' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contato', href: '/#contact' },
  ];

  return (
    <header 
      className={cn(
        'fixed w-full z-30 transition-all duration-300 px-6 md:px-12',
        isScrolled 
          ? theme === 'dark' 
            ? 'py-4 backdrop-blur-md bg-black/80 shadow-sm' 
            : 'py-4 backdrop-blur-md bg-white/80 shadow-sm' 
          : 'py-6'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <div className="font-bold text-xl tracking-tighter">
            <span className="inline-block transform -skew-x-6">TRINITY</span>
            <span className={cn("ml-1", theme === 'dark' ? "text-gray-400" : "text-gray-500")}>TECNOLOGIAS</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-10">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "hover:text-black link-underline text-sm font-medium",
                theme === 'dark' ? "text-gray-300 hover:text-white" : "text-gray-800 hover:text-black"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <ThemeToggle />
          
          {/* Mobile Navigation Toggle */}
          <button 
            className="md:hidden p-2 rounded-md focus:outline-none"
            onClick={toggleMobileNav}
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={cn(
                "w-full h-0.5 transition-all duration-300", 
                theme === 'dark' ? "bg-white" : "bg-black",
                isMobileNavOpen && "transform rotate-45 translate-y-2"
              )}></span>
              <span className={cn(
                "w-full h-0.5 transition-all duration-300", 
                theme === 'dark' ? "bg-white" : "bg-black",
                isMobileNavOpen && "opacity-0"
              )}></span>
              <span className={cn(
                "w-full h-0.5 transition-all duration-300", 
                theme === 'dark' ? "bg-white" : "bg-black",
                isMobileNavOpen && "transform -rotate-45 -translate-y-2"
              )}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={cn(
        "md:hidden absolute top-full left-0 w-full shadow-lg transition-all duration-300 ease-in-out z-20",
        theme === 'dark' ? "bg-black" : "bg-white",
        isMobileNavOpen ? "max-h-64 py-4" : "max-h-0 overflow-hidden"
      )}>
        <div className="px-6 flex flex-col space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "py-2 text-sm font-medium",
                theme === 'dark' ? "text-gray-300 hover:text-white" : "text-gray-800 hover:text-black"
              )}
              onClick={() => setIsMobileNavOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
