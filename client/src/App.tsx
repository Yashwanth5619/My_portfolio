import { useEffect, useState } from 'react';
import { fallbackProfileData } from './staticFallback';
import Navbar from './components/ui/Navbar';
import CustomCursor from './components/ui/CustomCursor';
import CommandPaletteWrapper from './components/ui/CommandPaletteWrapper';
import TerminalPortfolio from './components/ui/TerminalPortfolio';
import CodeEditor from './components/ui/CodeEditor';
import AnalyticsTracker from './components/ui/AnalyticsTracker';

// Sections
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import SkillsSection from './components/sections/SkillsSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ExperiencesSection from './components/sections/ExperiencesSection';
import AchievementsSection from './components/sections/AchievementsSection';
import ServicesSection from './components/sections/ServicesSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/sections/Footer';

// Subpages
import BlogDetail from './components/sections/BlogDetail';
import AdminPanel from './components/sections/AdminPanel';

export default function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Sync route hashes
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Fetch full portfolio profile data on boot
  useEffect(() => {
    setLoading(true);
    fetch('/api/profile')
      .then((r) => {
        if (!r.ok) throw new Error('Network error');
        return r.json();
      })
      .then((res) => {
        if (res.success) {
          setProfile(res.data);
        } else {
          throw new Error('API failed');
        }
      })
      .catch((e) => {
        console.warn('API call skipped. Using offline static logs fallback.', e);
        // Direct local import mockup fallback
        setProfile(fallbackProfileData);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const navigateToHome = () => {
    window.location.hash = '#/';
  };

  // Determine current active page
  let content = null;
  const isHomepage = currentHash === '' || currentHash === '#/' || currentHash === '#';

  if (loading) {
    content = (
      <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center text-gray-500 font-mono text-xs">
        <div className="h-9 w-9 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin mb-4" />
        Booting ReddyOS services...
      </div>
    );
  } else if (profile) {
    if (currentHash === '#/admin') {
      content = <AdminPanel onBack={navigateToHome} />;
    } else if (currentHash.startsWith('#/blog/')) {
      const slug = currentHash.replace('#/blog/', '');
      content = <BlogDetail slug={slug} onBack={navigateToHome} />;
    } else if (isHomepage) {
      content = (
        <div className="bg-[#030712] text-white">
          <Navbar />
          <HeroSection personalInfo={profile.personalInfo} />
          <AboutSection 
            personalInfo={profile.personalInfo}
            education={profile.education}
            strengths={profile.strengths}
            softSkills={profile.softSkills}
            funFacts={profile.funFacts}
          />
          <SkillsSection skills={profile.skills} />
          <ProjectsSection projects={profile.projects} />
          <ExperiencesSection experiences={profile.experiences} />
          <AchievementsSection 
            achievements={profile.achievements} 
            certificates={profile.certificates} 
          />
          <ServicesSection services={profile.services} />
          <ContactSection personalInfo={profile.personalInfo} />
          <Footer personalInfo={profile.personalInfo} />
        </div>
      );
    }
  }

  return (
    <>
      <AnalyticsTracker currentPath={currentHash} />
      <CustomCursor />
      <CommandPaletteWrapper />
      <TerminalPortfolio />
      <CodeEditor />
      {content}
    </>
  );
}
