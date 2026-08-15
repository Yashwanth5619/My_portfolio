import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Calendar, ArrowLeft, Tag, Clock, Share2 } from 'lucide-react';

interface Blog {
  slug: string;
  title: string;
  description: string;
  content: string;
  date: string;
  category: string;
  tags: string[];
}

interface BlogDetailProps {
  slug: string;
  onBack: () => void;
}

export default function BlogDetail({ slug, onBack }: BlogDetailProps) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    // Fetch article from backend API
    fetch(`/api/blogs/${slug}`)
      .then((r) => {
        if (!r.ok) throw new Error('Article not found');
        return r.json();
      })
      .then((res) => {
        if (res.success) {
          setBlog(res.data);
        } else {
          throw new Error(res.error || 'Fetch failed');
        }
      })
      .catch((err) => {
        console.error(err);
        setError('Could not locate the requested article. Please make sure the backend server is running.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030712] pt-28 flex flex-col items-center justify-center text-gray-500 font-mono text-sm">
        <div className="h-8 w-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin mb-4" />
        Fetching article payload...
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-[#030712] pt-28 max-w-3xl mx-auto px-4 text-center space-y-6">
        <div className="rounded-lg bg-rose-950/30 border border-rose-500/20 p-6 text-rose-400 font-mono text-sm">
          ⚠️ {error || 'Article not found.'}
        </div>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-800 bg-gray-900 px-5 py-2.5 text-xs font-semibold text-gray-300 hover:bg-gray-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Portfolio
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4 space-y-8 select-text">
        
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-800 bg-gray-900/60 hover:bg-gray-850 text-gray-300 px-4 py-2 text-xs font-semibold transition-all cursor-pointer select-none"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Portfolio
        </button>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-gray-500 select-none">
            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {blog.date}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> 6 min read</span>
            <span>•</span>
            <span className="text-cyan-400 uppercase font-semibold">{blog.category}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-title leading-tight">
            {blog.title}
          </h1>

          <p className="text-sm sm:text-base text-gray-400 leading-relaxed italic border-l-2 border-cyan-400 pl-4 py-1">
            {blog.description}
          </p>
        </div>

        <div className="flex items-center justify-between border-y border-gray-800/80 py-4 select-none">
          <div className="flex flex-wrap gap-1.5">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="rounded bg-gray-900 border border-gray-850 px-2.5 py-0.5 text-xs font-mono text-gray-400 flex items-center gap-1"
              >
                <Tag className="h-3 w-3" /> {tag}
              </span>
            ))}
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 rounded-lg border border-gray-850 hover:bg-gray-900/60 text-gray-400 hover:text-white px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Share2 className="h-3.5 w-3.5" /> Share
          </button>
        </div>

        {/* Render markdown compile content */}
        <article className="prose prose-invert prose-cyan max-w-none text-gray-300 leading-relaxed space-y-6 text-sm sm:text-base markdown-renderer">
          <ReactMarkdown>{blog.content}</ReactMarkdown>
        </article>

      </div>
    </div>
  );
}
