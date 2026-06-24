import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  MessageSquare, Calendar, Users, Briefcase, 
  Search, Bell, Sparkles, TrendingUp, BookOpen,
  Award, ShieldAlert, Zap, FileText, ChevronRight, Bot
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { Student } from '../types';

export default function HomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isStudent = user?.role === 'student';
  const student = user as Student;

  const [searchQuery, setSearchQuery] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const placeholders = [
    "Ask about Placements...",
    "Ask about Attendance...",
    "Ask about Faculty...",
    "Ask about Exams..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, pass this query via state to the assistant page
      navigate('/student-assistant');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-12 pb-24 overflow-x-hidden">
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl overflow-hidden bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl text-slate-200 p-8 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-12"
      >
        {/* Animated Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1] 
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-gradient-to-br from-blue-600/10 via-indigo-600/10 to-transparent rounded-full blur-[100px]"
          />
          <motion.div 
            animate={{ 
              rotate: [360, 0],
              scale: [1, 1.5, 1] 
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-purple-600/10 via-blue-600/10 to-transparent rounded-full blur-[80px]"
          />
        </div>

        <div className="z-10 max-w-2xl w-full">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider"
          >
            <Sparkles className="w-4 h-4" />
            AI Assistant Active
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-4 leading-tight"
          >
            Welcome Back, <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">{user?.name.split(' ')[0]}</span> 👋
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-slate-400 mb-8"
          >
            Your intelligent AI operating system for KR Mangalam University.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-2 max-w-xl backdrop-blur-md shadow-2xl"
          >
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <Search className="w-5 h-5 ml-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={placeholders[placeholderIndex]}
                className="flex-1 bg-transparent border-none text-sm focus:outline-none px-2 py-3 text-slate-200 placeholder-slate-500 transition-all"
              />
              <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-[0_0_15px_rgba(79,70,229,0.3)]">
                Ask
              </button>
            </form>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 flex flex-wrap gap-2 text-xs text-slate-400 items-center"
          >
            <span className="font-semibold text-slate-500 mr-2">Suggested:</span>
            {['Show today\'s classes', 'Placement opportunities', 'Exam schedule'].map((suggestion, idx) => (
              <button 
                key={idx}
                onClick={() => setSearchQuery(suggestion)}
                className="bg-slate-800/40 hover:bg-slate-700/60 border border-slate-700/50 px-3 py-1.5 rounded-full transition-colors hover:text-slate-200"
              >
                {suggestion}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Floating Cards / Right Side */}
        <div className="z-10 w-full lg:w-auto relative hidden md:block">
          <div className="relative w-[340px] h-[340px]">
             {/* Center AI Orb */}
             <div className="absolute inset-0 m-auto w-32 h-32 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-full blur-xl opacity-50 animate-pulse" />
             <div className="absolute inset-0 m-auto w-24 h-24 bg-gradient-to-tr from-blue-400 to-indigo-400 rounded-full shadow-[0_0_40px_rgba(99,102,241,0.5)] flex items-center justify-center">
                <Bot className="w-10 h-10 text-white" />
             </div>

             {/* Orbiting Cards */}
             <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0 }}
               className="absolute -top-4 -left-8 bg-slate-800/80 border border-slate-700/50 p-4 rounded-2xl backdrop-blur-md shadow-xl flex items-center gap-3 w-48"
             >
               <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                 <TrendingUp className="w-5 h-5 text-emerald-400" />
               </div>
               <div>
                 <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Attendance</p>
                 <p className="text-lg font-bold text-white">{isStudent ? `${student.attendance}%` : 'N/A'}</p>
               </div>
             </motion.div>

             <motion.div 
               animate={{ y: [0, 10, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="absolute top-12 -right-12 bg-slate-800/80 border border-slate-700/50 p-4 rounded-2xl backdrop-blur-md shadow-xl flex items-center gap-3 w-52"
             >
               <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-500/30">
                 <Briefcase className="w-5 h-5 text-amber-400" />
               </div>
               <div>
                 <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Placements</p>
                 <p className="text-sm font-bold text-white leading-tight">12 New Jobs</p>
               </div>
             </motion.div>

             <motion.div 
               animate={{ y: [0, -8, 0] }}
               transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
               className="absolute -bottom-8 left-4 bg-slate-800/80 border border-slate-700/50 p-4 rounded-2xl backdrop-blur-md shadow-xl flex items-center gap-3 w-48"
             >
               <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                 <Calendar className="w-5 h-5 text-blue-400" />
               </div>
               <div>
                 <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Upcoming</p>
                 <p className="text-sm font-bold text-white truncate">Database Mgmt</p>
               </div>
             </motion.div>
          </div>
        </div>
      </motion.section>

      {/* University Stats Section */}
      {isStudent && (
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <StatCard title="Attendance" value={`${student.attendance}%`} sub="Overall" trend="+2% this month" trendUp />
          <StatCard title="CGPA" value={`${student.cgpa}`} sub="Current" trend="Top 15%" trendUp />
          <StatCard title="Credits" value="112" sub="Completed" trend="8 remaining" />
          <StatCard title="Notices" value="5" sub="Unread" trend="2 Urgent" alert />
        </motion.section>
      )}

      {/* Quick Access Grid */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-200">Quick Access</h2>
          <button className="text-sm text-indigo-400 hover:text-indigo-300 font-semibold flex items-center">
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickAccessCard icon={Users} title="Faculty" badge="120 Faculty" path="/faculty-assistant" />
          <QuickAccessCard icon={Briefcase} title="Placements" badge="12 New Jobs" highlight path="/placement-assistant" />
          <QuickAccessCard icon={Calendar} title="Timetable" badge="Today's Classes" path="/timetable-assistant" />
          <QuickAccessCard icon={Award} title="Results" badge="SGPA 8.2" path="/dashboard" />
          <QuickAccessCard icon={BookOpen} title="Attendance" badge="89%" path="/dashboard" />
          <QuickAccessCard icon={Zap} title="Fees" badge="Paid" path="/dashboard" />
          <QuickAccessCard icon={Bell} title="Notices" badge="5 New" path="/dashboard" />
          <QuickAccessCard icon={MessageSquare} title="AI Chat" badge="24/7 Support" highlight path="/student-assistant" />
        </div>
      </motion.section>

      {/* Two Column Layout: Specialized AI Assistants & University Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Specialized AI Cards (Left Column) */}
        <motion.section
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-1 space-y-4"
        >
          <h2 className="text-xl font-bold text-slate-200 mb-6">Specialized Assistants</h2>
          
          <AssistantCard 
            title="Faculty AI" 
            desc="Ask about faculty members, office hours & research." 
            path="/faculty-assistant"
            icon={Users}
            color="from-emerald-500/20 to-teal-500/5"
            border="border-emerald-500/20"
            iconColor="text-emerald-400"
          />
          <AssistantCard 
            title="Placement AI" 
            desc="Explore jobs, eligibility & interview preparation." 
            path="/placement-assistant"
            icon={Briefcase}
            color="from-amber-500/20 to-orange-500/5"
            border="border-amber-500/20"
            iconColor="text-amber-400"
          />
          <AssistantCard 
            title="Timetable AI" 
            desc="Check your upcoming classes and lab schedules." 
            path="/timetable-assistant"
            icon={Calendar}
            color="from-purple-500/20 to-fuchsia-500/5"
            border="border-purple-500/20"
            iconColor="text-purple-400"
          />
          {!isStudent && (
             <AssistantCard 
              title="Admin AI" 
              desc="Manage university data & generate reports." 
              path="/admin-assistant"
              icon={ShieldAlert}
              color="from-rose-500/20 to-red-500/5"
              border="border-rose-500/20"
              iconColor="text-rose-400"
            />
          )}
        </motion.section>

        {/* University Feed (Right Columns) */}
        <motion.section
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-200">Latest Announcements</h2>
            <button className="p-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-full transition-colors text-slate-400 hover:text-white">
              <Bell className="w-4 h-4" />
            </button>
          </div>
          
          <div className="bg-slate-900/40 border border-slate-800/50 rounded-3xl p-6 backdrop-blur-sm space-y-6 relative overflow-hidden">
            {/* Subtle bg glow for feed */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <FeedItem 
              icon={FileText} 
              title="Semester Exam Date Sheet Released" 
              time="2 hours ago" 
              desc="The final date sheet for Even Semester 2026 has been published. Please check the examination portal."
              tag="Urgent"
              tagColor="bg-red-500/10 text-red-400 border-red-500/20"
            />
            <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
            
            <FeedItem 
              icon={Zap} 
              title="Hackathon Registration Open" 
              time="5 hours ago" 
              desc="Register for the annual KRMU Tech Hackathon. Prizes worth ₹1 Lakh to be won!"
              tag="Event"
              tagColor="bg-purple-500/10 text-purple-400 border-purple-500/20"
            />
            <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-800 to-transparent" />

            <FeedItem 
              icon={Briefcase} 
              title="Microsoft Placement Drive" 
              time="1 day ago" 
              desc="Microsoft will be conducting an on-campus placement drive for SDE-1 roles next week."
              tag="Placement"
              tagColor="bg-amber-500/10 text-amber-400 border-amber-500/20"
            />
            <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-800 to-transparent" />

            <FeedItem 
              icon={Award} 
              title="Student Achievement Awards" 
              time="2 days ago" 
              desc="Nominations are now open for the Annual Student Excellence Awards 2026."
              tag="General"
              tagColor="bg-blue-500/10 text-blue-400 border-blue-500/20"
            />
          </div>
        </motion.section>

      </div>
    </div>
  );
}

// Subcomponents

function StatCard({ title, value, sub, trend, trendUp, alert }: any) {
  return (
    <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-5 backdrop-blur-md hover:bg-slate-800/40 transition-colors group">
      <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">{title}</p>
      <div className="flex items-end gap-2 mb-2">
        <h3 className="text-3xl font-bold text-slate-100">{value}</h3>
        <span className="text-sm text-slate-500 mb-1">{sub}</span>
      </div>
      <p className={`text-xs font-medium ${alert ? 'text-amber-400' : trendUp ? 'text-emerald-400' : 'text-slate-400'}`}>
        {trend}
      </p>
    </div>
  );
}

function QuickAccessCard({ icon: Icon, title, badge, highlight, path }: any) {
  return (
    <Link to={path} className="block group">
      <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 hover:bg-slate-800/60 hover:-translate-y-1 transition-all duration-300 h-full backdrop-blur-sm relative overflow-hidden">
        {highlight && (
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-colors" />
        )}
        <div className={`p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 group-hover:scale-110 transition-transform ${highlight ? 'text-indigo-400' : 'text-slate-300'}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="text-center">
          <h4 className="text-sm font-bold text-slate-200 mb-1">{title}</h4>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${highlight ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>
            {badge}
          </span>
        </div>
      </div>
    </Link>
  );
}

function AssistantCard({ title, desc, path, icon: Icon, color, border, iconColor }: any) {
  return (
    <Link to={path} className="block group">
      <div className={`bg-gradient-to-br ${color} border ${border} rounded-2xl p-5 hover:brightness-110 transition-all duration-300 flex items-start gap-4 backdrop-blur-md`}>
        <div className={`p-3 rounded-xl bg-slate-900/50 border border-white/5 shadow-inner ${iconColor}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-100 mb-1 group-hover:text-white transition-colors">{title}</h4>
          <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
        </div>
      </div>
    </Link>
  );
}

function FeedItem({ icon: Icon, title, time, desc, tag, tagColor }: any) {
  return (
    <div className="flex gap-4 group">
      <div className="w-10 h-10 rounded-full bg-slate-800/80 border border-slate-700/80 flex items-center justify-center shrink-0 group-hover:bg-slate-700 transition-colors">
        <Icon className="w-5 h-5 text-slate-300" />
      </div>
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h4 className="text-sm font-bold text-slate-200">{title}</h4>
          <span className={`text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold border ${tagColor}`}>
            {tag}
          </span>
        </div>
        <p className="text-[10px] text-slate-500 mb-2">{time}</p>
        <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

