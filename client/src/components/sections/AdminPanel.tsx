import { useEffect, useState } from 'react';
import { 
  ShieldCheck, Loader2, ArrowLeft, Plus, 
  Trash2, Edit, Save, MessageSquare, Check, Eye 
} from 'lucide-react';

interface AdminPanelProps {
  onBack: () => void;
}

export default function AdminPanel({ onBack }: AdminPanelProps) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [verifying, setVerifying] = useState(false);
  
  const [data, setData] = useState<any>({
    projects: [],
    skills: [],
    experiences: [],
    achievements: [],
    certificates: [],
    blogs: [],
    analytics: [],
    messages: []
  });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'projects' | 'skills' | 'blogs' | 'messages'>('projects');

  // Edit / Add Form State
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formType, setFormType] = useState<'projects' | 'skills' | 'blogs' | null>(null);

  useEffect(() => {
    // Check if already authenticated in current session
    const savedPass = sessionStorage.getItem('admin_session_token');
    if (savedPass) {
      setPassword(savedPass);
      verifyPassword(savedPass);
    }
  }, []);

  const verifyPassword = async (passToVerify: string) => {
    setVerifying(true);
    setAuthError('');
    try {
      const response = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passToVerify })
      });
      const res = await response.json();
      if (res.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem('admin_session_token', passToVerify);
        loadAdminData(passToVerify);
      } else {
        setAuthError('Access denied. Invalid password key.');
        sessionStorage.removeItem('admin_session_token');
      }
    } catch (e) {
      setAuthError('Connection failed. Server offline.');
    } finally {
      setVerifying(false);
    }
  };

  const loadAdminData = async (token: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/data', {
        headers: { 'Authorization': token }
      });
      const res = await response.json();
      if (res.success) {
        setData(res.data);
      }
    } catch (e) {
      console.error('Failed to load admin stats:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    verifyPassword(password);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_session_token');
    setIsAuthenticated(false);
    setPassword('');
  };

  // CRUD Delete operation
  const handleDelete = async (type: string, id: string) => {
    if (!confirm('Are you sure you want to delete this record?')) return;
    try {
      const response = await fetch(`/api/admin/${type}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': password }
      });
      const res = await response.json();
      if (res.success) {
        loadAdminData(password);
        alert('Deleted successfully.');
      } else {
        alert('Delete failed: ' + res.error);
      }
    } catch (e) {
      alert('Network error.');
    }
  };

  // Mark message read
  const handleMarkRead = async (id: string, currentStatus: string) => {
    try {
      const response = await fetch(`/api/admin/messages/${id}`, {
        method: 'PATCH',
        headers: { 
          'Authorization': password,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: currentStatus === 'read' ? 'unread' : 'read' })
      });
      const res = await response.json();
      if (res.success) {
        loadAdminData(password);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // CRUD Save operation
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formType || !editingItem) return;

    try {
      const response = await fetch(`/api/admin/${formType}`, {
        method: 'POST',
        headers: { 
          'Authorization': password,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editingItem)
      });
      const res = await response.json();
      if (res.success) {
        loadAdminData(password);
        setEditingItem(null);
        setFormType(null);
        alert('Saved successfully!');
      } else {
        alert('Save failed: ' + res.error);
      }
    } catch (e) {
      alert('Network error.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#030712] pt-28 flex flex-col items-center justify-center p-4">
        <form 
          onSubmit={handleLoginSubmit}
          className="w-full max-w-md glass-panel border border-gray-800 rounded-xl p-8 space-y-6 shadow-2xl"
        >
          <div className="text-center space-y-2">
            <div className="h-12 w-12 rounded-lg bg-rose-950/20 border border-rose-500/20 flex items-center justify-center mx-auto text-rose-400">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold text-white font-title">Admin authentication</h2>
            <p className="text-xs text-gray-500">Provide password key to unlock dashboard access.</p>
          </div>

          <div className="space-y-1.5">
            <input
              type="password"
              placeholder="Session password key..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-850 bg-gray-950 px-4 py-2.5 text-sm text-gray-200 outline-none focus:border-rose-500/40 text-center font-mono"
              autoFocus
            />
          </div>

          {authError && (
            <p className="text-xs text-rose-400 font-mono text-center">{authError}</p>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onBack}
              className="flex-1 rounded-lg border border-gray-800 hover:bg-gray-850 text-gray-300 py-2.5 text-xs font-semibold cursor-pointer"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={verifying}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 disabled:bg-rose-800 text-white py-2.5 text-xs font-semibold cursor-pointer"
            >
              {verifying ? <Loader2 className="h-4.5 w-4.5 animate-spin" /> : 'Decrypt logs'}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] pt-24 pb-20 select-text">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-800 pb-5">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="rounded-lg border border-gray-850 bg-gray-900/60 p-2 text-gray-400 hover:text-white transition-all cursor-pointer"
            >
              <ArrowLeft className="h-4.5 w-4.5" />
            </button>
            <div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" /> Connection secure
              </span>
              <h1 className="text-2xl font-bold text-white font-title">Admin panel dashboard</h1>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-lg border border-rose-500/20 bg-rose-950/20 hover:bg-rose-900/30 text-rose-400 px-4 py-2 text-xs font-semibold cursor-pointer"
          >
            Lock console
          </button>
        </div>

        {/* Analytics mini grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="glass-panel border border-gray-850 rounded-xl p-4">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-mono">Unique Visitors</p>
            <p className="text-2xl font-bold text-white font-mono mt-1">1,247</p>
          </div>
          <div className="glass-panel border border-gray-850 rounded-xl p-4">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-mono">Active Projects</p>
            <p className="text-2xl font-bold text-white font-mono mt-1">{data.projects.length}</p>
          </div>
          <div className="glass-panel border border-gray-850 rounded-xl p-4">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-mono">Inbox Messages</p>
            <p className="text-2xl font-bold text-white font-mono mt-1">{data.messages.length}</p>
          </div>
          <div className="glass-panel border border-gray-850 rounded-xl p-4">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-mono">Journal Blogs</p>
            <p className="text-2xl font-bold text-white font-mono mt-1">{data.blogs.length}</p>
          </div>
        </div>

        {/* Tab triggers */}
        <div className="flex gap-2 border-b border-gray-900 select-none pb-0.5">
          {['projects', 'skills', 'blogs', 'messages'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab as any);
                setEditingItem(null);
                setFormType(null);
              }}
              className={`pb-2 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                activeTab === tab 
                  ? 'border-rose-500 text-rose-400' 
                  : 'border-transparent text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500 font-mono text-xs flex items-center justify-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" /> Querying SQLite tables...
          </div>
        ) : (
          <div className="space-y-6">
            {/* Project List */}
            {activeTab === 'projects' && !editingItem && (
              <div className="space-y-4">
                <button
                  onClick={() => {
                    setEditingItem({
                      title: '', description: '', category: 'Full Stack',
                      techStack: [], features: [], githubUrl: '', liveUrl: '',
                      image: '', problemStatement: '', architecture: '',
                      challenges: '', learnings: '', databaseDesign: '',
                      apiEndpoints: '', futureImprovements: ''
                    });
                    setFormType('projects');
                  }}
                  className="inline-flex items-center gap-1 rounded bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-xs font-semibold cursor-pointer"
                >
                  <Plus className="h-4 w-4" /> Add Project
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.projects.map((proj: any) => (
                    <div key={proj.id} className="glass-panel border border-gray-850 p-5 rounded-xl flex items-start justify-between gap-4">
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-cyan-400">{proj.category}</span>
                        <h4 className="text-sm font-bold text-gray-200 mt-0.5">{proj.title}</h4>
                        <p className="text-xs text-gray-500 line-clamp-2 mt-1.5">{proj.description}</p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => {
                            setEditingItem({
                              ...proj,
                              techStack: typeof proj.techStack === 'string' ? proj.techStack.split(', ') : proj.techStack,
                              features: typeof proj.features === 'string' ? proj.features.split('\n') : proj.features
                            });
                            setFormType('projects');
                          }}
                          className="p-1.5 rounded bg-gray-900 border border-gray-800 text-cyan-400 hover:bg-gray-800 cursor-pointer"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete('projects', proj.id)}
                          className="p-1.5 rounded bg-gray-900 border border-gray-800 text-rose-500 hover:bg-gray-800 cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills tab */}
            {activeTab === 'skills' && !editingItem && (
              <div className="space-y-4">
                <button
                  onClick={() => {
                    setEditingItem({ name: '', category: 'Frontend', level: 80, icon: 'Code' });
                    setFormType('skills');
                  }}
                  className="inline-flex items-center gap-1 rounded bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-xs font-semibold cursor-pointer"
                >
                  <Plus className="h-4 w-4" /> Add Skill
                </button>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {data.skills.map((skill: any) => (
                    <div key={skill.id} className="glass-panel border border-gray-850 p-4 rounded-xl flex items-center justify-between gap-3">
                      <div>
                        <h4 className="text-xs font-bold text-gray-200">{skill.name}</h4>
                        <span className="text-[10px] text-gray-500">{skill.category} ({skill.level}%)</span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => {
                            setEditingItem(skill);
                            setFormType('skills');
                          }}
                          className="p-1 rounded bg-gray-900 border border-gray-800 text-cyan-400 hover:bg-gray-800 cursor-pointer"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete('skills', skill.id)}
                          className="p-1 rounded bg-gray-900 border border-gray-800 text-rose-500 hover:bg-gray-800 cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Blogs tab */}
            {activeTab === 'blogs' && !editingItem && (
              <div className="space-y-4">
                <button
                  onClick={() => {
                    setEditingItem({
                      slug: '', title: '', description: '', content: '',
                      category: 'Distributed Systems', tags: [], published: true, date: 'June 2026'
                    });
                    setFormType('blogs');
                  }}
                  className="inline-flex items-center gap-1 rounded bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-xs font-semibold cursor-pointer"
                >
                  <Plus className="h-4 w-4" /> Add Blog Article
                </button>

                <div className="space-y-3">
                  {data.blogs.map((blog: any) => (
                    <div key={blog.id} className="glass-panel border border-gray-850 p-4 rounded-xl flex items-center justify-between gap-4">
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-cyan-400">{blog.category}</span>
                        <h4 className="text-sm font-bold text-gray-200 mt-0.5">{blog.title}</h4>
                        <p className="text-xs text-gray-500 mt-1">Slug: <span className="font-mono">{blog.slug}</span></p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => {
                            setEditingItem({
                              ...blog,
                              tags: typeof blog.tags === 'string' ? blog.tags.split(', ') : blog.tags
                            });
                            setFormType('blogs');
                          }}
                          className="p-1.5 rounded bg-gray-900 border border-gray-800 text-cyan-400 hover:bg-gray-800 cursor-pointer"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete('blogs', blog.id)}
                          className="p-1.5 rounded bg-gray-900 border border-gray-800 text-rose-500 hover:bg-gray-800 cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Messages tab */}
            {activeTab === 'messages' && (
              <div className="space-y-4">
                {data.messages.length === 0 ? (
                  <div className="text-center py-10 text-gray-500 font-mono text-xs">Inbox empty.</div>
                ) : (
                  <div className="space-y-4">
                    {data.messages.map((msg: any) => (
                      <div 
                        key={msg.id} 
                        className={`glass-panel border rounded-xl p-5 md:p-6 space-y-3 transition-all ${
                          msg.status === 'unread' ? 'border-cyan-500/30 bg-cyan-950/5' : 'border-gray-850'
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <span className="text-[10px] font-mono text-gray-500">{new Date(msg.date).toLocaleString()}</span>
                            <h4 className="text-sm font-bold text-gray-200 mt-0.5">{msg.name} ({msg.email})</h4>
                            <p className="text-xs text-cyan-400 mt-0.5">Subject: {msg.subject}</p>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleMarkRead(msg.id, msg.status)}
                              className={`p-1.5 rounded bg-gray-900 border border-gray-800 cursor-pointer ${
                                msg.status === 'unread' ? 'text-emerald-400' : 'text-gray-400'
                              }`}
                              title={msg.status === 'unread' ? 'Mark read' : 'Mark unread'}
                            >
                              <Check className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete('messages', msg.id)}
                              className="p-1.5 rounded bg-gray-900 border border-gray-800 text-rose-500 hover:bg-gray-800 cursor-pointer"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans bg-gray-950/40 p-4 rounded-lg border border-gray-900">
                          {msg.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Editing/Creating form wrapper */}
            {editingItem && formType && (
              <form 
                onSubmit={handleSave}
                className="glass-panel border border-gray-800 rounded-xl p-6 md:p-8 space-y-6"
              >
                <h3 className="text-base font-bold text-gray-200 font-title uppercase tracking-widest border-b border-gray-850 pb-3">
                  {editingItem.id ? 'Edit' : 'Create new'} {formType} record
                </h3>

                {formType === 'projects' && (
                  <div className="grid grid-cols-1 gap-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-400">Title</label>
                        <input
                          type="text"
                          required
                          value={editingItem.title}
                          onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                          className="w-full rounded bg-gray-950 border border-gray-800 p-2 text-sm text-gray-200 outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-400">Category</label>
                        <select
                          value={editingItem.category}
                          onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                          className="w-full rounded bg-gray-950 border border-gray-800 p-2 text-sm text-gray-200 outline-none"
                        >
                          <option value="Full Stack">Full Stack</option>
                          <option value="Backend">Backend</option>
                          <option value="Frontend">Frontend</option>
                          <option value="AI">AI</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-400">Brief Description</label>
                      <input
                        type="text"
                        required
                        value={editingItem.description}
                        onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                        className="w-full rounded bg-gray-950 border border-gray-800 p-2 text-sm text-gray-200 outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-400">Tech Stack (comma separated)</label>
                        <input
                          type="text"
                          placeholder="React, Express, Redis"
                          value={Array.isArray(editingItem.techStack) ? editingItem.techStack.join(', ') : editingItem.techStack}
                          onChange={(e) => setEditingItem({ ...editingItem, techStack: e.target.value })}
                          className="w-full rounded bg-gray-950 border border-gray-800 p-2 text-sm text-gray-200 outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-400">Features (one per line)</label>
                        <textarea
                          rows={3}
                          placeholder="Feature 1&#10;Feature 2"
                          value={Array.isArray(editingItem.features) ? editingItem.features.join('\n') : editingItem.features}
                          onChange={(e) => setEditingItem({ ...editingItem, features: e.target.value })}
                          className="w-full rounded bg-gray-950 border border-gray-800 p-2 text-sm text-gray-200 outline-none resize-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-400">GitHub Link</label>
                        <input
                          type="url"
                          value={editingItem.githubUrl}
                          onChange={(e) => setEditingItem({ ...editingItem, githubUrl: e.target.value })}
                          className="w-full rounded bg-gray-950 border border-gray-800 p-2 text-sm text-gray-200 outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-400">Live Demo URL</label>
                        <input
                          type="url"
                          value={editingItem.liveUrl}
                          onChange={(e) => setEditingItem({ ...editingItem, liveUrl: e.target.value })}
                          className="w-full rounded bg-gray-950 border border-gray-800 p-2 text-sm text-gray-200 outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-400">Cover Image link</label>
                        <input
                          type="text"
                          value={editingItem.image}
                          onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                          className="w-full rounded bg-gray-950 border border-gray-800 p-2 text-sm text-gray-200 outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-400">The Problem Statement</label>
                      <textarea
                        rows={2}
                        value={editingItem.problemStatement}
                        onChange={(e) => setEditingItem({ ...editingItem, problemStatement: e.target.value })}
                        className="w-full rounded bg-gray-950 border border-gray-800 p-2 text-sm text-gray-200 outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-400">System Architecture</label>
                      <textarea
                        rows={2}
                        value={editingItem.architecture}
                        onChange={(e) => setEditingItem({ ...editingItem, architecture: e.target.value })}
                        className="w-full rounded bg-gray-950 border border-gray-800/80 p-2 text-sm text-gray-200 outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-400 font-mono">Prisma DB Design Specs</label>
                        <textarea
                          rows={4}
                          value={editingItem.databaseDesign}
                          onChange={(e) => setEditingItem({ ...editingItem, databaseDesign: e.target.value })}
                          className="w-full rounded bg-gray-950 border border-gray-805 p-2 text-xs font-mono text-cyan-300 outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-400">REST API Interfaces</label>
                        <textarea
                          rows={4}
                          value={editingItem.apiEndpoints}
                          onChange={(e) => setEditingItem({ ...editingItem, apiEndpoints: e.target.value })}
                          className="w-full rounded bg-gray-950 border border-gray-805 p-2 text-xs font-mono outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-400">Technical Challenges</label>
                        <textarea
                          rows={2}
                          value={editingItem.challenges}
                          onChange={(e) => setEditingItem({ ...editingItem, challenges: e.target.value })}
                          className="w-full rounded bg-gray-950 border border-gray-800 p-2 text-sm text-gray-200 outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-400">Key Learnings</label>
                        <textarea
                          rows={2}
                          value={editingItem.learnings}
                          onChange={(e) => setEditingItem({ ...editingItem, learnings: e.target.value })}
                          className="w-full rounded bg-gray-950 border border-gray-800 p-2 text-sm text-gray-200 outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-400">Future Roadmap</label>
                      <input
                        type="text"
                        value={editingItem.futureImprovements}
                        onChange={(e) => setEditingItem({ ...editingItem, futureImprovements: e.target.value })}
                        className="w-full rounded bg-gray-950 border border-gray-800 p-2 text-sm text-gray-200 outline-none"
                      />
                    </div>
                  </div>
                )}

                {formType === 'skills' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-400">Skill Name</label>
                      <input
                        type="text"
                        required
                        value={editingItem.name}
                        onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                        className="w-full rounded bg-gray-950 border border-gray-800 p-2 text-sm text-gray-200 outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-400">Category</label>
                      <select
                        value={editingItem.category}
                        onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                        className="w-full rounded bg-gray-950 border border-gray-800 p-2 text-sm text-gray-200 outline-none"
                      >
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Databases">Databases</option>
                        <option value="Programming">Programming</option>
                        <option value="Tools">Tools</option>
                        <option value="AI">AI</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-400">Level (0-100)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        required
                        value={editingItem.level}
                        onChange={(e) => setEditingItem({ ...editingItem, level: e.target.value })}
                        className="w-full rounded bg-gray-950 border border-gray-800 p-2 text-sm text-gray-200 outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-400">Lucide icon identifier</label>
                      <input
                        type="text"
                        placeholder="React, Terminal, Cpu"
                        value={editingItem.icon}
                        onChange={(e) => setEditingItem({ ...editingItem, icon: e.target.value })}
                        className="w-full rounded bg-gray-950 border border-gray-800 p-2 text-sm text-gray-200 outline-none"
                      />
                    </div>
                  </div>
                )}

                {formType === 'blogs' && (
                  <div className="grid grid-cols-1 gap-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-400">Title</label>
                        <input
                          type="text"
                          required
                          value={editingItem.title}
                          onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                          className="w-full rounded bg-gray-950 border border-gray-800 p-2 text-sm text-gray-200 outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-400 font-mono">Unique URL Slug</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. crdt-text-editors-work"
                          value={editingItem.slug}
                          onChange={(e) => setEditingItem({ ...editingItem, slug: e.target.value })}
                          className="w-full rounded bg-gray-950 border border-gray-800 p-2 text-sm text-gray-200 outline-none font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-400">Category</label>
                        <input
                          type="text"
                          value={editingItem.category}
                          onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                          className="w-full rounded bg-gray-950 border border-gray-800 p-2 text-sm text-gray-200 outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-400">Date</label>
                        <input
                          type="text"
                          value={editingItem.date}
                          onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                          className="w-full rounded bg-gray-950 border border-gray-800 p-2 text-sm text-gray-200 outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-400">Tags (comma separated)</label>
                        <input
                          type="text"
                          value={Array.isArray(editingItem.tags) ? editingItem.tags.join(', ') : editingItem.tags}
                          onChange={(e) => setEditingItem({ ...editingItem, tags: e.target.value })}
                          className="w-full rounded bg-gray-950 border border-gray-800 p-2 text-sm text-gray-200 outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-400">Brief Summary</label>
                      <input
                        type="text"
                        value={editingItem.description}
                        onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                        className="w-full rounded bg-gray-950 border border-gray-800 p-2 text-sm text-gray-200 outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-400">Markdown Content Body</label>
                      <textarea
                        rows={12}
                        required
                        value={editingItem.content}
                        onChange={(e) => setEditingItem({ ...editingItem, content: e.target.value })}
                        className="w-full rounded bg-gray-950 border border-gray-800 p-2 font-mono text-xs text-gray-300 outline-none leading-relaxed"
                      />
                    </div>
                  </div>
                )}

                <div className="flex gap-3 justify-end pt-4 border-t border-gray-850 select-none">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingItem(null);
                      setFormType(null);
                    }}
                    className="rounded bg-gray-900 hover:bg-gray-800 text-gray-400 px-5 py-2 text-xs font-semibold border border-gray-800 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1 rounded bg-rose-600 hover:bg-rose-700 text-white px-5 py-2 text-xs font-semibold cursor-pointer"
                  >
                    <Save className="h-4 w-4" /> Save changes
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
