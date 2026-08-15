import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ExternalLink, ArrowUpRight } from 'lucide-react';
import { Github } from '../ui/BrandIcons';
import ProjectModal from '../ui/ProjectModal';
import type { Project } from '../ui/ProjectModal';

interface ProjectsProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsProps) {
  const [filter, setFilter] = useState<'All' | 'Full Stack' | 'Backend' | 'Frontend' | 'AI'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const categories: Array<'All' | 'Full Stack' | 'Backend' | 'Frontend' | 'AI'> = [
    'All', 'Full Stack', 'Backend', 'Frontend', 'AI'
  ];

  // Filtering + Searching logic
  const filteredProjects = projects.filter((project) => {
    const matchesCategory = filter === 'All' || project.category === filter;
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techStack.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const handleCardClick = (project: Project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 20, stiffness: 100 }
    }
  };

  return (
    <section id="projects" className="py-20 bg-[#030712] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 font-mono">
            My Work
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-title text-white">
            Engineering Projects
          </h2>
          <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-10 pb-6 border-b border-gray-800/60 select-none">
          <div className="flex flex-wrap gap-1.5 bg-gray-950 p-1.5 rounded-lg border border-gray-800/80">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`rounded-md px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  filter === cat
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-white hover:bg-gray-900/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search stack, title, scope..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-800 bg-[#0d131f] pl-10 pr-4 py-2 text-sm text-gray-200 placeholder-gray-500 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20"
            />
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 text-gray-500 font-mono text-sm border border-dashed border-gray-800 rounded-2xl">
            No projects found matching the criteria.
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                onClick={() => handleCardClick(project)}
                className="group cursor-pointer glass-panel hover-glow border border-gray-800/80 rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-300"
              >
                <div>
                  <div className="relative aspect-video overflow-hidden border-b border-gray-800 bg-gray-950">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 rounded bg-black/60 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan-400 border border-cyan-500/20 backdrop-blur-sm">
                      {project.category}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="text-base sm:text-lg font-bold text-gray-100 group-hover:text-cyan-300 transition-colors font-title">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5">
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded bg-gray-900 px-2 py-0.5 text-[10px] font-mono text-gray-400 border border-gray-850"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="rounded bg-gray-900 px-2 py-0.5 text-[10px] font-mono text-gray-500">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs font-semibold border-t border-gray-800/60 pt-3">
                    <span className="text-cyan-400 flex items-center gap-1 hover:underline cursor-pointer group-hover:gap-1.5 transition-all">
                      Architecture & Design Specs <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                    <div className="flex items-center gap-2.5 text-gray-500 group-hover:text-white transition-colors">
                      <a
                        href={project.githubUrl}
                        onClick={(e) => e.stopPropagation()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:scale-110 transition-transform cursor-pointer"
                        title="Github code"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                      <a
                        href={project.liveUrl}
                        onClick={(e) => e.stopPropagation()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:scale-110 transition-transform cursor-pointer"
                        title="Live demo link"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <ProjectModal
          project={selectedProject}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />

      </div>
    </section>
  );
}
