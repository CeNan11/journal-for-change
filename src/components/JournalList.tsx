import { Calendar, AlertCircle, LogOut } from 'lucide-react';
import type { JournalEntry } from '../types';

interface JournalListProps {
  entries: JournalEntry[];
  onSelectEntry: (id: string) => void;
  onLock: () => void;
}

export default function JournalList({ entries, onSelectEntry, onLock }: JournalListProps) {
  const sortedEntries = [...entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="flex-1 p-6 md:p-10 flex flex-col gap-8 max-w-6xl mx-auto w-full animate-fade-in pt-12">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-sans tracking-tight text-white">
            My Entries
          </h1>
          <p className="text-slate-400 text-sm mt-1 font-medium">
            Total entries: {entries.length}
          </p>
        </div>
        <button
          onClick={onLock}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 font-bold text-sm text-slate-300 hover:text-white transition-all duration-300"
          title="Lock Journal"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>

      {/* Journal Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedEntries.map((entry) => (
          <article
            key={entry.id}
            onClick={() => onSelectEntry(entry.id)}
            className="glass-panel glass-panel-hover rounded-2xl cursor-pointer p-6 flex flex-col gap-3 group"
          >
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold">
              <Calendar className="h-4 w-4 text-blue-400" />
              <span>{new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <h3 className="text-xl font-bold font-serif text-white group-hover:text-blue-300 transition-colors leading-snug">
              {entry.title}
            </h3>
          </article>
        ))}

        {sortedEntries.length === 0 && (
          <div className="col-span-full py-16 flex flex-col items-center justify-center text-center glass-panel rounded-2xl">
            <AlertCircle className="h-12 w-12 text-slate-500 mb-4" />
            <h3 className="text-lg font-bold text-white">No journal entries found</h3>
            <p className="text-sm text-slate-400 mt-1 max-w-sm font-medium">
              Start your journey by creating a new entry.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}