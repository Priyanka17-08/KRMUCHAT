import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, MessageSquare, LayoutDashboard, Settings, Menu, Bell, GraduationCap, LogOut } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';
import { Student } from '../types';

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = user?.role === 'admin' 
    ? [
        { name: 'Admin Dashboard', path: '/admin', icon: Settings },
      ]
    : [
        { name: 'Home', path: '/', icon: Home },
        { name: 'KRMUCHAT', path: '/student-assistant', icon: MessageSquare },
        { name: 'Student Dashboard', path: '/dashboard', icon: LayoutDashboard },
      ];

  return (
    <div className="flex h-screen bg-[#05070A] text-slate-200 font-sans selection:bg-blue-500/30 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-[#05070A]/80 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-[#0A0D14] border-r border-slate-800/60 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:flex-shrink-0 flex flex-col",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center px-6 border-b border-slate-800/60">
            <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20 mr-3">
              KM
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
              KRMUCHAT
            </span>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-blue-500/10 text-blue-400 border border-blue-500/30" 
                      : "text-slate-500 hover:bg-slate-800/50 hover:text-slate-300 border border-transparent"
                  )}
                >
                  <Icon className={cn("h-5 w-5 mr-3 flex-shrink-0", isActive ? "text-blue-400" : "text-slate-500")} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          
          <div className="p-4 border-t border-slate-800/60 mt-auto">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-slate-200 font-bold">
                {user?.name.charAt(0)}
              </div>
              <div className="ml-3 overflow-hidden">
                <p className="text-sm font-medium text-slate-200 truncate">{user?.name}</p>
                <p className="text-[10px] text-slate-500 truncate">
                  {user?.role === 'student' ? (user as Student).rollNumber : 'Administrator'}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Layer */}
      <main className="flex-1 flex flex-col bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#0C1120] via-[#05070A] to-[#05070A] min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 flex-shrink-0 bg-[#0A0D14]/80 backdrop-blur-md border-b border-slate-800/60 flex items-center justify-between px-4 lg:px-8">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-md text-slate-500 hover:bg-slate-800 focus:outline-none"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex-1 lg:flex-none" /> {/* Spacer for mobile */}
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex relative items-center">
              <span className="absolute left-3 text-slate-500">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </span>
              <input type="text" placeholder="Search campus services..." className="bg-slate-900/50 border border-slate-800 rounded-full py-2 pl-10 pr-4 text-sm w-64 focus:outline-none focus:border-blue-500/50 text-slate-200 placeholder-slate-500" />
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="hidden md:inline text-slate-400">Academic Year: 2025-26</span>
              <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 relative transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
