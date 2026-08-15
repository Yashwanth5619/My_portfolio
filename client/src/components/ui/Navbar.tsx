import { useState, useEffect } from 'react';
import { 
  Menu, X, Terminal, Code2, Search, 
  Sun, Moon, FileText 
} from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isDark, setIsDark] = useState(true);

  // Handle scroll shadow overlays and active highlights
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (window.location.hash !== '' && window.location.hash !== '#/') return;

      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'achievements', 'contact'];
      const scrollPos = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    
    if (window.location.hash !== '' && window.location.hash !== '#/') {
      window.location.hash = '#/';
      setTimeout(() => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      setIsDark(false);
    } else {
      html.classList.add('dark');
      setIsDark(true);
    }
  };

  const openTerminal = () => {
    window.dispatchEvent(new CustomEvent('toggle-terminal'));
  };

  const openSandbox = () => {
    window.dispatchEvent(new CustomEvent('toggle-sandbox'));
  };

  const openSearch = () => {
    const e = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, metaKey: true, bubbles: true });
    window.dispatchEvent(e);
  };

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Experience', id: 'experience' },
    { label: 'Achievements', id: 'achievements' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#030712]/80 dark:bg-[#030712]/80 backdrop-blur-md border-b border-gray-800/50 py-3 shadow-lg' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-1.5 cursor-pointer font-title font-bold text-xl tracking-tight text-white select-none group"
          >
            <span className="text-cyan-400 group-hover:rotate-12 transition-transform duration-300">&lt;</span>
            <span>Yashwanth</span>
            <span className="text-blue-500 font-mono">.Reddy</span>
            <span className="text-cyan-400">/&gt;</span>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = activeSection === item.id && (window.location.hash === '' || window.location.hash === '#/');
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-sm font-medium tracking-wide transition-all hover:text-cyan-400 cursor-pointer ${
                    isActive ? 'text-cyan-400 font-semibold scale-105' : 'text-gray-400'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={openSearch}
              title="Search Command Palette (Ctrl+K)"
              className="p-2 rounded-lg border border-gray-800 bg-gray-900/40 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono select-none"
            >
              <Search className="h-4 w-4" />
              <kbd className="text-[10px] bg-gray-950 border border-gray-800 px-1 rounded text-gray-500">Ctrl+K</kbd>
            </button>

            <button
              onClick={openSandbox}
              title="Open Algorithm Sandbox"
              className="p-2 rounded-lg border border-gray-800 bg-gray-900/40 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all cursor-pointer"
            >
              <Code2 className="h-4 w-4" />
            </button>

            <button
              onClick={openTerminal}
              title="Open Terminal console"
              className="p-2 rounded-lg border border-gray-800 bg-gray-900/40 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all cursor-pointer"
            >
              <Terminal className="h-4 w-4" />
            </button>

            <button
              onClick={toggleTheme}
              title="Toggle theme light/dark"
              className="p-2 rounded-lg border border-gray-800 bg-gray-900/40 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all cursor-pointer"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 text-xs font-semibold shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all cursor-pointer"
            >
              <FileText className="h-3.5 w-3.5" /> Resume
            </a>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={openTerminal}
              title="Open Terminal"
              className="p-2 rounded-lg border border-gray-800 bg-gray-900/40 text-gray-400 hover:text-cyan-400 cursor-pointer"
            >
              <Terminal className="h-4 w-4" />
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors cursor-pointer"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 border-b border-gray-800 bg-[#030712]/95 backdrop-blur-lg px-4 pt-2 pb-6 space-y-3">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id && (window.location.hash === '' || window.location.hash === '#/');
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-cyan-500/10 text-cyan-400' 
                      : 'text-gray-400 hover:bg-gray-800/40 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="border-t border-gray-800 pt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={openSearch}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-gray-800 bg-gray-900/40 text-xs text-gray-400"
            >
              <Search className="h-4 w-4" /> Search
            </button>
            <button
              onClick={openSandbox}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-gray-800 bg-gray-900/40 text-xs text-gray-400"
            >
              <Code2 className="h-4 w-4" /> Sandbox
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-gray-800 bg-gray-900/40 text-gray-400"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white py-2.5 text-sm font-semibold shadow-lg"
            >
              <FileText className="h-4 w-4" /> View Resume
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
