import { useState } from 'react';
import { ArrowLeft, Save, Plus, X, Heart } from 'lucide-react';
import type { JournalEntry } from '../types';
import { REFLECTION_PROMPTS } from '../data/mockData';

interface JournalEditorProps {
  entry?: JournalEntry | null;
  onSave: (entry: JournalEntry) => void;
  onCancel: () => void;
}

export default function JournalEditor({ entry, onSave, onCancel }: JournalEditorProps) {
  const [title, setTitle] = useState(entry ? entry.title : '');
  const [date, setDate] = useState(entry ? entry.date : new Date().toISOString().split('T')[0]);
  const [content, setContent] = useState(entry ? entry.content : '');

  const [prompts, setPrompts] = useState<{ question: string; answer: string }[]>(() => {
    if (entry && entry.prompts && entry.prompts.length > 0) {
      return entry.prompts;
    }
    return [
      { question: REFLECTION_PROMPTS[0].question, answer: '' },
      { question: REFLECTION_PROMPTS[1].question, answer: '' }
    ];
  });

  const handlePromptQuestionChange = (index: number, question: string) => {
    const updated = [...prompts];
    updated[index].question = question;
    setPrompts(updated);
  };

  const handlePromptAnswerChange = (index: number, answer: string) => {
    const updated = [...prompts];
    updated[index].answer = answer;
    setPrompts(updated);
  };

  const handleAddPromptSlot = () => {
    if (prompts.length < 3) {
      const usedQuestions = prompts.map(p => p.question);
      const unusedPrompt = REFLECTION_PROMPTS.find(p => !usedQuestions.includes(p.question));
      const nextQuestion = unusedPrompt ? unusedPrompt.question : REFLECTION_PROMPTS[0].question;
      setPrompts([...prompts, { question: nextQuestion, answer: '' }]);
    }
  };

  const handleRemovePromptSlot = (index: number) => {
    setPrompts(prompts.filter((_, idx) => idx !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('Please provide a title and your main journal content.');
      return;
    }

    const activePrompts = prompts.filter(p => p.answer.trim() !== '');

    const savedEntry: JournalEntry = {
      id: entry ? entry.id : `entry-${Date.now()}`,
      title: title.trim(),
      date,
      content: content.trim(),
      mood: entry ? entry.mood : 3,
      moodEmoji: entry ? entry.moodEmoji : '😐',
      moodLabel: entry ? entry.moodLabel : 'Neutral',
      tags: entry ? entry.tags : [],
      prompts: activePrompts,
      coverImage: ''
    };

    onSave(savedEntry);
  };

  return (
    <div className="flex-1 p-6 md:p-10 flex flex-col gap-8 max-w-4xl mx-auto w-full animate-fade-in pt-12">

      {/* Navigation header */}
      <div className="flex items-center justify-between pb-4">
        <button
          onClick={onCancel}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-bold group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Discard changes</span>
        </button>

        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-sm text-white transition-all duration-300 transform hover:-translate-y-0.5"
        >
          <Save className="h-4 w-4" />
          <span>Save Entry</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">

        {/* Editor Main Card */}
        <div className="glass-panel p-6 md:p-8 rounded-3xl flex flex-col gap-6 relative">

          {/* Title + Date row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">

            {/* Title */}
            <div className="md:col-span-8 flex flex-col gap-1.5">
              <label className="text-xs text-slate-400 font-bold uppercase tracking-wider">Entry Title</label>
              <input
                type="text"
                placeholder="What's on your mind today?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="glass-input px-4 py-3.5 rounded-xl text-lg font-bold text-white placeholder:text-slate-500 font-sans"
              />
            </div>

            {/* Date */}
            <div className="md:col-span-4 flex flex-col gap-1.5">
              <label className="text-xs text-slate-400 font-bold uppercase tracking-wider">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="glass-input px-4 py-3.5 rounded-xl text-sm font-bold text-slate-200 font-sans cursor-pointer"
              />
            </div>

          </div>

          {/* Main Journal content textarea */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-slate-400 font-bold uppercase tracking-wider">Thoughts</label>
            <textarea
              placeholder="Write it all down here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="glass-input p-5 rounded-2xl text-base font-serif min-h-[260px] leading-relaxed text-slate-100 placeholder:text-slate-500 resize-y"
            />
          </div>

          {/* Prompts Section */}
          <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Heart className="h-4 w-4 text-blue-400" />
                <span>Optional Reflections</span>
              </h3>
              {prompts.length < 3 && (
                <button
                  type="button"
                  onClick={handleAddPromptSlot}
                  className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-bold"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Prompt</span>
                </button>
              )}
            </div>

            <div className="flex flex-col gap-4">
              {prompts.map((p, idx) => (
                <div key={idx} className="p-5 rounded-2xl glass-input flex flex-col gap-3 relative">
                  <button
                    type="button"
                    onClick={() => handleRemovePromptSlot(idx)}
                    className="absolute top-4 right-4 text-slate-500 hover:text-rose-400 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>

                  <div className="flex flex-col gap-1 w-[90%]">
                    <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Question #{idx + 1}</label>
                    <select
                      value={p.question}
                      onChange={(e) => handlePromptQuestionChange(idx, e.target.value)}
                      className="glass-input px-3 py-2 rounded-lg text-sm font-bold text-blue-300 cursor-pointer max-w-full bg-white/10"
                    >
                      {REFLECTION_PROMPTS.map(ref => (
                        <option key={ref.id} value={ref.question} className="text-slate-900 bg-white">
                          {ref.question}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5 mt-2">
                    <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Your Answer</label>
                    <textarea
                      placeholder="Write your answer..."
                      value={p.answer}
                      onChange={(e) => handlePromptAnswerChange(idx, e.target.value)}
                      className="glass-input p-3 rounded-xl text-sm min-h-[70px] resize-none text-slate-200 placeholder:text-slate-500 bg-white/10"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </form>

    </div>
  );
}