
import { useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
import TeamSection from '@/components/TeamSection';
import AboutUsSection from '@/components/AboutUsSection';
import BlogSection from '@/components/BlogSection';
import ContactSection from '@/components/ContactSection';
import TriangleBackground from '@/components/TriangleBackground';
import ConsultingSection from '@/components/ConsultingSection';
import SchedulingSection from '@/components/SchedulingSection';

const Index = () => {
  useEffect(() => {
    // Update the page title
    document.title = 'Trinity Tecnologias | Soluções Digitais';
    // Set body background to black
    document.body.style.backgroundColor = '#000';
    document.body.style.color = '#fff';
    
    return () => {
      // Reset background when unmounting
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <TriangleBackground />
      <HeroSection />
      <AboutUsSection />
      <ProjectsSection />
      <ConsultingSection />
      <SchedulingSection />
      <TeamSection />
      <BlogSection />
      <ContactSection />
    </div>
  );
};

export default Index;
