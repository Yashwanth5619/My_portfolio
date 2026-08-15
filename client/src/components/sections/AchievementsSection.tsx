import { motion } from 'framer-motion';
import { Award, ShieldCheck, Download, Calendar } from 'lucide-react';
import CodingStats from '../ui/CodingStats';

interface Achievement {
  title: string;
  description: string;
  date: string;
  type: string;
  link?: string;
  order: number;
}

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  image: string;
  pdfUrl: string;
  category: string;
  order: number;
}

interface AchievementsProps {
  achievements: Achievement[];
  certificates: Certificate[];
}

export default function AchievementsSection({ achievements, certificates }: AchievementsProps) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 20, stiffness: 100 }
    }
  };

  return (
    <section id="achievements" className="py-20 bg-[#030712] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 font-mono">
            Honnours & Badges
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-title text-white">
            Competitive Stats & Achievements
          </h2>
          <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full" />
        </div>

        <CodingStats />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-16 pt-16 border-t border-gray-800/60">
          
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-lg font-bold text-gray-100 flex items-center gap-2 font-title">
              <Award className="h-5 w-5 text-cyan-400" /> Contest Ranks & Awards
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
              Summary of algorithms challenges, nation-wide hackathons, and certifications completed under strict time constraints.
            </p>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="space-y-4 relative before:absolute before:inset-0 before:right-auto before:left-[11px] before:w-[2px] before:bg-gray-850">
              {achievements.map((ach, idx) => (
                <div key={idx} className="relative pl-8 group">
                  <div className="absolute left-[5px] top-[6px] h-3.5 w-3.5 rounded-full border border-blue-500 bg-gray-950 transition-all duration-300 group-hover:bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.3)]" />
                  <div className="glass-panel border border-gray-850 hover:border-gray-800 rounded-lg p-4 transition-all">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-xs sm:text-sm font-bold text-gray-200 group-hover:text-cyan-300 transition-colors">
                        {ach.title}
                      </h4>
                      <span className="text-[10px] font-mono text-gray-500 bg-gray-900 border border-gray-800 rounded px-2 py-0.5">
                        {ach.date}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-400 mt-1.5 leading-relaxed">{ach.description}</p>
                    {ach.link && (
                      <a 
                        href={ach.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-2 text-[10px] font-semibold text-cyan-400 hover:underline"
                      >
                        Verification link →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 pt-16 border-t border-gray-800/60">
          <div className="text-center space-y-2 mb-12">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-200 font-title">
              Professional Certifications
            </h3>
            <p className="text-xs sm:text-sm text-gray-500">
              Credentials validating expertise in algorithms, React architectures, and cloud services.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {certificates.map((cert, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="group glass-panel hover-glow border border-gray-800/80 rounded-xl overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/3] bg-gray-950 overflow-hidden relative border-b border-gray-850">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                      <a
                        href={cert.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-blue-600 hover:bg-blue-700 text-white p-3 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all cursor-pointer"
                        title="Download Certificate PDF"
                      >
                        <Download className="h-5 w-5" />
                      </a>
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                      {cert.category}
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-gray-200 line-clamp-1 group-hover:text-cyan-300 transition-colors">
                      {cert.title}
                    </h4>
                    <p className="text-xs text-gray-500 font-medium">Issuer: {cert.issuer}</p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-3 border-t border-gray-850 flex items-center justify-between text-[10px] text-gray-500 font-mono">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {cert.date}</span>
                  <span className="flex items-center gap-1 text-cyan-400 font-semibold"><ShieldCheck className="h-3 w-3" /> Accredited</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
