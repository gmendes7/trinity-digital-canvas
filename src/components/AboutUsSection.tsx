
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeProvider';

const AboutUsSection = () => {
  const { theme } = useTheme();

  return (
    <section id="about" className={cn("py-24 px-6", theme === 'dark' ? "bg-gray-900" : "bg-gray-100")}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Sobre Nós</h2>
          <div className={cn("w-20 h-1 mx-auto", theme === 'dark' ? "bg-white" : "bg-black")}></div>
        </div>

        <div className="max-w-3xl mx-auto">
          <p className={cn("text-lg mb-8 leading-relaxed text-center", theme === 'dark' ? "text-gray-300" : "text-gray-700")}>
            A Trinity Tecnologias nasceu da paixão por transformar ideias em soluções digitais que fazem a diferença. 
            Nossa equipe é composta por profissionais dedicados e criativos, comprometidos em entregar produtos de alta qualidade.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className={cn("p-6 rounded-lg hover:shadow-lg transition-shadow", 
              theme === 'dark' 
                ? "border border-gray-700 bg-gray-800" 
                : "border border-gray-200 bg-white shadow-sm"
            )}>
              <h3 className="font-bold text-xl mb-4">Missão</h3>
              <p className={theme === 'dark' ? "text-gray-300" : "text-gray-600"}>
                Desenvolver soluções tecnológicas que transformam negócios e simplificam a vida das pessoas.
              </p>
            </div>

            <div className={cn("p-6 rounded-lg hover:shadow-lg transition-shadow", 
              theme === 'dark' 
                ? "border border-gray-700 bg-gray-800" 
                : "border border-gray-200 bg-white shadow-sm"
            )}>
              <h3 className="font-bold text-xl mb-4">Visão</h3>
              <p className={theme === 'dark' ? "text-gray-300" : "text-gray-600"}>
                Ser referência em inovação digital, criando produtos que impactam positivamente a sociedade.
              </p>
            </div>

            <div className={cn("p-6 rounded-lg hover:shadow-lg transition-shadow", 
              theme === 'dark' 
                ? "border border-gray-700 bg-gray-800" 
                : "border border-gray-200 bg-white shadow-sm"
            )}>
              <h3 className="font-bold text-xl mb-4">Valores</h3>
              <p className={theme === 'dark' ? "text-gray-300" : "text-gray-600"}>
                Inovação, qualidade, compromisso, transparência e foco nas necessidades do cliente.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
