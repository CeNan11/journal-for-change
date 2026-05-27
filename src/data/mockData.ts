import type { JournalEntry, Habit, DailyReflectionPrompt } from '../types';

export const INITIAL_HABITS: Habit[] = [
  {
    id: 'habit-1',
    name: 'Mindful Meditation',
    description: '10 minutes of silent breath observation or guided mindfulness.',
    streak: 6,
    completedDates: ['2026-05-21', '2026-05-22', '2026-05-23', '2026-05-24', '2026-05-25', '2026-05-26'],
    category: 'Mind',
    icon: 'Brain'
  },
  {
    id: 'habit-2',
    name: 'Physical Vitality',
    description: 'At least 30 minutes of intentional movement (running, yoga, lifting).',
    streak: 3,
    completedDates: ['2026-05-22', '2026-05-24', '2026-05-25', '2026-05-26'],
    category: 'Body',
    icon: 'Activity'
  },
  {
    id: 'habit-3',
    name: 'Digital Detox in Bed',
    description: 'No screens/phone usage in bed after 10:00 PM. Read a physical book instead.',
    streak: 8,
    completedDates: ['2026-05-19', '2026-05-20', '2026-05-21', '2026-05-22', '2026-05-23', '2026-05-24', '2026-05-25', '2026-05-26'],
    category: 'Routine',
    icon: 'Moon'
  },
  {
    id: 'habit-4',
    name: 'Acts of Kindness',
    description: 'Do or say one genuinely kind/supportive thing for someone else.',
    streak: 2,
    completedDates: ['2026-05-23', '2026-05-25', '2026-05-26'],
    category: 'Soul',
    icon: 'Heart'
  }
];

export const INITIAL_JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: 'entry-1',
    title: 'The Decision: Choosing Conscious Growth',
    date: '2026-05-19',
    content: 'Today marks a turning point. I realized I have been drifting, letting algorithms and convenience dictate my mood and schedule. I wake up tired, scroll for an hour, work with scattered focus, and repeat. I want to build a version of myself that is present, disciplined, and compassionate. My primary goal is not perfection, but awareness. I will write here daily, log my habits, and speak honestly to myself.',
    mood: 2,
    moodEmoji: '🌱',
    moodLabel: 'Growing pains',
    tags: ['Mindset', 'Beginnings', 'Intentions'],
    prompts: [
      {
        question: 'What triggered the desire for change today?',
        answer: 'Waking up feeling completely depleted after scrolling on my phone until 1:00 AM, realizing I spent my entire weekend doing nothing of value.'
      },
      {
        question: 'What is one promise you are making to yourself?',
        answer: 'To forgive my mistakes, but never stop reflecting and adjusting.'
      }
    ],
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'entry-2',
    title: 'Overcoming the First Slump',
    date: '2026-05-21',
    content: 'Missed my morning routine today. I stayed up too late reading a thriller on my tablet and ignored my alarm. Immediately, the old critical voice started: "Here we go again, you cannot even last three days." Instead of spiraling, I took a deep breath, went for a short walk, and wrote. I realized that self-improvement is not a straight line. The fact that I am noticing the slip-up without completely giving up is already progress.',
    mood: 3,
    moodEmoji: '☁️',
    moodLabel: 'Neutral / Reflective',
    tags: ['Self-Compassion', 'Resilience', 'Habits'],
    prompts: [
      {
        question: 'What went wrong and how can you adjust?',
        answer: 'I left my tablet on my nightstand. From tonight, I will charge all screens in the living room and use a physical alarm clock.'
      },
      {
        question: 'What is one small victory from today?',
        answer: 'I didn\'t let my bad morning ruin my entire afternoon. I ate a healthy lunch and focused well at work.'
      }
    ],
    coverImage: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'entry-3',
    title: 'A Breakthrough in Active Listening',
    date: '2026-05-24',
    content: 'Had a tense meeting with Sarah at work. Usually, when she criticizes my design templates, I immediately get defensive and start formulating an argument. Today, I remembered my intention of practicing emotional intelligence. I stopped, took a deep breath, and focused entirely on understanding her perspective. I asked: "So you are worried that this layout might confuse non-technical users?" Her face immediately softened. We collaborated and found a better solution together in 10 minutes. It felt incredible to choose connection over ego.',
    mood: 5,
    moodEmoji: '☀️',
    moodLabel: 'Thriving',
    tags: ['Relationships', 'Communication', 'Ego'],
    prompts: [
      {
        question: 'How did you show up differently in a challenging moment?',
        answer: 'I listened to understand rather than to reply. I kept my breath steady and my voice calm.'
      },
      {
        question: 'What did this teach you about others?',
        answer: 'Most defensiveness from others melts away when they feel heard and respected.'
      }
    ],
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'entry-4',
    title: 'The Compound Power of Small Wins',
    date: '2026-05-26',
    content: 'Reflecting on the last week. Looking at my habit tracker, I\'ve hit my digital detox goal 8 days in a row. The results are undeniable: I am falling asleep within 15 minutes, my mind feels quiet in the evening, and my morning headaches are gone. It is a tiny change—just putting the phone in the living room—but its ripple effects are massive. Self-improvement isn\'t about overnight transformations; it\'s about small, seemingly boring habits compounding over time.',
    mood: 4,
    moodEmoji: '🌟',
    moodLabel: 'Focused & Grateful',
    tags: ['Habits', 'Gratitude', 'Health'],
    prompts: [
      {
        question: 'What are you most proud of today?',
        answer: 'My consistency with screen time limits. I feel more in control of my attention span.'
      },
      {
        question: 'What is a quote or idea guiding you right now?',
        answer: '"We do not rise to the level of our goals. We fall to the level of our systems." — James Clear'
      }
    ],
    coverImage: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=800&q=80'
  }
];

export const REFLECTION_PROMPTS: DailyReflectionPrompt[] = [
  { id: 'p1', question: 'What went well today and what actions led to that outcome?', category: 'Gratitude' },
  { id: 'p2', question: 'What challenge did you face today, and how did you handle it?', category: 'Resilience' },
  { id: 'p3', question: 'What did you learn about yourself or others through today\'s interactions?', category: 'Learning' },
  { id: 'p4', question: 'How did you align with your core values today?', category: 'Values' },
  { id: 'p5', question: 'What is one thing you would do differently if you could relive today?', category: 'Growth' }
];

export const MOOD_DEFS = [
  { val: 1, emoji: '🌧️', label: 'Struggling', color: 'text-rose-400 bg-rose-400/10 border-rose-400/20' },
  { val: 2, emoji: '🌱', label: 'Growing Pains', color: 'text-amber-400 bg-amber-400/10 border-amber-400/20' },
  { val: 3, emoji: '☁️', label: 'Reflective', color: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20' },
  { val: 4, emoji: '✨', label: 'Balanced', color: 'text-brand-300 bg-brand-300/10 border-brand-300/20' },
  { val: 5, emoji: '☀️', label: 'Thriving', color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
];
