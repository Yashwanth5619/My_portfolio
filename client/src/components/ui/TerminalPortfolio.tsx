import { useEffect, useState, useRef } from 'react';
import { X, Minimize2, Terminal, Square } from 'lucide-react';

interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success' | 'system';
}

export default function TerminalPortfolio() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [profileData, setProfileData] = useState<any>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch profile details from backend API on mount
  useEffect(() => {
    fetch('/api/profile')
      .then(r => r.json())
      .then(res => {
        if (res.success) setProfileData(res.data);
      })
      .catch(e => console.warn('Terminal api fetch skipped, will use local mock fallback.', e));
  }, []);

  useEffect(() => {
    const handleToggle = () => {
      setIsOpen((prev) => {
        const nextState = !prev;
        if (nextState && history.length === 0) {
          setHistory([
            { text: 'ReddyOS [Version 1.0.4]', type: 'system' },
            { text: '(c) 2026 Yashwanth Reddy. All rights reserved.', type: 'system' },
            { text: '', type: 'output' },
            { text: 'Welcome, recruiter! Type "help" to list available commands.', type: 'success' },
            { text: '', type: 'output' },
          ]);
        }
        return nextState;
      });
    };

    window.addEventListener('toggle-terminal', handleToggle);
    return () => window.removeEventListener('toggle-terminal', handleToggle);
  }, [history.length]);

  useEffect(() => {
    if (isOpen) {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [history, isOpen]);

  const handleConsoleClick = () => {
    inputRef.current?.focus();
  };

  const getSourceData = () => {
    if (profileData) return profileData;
    // Client-side static mock fallback
    return {
      personalInfo: {
        name: "Yashwanth Reddy",
        role: "Computer Science Student | Software Developer",
        careerGoal: "Become a Software Engineer at a top product company.",
        email: "yashwanth.reddy@example.com",
        phone: "+91 98765 43210",
        linkedin: "https://www.linkedin.com/in/yashwanth-devireddy-5115a129a",
        github: "https://github.com/Yashwanth5619",
        leetcode: "https://leetcode.com/u/yashwanth_33/",
        bio: "As a final-year Computer Science student, I specialize in Data Structures, Algorithms, and Full-Stack development."
      },
      skills: [
        { name: "React", category: "Frontend", level: 90 },
        { name: "Node.js", category: "Backend", level: 88 },
        { name: "Java", category: "Programming", level: 90 }
      ],
      projects: [
        { title: "DevArena", category: "Full Stack", description: "Collaborative IDE sandbox.", githubUrl: "https://github.com" }
      ],
      experiences: [
        { role: "Backend Intern", company: "InnovateTech", duration: "2025", description: ["Developed REST APIs."] }
      ],
      achievements: [
        { date: "2024", title: "Google Kick Start", description: "Global Rank 452." }
      ]
    };
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const source = getSourceData();
    const newLines: TerminalLine[] = [
      { text: `visitor@reddy-pc:~$ ${cmd}`, type: 'input' }
    ];

    if (trimmed) {
      setCommandHistory((prev) => [...prev, cmd]);
      setHistoryIndex(-1);
    }

    switch (trimmed) {
      case '':
        break;
      case 'help':
        newLines.push(
          { text: 'Available commands:', type: 'system' },
          { text: '  about        - View Yashwanth\'s developer biography', type: 'output' },
          { text: '  skills       - Print technical skills and proficiencies', type: 'output' },
          { text: '  projects     - List key engineering projects', type: 'output' },
          { text: '  experience   - Print professional experience timeline', type: 'output' },
          { text: '  achievements - View competitive programming & hackathon scores', type: 'output' },
          { text: '  contact      - Display contact links and email address', type: 'output' },
          { text: '  clear        - Clear console screen', type: 'output' },
          { text: '  exit         - Close terminal', type: 'output' }
        );
        break;
      case 'about':
        newLines.push(
          { text: `Name: ${source.personalInfo.name}`, type: 'success' },
          { text: `Role: ${source.personalInfo.role}`, type: 'system' },
          { text: `Goal: ${source.personalInfo.careerGoal}`, type: 'output' },
          { text: '', type: 'output' },
          { text: source.personalInfo.bio, type: 'output' }
        );
        break;
      case 'skills':
        newLines.push({ text: 'Technical Skills Matrix:', type: 'success' });
        // Group by category
        const categories = Array.from(new Set(source.skills.map((s: any) => s.category))) as string[];
        categories.forEach(cat => {
          newLines.push({ text: `\n[ ${cat} ]`, type: 'system' });
          const catSkills = source.skills.filter((s: any) => s.category === cat);
          catSkills.forEach((s: any) => {
            const barLength = Math.round(s.level / 10);
            const bar = '█'.repeat(barLength) + '░'.repeat(10 - barLength);
            newLines.push({ text: `  ${s.name.padEnd(16)} [${bar}] ${s.level}%`, type: 'output' });
          });
        });
        break;
      case 'projects':
        newLines.push({ text: 'Featured Engineering Projects:', type: 'success' });
        source.projects.forEach((p: any, idx: number) => {
          newLines.push(
            { text: `\n${idx + 1}. ${p.title} (${p.category})`, type: 'system' },
            { text: `   Description: ${p.description}`, type: 'output' },
            { text: `   Tech Stack:  ${Array.isArray(p.techStack) ? p.techStack.join(', ') : p.techStack}`, type: 'output' },
            { text: `   Source:      ${p.githubUrl}`, type: 'output' }
          );
        });
        break;
      case 'experience':
        newLines.push({ text: 'Professional Experience:', type: 'success' });
        source.experiences.forEach((e: any) => {
          const descArr = Array.isArray(e.description) ? e.description : e.description.split('\n');
          newLines.push(
            { text: `\n* ${e.role} @ ${e.company} (${e.duration})`, type: 'system' },
            ...descArr.map((desc: string) => ({ text: `  - ${desc}`, type: 'output' as const }))
          );
        });
        break;
      case 'achievements':
        newLines.push({ text: 'Achievements & Contests:', type: 'success' });
        source.achievements.forEach((a: any) => {
          newLines.push({ text: `  - [${a.date}] ${a.title}: ${a.description}`, type: 'output' });
        });
        break;
      case 'contact':
        newLines.push(
          { text: 'Get in Touch:', type: 'success' },
          { text: `  Email:    ${source.personalInfo.email}`, type: 'output' },
          { text: `  Phone:    ${source.personalInfo.phone}`, type: 'output' },
          { text: `  LinkedIn: ${source.personalInfo.linkedin}`, type: 'output' },
          { text: `  GitHub:   ${source.personalInfo.github}`, type: 'output' }
        );
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'exit':
        setIsOpen(false);
        setInput('');
        return;
      default:
        newLines.push({ 
          text: `Command not found: "${trimmed}". Type "help" for a list of valid commands.`, 
          type: 'error' 
        });
    }

    setHistory((prev) => [...prev, ...newLines]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < commandHistory.length) {
          setHistoryIndex(nextIndex);
          setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = historyIndex - 1;
      if (nextIndex >= 0) {
        setHistoryIndex(nextIndex);
        setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9990] flex items-center justify-center bg-black/70 p-4 md:p-10 backdrop-blur-md animate-fade-in">
      <div 
        className="flex h-[80vh] w-full max-w-4xl flex-col rounded-xl border border-cyan-500/30 bg-[#070b13] shadow-[0_0_50px_rgba(6,182,212,0.25)]"
        onClick={handleConsoleClick}
      >
        <div className="flex items-center justify-between border-b border-cyan-500/20 bg-[#0d121d] px-4 py-3 select-none">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-cyan-400" />
            <span className="text-xs font-mono text-cyan-400 tracking-wider font-semibold">
              DEVELOPER CONSOLE - visitor@reddy-pc
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Minimize2 
              className="h-4 w-4 cursor-pointer text-gray-500 hover:text-gray-300"
              onClick={() => setIsOpen(false)}
            />
            <Square className="h-3 w-3 text-gray-500 hover:text-gray-300" />
            <X 
              className="h-4 w-4 cursor-pointer text-rose-500 hover:text-rose-400"
              onClick={() => setIsOpen(false)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 font-mono text-sm leading-relaxed text-gray-300 select-text">
          {history.map((line, idx) => {
            let colorClass = 'text-gray-300';
            if (line.type === 'input') colorClass = 'text-cyan-400 font-semibold';
            else if (line.type === 'error') colorClass = 'text-rose-400';
            else if (line.type === 'success') colorClass = 'text-emerald-400 font-medium';
            else if (line.type === 'system') colorClass = 'text-blue-400 font-semibold';

            return (
              <div key={idx} className={`${colorClass} whitespace-pre-wrap`}>
                {line.text}
              </div>
            );
          })}
          <div ref={terminalEndRef} />
        </div>

        <div className="flex items-center border-t border-cyan-500/20 bg-[#070b13] px-4 py-3">
          <span className="mr-2 font-mono text-sm font-semibold text-cyan-400 select-none">
            visitor@reddy-pc:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent font-mono text-sm text-white outline-none caret-cyan-400"
            autoFocus
            autoComplete="off"
            spellCheck="false"
            placeholder='Type a command (e.g. "help", "skills")...'
          />
        </div>
      </div>
    </div>
  );
}
