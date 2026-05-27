import { Calendar, ArrowLeft, Heart } from 'lucide-react';
import type { JournalEntry } from '../types';

interface JournalDetailProps {
  entry: JournalEntry;
  onBack: () => void;
}

export default function JournalDetail({ entry, onBack }: JournalDetailProps) {
  return (
    <div className="flex-1 p-6 md:p-10 flex flex-col gap-8 max-w-4xl mx-auto w-full animate-fade-in pt-12">

      {/* Navigation */}
      <div className="flex items-center justify-between pb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-bold group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to entries</span>
        </button>
      </div>

      {/* Main Journal Card */}
      <article className="glass-panel rounded-3xl overflow-hidden relative">
        <div className="p-6 md:p-10 flex flex-col gap-6 relative z-10">

          {/* Date */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-white/10 border border-white/20 text-blue-400">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Written on</p>
                <p className="text-sm font-bold text-slate-200">
                  {new Date(entry.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-4xl font-bold font-serif text-white leading-tight">
            {entry.title}
          </h1>

          {/* Body */}
          <div className="text-slate-300 font-serif leading-relaxed text-base md:text-lg whitespace-pre-wrap py-2 border-b border-white/10 pb-6">
            {entry.content}
          </div>

          {/* Reflections */}
          {entry.prompts && entry.prompts.length > 0 && (
            <div className="flex flex-col gap-5 mt-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Heart className="h-4 w-4 text-blue-400" />
                <span>Reflections</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {entry.prompts.map((p, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-white/10 border border-white/10 flex flex-col gap-2">
                    <p className="text-sm font-bold text-blue-300 leading-snug">
                      {p.question}
                    </p>
                    <p className="text-sm text-slate-300 leading-relaxed italic">
                      "{p.answer}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </article>

    </div>
  );
}