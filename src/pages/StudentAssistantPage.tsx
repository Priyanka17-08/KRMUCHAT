import { useState, useRef, useEffect } from 'react';
import { Send, Bot, Loader2, MessageSquare, Info, ArrowLeft } from 'lucide-react';
import Markdown from 'react-markdown';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function StudentAssistantPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([
    { role: 'assistant', content: `Hello ${user?.name.split(' ')[0]}! Ask me anything about KR Mangalam University - admissions, fees, scholarships, rules, and events.` }
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
          contextType: 'student'
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
        <h1 className="text-xl font-bold text-white">Student Assistant</h1>
      </div>

      <div className="flex flex-col lg:flex-row flex-1 gap-6 min-h-0">
        {/* Information Panel */}
      <section className="w-full lg:w-1/3 flex flex-col bg-slate-900/40 border border-slate-800/50 rounded-3xl backdrop-blur-sm overflow-hidden">
        <div className="p-6 border-b border-slate-800/50 bg-blue-500/5">
          <h2 className="text-lg font-bold text-blue-400 uppercase tracking-wider text-xs flex items-center">
            <Info className="w-4 h-4 mr-2" />
            University Information
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
             <h3 className="text-sm font-semibold text-slate-200 mb-2">Popular Topics</h3>
             <ul className="text-xs text-slate-400 space-y-2 list-disc pl-4 marker:text-blue-500">
               <li>Admissions 2026-27</li>
               <li>Fee Structures & Dates</li>
               <li>Merit Scholarships</li>
               <li>Hostel Facilities</li>
               <li>Library Guidelines</li>
               <li>Student Clubs & Activities</li>
             </ul>
          </div>
          <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
             <h3 className="text-sm font-semibold text-slate-200 mb-2">Important Contacts</h3>
             <ul className="text-[11px] text-slate-400 space-y-2">
               <li><strong>Helpdesk:</strong> support@krmu.edu.in</li>
               <li><strong>Accounts:</strong> fees@krmu.edu.in</li>
               <li><strong>Examination:</strong> examcell@krmu.edu.in</li>
             </ul>
          </div>
        </div>
      </section>

      {/* AI Assistant Chat Window */}
      <section className="w-full lg:w-2/3 flex flex-col bg-slate-900/40 border border-slate-800/50 rounded-3xl backdrop-blur-sm overflow-hidden">
        <div className="p-4 border-b border-slate-800/50 bg-indigo-500/10 flex justify-between items-center">
          <h2 className="text-sm font-bold text-indigo-400 uppercase tracking-wider flex items-center">
            <Bot className="w-4 h-4 mr-2" />
            General AI Assistant
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
                    ? "bg-blue-600/90 text-white shadow-[0_0_15px_rgba(37,99,235,0.15)]" 
                    : "bg-white/5 text-slate-200 border border-white/10"
                )}>
                  <div className="prose prose-sm prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-slate-900/50 prose-pre:text-slate-200 prose-pre:border prose-pre:border-slate-800/50 prose-a:text-blue-400">
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
                  <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
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
                placeholder="Ask about admissions, fees, hostel, scholarships..."
                className="flex-1 bg-transparent border-none text-sm focus:outline-none px-4 text-slate-200 placeholder-slate-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
