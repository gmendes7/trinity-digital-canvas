
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
import FeaturedTriangle from '@/components/FeaturedTriangle';
import { useTheme } from '@/context/ThemeProvider';

const Index = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <Header />
      <TriangleBackground />
      <FeaturedTriangle />
      <div className="relative z-10">
        <HeroSection />
        <AboutUsSection />
        <ProjectsSection />
        <ConsultingSection />
        <SchedulingSection />
        <TeamSection />
        <BlogSection />
        <ContactSection />
      </div>
    </div>
  );
};

export default Index;
