
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
}

const ProjectsSection = () => {
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);

  const projects: Project[] = [
    {
      id: 1,
      title: "Sistema de agendamento inteligente",
      description: "Plataforma que utiliza IA para otimizar agendamentos e reduzir conflitos de horários, aumentando produtividade em 40%.",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f0f0f0'/%3E%3Cpath d='M120,70 L180,70 L180,130 L120,130 Z' fill='%23e0e0e0' stroke='%23000000' stroke-width='2'/%3E%3Cpath d='M140,85 L160,85 M140,100 L160,100 M140,115 L160,115' stroke='%23666666' stroke-width='2'/%3E%3C/svg%3E"
    },
    {
      id: 2,
      title: "Loja virtual com IA de recomendação",
      description: "E-commerce personalizado com sistema avançado de recomendações baseado no comportamento do usuário e tendências de mercado.",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f0f0f0'/%3E%3Crect x='70' y='60' width='160' height='80' fill='%23e0e0e0' stroke='%23000000' stroke-width='2'/%3E%3Cpath d='M100,90 L130,90 M100,110 L170,110' stroke='%23666666' stroke-width='2'/%3E%3Ccircle cx='200' cy='90' r='15' fill='%23cccccc' stroke='%23000000' stroke-width='2'/%3E%3C/svg%3E"
    },
    {
      id: 3,
      title: "Dashboard de análise de dados",
      description: "Interface interativa para visualização e análise de dados em tempo real, facilitando tomadas de decisão estratégicas baseadas em métricas precisas.",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f0f0f0'/%3E%3Cpath d='M50,150 L50,70 L100,100 L150,50 L200,80 L250,60' stroke='%23000000' stroke-width='2' fill='none'/%3E%3Cpath d='M50,150 L250,150' stroke='%23666666' stroke-width='2'/%3E%3Ccircle cx='100' cy='100' r='4' fill='%23000000'/%3E%3Ccircle cx='150' cy='50' r='4' fill='%23000000'/%3E%3Ccircle cx='200' cy='80' r='4' fill='%23000000'/%3E%3Ccircle cx='250' cy='60' r='4' fill='%23000000'/%3E%3C/svg%3E"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = Number(entry.target.getAttribute('data-id'));
          setVisibleProjects(prev => [...prev, id]);
        }
      });
    }, { threshold: 0.3 });

    const elements = document.querySelectorAll('.project-card');
    elements.forEach(element => observer.observe(element));

    return () => {
      elements.forEach(element => observer.unobserve(element));
    };
  }, []);

  return (
    <section id="projects" className="py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Nossos Projetos</h2>
          <div className="w-20 h-1 bg-black mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project) => (
            <div 
              key={project.id}
              data-id={project.id}
              className={cn(
                "project-card bg-white p-6 rounded-lg shadow-lg transition-all duration-500",
                "transform hover:translate-y-[-5px] hover:shadow-xl",
                visibleProjects.includes(project.id) ? "opacity-100" : "opacity-0 translate-y-10"
              )}
            >
              <div className="mb-6 overflow-hidden rounded-md h-48">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">{project.title}</h3>
              <p className="text-gray-600 text-sm">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
