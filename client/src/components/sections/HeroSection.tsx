import { useEffect, useRef, useState } from 'react';
import { 
  Mail, FileText, 
  Terminal as TermIcon, Play, ArrowDown, 
  ChevronRight, BrainCircuit, Globe 
} from 'lucide-react';
import { Github, Linkedin } from '../ui/BrandIcons';

interface HeroProps {
  personalInfo: {
    name: string;
    role: string;
    shortIntro: string;
    linkedin: string;
    github: string;
    leetcode: string;
    codeforces: string;
    email: string;
    geeksforgeeks: string;
  };
}

export default function HeroSection({ personalInfo }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [typedText, setTypedText] = useState('');
  const roles = [
    'Competitive Programmer',
    'Full Stack Developer',
    'Problem Solver',
    'Computer Science Student'
  ];
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIdx];
    const typingSpeed = isDeleting ? 40 : 100;
    
    const handleTyping = () => {
      if (!isDeleting && charIdx < currentRole.length) {
        setTypedText(currentRole.substring(0, charIdx + 1));
        setCharIdx(charIdx + 1);
      } else if (isDeleting && charIdx > 0) {
        setTypedText(currentRole.substring(0, charIdx - 1));
        setCharIdx(charIdx - 1);
      } else if (!isDeleting && charIdx === currentRole.length) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && charIdx === 0) {
        setIsDeleting(false);
        setRoleIdx((prev) => (prev + 1) % roles.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, roleIdx]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(Math.floor(window.innerWidth / 15), 80);
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          radius: Math.random() * 2 + 1,
          color: i % 2 === 0 ? '#2563eb' : '#06b6d4',
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.25;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color === '#2563eb' ? '#2563eb' : '#06b6d4';
            ctx.globalAlpha = (1 - dist / 120) * 0.12;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    drawParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const openTerminal = () => {
    window.dispatchEvent(new CustomEvent('toggle-terminal'));
  };

  const openSandbox = () => {
    window.dispatchEvent(new CustomEvent('toggle-sandbox'));
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#030712]"
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none z-0" 
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#030712_90%)] z-10 pointer-events-none" />
      
      <div className="absolute top-[25%] left-[10%] animate-bounce duration-1000 z-10 opacity-30 pointer-events-none hidden md:block">
        <div className="rounded-xl border border-gray-800 bg-gray-900/40 p-3 backdrop-blur-md flex items-center gap-2">
          <BrainCircuit className="h-5 w-5 text-cyan-400" />
          <span className="text-xs font-mono text-cyan-400">BFS / DFS / DP</span>
        </div>
      </div>
      
      <div className="absolute bottom-[25%] right-[10%] animate-bounce duration-700 z-10 opacity-30 pointer-events-none hidden md:block">
        <div className="rounded-xl border border-gray-800 bg-gray-900/40 p-3 backdrop-blur-md flex items-center gap-2">
          <Globe className="h-5 w-5 text-blue-400" />
          <span className="text-xs font-mono text-blue-400">REST Client Engine</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20 text-center relative space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-950/40 px-4 py-1.5 text-xs font-semibold text-cyan-400 backdrop-blur-sm select-none animate-pulse">
          🚀 Recruiter Priority Sandbox Active
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-title">
          <span className="bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
            Hi, I&apos;m{" "}
          </span>
          <span className="bg-gradient-to-r from-blue-500 via-sky-400 to-cyan-400 bg-clip-text text-transparent">
            {personalInfo.name}
          </span>
        </h1>

        <div className="h-8 flex items-center justify-center font-mono text-base sm:text-xl md:text-2xl text-cyan-400/90 font-semibold">
          <span>{typedText}</span>
          <span className="cursor-blink ml-1 text-cyan-400">|</span>
        </div>

        <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-400 leading-relaxed">
          {personalInfo.shortIntro}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4 select-none">
          <button
            onClick={() => handleScrollTo('projects')}
            className="flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold text-sm shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            View Projects <ChevronRight className="h-4 w-4" />
          </button>
          
          <button
            onClick={() => handleScrollTo('contact')}
            className="flex items-center gap-2 rounded-lg border border-gray-800 bg-gray-900/60 hover:bg-gray-800 text-gray-300 px-6 py-3 font-semibold text-sm transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            Hire Me
          </button>

          <button
            onClick={openTerminal}
            className="flex items-center gap-2 rounded-lg border border-cyan-500/20 bg-cyan-950/20 hover:bg-cyan-950/40 text-cyan-400 px-6 py-3 font-mono text-xs font-semibold tracking-wider transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <TermIcon className="h-4 w-4" /> Open Shell
          </button>

          <button
            onClick={openSandbox}
            className="flex items-center gap-2 rounded-lg border border-cyan-500/20 bg-cyan-950/20 hover:bg-cyan-950/40 text-cyan-400 px-6 py-3 font-mono text-xs font-semibold tracking-wider transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Play className="h-4 w-4 fill-cyan-400" /> Sort visualizer
          </button>
        </div>

        <div className="flex items-center justify-center gap-5 pt-8">
          <a 
            href={personalInfo.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-500 hover:text-white hover:scale-110 transition-all cursor-pointer"
            title="GitHub"
          >
            <Github className="h-6 w-6" />
          </a>
          <a 
            href={personalInfo.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-500 hover:text-blue-400 hover:scale-110 transition-all cursor-pointer"
            title="LinkedIn"
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a 
            href={`mailto:${personalInfo.email}`}
            className="text-gray-500 hover:text-rose-400 hover:scale-110 transition-all cursor-pointer"
            title="Email"
          >
            <Mail className="h-6 w-6" />
          </a>
          <a 
            href={personalInfo.leetcode} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-500 hover:text-yellow-500 hover:scale-110 transition-all cursor-pointer font-bold text-sm tracking-tighter"
            title="LeetCode"
          >
            LC
          </a>
          <a 
            href={personalInfo.geeksforgeeks} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-500 hover:text-green-500 hover:scale-110 transition-all cursor-pointer font-bold text-sm tracking-tighter"
            title="GeeksforGeeks"
          >
            GFG
          </a>
        </div>

        <div 
          onClick={() => handleScrollTo('about')}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer text-gray-500 hover:text-white flex flex-col items-center gap-1 animate-bounce select-none z-20"
        >
          <span className="text-[10px] uppercase font-mono tracking-widest">Scroll</span>
          <ArrowDown className="h-4 w-4" />
        </div>
      </div>
    </section>
  );
}
