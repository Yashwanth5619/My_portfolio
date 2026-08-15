import { motion } from 'framer-motion';
import { 
  Globe, Server, Database, Code, 
  Terminal, Shield, Wind, Brain, 
  Network, Sparkles, HardDrive, Laptop,
  GitBranch, Layers, Send, Cpu
} from 'lucide-react';
import { Github } from '../ui/BrandIcons';

interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Databases' | 'Programming' | 'Tools' | 'AI';
  level: number;
  icon: string;
}

interface SkillsProps {
  skills: Skill[];
}

export default function SkillsSection({ skills }: SkillsProps) {
  // Mapping of key icon strings to Lucide/Custom components
  const iconMap: Record<string, React.ReactNode> = {
    Globe: <Globe className="h-4 w-4 text-white" />,
    Server: <Server className="h-4 w-4 text-white" />,
    Database: <Database className="h-4 w-4 text-white" />,
    Code: <Code className="h-4 w-4 text-white" />,
    Terminal: <Terminal className="h-4 w-4 text-white" />,
    Shield: <Shield className="h-4 w-4 text-white" />,
    Wind: <Wind className="h-4 w-4 text-white" />,
    Grid: <Layers className="h-4 w-4 text-white" />,
    Node: <Server className="h-4 w-4 text-white" />,
    Leaf: <Sparkles className="h-4 w-4 text-white" />,
    Cpu: <Cpu className="h-4 w-4 text-white" />,
    Code2: <Code className="h-4 w-4 text-white" />,
    Binary: <Code className="h-4 w-4 text-white" />,
    GitCommit: <GitBranch className="h-4 w-4 text-white" />,
    TrendingUp: <Cpu className="h-4 w-4 text-white" />,
    GitBranch: <GitBranch className="h-4 w-4 text-white" />,
    Github: <Github className="h-4 w-4 text-white" />,
    Laptop: <Laptop className="h-4 w-4 text-white" />,
    Send: <Send className="h-4 w-4 text-white" />,
    Layers: <Layers className="h-4 w-4 text-white" />,
    HardDrive: <HardDrive className="h-4 w-4 text-white" />,
    Brain: <Brain className="h-4 w-4 text-white" />,
    Network: <Network className="h-4 w-4 text-white" />,
    Sparkles: <Sparkles className="h-4 w-4 text-white" />,
    React: <Globe className="h-4 w-4 text-cyan-400" />,
    Paintbrush: <Globe className="h-4 w-4 text-white" />,
    FileCode: <Code className="h-4 w-4 text-white" />,
    FileJson: <Code className="h-4 w-4 text-white" />,
  };

  const categories = ['Programming', 'Frontend', 'Backend', 'Databases', 'Tools', 'AI'] as const;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 15, stiffness: 120 }
    }
  };

  return (
    <section id="skills" className="py-20 bg-[#0d131f] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 font-mono">
            Skill Inventory
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-title text-white">
            Technical Proficiency
          </h2>
          <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full" />
        </div>

        <div className="space-y-12">
          {categories.map((category) => {
            const catSkills = skills.filter((s) => s.category === category);
            if (catSkills.length === 0) return null;

            return (
              <div key={category} className="space-y-5">
                <h3 className="text-base font-bold text-gray-400 uppercase tracking-widest border-b border-gray-800 pb-2 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-cyan-400" /> {category} Stacks
                </h3>

                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                >
                  {catSkills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      variants={cardVariants}
                      className="glass-panel hover-glow border border-gray-800/80 rounded-xl p-4 flex flex-col justify-between transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center shadow-inner">
                          {iconMap[skill.icon] || <Code className="h-4 w-4 text-gray-400" />}
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-200">{skill.name}</h4>
                          <span className="text-[10px] font-mono text-cyan-400/90">{skill.level}% Proficiency</span>
                        </div>
                      </div>

                      <div className="w-full bg-gray-950 h-1.5 rounded-full mt-4 overflow-hidden border border-gray-900">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full"
                        />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
