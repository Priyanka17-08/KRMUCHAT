import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { GraduationCap, Lock, Mail, ShieldAlert } from 'lucide-react';

export default function LoginPage() {
  const [role, setRole] = useState<'student' | 'admin'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Mock validation
      if (!email || !password) {
        throw new Error('Please fill in all fields');
      }

      if (role === 'admin' && !email.includes('@krmu.edu.in')) {
        throw new Error('Admin must use official university email');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      login(email, role);
      
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070A] flex flex-col items-center justify-center p-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0C1120] via-[#05070A] to-[#05070A]">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)] mb-6">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 mb-2">
            KRMUCHAT Portal
          </h1>
          <p className="text-slate-400 text-sm">Secure University AI Assistant & Student Portal</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
          {/* Role Tabs */}
          <div className="flex p-1 bg-slate-800/50 rounded-xl mb-8">
            <button
              onClick={() => { setRole('student'); setError(''); }}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                role === 'student' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Student Portal
            </button>
            <button
              onClick={() => { setRole('admin'); setError(''); }}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
                role === 'admin' 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              Admin Access
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
                {error}
              </div>
            )}
            
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider pl-1">
                {role === 'student' ? 'University Email / Roll No.' : 'Admin Email'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                  placeholder={role === 'student' ? "e.g. 24BTECH1001" : "admin@krmu.edu.in"}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider pl-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {role === 'admin' && (
              <div className="flex items-center gap-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
                <p className="text-[10px] text-amber-400/80 leading-tight">
                  Admin access requires 2FA authentication and all actions are logged for audit purposes.
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 rounded-xl text-white font-bold transition-all shadow-lg flex items-center justify-center ${
                role === 'student'
                  ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/25'
                  : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/25'
              } ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                `Login as ${role === 'student' ? 'Student' : 'Administrator'}`
              )}
            </button>
          </form>

          {role === 'student' && (
            <div className="mt-6 text-center">
              <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                Forgot Password?
              </a>
            </div>
          )}
        </div>
        
        <div className="mt-8 text-center text-xs text-slate-500 space-y-1">
          <p>Protected by University IT Security Policies.</p>
          <p>Unauthorized access is strictly prohibited.</p>
        </div>
      </div>
    </div>
  );
}
