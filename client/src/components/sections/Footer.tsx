import { ArrowUp, Mail } from 'lucide-react';
import { Github, Linkedin } from '../ui/BrandIcons';

interface FooterProps {
  personalInfo: {
    name: string;
    github: string;
    linkedin: string;
    email: string;
    leetcode: string;
    geeksforgeeks: string;
  };
}

export default function Footer({ personalInfo }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070b13] border-t border-gray-900 py-12 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        
        <div className="text-center md:text-left space-y-2">
          <p className="text-sm font-bold text-gray-200 font-title">{personalInfo.name}</p>
          <p className="text-xs text-gray-500 font-sans">
            Designed and built with React, Express, TypeScript & Tailwind CSS.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="h-9 w-9 rounded-lg border border-gray-800 bg-gray-950 flex items-center justify-center text-gray-500 hover:text-white hover:border-gray-700 transition-all cursor-pointer"
            title="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>

          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="h-9 w-9 rounded-lg border border-gray-800 bg-gray-950 flex items-center justify-center text-gray-500 hover:text-blue-400 hover:border-gray-700 transition-all cursor-pointer"
            title="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </a>

          <a
            href={`mailto:${personalInfo.email}`}
            className="h-9 w-9 rounded-lg border border-gray-800 bg-gray-950 flex items-center justify-center text-gray-500 hover:text-rose-400 hover:border-gray-700 transition-all cursor-pointer"
            title="Email"
          >
            <Mail className="h-5 w-5" />
          </a>

          <a
            href={personalInfo.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="h-9 w-9 rounded-lg border border-gray-800 bg-gray-950 flex items-center justify-center text-gray-500 hover:text-yellow-500 hover:border-gray-700 transition-all font-mono font-semibold text-xs cursor-pointer"
            title="LeetCode"
          >
            LC
          </a>

          <a
            href={personalInfo.geeksforgeeks}
            target="_blank"
            rel="noopener noreferrer"
            className="h-9 w-9 rounded-lg border border-gray-805 bg-gray-950 flex items-center justify-center text-gray-500 hover:text-green-500 hover:border-gray-700 transition-all font-mono font-semibold text-xs cursor-pointer"
            title="GeeksforGeeks"
          >
            GFG
          </a>
        </div>

        <div className="flex flex-col items-center md:items-end gap-3 text-xs text-gray-500">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
          >
            Back to top <ArrowUp className="h-4 w-4" />
          </button>
          <span>© 2026 {personalInfo.name}. All rights reserved.</span>
        </div>

      </div>
    </footer>
  );
}
