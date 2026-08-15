import { motion } from 'framer-motion';
import { Calendar, Briefcase, Sparkles } from 'lucide-react';

interface Experience {
  role: string;
  company: string;
  duration: string;
  description: string[];
  type: 'Internship' | 'Freelance' | 'Leadership' | 'Volunteer';
  order: number;
}

interface ExperiencesProps {
  experiences: Experience[];
}

export default function ExperiencesSection({ experiences }: ExperiencesProps) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 20, stiffness: 100 }
    }
  };

  return (
    <section id="experience" className="py-20 bg-[#0d131f] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 font-mono">
            Employment Records
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-title text-white">
            Professional Experience
          </h2>
          <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full" />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="relative border-l-2 border-gray-800 ml-4 md:ml-6 space-y-12"
        >
          {experiences.map((exp, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              className="relative pl-8 md:pl-10 group"
            >
              <div className="absolute -left-[9px] top-[4px] h-4.5 w-4.5 rounded-full border-2 border-blue-500 bg-gray-950 flex items-center justify-center transition-all duration-300 group-hover:bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.3)]">
                <Briefcase className="h-2 w-2 text-blue-400 group-hover:text-black transition-colors" />
              </div>

              <div className="glass-panel border border-gray-850 hover:border-gray-800 rounded-xl p-6 md:p-8 space-y-4 hover:shadow-[0_0_30px_rgba(37,99,235,0.05)] transition-all">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-100 group-hover:text-cyan-300 transition-colors font-title">
                      {exp.role}
                    </h3>
                    <p className="text-xs sm:text-sm text-cyan-400 font-mono font-medium mt-0.5">
                      {exp.company}
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-end gap-1.5">
                    <span className="flex items-center gap-1 text-[10px] sm:text-xs font-mono text-gray-500 bg-gray-900 border border-gray-800/80 rounded-full px-3 py-1">
                      <Calendar className="h-3 w-3" /> {exp.duration}
                    </span>
                    <span className="rounded-full bg-cyan-950/40 border border-cyan-500/10 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-cyan-400">
                      {exp.type}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
                  {exp.description.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5 leading-relaxed">
                      <Sparkles className="h-3.5 w-3.5 text-blue-500/60 mt-1 select-none shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
