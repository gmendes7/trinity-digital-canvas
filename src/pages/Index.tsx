
import { useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
import TeamSection from '@/components/TeamSection';
import ContactSection from '@/components/ContactSection';
import TriangleBackground from '@/components/TriangleBackground';

const Index = () => {
  useEffect(() => {
    // Update the page title
    document.title = 'Trinity Tecnologias | Soluções Digitais';
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <TriangleBackground />
      <HeroSection />
      <ProjectsSection />
      <TeamSection />
      <ContactSection />
    </div>
  );
};

export default Index;
