
import { cn } from '@/lib/utils';

const AboutUsSection = () => {
  return (
    <section id="about" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Sobre Nós</h2>
          <div className="w-20 h-1 bg-black mx-auto"></div>
        </div>

        <div className="max-w-3xl mx-auto">
          <p className="text-lg mb-8 leading-relaxed text-center">
            A Trinity Tecnologias nasceu da paixão por transformar ideias em soluções digitais que fazem a diferença. 
            Nossa equipe é composta por profissionais dedicados e criativos, comprometidos em entregar produtos de alta qualidade.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-xl mb-4">Missão</h3>
              <p className="text-gray-700">Desenvolver soluções tecnológicas que transformam negócios e simplificam a vida das pessoas.</p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-xl mb-4">Visão</h3>
              <p className="text-gray-700">Ser referência em inovação digital, criando produtos que impactam positivamente a sociedade.</p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-xl mb-4">Valores</h3>
              <p className="text-gray-700">Inovação, qualidade, compromisso, transparência e foco nas necessidades do cliente.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
