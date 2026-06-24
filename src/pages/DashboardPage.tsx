import { currentStudent, timetable, placements } from '../data/mockData';
import { BookOpen, Clock, Users, GraduationCap, MapPin, Briefcase, Calendar } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useAuth } from '../contexts/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();
  const attendanceData = [
    { name: 'Present', value: currentStudent.attendance, color: '#10b981' },
    { name: 'Absent', value: 100 - currentStudent.attendance, color: '#ef4444' }
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Attendance" value={`${currentStudent.attendance}%`} sub="Overall this semester" icon={Clock} color="text-emerald-400 bg-emerald-500/10 border-emerald-500/20" />
        <StatCard title="Current CGPA" value={currentStudent.cgpa.toString()} sub="Out of 10.0" icon={GraduationCap} color="text-blue-400 bg-blue-500/10 border-blue-500/20" />
        <StatCard title="Total Credits" value="22" sub="Registered this semester" icon={BookOpen} color="text-purple-400 bg-purple-500/10 border-purple-500/20" />
        <StatCard title="Semester" value={currentStudent.semester.toString()} sub={currentStudent.course} icon={Users} color="text-amber-400 bg-amber-500/10 border-amber-500/20" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Timetable */}
        <div className="xl:col-span-2 bg-slate-900/40 border border-slate-800/50 rounded-3xl shadow-sm overflow-hidden flex flex-col backdrop-blur-sm">
          <div className="p-6 border-b border-slate-800/50 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-200 flex items-center uppercase tracking-wider text-xs">
              <Calendar className="w-4 h-4 mr-2 text-blue-400" />
              Today's Schedule
            </h2>
            <span className="text-[10px] font-medium text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full uppercase tracking-wider">Monday</span>
          </div>
          <div className="p-6 flex-1 overflow-y-auto">
            <div className="space-y-4">
              {timetable.filter(t => t.day === 'Monday').map((entry, idx) => (
                <div key={idx} className="flex gap-4 items-center p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="w-24 text-center shrink-0">
                    <span className="block text-sm font-bold text-slate-200">{entry.time.split(' - ')[0]}</span>
                    <span className="block text-[10px] text-slate-500 uppercase">Start</span>
                  </div>
                  <div className="h-10 w-[2px] bg-slate-700"></div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-slate-200">{entry.course}</h3>
                    <div className="flex items-center text-[11px] text-slate-400 mt-1 gap-3">
                      <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> {entry.room}</span>
                      <span>{entry.professor}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts & Quick Info */}
        <div className="space-y-8">
          {/* Attendance Chart */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-sm font-semibold text-slate-300">Attendance Insight</h3>
                <p className="text-[11px] text-slate-500">Overall Progress</p>
              </div>
            </div>
            <div className="h-48 w-full relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={attendanceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {attendanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(15,23,42,0.9)', backdropFilter: 'blur(8px)', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none flex-col">
                <span className="text-3xl font-bold text-slate-200">{currentStudent.attendance}%</span>
              </div>
            </div>
          </div>

          {/* Placements */}
          <div className="bg-gradient-to-br from-indigo-900/20 to-blue-900/20 border border-white/5 rounded-3xl p-6 relative overflow-hidden flex flex-col">
            <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6 flex items-center relative z-10">
              <Briefcase className="w-4 h-4 mr-2 text-amber-400" />
              Latest Placements
            </h2>
            <div className="space-y-5 relative z-10 flex-1">
              {placements.slice(0, 3).map((job) => (
                <div key={job.id} className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-tight text-slate-200 mb-1">{job.companyName} - {job.role}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-slate-400">Deadline: {job.deadline}</span>
                      <span className="text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
                        {job.package}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-6 w-full py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-semibold hover:bg-white/10 transition-colors text-slate-300 relative z-10">
              View All Opportunities
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, sub, icon: Icon, color }: any) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex items-start justify-between relative overflow-hidden">
      <div className="relative z-10">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-2">{title}</p>
        <h3 className="text-3xl font-bold text-slate-200">{value}</h3>
        <p className="text-xs text-slate-400 mt-2">{sub}</p>
      </div>
      <div className={`p-3 rounded-xl border relative z-10 ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
}
