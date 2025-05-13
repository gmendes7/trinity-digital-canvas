
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
import { useTheme } from '@/context/ThemeProvider';

const Index = () => {
  const { theme } = useTheme();

  // No need for the useEffect for theme here anymore as it's handled by ThemeProvider

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
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
