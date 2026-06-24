import { useState, useRef, useEffect } from 'react';
import { Send, Bot, Loader2, BarChart3, Users, Briefcase, FileText, ArrowLeft, ShieldAlert } from 'lucide-react';
import Markdown from 'react-markdown';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminAssistantPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([
    { role: 'assistant', content: `Welcome Admin ${user?.name.split(' ')[0]}. I'm your secure AI assistant. I can help you manage students, faculty, placements, notices, and generate analytics. What would you like to do?` }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history: messages.map(m => ({ role: m.role, content: m.content })),
          contextType: 'admin'
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to get response');

      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error: any) {
      setMessages(prev => [...prev, { role: 'assistant', content: `**Error:** ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const smartPrompts = [
    "Generate placement report",
    "Find students below 75% attendance",
    "Create a notice for tomorrow",
    "Show pending complaints"
  ];

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
        <h1 className="text-xl font-bold text-white flex items-center">
          <ShieldAlert className="w-5 h-5 mr-2 text-indigo-400" />
          Admin AI Workspace
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row flex-1 gap-6 min-h-0">
        {/* Information Panel */}
        <section className="w-full lg:w-1/3 flex flex-col bg-slate-900/40 border border-slate-800/50 rounded-3xl backdrop-blur-sm overflow-hidden">
          <div className="p-6 border-b border-slate-800/50 bg-indigo-500/5">
            <h2 className="text-lg font-bold text-indigo-400 uppercase tracking-wider text-xs flex items-center">
              <Bot className="w-4 h-4 mr-2" />
              AI Capabilities
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-semibold text-slate-200">Student & Faculty</h3>
              </div>
              <p className="text-xs text-slate-400">Search profiles, check attendance, workloads, and generate activity reports.</p>
            </div>
            
            <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-semibold text-slate-200">Placements</h3>
              </div>
              <p className="text-xs text-slate-400">View statistics, internship details, company visits, and eligibility.</p>
            </div>

            <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-purple-400" />
                <h3 className="text-sm font-semibold text-slate-200">Notices & Queries</h3>
              </div>
              <p className="text-xs text-slate-400">Draft notices, schedule announcements, and monitor unresolved student complaints.</p>
            </div>

            <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-slate-200">Analytics</h3>
              </div>
              <p className="text-xs text-slate-400">Generate university dashboard reports, fee collection summaries, and admission stats.</p>
            </div>
          </div>
        </section>

        {/* AI Assistant Chat Window */}
        <section className="w-full lg:w-2/3 flex flex-col bg-slate-900/40 border border-slate-800/50 rounded-3xl backdrop-blur-sm overflow-hidden">
          <div className="p-4 border-b border-slate-800/50 bg-indigo-500/10">
            <h2 className="text-sm font-bold text-indigo-400 uppercase tracking-wider flex items-center">
              <ShieldAlert className="w-4 h-4 mr-2" />
              Secure Admin Assistant
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
            {messages.map((msg, idx) => (
              <div key={idx} className={cn("flex max-w-2xl mx-auto", msg.role === 'user' ? "justify-end" : "justify-start")}>
                <div className={cn("flex space-x-4 max-w-[85%]", msg.role === 'user' ? "flex-row-reverse space-x-reverse" : "flex-row")}>
                  <div className="flex-shrink-0">
                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0", 
                      msg.role === 'user' ? "bg-slate-700 text-slate-300" : "bg-indigo-600 text-white"
                    )}>
                      {msg.role === 'user' ? "ME" : "AI"}
                    </div>
                  </div>
                  <div className={cn("rounded-2xl p-4 shadow-sm", 
                    msg.role === 'user' 
                      ? "bg-indigo-600/90 text-white shadow-[0_0_15px_rgba(79,70,229,0.15)]" 
                      : "bg-white/5 text-slate-200 border border-white/10"
                  )}>
                    <div className="prose prose-sm prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-slate-900/50 prose-pre:text-slate-200 prose-pre:border prose-pre:border-slate-800/50 prose-a:text-indigo-400">
                      <Markdown>{msg.content}</Markdown>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex max-w-2xl mx-auto justify-start">
                <div className="flex space-x-4">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0">AI</div>
                  <div className="bg-white/5 text-slate-200 rounded-2xl p-4 border border-white/10 flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
                    <span className="text-slate-400 text-sm">Processing...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-4 md:p-6 pt-0">
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 mb-4 max-w-2xl mx-auto">
                {smartPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInput(prompt)}
                    className="text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-full border border-slate-700 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-2xl mx-auto w-full">
              <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl p-2 flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask about reports, students, notices, or analytics..."
                  className="flex-1 bg-transparent border-none text-sm focus:outline-none px-4 text-slate-200 placeholder-slate-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-2 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} className="rotate-0" />}
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
