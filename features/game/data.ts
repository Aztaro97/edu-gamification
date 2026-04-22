import type { LeaderEntry, Lesson, Player } from "./types";

export const LESSONS: Lesson[] = [
  {
    id: 1,
    title: "The Cell — Spark of Life",
    titleAr: "الخلية — شرارة الحياة",
    system: "Foundations",
    description:
      "Discover the tiny building block that makes every organ in your body come alive. Explore the nucleus, membrane, and cytoplasm.",
    time: "12 min",
    xp: 120,
    difficulty: 1,
    state: "completed",
    starsEarned: 3,
    icon: "cell",
  },
  {
    id: 2,
    title: "Skeleton & Muscles",
    titleAr: "العظام والعضلات",
    system: "Movement",
    description:
      "Learn how 206 bones and over 600 muscles work together to hold you up and move you across the desert.",
    time: "15 min",
    xp: 160,
    difficulty: 1,
    state: "completed",
    starsEarned: 3,
    icon: "bone",
  },
  {
    id: 3,
    title: "The Beating Heart",
    titleAr: "نبضات القلب",
    system: "Circulatory",
    description:
      "Your heart beats 100,000 times a day — pumping blood through a network longer than the length of the UAE coastline.",
    time: "18 min",
    xp: 200,
    difficulty: 2,
    state: "active",
    starsEarned: 2,
    icon: "heart",
  },
  {
    id: 4,
    title: "Breath of the Lungs",
    titleAr: "أنفاس الرئتين",
    system: "Respiratory",
    description:
      "Trace the journey of a single breath — from the nose all the way to tiny air sacs called alveoli.",
    time: "14 min",
    xp: 180,
    difficulty: 2,
    state: "unlocked",
    starsEarned: 0,
    icon: "lungs",
  },
  {
    id: 5,
    title: "The Digestive Voyage",
    titleAr: "رحلة الهضم",
    system: "Digestive",
    description:
      "Follow a date from your first bite through a 9-metre journey inside your body. Meet the stomach, liver, and intestines.",
    time: "20 min",
    xp: 220,
    difficulty: 2,
    state: "locked",
    starsEarned: 0,
    icon: "digest",
  },
  {
    id: 6,
    title: "The Command Brain",
    titleAr: "الدماغ القائد",
    system: "Nervous",
    description:
      "86 billion neurons. One commander. Learn how the brain sends lightning-fast signals to every corner of your body.",
    time: "22 min",
    xp: 260,
    difficulty: 3,
    state: "locked",
    starsEarned: 0,
    icon: "brain",
  },
  {
    id: 7,
    title: "Guardians of the Body",
    titleAr: "حُراس الجسد",
    system: "Immune",
    description:
      "Meet the white blood cells — an army of defenders protecting you from invaders, every second of every day.",
    time: "25 min",
    xp: 320,
    difficulty: 3,
    state: "locked",
    starsEarned: 0,
    icon: "shield",
  },
];

export const PLAYER: Player = {
  name: "Ahmed Al Mansoori",
  nameAr: "أحمد المنصوري",
  grade: "Grade 4 · Al Bayan School",
  level: 3,
  title: "Science Explorer",
  titleAr: "مستكشف العلوم",
  xp: 1840,
  xpForNext: 2400,
  streak: 5,
  initials: "AM",
  badges: [
    { id: "falcon", name: "Falcon Scholar", nameAr: "عالم الصقر", tier: "gold" },
    { id: "dune", name: "Dune Runner", nameAr: "عدّاء الكثبان", tier: "red" },
    { id: "star", name: "Seven Stars", nameAr: "النجوم السبع", tier: "green" },
    { id: "crescent", name: "Crescent Keeper", nameAr: "حارس الهلال", tier: "gold" },
  ],
};

export const LEADERBOARD: LeaderEntry[] = [
  { rank: 1, name: "Fatima Al Shamsi", initials: "FS", xp: 2940, color: "#C8A951" },
  { rank: 2, name: "Ahmed Al Mansoori", initials: "AM", xp: 1840, color: "#EF3340", you: true },
  { rank: 3, name: "Khalid Al Hosani", initials: "KH", xp: 1720, color: "#009A44" },
];

export const NODE_POSITIONS: readonly { readonly x: number; readonly y: number }[] = [
  { x: 170, y: 980 },
  { x: 360, y: 870 },
  { x: 230, y: 720 },
  { x: 460, y: 590 },
  { x: 660, y: 470 },
  { x: 470, y: 310 },
  { x: 700, y: 140 },
];

export const PALETTE = {
  gold: "#C8A951",
  goldLight: "#F4D97A",
  goldDark: "#8A6A1E",
  red: "#EF3340",
  redDark: "#B21825",
  green: "#009A44",
  greenLight: "#2CC46A",
  cream: "#F5EED6",
  nightDeep: "#0A1628",
  nightMid: "#1B2A4A",
  nightSand: "#3B2514",
  slate: "#2B3A55",
  slateLight: "#6B7A99",
} as const;
