import { useState, useRef, useEffect } from 'react';
import { Send, Bot, Loader2, Search, Briefcase, ArrowLeft } from 'lucide-react';
import Markdown from 'react-markdown';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';
import { placements } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

export default function PlacementAssistantPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([
    { role: 'assistant', content: `Hello ${user?.name.split(' ')[0]}! Ask me about placements, internships, eligibility criteria, companies, and interview preparation.` }
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
          contextType: 'placement'
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
        <h1 className="text-xl font-bold text-white">Placement Assistant</h1>
      </div>

      <div className="flex flex-col lg:flex-row flex-1 gap-6 min-h-0">
        {/* Information Panel */}
      <section className="w-full lg:w-1/2 flex flex-col bg-slate-900/40 border border-slate-800/50 rounded-3xl backdrop-blur-sm overflow-hidden">
        <div className="p-6 border-b border-slate-800/50 bg-amber-500/5">
          <h2 className="text-lg font-bold text-amber-400 uppercase tracking-wider text-xs mb-4 flex items-center">
            <Briefcase className="w-4 h-4 mr-2" />
            Active Opportunities
          </h2>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type="text" placeholder="Search companies or roles..." className="w-full bg-slate-800/50 border border-slate-700 rounded-full py-2 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {placements.map((job) => (
            <div key={job.id} className="bg-white/5 border border-white/5 rounded-2xl p-4 hover:bg-white/10 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-sm font-semibold text-slate-200">{job.companyName}</h3>
                  <p className="text-xs text-slate-400">{job.role}</p>
                </div>
                <span className="text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                  {job.package}
                </span>
              </div>
              <div className="text-[10px] text-slate-500 mt-3 flex justify-between">
                <span>Eligible: {job.eligibleCourses.join(', ')}</span>
                <span className="text-amber-400/80">Deadline: {job.deadline}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Assistant Chat Window */}
      <section className="w-full lg:w-1/2 flex flex-col bg-slate-900/40 border border-slate-800/50 rounded-3xl backdrop-blur-sm overflow-hidden">
        <div className="p-4 border-b border-slate-800/50 bg-indigo-500/10">
          <h2 className="text-sm font-bold text-indigo-400 uppercase tracking-wider flex items-center">
            <Bot className="w-4 h-4 mr-2" />
            Placement AI Assistant
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
                    ? "bg-amber-600/90 text-white shadow-[0_0_15px_rgba(217,119,6,0.15)]" 
                    : "bg-white/5 text-slate-200 border border-white/10"
                )}>
                  <div className="prose prose-sm prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-slate-900/50 prose-pre:text-slate-200 prose-pre:border prose-pre:border-slate-800/50 prose-a:text-amber-400">
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
                  <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                  <span className="text-slate-400 text-sm">Processing...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-4 md:p-6 pt-0">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-2xl mx-auto w-full">
            <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl p-2 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask about placements, packages, interview tips..."
                className="flex-1 bg-transparent border-none text-sm focus:outline-none px-4 text-slate-200 placeholder-slate-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2 bg-amber-600 text-white rounded-xl shadow-md hover:bg-amber-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
