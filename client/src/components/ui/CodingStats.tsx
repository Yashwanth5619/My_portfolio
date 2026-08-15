import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, 
  ResponsiveContainer, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, Radar 
} from 'recharts';
import { Trophy, CheckCircle, BarChart3 } from 'lucide-react';

export default function CodingStats() {
  const skillChartData = [
    { subject: 'Algorithms', A: 94, fullMark: 100 },
    { subject: 'Data Structures', A: 95, fullMark: 100 },
    { subject: 'Backend Dev', A: 88, fullMark: 100 },
    { subject: 'System Design', A: 85, fullMark: 100 },
    { subject: 'Databases', A: 87, fullMark: 100 },
    { subject: 'AI & ML', A: 75, fullMark: 100 },
  ];

  const leetCodeTrend = [
    { name: 'Contest 1', rating: 1485 },
    { name: 'Contest 2', rating: 1458 },
    { name: 'Contest 3', rating: 1441 },
  ];

  const geeksforgeeksTrend = [
    { name: 'Month 1', rating: 480 },
    { name: 'Month 2', rating: 510 },
    { name: 'Month 3', rating: 540 },
    { name: 'Month 4', rating: 570 },
    { name: 'Month 5', rating: 601 },
  ];

  return (
    <div className="space-y-10">


      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-panel rounded-xl p-6 border border-gray-800 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-gray-800 pb-3">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span className="font-bold text-gray-200">LeetCode Contester</span>
              </div>
              <span className="rounded bg-yellow-500/10 px-2 py-0.5 text-xs font-semibold text-yellow-500 border border-yellow-500/20">
                Rating 1441 (Top 66.39%)
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center bg-gray-900/50 rounded-lg p-2.5 border border-gray-800/50">
                <p className="text-xs text-gray-500">Solved</p>
                <p className="text-lg font-bold text-white font-mono mt-0.5">334</p>
              </div>
              <div className="text-center bg-gray-900/50 rounded-lg p-2.5 border border-gray-800/50">
                <p className="text-xs text-gray-500">Global Rank</p>
                <p className="text-lg font-bold text-white font-mono mt-0.5">410,603</p>
              </div>
              <div className="text-center bg-gray-900/50 rounded-lg p-2.5 border border-gray-800/50">
                <p className="text-xs text-gray-500">Contests</p>
                <p className="text-lg font-bold text-white font-mono mt-0.5">3</p>
              </div>
            </div>
          </div>

          <div className="h-40 w-full mt-2">
            <p className="text-xs text-gray-500 mb-2 font-mono flex items-center gap-1">
              <BarChart3 className="h-3.5 w-3.5" /> Rating Progression Trend
            </p>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={leetCodeTrend}>
                <XAxis dataKey="name" stroke="#6b7280" fontSize={11} tickLine={false} />
                <YAxis domain={[1350, 1550]} stroke="#6b7280" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#1f2937', color: '#fff' }}
                  labelStyle={{ color: '#06b6d4' }}
                />
                <Bar dataKey="rating" fill="#eab308" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-panel rounded-xl p-6 border border-gray-800 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-gray-800 pb-3">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-emerald-500" />
                <span className="font-bold text-gray-200">GeeksforGeeks Coder</span>
              </div>
              <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-500 border border-emerald-500/20">
                Institute Rank 62
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center bg-gray-900/50 rounded-lg p-2.5 border border-gray-800/50">
                <p className="text-xs text-gray-500">Coding Score</p>
                <p className="text-lg font-bold text-white font-mono mt-0.5">601</p>
              </div>
              <div className="text-center bg-gray-900/50 rounded-lg p-2.5 border border-gray-800/50">
                <p className="text-xs text-gray-500">Solved</p>
                <p className="text-lg font-bold text-white font-mono mt-0.5">262</p>
              </div>
              <div className="text-center bg-gray-900/50 rounded-lg p-2.5 border border-gray-800/50">
                <p className="text-xs text-gray-500">POTD Solved</p>
                <p className="text-lg font-bold text-white font-mono mt-0.5">18</p>
              </div>
            </div>
          </div>

          <div className="h-40 w-full mt-2">
            <p className="text-xs text-gray-500 mb-2 font-mono flex items-center gap-1">
              <BarChart3 className="h-3.5 w-3.5" /> Score Progression Trend
            </p>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={geeksforgeeksTrend}>
                <XAxis dataKey="name" stroke="#6b7280" fontSize={11} tickLine={false} />
                <YAxis domain={[400, 700]} stroke="#6b7280" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#1f2937', color: '#fff' }}
                  labelStyle={{ color: '#10b981' }}
                />
                <Bar dataKey="rating" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-panel rounded-xl p-6 border border-gray-800 flex flex-col items-center justify-center"
      >
        <div className="w-full flex items-center justify-start gap-2 mb-6 border-b border-gray-800 pb-3">
          <CheckCircle className="h-5 w-5 text-blue-500" />
          <h3 className="text-base font-bold text-gray-200">Algorithmic & System Capabilities Matrix</h3>
        </div>

        <div className="h-64 w-full max-w-[420px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillChartData}>
              <PolarGrid stroke="#1f2937" />
              <PolarAngleAxis dataKey="subject" stroke="#9ca3af" fontSize={11} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#4b5563" fontSize={9} />
              <Radar 
                name="Proficiency" 
                dataKey="A" 
                stroke="#06b6d4" 
                fill="#2563eb" 
                fillOpacity={0.25} 
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
