
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  description: string;
  image: string;
}

const TeamSection = () => {
  const [visibleMembers, setVisibleMembers] = useState<number[]>([]);

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Gabriel Mendes",
      role: "Desenvolvedor Full Stack",
      description: "Especialista em arquitetura de sistemas e integração de tecnologias, com experiência em React, Node.js e AWS.",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Ccircle cx='150' cy='120' r='70' fill='%23e0e0e0'/%3E%3Ccircle cx='150' cy='95' r='35' fill='%23cccccc'/%3E%3Cpath d='M95,220 C95,180 125,160 150,160 C175,160 205,180 205,220' fill='%23e0e0e0'/%3E%3C/svg%3E"
    },
    {
      id: 2,
      name: "Vinicius Hadid",
      role: "Desenvolvedor Front-end",
      description: "Expert em UX/UI e front-end, focado em criar interfaces elegantes e funcionais com React, TailwindCSS e Next.js.",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Ccircle cx='150' cy='120' r='70' fill='%23e0e0e0'/%3E%3Ccircle cx='150' cy='95' r='35' fill='%23cccccc'/%3E%3Cpath d='M95,220 C95,180 125,160 150,160 C175,160 205,180 205,220' fill='%23e0e0e0'/%3E%3C/svg%3E"
    },
    {
      id: 3,
      name: "Pedro Ricaldes",
      role: "Desenvolvedor Back-end",
      description: "Especialista em segurança e arquitetura de APIs, com foco em escalabilidade e performance usando Node.js e Python.",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Ccircle cx='150' cy='120' r='70' fill='%23e0e0e0'/%3E%3Ccircle cx='150' cy='95' r='35' fill='%23cccccc'/%3E%3Cpath d='M95,220 C95,180 125,160 150,160 C175,160 205,180 205,220' fill='%23e0e0e0'/%3E%3C/svg%3E"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = Number(entry.target.getAttribute('data-id'));
          setVisibleMembers(prev => [...prev, id]);
        }
      });
    }, { threshold: 0.3 });

    const elements = document.querySelectorAll('.team-member-card');
    elements.forEach(element => observer.observe(element));

    return () => {
      elements.forEach(element => observer.unobserve(element));
    };
  }, []);

  return (
    <section id="team" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Nossa Equipe</h2>
          <div className="w-20 h-1 bg-black mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {teamMembers.map((member, index) => (
            <div 
              key={member.id}
              data-id={member.id}
              className={cn(
                "team-member-card p-6 transition-all duration-500 ease-out",
                "border-t-2 border-black hover:shadow-lg",
                visibleMembers.includes(member.id) ? "opacity-100" : "opacity-0 translate-y-10"
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-32 h-32 mx-auto mb-6 overflow-hidden rounded-full bg-gray-100">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-500 grayscale hover:grayscale-0"
                />
              </div>
              <h3 className="text-xl font-bold mb-1 text-center">{member.name}</h3>
              <p className="text-gray-600 mb-4 text-center">{member.role}</p>
              <p className="text-gray-600 text-center text-sm">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
