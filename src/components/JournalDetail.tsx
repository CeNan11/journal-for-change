import { ArrowLeft } from 'lucide-react';
import type { JournalEntry } from '../types';

interface JournalDetailProps {
  entry: JournalEntry;
  onBack: () => void;
}

export default function JournalDetail({ entry, onBack }: JournalDetailProps) {
  return (
    <div className="flex-1 p-6 md:p-10 flex flex-col gap-8 max-w-3xl mx-auto w-full animate-fade-in pt-12">

      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-bold group w-fit"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        <span>Back to entries</span>
      </button>

      {/* Entry */}
      <article className="glass-panel rounded-3xl overflow-hidden">
        <div className="p-8 md:p-14 flex flex-col gap-8">

          {/* Date — centered */}
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest text-center">
            {new Date(entry.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          {/* Title — centered */}
          <h1 className="text-3xl md:text-5xl font-bold font-serif text-white leading-tight text-center">
            {entry.title}
          </h1>

          {/* Divider */}
          <div className="border-t border-white/10" />

          {/* Content */}
          <div className="text-slate-300 font-serif leading-relaxed text-base md:text-lg whitespace-pre-wrap">
            {entry.content}
          </div>

        </div>
      </article>

    </div>
  );
}