export type LessonState = "completed" | "active" | "unlocked" | "locked";

export type LessonIconName =
  | "cell"
  | "bone"
  | "heart"
  | "lungs"
  | "digest"
  | "brain"
  | "shield";

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
}

export type BadgeTier = "gold" | "red" | "green";
export type BadgeId = "falcon" | "dune" | "star" | "crescent";

export interface Badge {
  id: BadgeId;
  name: string;
  nameAr: string;
  tier: BadgeTier;
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
  badges: Badge[];
}

export interface LeaderEntry {
  rank: number;
  name: string;
  initials: string;
  xp: number;
  color: string;
  you?: boolean;
}
