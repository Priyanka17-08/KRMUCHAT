import { Calendar, MapPin, ArrowLeft } from 'lucide-react';
import { timetable } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

export default function TimetableAssistantPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] p-4 md:p-6">
      {/* Header with Back Button */}
      <div className="flex items-center mb-4">
        <button 
          onClick={() => navigate(-1)} 
          className="mr-4 p-2 hover:bg-white/10 rounded-full transition-colors flex items-center justify-center text-slate-300 hover:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold text-white">Timetable</h1>
      </div>

      {/* Information Panel */}
      <section className="w-full flex flex-col bg-slate-900/40 border border-slate-800/50 rounded-3xl backdrop-blur-sm overflow-hidden h-full">
        <div className="p-6 border-b border-slate-800/50 bg-purple-500/5">
          <h2 className="text-lg font-bold text-purple-400 uppercase tracking-wider text-xs flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            My Weekly Timetable
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
            <div key={day} className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">{day}</h3>
              {timetable.filter(t => t.day === day).length > 0 ? (
                timetable.filter(t => t.day === day).map((entry, idx) => (
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
                ))
              ) : (
                <p className="text-xs text-slate-600 italic px-4">No classes scheduled.</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
