
import { useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
import TeamSection from '@/components/TeamSection';
import AboutUsSection from '@/components/AboutUsSection';
import BlogSection from '@/components/BlogSection';
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
      <AboutUsSection />
      <ProjectsSection />
      <TeamSection />
      <BlogSection />
      <ContactSection />
    </div>
  );
};

export default Index;
