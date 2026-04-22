export type LessonState = "completed" | "active" | "unlocked" | "locked";

export type LessonIconName =
  | "cell"
  | "bone"
  | "heart"
  | "lungs"
  | "digest"
  | "brain"
  | "shield";

export type QuestionType = "mcq" | "tf";

export interface Question {
  type: QuestionType;
  q: string;
  qAr: string;
  choices?: readonly string[];
  choicesAr?: readonly string[];
  correct: number;
  explanation?: string;
  explanationAr?: string;
}

export interface Lesson {
  id: number;
  title: string;
  titleAr: string;
  system: string;
  description: string;
  time: string;
  xp: number;
  difficulty: number;
  state: LessonState;
  starsEarned: number;
  icon: LessonIconName;
  questions: readonly Question[];
}

export type BadgeTier = "gold" | "red" | "green";

export type BadgeMark =
  | "falcon"
  | "dune"
  | "star"
  | "crescent"
  | "heart"
  | "lotus"
  | "shield"
  | "book";

export type BadgeReq =
  | "completedLessons"
  | "totalStars"
  | "perfectLessons"
  | "streak"
  | "dailyCompleted"
  | "xp";

export interface Badge {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  tier: BadgeTier;
  mark: BadgeMark;
  req: BadgeReq;
  threshold: number;
}

export interface Player {
  name: string;
  nameAr: string;
  grade: string;
  level: number;
  title: string;
  titleAr: string;
  xp: number;
  xpForNext: number;
  streak: number;
  initials: string;
  badges: readonly Badge[];
}

export interface LeaderEntry {
  rank: number;
  name: string;
  initials: string;
  xp: number;
  color: string;
  you?: boolean;
}

export interface StreakDay {
  day: string;
  dayAr: string;
  active: boolean;
  xp: number;
}

export interface LevelInfo {
  level: number;
  xpIntoLevel: number;
  xpForLevel: number;
  nextThreshold: number;
}
