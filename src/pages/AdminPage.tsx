import { useState, useEffect } from 'react';
import { Upload, FileText, Trash2, Plus, Bell, Bot } from 'lucide-react';
import { Notice } from '../types';
import { useNavigate } from 'react-router-dom';

export default function AdminPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/notices')
      .then(res => res.json())
      .then(data => {
        setNotices(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch notices:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-200">Admin Dashboard</h1>
          <p className="text-slate-400 text-sm">Manage university data, notices, and documents</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center transition-colors text-sm shadow-[0_0_15px_rgba(37,99,235,0.4)]">
          <Plus className="w-4 h-4 mr-2" />
          Add New
        </button>
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button 
          onClick={() => navigate('/admin-assistant')}
          className="bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 rounded-2xl p-6 text-left transition-colors flex flex-col h-full cursor-pointer shadow-[0_0_15px_rgba(79,70,229,0.1)]"
        >
          <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-4 text-indigo-400 border border-indigo-500/30">
            <Bot className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-200 mb-1">Admin Assistant</h3>
          <p className="text-xs text-slate-400 leading-relaxed">Manage students, faculty, reports, notices, and analytics using natural language.</p>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Document Upload Area */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 lg:col-span-1">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4 flex items-center">
            <Upload className="w-4 h-4 mr-2 text-indigo-400" />
            Upload Document
          </h2>
          <div className="mt-4 flex justify-center rounded-2xl border border-dashed border-slate-700 px-6 py-12 hover:bg-white/5 transition-colors cursor-pointer bg-slate-900/50">
            <div className="text-center">
              <FileText className="mx-auto h-10 w-10 text-slate-500" aria-hidden="true" />
              <div className="mt-4 flex text-sm leading-6 text-slate-400 justify-center">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md font-semibold text-blue-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-300"
                >
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".pdf" />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-slate-500 mt-2">PDF up to 10MB</p>
            </div>
          </div>
          <div className="mt-8 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Recent Uploads</h3>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <FileText className="w-4 h-4 text-red-400" />
                </div>
                <span className="text-sm font-medium text-slate-300">BTech_Syllabus_2026.pdf</span>
              </div>
              <button className="p-2 text-slate-500 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        {/* Notices Management */}
        <div className="bg-slate-900/40 border border-slate-800/50 rounded-3xl overflow-hidden lg:col-span-2 backdrop-blur-sm">
          <div className="p-6 border-b border-slate-800/50 flex justify-between items-center">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center">
              <Bell className="w-4 h-4 mr-2 text-amber-400" />
              Manage Notices
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-800/50">
              <thead className="bg-white/5">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">Title</th>
                  <th scope="col" className="px-6 py-4 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-4 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">Department</th>
                  <th scope="col" className="px-6 py-4 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">Priority</th>
                  <th scope="col" className="relative px-6 py-4"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {loading ? (
                  <tr><td colSpan={5} className="px-6 py-8 text-center text-sm text-slate-500">Loading notices...</td></tr>
                ) : notices.map((notice) => (
                  <tr key={notice.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-300">{notice.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{notice.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{notice.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 inline-flex text-[10px] font-bold uppercase tracking-wider rounded border ${
                        notice.priority === 'high' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                        notice.priority === 'normal' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                        'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      }`}>
                        {notice.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-indigo-400 hover:text-indigo-300 mr-4 transition-colors">Edit</button>
                      <button className="text-red-400 hover:text-red-300 transition-colors">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
