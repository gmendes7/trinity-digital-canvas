
import { Instagram, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 px-6 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Entre em Contato</h2>
          <div className="w-20 h-1 bg-white mx-auto"></div>
        </div>

        <div className="max-w-xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mb-12">
            <a 
              href="mailto:schjneidermendes@gmail.com" 
              className={cn(
                "flex items-center gap-3 text-white hover:text-gray-300 transition-colors",
                "border border-white/20 p-4 rounded-md w-full sm:w-auto justify-center",
                "hover:border-white"
              )}
            >
              <Mail className="w-5 h-5" />
              <span>schjneidermendes@gmail.com</span>
            </a>
            
            <a 
              href="https://instagram.com/tri.nitytecnologias" 
              target="_blank" 
              rel="noopener noreferrer"
              className={cn(
                "flex items-center gap-3 text-white hover:text-gray-300 transition-colors",
                "border border-white/20 p-4 rounded-md w-full sm:w-auto justify-center",
                "hover:border-white"
              )}
            >
              <Instagram className="w-5 h-5" />
              <span>@tri.nitytecnologias</span>
            </a>
          </div>
          
          <div className="text-center mt-16">
            <p className="mb-2 text-gray-400">© {new Date().getFullYear()} Trinity Tecnologias</p>
            <p className="text-sm text-gray-500">Criamos soluções digitais com propósito e precisão.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
