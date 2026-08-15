import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Cpu, Database, Award, ShieldAlert, Zap, Code } from 'lucide-react';
import { Github } from './BrandIcons';

export interface Project {
  id?: string;
  title: string;
  description: string;
  category: 'Frontend' | 'Backend' | 'Full Stack' | 'AI';
  techStack: string[];
  features: string[];
  githubUrl: string;
  liveUrl: string;
  liveUrlAdmin?: string;
  image: string;
  problemStatement: string;
  architecture: string;
  challenges: string;
  learnings: string;
  databaseDesign: string;
  apiEndpoints: string;
  futureImprovements: string;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9950] flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-4xl h-[85vh] overflow-hidden rounded-xl border border-gray-800 bg-[#0d131f] shadow-[0_0_60px_rgba(37,99,235,0.15)] flex flex-col"
          >
            <div className="flex items-center justify-between border-b border-gray-800 bg-gray-900/40 px-6 py-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  {project.category} Project Details
                </span>
                <h3 className="text-xl font-bold text-white font-title mt-0.5">{project.title}</h3>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 font-sans text-gray-300">
              <div className="relative group rounded-xl overflow-hidden border border-gray-800 aspect-video md:aspect-[21/9]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                  <div className="flex flex-wrap gap-3 w-full justify-between items-center">
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded bg-cyan-950/80 px-2.5 py-1 text-xs font-medium text-cyan-400 border border-cyan-500/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-lg bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 text-xs font-semibold border border-gray-800 transition-all cursor-pointer"
                      >
                        <Github className="h-4 w-4" /> GitHub
                      </a>
                      {project.liveUrlAdmin ? (
                        <>
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 text-xs font-semibold transition-all cursor-pointer"
                            title="Patient Portal"
                          >
                            <ExternalLink className="h-4 w-4" /> User Demo
                          </a>
                          <a
                            href={project.liveUrlAdmin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 text-xs font-semibold transition-all cursor-pointer"
                            title="Doctor/Admin Dashboard"
                          >
                            <ExternalLink className="h-4 w-4" /> Admin Demo
                          </a>
                        </>
                      ) : (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-xs font-semibold transition-all cursor-pointer"
                        >
                          <ExternalLink className="h-4 w-4" /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <ShieldAlert className="h-4 w-4 text-cyan-400" /> The Problem
                  </h4>
                  <p className="text-sm leading-relaxed text-gray-300">
                    {project.problemStatement}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Zap className="h-4 w-4 text-cyan-400" /> Key Features
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    {project.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-cyan-400 select-none mt-0.5">•</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <hr className="border-gray-800/60" />

              <div className="space-y-3">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-cyan-400" /> System Architecture
                </h4>
                <p className="text-sm leading-relaxed text-gray-300">
                  {project.architecture}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Database className="h-4 w-4 text-cyan-400" /> Schema & Data Modeling
                  </h4>
                  <pre className="rounded-lg border border-gray-800 bg-gray-950 p-4 font-mono text-xs text-cyan-300/90 leading-relaxed overflow-x-auto">
                    {project.databaseDesign}
                  </pre>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Code className="h-4 w-4 text-cyan-400 font-mono" /> REST API Interfaces
                  </h4>
                  <pre className="rounded-lg border border-gray-800 bg-gray-950 p-4 font-mono text-xs text-gray-300 leading-relaxed overflow-x-auto">
                    {project.apiEndpoints}
                  </pre>
                </div>
              </div>

              <hr className="border-gray-800/60" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-rose-400/90 uppercase tracking-widest">
                    Technical Challenges
                  </h4>
                  <p className="text-sm leading-relaxed text-gray-300">
                    {project.challenges}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-emerald-400/90 uppercase tracking-widest">
                    Key Learnings
                  </h4>
                  <p className="text-sm leading-relaxed text-gray-300">
                    {project.learnings}
                  </p>
                </div>
              </div>

              <hr className="border-gray-800/60" />

              <div className="space-y-3 pb-4">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Award className="h-4 w-4 text-cyan-400" /> Future Improvements
                </h4>
                <p className="text-sm leading-relaxed text-gray-300">
                  {project.futureImprovements}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-gray-800 bg-gray-900/20 px-6 py-4 text-xs text-gray-500 font-mono">
              <span>Dynamic Project Registry</span>
              <span>Yashwanth Reddy © 2026</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
