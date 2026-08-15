import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  avatar: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsProps) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', damping: 20, stiffness: 100 }
    }
  };

  return (
    <section className="py-20 bg-[#030712] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 font-mono">
            Endorsements
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-title text-white">
            Recommendations
          </h2>
          <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full" />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {testimonials.map((test, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="glass-panel border border-gray-850 rounded-xl p-6 md:p-8 space-y-6 flex flex-col justify-between hover:shadow-[0_0_30px_rgba(6,182,212,0.03)] transition-all"
            >
              <div className="relative">
                <Quote className="absolute -top-4 -left-4 h-8 w-8 text-cyan-500/10 rotate-180 select-none" />
                <p className="text-xs sm:text-sm text-gray-300 italic leading-relaxed pl-2 relative z-10 font-sans">
                  &quot;{test.text}&quot;
                </p>
              </div>

              <div className="flex items-center gap-3.5 border-t border-gray-850 pt-4">
                <img
                  src={test.avatar}
                  alt={test.name}
                  className="h-10 w-10 rounded-full border border-gray-800 object-cover shadow-sm"
                />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-200">{test.name}</h4>
                  <p className="text-[10px] text-cyan-400 font-mono">
                    {test.role} @ <span className="text-gray-500">{test.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
