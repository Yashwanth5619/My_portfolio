import { motion } from 'framer-motion';
import { BookOpen, Award, ShieldAlert, Cpu } from 'lucide-react';

interface AboutProps {
  personalInfo: {
    bio: string;
    location: string;
    email: string;
  };
  education: Array<{
    degree: string;
    institution: string;
    duration: string;
    gpa: string;
    details: string;
  }>;
  strengths: string[];
  softSkills: string[];
  funFacts: Array<{
    icon: string;
    fact: string;
  }>;
}

export default function AboutSection({ personalInfo, education, strengths, softSkills, funFacts }: AboutProps) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 20, stiffness: 100 }
    }
  };

  return (
    <section id="about" className="py-20 bg-[#030712] relative overflow-hidden">
      <div className="absolute top-[40%] right-[-10%] w-[350px] h-[350px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[350px] h-[350px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 font-mono">
            Get to Know Me
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-title text-white">
            About Myself
          </h2>
          <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full" />
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-10"
        >
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
            <div className="glass-panel rounded-xl p-6 md:p-8 border border-gray-800 space-y-4">
              <h3 className="text-lg font-bold text-gray-100 flex items-center gap-2">
                <Cpu className="h-5 w-5 text-blue-500" /> Biography & Core Philosophy
              </h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                {personalInfo.bio}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-gray-500 pt-4 border-t border-gray-800/60">
                <div>📍 Location: <span className="text-gray-300 font-semibold">{personalInfo.location}</span></div>
                <div>📧 Available for: <span className="text-gray-300 font-semibold">Internships & FTE Roles</span></div>
              </div>
            </div>

            <div className="glass-panel rounded-xl p-6 md:p-8 border border-gray-800">
              <h3 className="text-lg font-bold text-gray-100 flex items-center gap-2 mb-6">
                <BookOpen className="h-5 w-5 text-blue-500" /> Academic Timeline
              </h3>
              <div className="space-y-8 relative before:absolute before:inset-0 before:right-auto before:left-[11px] before:w-[2px] before:bg-gray-800/80">
                {education.map((edu, idx) => (
                  <div key={idx} className="relative pl-8 group">
                    <div className="absolute left-[3px] top-[5px] h-[18px] w-[18px] rounded-full border-2 border-cyan-400 bg-gray-950 transition-all duration-300 group-hover:bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.3)]" />
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-sm sm:text-base font-bold text-gray-200">{edu.degree}</h4>
                      <span className="rounded bg-cyan-950/60 px-2.5 py-0.5 text-xs font-mono text-cyan-400 border border-cyan-500/10">
                        {edu.duration}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 font-medium mt-1">{edu.institution} | <span className="text-cyan-400 font-mono font-bold">{edu.gpa}</span></p>
                    <p className="text-xs sm:text-sm text-gray-400 mt-2 leading-relaxed">{edu.details}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <div className="glass-panel rounded-xl p-6 border border-gray-800">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                <Award className="h-4.5 w-4.5 text-blue-500" /> Professional Qualities
              </h3>
              <div className="flex flex-wrap gap-2">
                {strengths.map((str) => (
                  <span key={str} className="rounded bg-gray-900 border border-gray-800 hover:border-gray-700 px-3 py-1.5 text-xs font-medium text-gray-300 transition-all select-none">
                    ⚡ {str}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass-panel rounded-xl p-6 border border-gray-800">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                <Award className="h-4.5 w-4.5 text-blue-500" /> Collaboration & Agile Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {softSkills.map((sk) => (
                  <span key={sk} className="rounded bg-gray-900 border border-gray-800 px-3 py-1.5 text-xs font-medium text-gray-300 select-none">
                    ✔ {sk}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass-panel rounded-xl p-6 border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <ShieldAlert className="h-4.5 w-4.5 text-cyan-400 animate-pulse" /> Trivia Logs
              </h3>
              <div className="space-y-3.5">
                {funFacts.map((fact, idx) => (
                  <div key={idx} className="flex gap-2.5 items-start bg-gray-950/40 p-3 rounded-lg border border-gray-800/40 hover:border-gray-800 transition-all">
                    <span className="text-lg select-none">{fact.icon}</span>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">{fact.fact}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
