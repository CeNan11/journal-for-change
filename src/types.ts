export interface JournalEntry {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  content: string;
  mood: 1 | 2 | 3 | 4 | 5; // 1: Struggling, 2: Down, 3: Neutral, 4: Good, 5: Thriving
  moodEmoji: string;
  moodLabel: string;
  tags: string[];
  prompts: {
    question: string;
    answer: string;
  }[];
  coverImage?: string;
}

export interface Habit {
  id: string;
  name: string;
  description: string;
  streak: number;
  completedDates: string[]; // Array of YYYY-MM-DD strings
  category: 'Mind' | 'Body' | 'Soul' | 'Routine';
  icon: string; // lucide icon name
}

export interface DailyReflectionPrompt {
  id: string;
  question: string;
  category: string;
}
