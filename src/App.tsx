import { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import JournalList from './components/JournalList';
import JournalDetail from './components/JournalDetail';
import type { JournalEntry } from './types';
import { INITIAL_JOURNAL_ENTRIES } from './data/mockData';

export default function App() {
  const [entries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem('ascent_journal_entries');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse entries from localStorage', e);
      }
    }
    return INITIAL_JOURNAL_ENTRIES;
  });

  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    return sessionStorage.getItem('ascent_journal_unlocked') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('ascent_journal_entries', JSON.stringify(entries));
  }, [entries]);

  const handleKeypadPress = (num: number) => {
    if (passwordInput.length < 6) {
      const newPin = passwordInput + num;
      setPasswordInput(newPin);

      if (newPin.length === 6) {
        if (newPin === '020505') {
          setTimeout(() => {
            setIsUnlocked(true);
            sessionStorage.setItem('ascent_journal_unlocked', 'true');
            setErrorMsg('');
            setPasswordInput('');
          }, 300);
        } else {
          setIsShaking(true);
          setErrorMsg('Authentication failed.');
          setTimeout(() => {
            setIsShaking(false);
            setPasswordInput('');
          }, 500);
        }
      }
    }
  };

  const handleKeypadDelete = () => {
    setPasswordInput(prev => prev.slice(0, -1));
  };

  const handleLock = () => {
    setIsUnlocked(false);
    sessionStorage.removeItem('ascent_journal_unlocked');
    setSelectedEntryId(null);
  };

  const renderMainContent = () => {
    if (selectedEntryId) {
      const selectedEntry = entries.find(e => e.id === selectedEntryId);
      if (selectedEntry) {
        return (
          <JournalDetail
            entry={selectedEntry}
            onBack={() => setSelectedEntryId(null)}
          />
        );
      }
    }

    return (
      <JournalList
        entries={entries}
        onSelectEntry={setSelectedEntryId}
        onLock={handleLock}
      />
    );
  };

  if (!isUnlocked) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden p-6 text-white font-sans">

        {/* Cinematic Background Orbs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-[#2563EB] rounded-full blur-[140px] opacity-25"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-[#3B82F6] rounded-full blur-[160px] opacity-20"></div>
          <div className="absolute top-[30%] left-[50%] w-[40vw] h-[40vw] bg-[#7DD3FC] rounded-full blur-[120px] opacity-10"></div>
        </div>

        <div className={`glass-panel max-w-sm w-full p-10 flex flex-col items-center gap-10 relative z-10 animate-fade-in ${isShaking ? 'animate-shake' : ''}`}>
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 shadow-[0_0_30px_rgba(37,99,235,0.15)]">
              <Icons.Fingerprint className="h-8 w-8 text-[#7DD3FC]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gradient mb-1">
                Ma Femme's Birthday
              </h1>
              <p className="text-sm text-slate-400 font-medium">
                her birthday 🎂
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-8 w-full items-center">
            <div className="flex flex-col gap-4 items-center">
              <label className="text-xs text-slate-400 font-bold uppercase tracking-[0.2em]">
                DD MM YY
              </label>

              {/* Dots indicator */}
              <div className="flex gap-4 my-2">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-3 w-3 rounded-full transition-all duration-300 ${i < passwordInput.length ? 'bg-[#3B82F6] scale-125 shadow-[0_0_12px_rgba(59,130,246,0.8)]' : 'bg-white/10'}`}
                  />
                ))}
              </div>

              {errorMsg && (
                <p className="text-xs text-rose-400 font-medium mt-1 text-center animate-fade-in">
                  {errorMsg}
                </p>
              )}
            </div>

            {/* Keypad */}
            <div className="grid grid-cols-3 gap-5 w-full max-w-[260px]">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <button
                  key={num}
                  onClick={() => handleKeypadPress(num)}
                  className="aspect-square rounded-full bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center text-xl font-medium text-white transition-all active:scale-90 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                >
                  {num}
                </button>
              ))}
              <div />
              <button
                onClick={() => handleKeypadPress(0)}
                className="aspect-square rounded-full bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center text-xl font-medium text-white transition-all active:scale-90 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
              >
                0
              </button>
              <button
                onClick={handleKeypadDelete}
                className="aspect-square rounded-full hover:bg-white/5 flex items-center justify-center transition-all active:scale-90 text-slate-500 hover:text-white"
              >
                <Icons.Delete className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen text-white font-sans relative">
      {/* Cinematic Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-[#2563EB] rounded-full blur-[140px] opacity-20"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-[#3B82F6] rounded-full blur-[160px] opacity-15"></div>
        <div className="absolute top-[30%] left-[50%] w-[40vw] h-[40vw] bg-[#7DD3FC] rounded-full blur-[120px] opacity-[0.08]"></div>
      </div>

      <main className="flex-1 overflow-y-auto z-10 w-full relative">
        {renderMainContent()}
      </main>
    </div>
  );
}