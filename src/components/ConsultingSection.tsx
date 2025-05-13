
import { useState, useEffect } from 'react';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const ConsultingSection = () => {
  const [visible, setVisible] = useState(false);

  const services: Service[] = [
    {
      id: 1,
      title: "Consultoria em Arquitetura de Software",
      description: "Analisamos sua infraestrutura atual e projetamos soluções escaláveis para otimizar o desempenho dos seus sistemas.",
      icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' /%3E%3C/svg%3E"
    },
    {
      id: 2,
      title: "Transformação Digital",
      description: "Acompanhamos sua empresa na jornada de modernização tecnológica, implementando soluções que impulsionam a eficiência operacional.",
      icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M13 10V3L4 14h7v7l9-11h-7z' /%3E%3C/svg%3E"
    },
    {
      id: 3,
      title: "Segurança Cibernética",
      description: "Avaliamos vulnerabilidades, implementamos protocolos de proteção e treinamos sua equipe para mitigar riscos de segurança.",
      icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' /%3E%3C/svg%3E"
    },
    {
      id: 4,
      title: "Inteligência de Negócios",
      description: "Desenvolvemos estratégias baseadas em dados para otimizar processos decisórios e identificar oportunidades de crescimento.",
      icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' /%3E%3C/svg%3E"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('consulting');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section id="consulting" className="py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Consultoria</h2>
          <div className="w-20 h-1 bg-white mx-auto mb-8"></div>
          <p className="max-w-2xl mx-auto text-lg text-gray-300 mb-12">
            Oferecemos serviços de consultoria especializados para impulsionar o crescimento do seu negócio através da tecnologia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {services.map((service) => (
            <div 
              key={service.id} 
              className={`flex bg-gray-800 rounded-lg p-6 transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${service.id * 100}ms` }}
            >
              <div className="flex-shrink-0 mr-5">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                  <img src={service.icon} alt={service.title} className="w-8 h-8" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConsultingSection;
