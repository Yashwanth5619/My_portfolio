import { useEffect, useState, useRef } from 'react';
import { 
  Search, Terminal, Code2, Navigation, 
  ExternalLink, Download, ShieldCheck, 
  MousePointer, Keyboard, HelpCircle 
} from 'lucide-react';

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  category: 'Navigation' | 'Actions' | 'External Profiles';
  icon: React.ReactNode;
  action: () => void;
}

export default function CommandPaletteWrapper() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Toggle Command Palette on Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
      setSearch('');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    // Return to homepage hash if in admin or blog
    if (window.location.hash !== '' && window.location.hash !== '#/') {
      window.location.hash = '#/';
      // Wait for hash change to render homepage first
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

  const toggleTerminal = () => {
    setIsOpen(false);
    window.dispatchEvent(new CustomEvent('toggle-terminal'));
  };

  const toggleSandbox = () => {
    setIsOpen(false);
    window.dispatchEvent(new CustomEvent('toggle-sandbox'));
  };

  const toggleCustomCursor = () => {
    setIsOpen(false);
    const dot = document.querySelector('.custom-cursor-dot') as HTMLElement;
    const ring = document.querySelector('.custom-cursor-ring') as HTMLElement;
    if (dot && ring) {
      const isHidden = dot.style.display === 'none';
      dot.style.display = isHidden ? 'block' : 'none';
      ring.style.display = isHidden ? 'block' : 'none';
      alert(`Custom cursor ${isHidden ? 'enabled' : 'disabled'}!`);
    }
  };

  const commands: CommandItem[] = [
    // Navigation
    {
      id: 'nav-home',
      title: 'Go to Home / Hero Section',
      subtitle: 'Main introductory landing area',
      category: 'Navigation',
      icon: <Navigation className="h-4 w-4 text-blue-400" />,
      action: () => scrollToSection('home')
    },
    {
      id: 'nav-about',
      title: 'Go to About Me',
      subtitle: 'Read about bio, education and strengths',
      category: 'Navigation',
      icon: <Navigation className="h-4 w-4 text-blue-400" />,
      action: () => scrollToSection('about')
    },
    {
      id: 'nav-skills',
      title: 'Go to Technical Skills',
      subtitle: 'Inspect proficiency meters and stacks',
      category: 'Navigation',
      icon: <Navigation className="h-4 w-4 text-blue-400" />,
      action: () => scrollToSection('skills')
    },
    {
      id: 'nav-projects',
      title: 'Go to Projects Showcase',
      subtitle: 'Browse fullstack, frontend & AI works',
      category: 'Navigation',
      icon: <Navigation className="h-4 w-4 text-blue-400" />,
      action: () => scrollToSection('projects')
    },
    {
      id: 'nav-experience',
      title: 'Go to Experience Timeline',
      subtitle: 'Internships, freelance, and open source work',
      category: 'Navigation',
      icon: <Navigation className="h-4 w-4 text-blue-400" />,
      action: () => scrollToSection('experience')
    },
    {
      id: 'nav-achievements',
      title: 'Go to Achievements & Contests',
      subtitle: 'LeetCode, Codeforces stats & certificates',
      category: 'Navigation',
      icon: <Navigation className="h-4 w-4 text-blue-400" />,
      action: () => scrollToSection('achievements')
    },
    {
      id: 'nav-blog',
      title: 'Go to Blog Posts',
      subtitle: 'Read engineering and technology blogs',
      category: 'Navigation',
      icon: <Navigation className="h-4 w-4 text-blue-400" />,
      action: () => scrollToSection('blog')
    },
    {
      id: 'nav-contact',
      title: 'Go to Contact Section',
      subtitle: 'Get in touch or leave a review feedback',
      category: 'Navigation',
      icon: <Navigation className="h-4 w-4 text-blue-400" />,
      action: () => scrollToSection('contact')
    },
    // Actions
    {
      id: 'act-terminal',
      title: 'Open Terminal Portfolio',
      subtitle: 'Simulate a developer console shell to navigate',
      category: 'Actions',
      icon: <Terminal className="h-4 w-4 text-cyan-400" />,
      action: toggleTerminal
    },
    {
      id: 'act-sandbox',
      title: 'Launch Algorithm Sandbox',
      subtitle: 'Interactive code editor with visualizer animations',
      category: 'Actions',
      icon: <Code2 className="h-4 w-4 text-cyan-400" />,
      action: toggleSandbox
    },
    {
      id: 'act-cursor',
      title: 'Toggle Custom Mouse Follower',
      subtitle: 'Show or hide custom neon hover particles',
      category: 'Actions',
      icon: <MousePointer className="h-4 w-4 text-cyan-400" />,
      action: toggleCustomCursor
    },
    {
      id: 'act-resume',
      title: 'Download Resume (PDF)',
      subtitle: 'Open or download printer-friendly ATS resume',
      category: 'Actions',
      icon: <Download className="h-4 w-4 text-cyan-400" />,
      action: () => window.open('/resume.pdf', '_blank')
    },
    {
      id: 'act-admin',
      title: 'Navigate to Admin Panel',
      subtitle: 'Manage projects, blogs, and messages without code',
      category: 'Actions',
      icon: <ShieldCheck className="h-4 w-4 text-rose-400" />,
      action: () => {
        setIsOpen(false);
        window.location.hash = '#/admin';
      }
    },
    // Profiles
    {
      id: 'prof-github',
      title: 'Visit GitHub Profile',
      subtitle: 'Open github.com/yashwanth-reddy',
      category: 'External Profiles',
      icon: <ExternalLink className="h-4 w-4 text-sky-400" />,
      action: () => window.open('https://github.com/yashwanth-reddy', '_blank')
    },
    {
      id: 'prof-linkedin',
      title: 'Visit LinkedIn Connection',
      subtitle: 'Professional profile network',
      category: 'External Profiles',
      icon: <ExternalLink className="h-4 w-4 text-sky-400" />,
      action: () => window.open('https://www.linkedin.com/in/yashwanth-devireddy-5115a129a', '_blank')
    },
    {
      id: 'prof-leetcode',
      title: 'Visit LeetCode Coding Profile',
      subtitle: 'Guardian profile (Rating 2150+)',
      category: 'External Profiles',
      icon: <ExternalLink className="h-4 w-4 text-sky-400" />,
      action: () => window.open('https://leetcode.com/u/yashwanth_33/', '_blank')
    },
    {
      id: 'prof-geeksforgeeks',
      title: 'Visit GeeksforGeeks Profile',
      subtitle: 'Institute Rank 62',
      category: 'External Profiles',
      icon: <ExternalLink className="h-4 w-4 text-sky-400" />,
      action: () => window.open('https://www.geeksforgeeks.org/profile/devireddyyashwanthreddy', '_blank')
    }
  ];

  // Filter commands by search query
  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(search.toLowerCase()) ||
    (cmd.subtitle && cmd.subtitle.toLowerCase().includes(search.toLowerCase())) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  // Keyboard navigation inside list
  const handleListKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => 
        prev + 1 >= filteredCommands.length ? 0 : prev + 1
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => 
        prev - 1 < 0 ? filteredCommands.length - 1 : prev - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    }
  };

  const handleOuterClick = (e: React.MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9995] flex items-start justify-center bg-black/60 pt-[15vh] backdrop-blur-md animate-fade-in"
      onClick={handleOuterClick}
    >
      <div 
        ref={containerRef}
        className="w-full max-w-xl overflow-hidden rounded-xl border border-gray-800 bg-[#0d131f]/95 shadow-[0_0_50px_rgba(37,99,235,0.15)] backdrop-blur-2xl transition-all duration-300"
        onKeyDown={handleListKeyDown}
      >
        <div className="flex items-center border-b border-gray-800 px-4 py-3">
          <Search className="mr-3 h-5 w-5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search section (e.g. 'projects', 'editor')..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full bg-transparent text-white placeholder-gray-500 outline-none font-sans text-base"
          />
          <kbd className="hidden sm:inline-flex select-none items-center gap-0.5 rounded border border-gray-800 bg-gray-900 px-1.5 py-0.5 text-xs text-gray-400 font-mono">
            ESC
          </kbd>
        </div>

        <div className="max-h-[350px] overflow-y-auto p-2">
          {filteredCommands.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center text-gray-500">
              <HelpCircle className="mb-2 h-8 w-8 text-gray-600" />
              <p className="text-sm">No commands matching &quot;{search}&quot; found</p>
            </div>
          ) : (
            <div>
              {['Navigation', 'Actions', 'External Profiles'].map((catName) => {
                const catCommands = filteredCommands.filter(c => c.category === catName);
                if (catCommands.length === 0) return null;

                return (
                  <div key={catName} className="mb-2">
                    <h3 className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 font-sans">
                      {catName}
                    </h3>
                    <div className="space-y-0.5">
                      {catCommands.map((cmd) => {
                        const globalIndex = filteredCommands.findIndex(c => c.id === cmd.id);
                        const isSelected = globalIndex === selectedIndex;

                        return (
                          <div
                            key={cmd.id}
                            onClick={() => cmd.action()}
                            className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 transition-all duration-150 ${
                              isSelected 
                                ? 'bg-cyan-500/10 border-l-2 border-cyan-400 shadow-[inset_0_0_10px_rgba(6,182,212,0.05)]' 
                                : 'hover:bg-gray-800/40 border-l-2 border-transparent'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`flex h-8 w-8 items-center justify-center rounded-md ${
                                isSelected ? 'bg-cyan-500/20' : 'bg-gray-800/60'
                              }`}>
                                {cmd.icon}
                              </div>
                              <div>
                                <p className={`text-sm font-medium ${isSelected ? 'text-cyan-300' : 'text-gray-200'}`}>
                                  {cmd.title}
                                </p>
                                {cmd.subtitle && (
                                  <p className="text-xs text-gray-500 truncate max-w-[320px] sm:max-w-[400px]">
                                    {cmd.subtitle}
                                  </p>
                                )}
                              </div>
                            </div>
                            {isSelected && (
                              <span className="text-xs text-cyan-400 font-mono flex items-center gap-1 select-none">
                                press <kbd className="rounded bg-gray-900 border border-gray-800 px-1 font-mono">ENTER</kbd>
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between bg-gray-900/60 border-t border-gray-800/50 px-4 py-2 text-xs text-gray-500 font-sans">
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><Keyboard className="h-3.5 w-3.5" /> Navigate with arrows</span>
            <span className="flex items-center gap-1"><Terminal className="h-3.5 w-3.5" /> Ctrl+K to toggle</span>
          </div>
          <span>Yashwanth Reddy Portfolio</span>
        </div>
      </div>
    </div>
  );
}
