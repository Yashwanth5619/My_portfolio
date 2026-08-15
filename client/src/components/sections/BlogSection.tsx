import { motion } from 'framer-motion';
import { Calendar, Tag, ArrowRight } from 'lucide-react';

interface Blog {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
}

interface BlogProps {
  blogs: Blog[];
}

export default function BlogSection({ blogs }: BlogProps) {
  const publishedBlogs = blogs.filter(b => b.slug);

  const handlePostClick = (slug: string) => {
    window.location.hash = `#/blog/${slug}`;
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
    <section id="blog" className="py-20 bg-[#0d131f] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 font-mono">
            Tech Journal
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-title text-white">
            Engineering Blog Articles
          </h2>
          <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full" />
        </div>

        {publishedBlogs.length === 0 ? (
          <div className="text-center py-16 text-gray-500 font-mono text-sm border border-dashed border-gray-800 rounded-2xl">
            No articles published yet.
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {publishedBlogs.map((blog, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                onClick={() => handlePostClick(blog.slug)}
                className="group cursor-pointer glass-panel border border-gray-850 hover:border-gray-800 rounded-xl p-6 md:p-8 flex flex-col justify-between hover:shadow-[0_0_30px_rgba(6,182,212,0.04)] transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {blog.date}</span>
                    <span>•</span>
                    <span className="text-cyan-400 uppercase font-semibold">{blog.category}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-gray-100 group-hover:text-cyan-300 transition-colors font-title">
                    {blog.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans line-clamp-2">
                    {blog.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-850 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex flex-wrap gap-1.5">
                    {blog.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-gray-900 border border-gray-850 px-2 py-0.5 text-[10px] font-mono text-gray-400 flex items-center gap-1 select-none"
                      >
                        <Tag className="h-2.5 w-2.5" /> {tag}
                      </span>
                    ))}
                  </div>

                  <span className="text-cyan-400 font-semibold flex items-center gap-1 group-hover:gap-1.5 transition-all">
                    Read Article <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

      </div>
    </section>
  );
}
