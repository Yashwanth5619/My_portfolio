import { motion } from 'framer-motion';
import { Layout, Server, Cpu, Sparkles, Code, HelpCircle } from 'lucide-react';

interface Service {
  title: string;
  description: string;
  icon: string;
}

interface ServicesProps {
  services: Service[];
}

export default function ServicesSection({ services }: ServicesProps) {
  const iconMap: Record<string, React.ReactNode> = {
    Layout: <Layout className="h-6 w-6 text-cyan-400 animate-pulse" />,
    Server: <Server className="h-6 w-6 text-cyan-400" />,
    Cpu: <Cpu className="h-6 w-6 text-cyan-400" />,
    Sparkles: <Sparkles className="h-6 w-6 text-cyan-400" />,
    Code: <Code className="h-6 w-6 text-cyan-400" />,
  };

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
    <section className="py-20 bg-[#0d131f] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 font-mono">
            Offerings
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-title text-white">
            What I Do
          </h2>
          <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full" />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((srv, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="group glass-panel hover-glow border border-gray-850 hover:border-gray-800 rounded-xl p-6 md:p-8 flex flex-col justify-between transition-all"
            >
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center shadow-inner group-hover:border-cyan-500/20 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all">
                  {iconMap[srv.icon] || <HelpCircle className="h-6 w-6 text-gray-400" />}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-100 group-hover:text-cyan-300 transition-colors font-title">
                  {srv.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
                  {srv.description}
                </p>
              </div>
              <div className="h-1 w-6 bg-cyan-500 mt-6 rounded group-hover:w-12 transition-all duration-300" />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
