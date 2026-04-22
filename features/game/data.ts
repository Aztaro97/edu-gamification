import type {
  Badge,
  LeaderEntry,
  Lesson,
  LevelInfo,
  Player,
  Question,
  StreakDay,
} from "./types";

const LESSON_1_QUESTIONS: readonly Question[] = [
  {
    type: "mcq",
    q: "What is the smallest unit of life?",
    qAr: "ما هي أصغر وحدة في الكائن الحي؟",
    choices: ["Atom", "Cell", "Tissue", "Organ"],
    choicesAr: ["ذرة", "خلية", "نسيج", "عضو"],
    correct: 1,
    explanation: "Cells are the basic building block of every living organism.",
  },
  {
    type: "tf",
    q: "Plant and animal cells are identical.",
    qAr: "خلايا النبات والحيوان متطابقة.",
    correct: 1,
    explanation: "Plant cells have a cell wall and chloroplasts; animal cells do not.",
  },
  {
    type: "mcq",
    q: "Which part of the cell stores the genetic information?",
    qAr: "أي جزء من الخلية يخزن المعلومات الوراثية؟",
    choices: ["Membrane", "Cytoplasm", "Nucleus", "Mitochondria"],
    choicesAr: ["الغشاء", "السيتوبلازم", "النواة", "الميتوكندريا"],
    correct: 2,
  },
  {
    type: "mcq",
    q: "What does the cell membrane do?",
    qAr: "ماذا يفعل غشاء الخلية؟",
    choices: [
      "Creates energy",
      "Controls what enters and leaves",
      "Stores DNA",
      "Digests food",
    ],
    choicesAr: ["ينتج الطاقة", "يتحكم بالدخول والخروج", "يخزن الحمض النووي", "يهضم الطعام"],
    correct: 1,
  },
  {
    type: "tf",
    q: "The human body is made of trillions of cells.",
    qAr: "جسم الإنسان يتكون من تريليونات الخلايا.",
    correct: 0,
  },
];

const LESSON_2_QUESTIONS: readonly Question[] = [
  {
    type: "mcq",
    q: "How many bones are in an adult human body?",
    qAr: "كم عدد عظام جسم الإنسان البالغ؟",
    choices: ["106", "206", "306", "406"],
    choicesAr: ["١٠٦", "٢٠٦", "٣٠٦", "٤٠٦"],
    correct: 1,
  },
  {
    type: "tf",
    q: "Muscles can push and pull.",
    qAr: "العضلات يمكنها الدفع والسحب.",
    correct: 1,
    explanation: "Muscles can only pull. They work in pairs to move bones in two directions.",
  },
  {
    type: "mcq",
    q: "Which bone protects the brain?",
    qAr: "أي عظمة تحمي الدماغ؟",
    choices: ["Spine", "Rib cage", "Skull", "Pelvis"],
    choicesAr: ["العمود الفقري", "القفص الصدري", "الجمجمة", "الحوض"],
    correct: 2,
  },
  {
    type: "mcq",
    q: "What connects muscles to bones?",
    qAr: "ما الذي يربط العضلات بالعظام؟",
    choices: ["Ligaments", "Tendons", "Cartilage", "Veins"],
    choicesAr: ["الأربطة", "الأوتار", "الغضاريف", "الأوردة"],
    correct: 1,
  },
  {
    type: "tf",
    q: "Babies have more bones than adults.",
    qAr: "الأطفال حديثو الولادة لديهم عظام أكثر من البالغين.",
    correct: 0,
    explanation: "Babies are born with about 300 bones; some fuse together as they grow.",
  },
];

const LESSON_3_QUESTIONS: readonly Question[] = [
  {
    type: "mcq",
    q: "About how many times does the heart beat in a day?",
    qAr: "كم مرة تقريبًا ينبض القلب في اليوم؟",
    choices: ["10,000", "50,000", "100,000", "1,000,000"],
    choicesAr: ["١٠٬٠٠٠", "٥٠٬٠٠٠", "١٠٠٬٠٠٠", "١٬٠٠٠٬٠٠٠"],
    correct: 2,
  },
  {
    type: "mcq",
    q: "How many chambers does the heart have?",
    qAr: "كم عدد حجرات القلب؟",
    choices: ["2", "3", "4", "5"],
    choicesAr: ["٢", "٣", "٤", "٥"],
    correct: 2,
  },
  {
    type: "tf",
    q: "Blood carries oxygen to every cell in your body.",
    qAr: "الدم يحمل الأكسجين إلى كل خلية في الجسم.",
    correct: 0,
  },
  {
    type: "mcq",
    q: "Which blood vessels carry blood away from the heart?",
    qAr: "أي الأوعية الدموية تحمل الدم بعيدًا عن القلب؟",
    choices: ["Veins", "Arteries", "Capillaries", "Nerves"],
    choicesAr: ["الأوردة", "الشرايين", "الشعيرات الدموية", "الأعصاب"],
    correct: 1,
  },
  {
    type: "tf",
    q: "The heart is a muscle.",
    qAr: "القلب عضلة.",
    correct: 0,
  },
];

const LESSON_4_QUESTIONS: readonly Question[] = [
  {
    type: "mcq",
    q: "Where does oxygen enter the blood?",
    qAr: "أين يدخل الأكسجين إلى الدم؟",
    choices: ["Stomach", "Alveoli", "Heart", "Kidneys"],
    choicesAr: ["المعدة", "الحويصلات الهوائية", "القلب", "الكلى"],
    correct: 1,
  },
  {
    type: "tf",
    q: "The lungs have muscles that pump air in and out.",
    qAr: "الرئتان تحتويان على عضلات تضخ الهواء.",
    correct: 1,
    explanation: "The diaphragm muscle below the lungs controls breathing.",
  },
  {
    type: "mcq",
    q: "What gas do we exhale?",
    qAr: "أي غاز نزفره؟",
    choices: ["Oxygen", "Nitrogen", "Carbon dioxide", "Helium"],
    choicesAr: ["أكسجين", "نيتروجين", "ثاني أكسيد الكربون", "هيليوم"],
    correct: 2,
  },
  {
    type: "mcq",
    q: "How many lungs do humans have?",
    qAr: "كم عدد رئات الإنسان؟",
    choices: ["1", "2", "3", "4"],
    choicesAr: ["١", "٢", "٣", "٤"],
    correct: 1,
  },
  {
    type: "tf",
    q: "You breathe about 20,000 times a day.",
    qAr: "تتنفس حوالي ٢٠٬٠٠٠ مرة في اليوم.",
    correct: 0,
  },
];

const LESSON_5_QUESTIONS: readonly Question[] = [
  {
    type: "mcq",
    q: "Where does digestion begin?",
    qAr: "أين يبدأ الهضم؟",
    choices: ["Mouth", "Stomach", "Small intestine", "Liver"],
    choicesAr: ["الفم", "المعدة", "الأمعاء الدقيقة", "الكبد"],
    correct: 0,
  },
  {
    type: "mcq",
    q: "Which organ produces bile?",
    qAr: "أي عضو ينتج العصارة الصفراوية؟",
    choices: ["Pancreas", "Liver", "Kidney", "Spleen"],
    choicesAr: ["البنكرياس", "الكبد", "الكلية", "الطحال"],
    correct: 1,
  },
  {
    type: "tf",
    q: "The small intestine is shorter than the large intestine.",
    qAr: "الأمعاء الدقيقة أقصر من الأمعاء الغليظة.",
    correct: 1,
    explanation: "The small intestine is much longer — about 7 metres long.",
  },
  {
    type: "mcq",
    q: "What absorbs most nutrients from food?",
    qAr: "ما الذي يمتص معظم العناصر الغذائية؟",
    choices: ["Stomach", "Small intestine", "Large intestine", "Mouth"],
    choicesAr: ["المعدة", "الأمعاء الدقيقة", "الأمعاء الغليظة", "الفم"],
    correct: 1,
  },
  {
    type: "tf",
    q: "Water is absorbed in the large intestine.",
    qAr: "يُمتص الماء في الأمعاء الغليظة.",
    correct: 0,
  },
];

const LESSON_6_QUESTIONS: readonly Question[] = [
  {
    type: "mcq",
    q: "Which organ controls your thoughts and movements?",
    qAr: "أي عضو يتحكم في أفكارك وحركاتك؟",
    choices: ["Heart", "Brain", "Liver", "Spine"],
    choicesAr: ["القلب", "الدماغ", "الكبد", "العمود الفقري"],
    correct: 1,
  },
  {
    type: "mcq",
    q: "About how many neurons does the brain have?",
    qAr: "كم عدد الخلايا العصبية في الدماغ تقريبًا؟",
    choices: ["8.6 million", "86 million", "8.6 billion", "86 billion"],
    choicesAr: ["٨٫٦ مليون", "٨٦ مليون", "٨٫٦ مليار", "٨٦ مليار"],
    correct: 3,
  },
  {
    type: "tf",
    q: "Nerves send signals faster than a car can drive.",
    qAr: "الأعصاب ترسل الإشارات أسرع من قيادة السيارة.",
    correct: 0,
  },
  {
    type: "mcq",
    q: "What does the spinal cord do?",
    qAr: "ماذا يفعل النخاع الشوكي؟",
    choices: [
      "Digests food",
      "Sends signals between brain and body",
      "Pumps blood",
      "Stores memories",
    ],
    choicesAr: [
      "يهضم الطعام",
      "ينقل الإشارات بين الدماغ والجسم",
      "يضخ الدم",
      "يخزن الذكريات",
    ],
    correct: 1,
  },
  {
    type: "tf",
    q: "The brain never sleeps.",
    qAr: "الدماغ لا ينام أبدًا.",
    correct: 0,
    explanation: "Even during sleep, the brain stays active to process memories and dreams.",
  },
];

const LESSON_7_QUESTIONS: readonly Question[] = [
  {
    type: "mcq",
    q: "What cells fight infection in your body?",
    qAr: "ما الخلايا التي تحارب العدوى في الجسم؟",
    choices: [
      "Red blood cells",
      "White blood cells",
      "Nerve cells",
      "Muscle cells",
    ],
    choicesAr: ["خلايا الدم الحمراء", "خلايا الدم البيضاء", "الخلايا العصبية", "الخلايا العضلية"],
    correct: 1,
  },
  {
    type: "tf",
    q: "Vaccines help train the immune system.",
    qAr: "اللقاحات تساعد في تدريب الجهاز المناعي.",
    correct: 0,
  },
  {
    type: "mcq",
    q: "Which organ produces many immune cells?",
    qAr: "أي عضو ينتج العديد من الخلايا المناعية؟",
    choices: ["Lungs", "Bone marrow", "Stomach", "Skin"],
    choicesAr: ["الرئتان", "نخاع العظم", "المعدة", "الجلد"],
    correct: 1,
  },
  {
    type: "mcq",
    q: "What is the body's biggest barrier against germs?",
    qAr: "ما هو أكبر حاجز في الجسم ضد الجراثيم؟",
    choices: ["Skin", "Heart", "Brain", "Teeth"],
    choicesAr: ["الجلد", "القلب", "الدماغ", "الأسنان"],
    correct: 0,
  },
  {
    type: "tf",
    q: "A fever is always bad for you.",
    qAr: "الحمى دائمًا سيئة لك.",
    correct: 1,
    explanation: "A mild fever helps the body fight infections.",
  },
];

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
    questions: LESSON_1_QUESTIONS,
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
    questions: LESSON_2_QUESTIONS,
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
    questions: LESSON_3_QUESTIONS,
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
    questions: LESSON_4_QUESTIONS,
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
    questions: LESSON_5_QUESTIONS,
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
    questions: LESSON_6_QUESTIONS,
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
    questions: LESSON_7_QUESTIONS,
  },
];

export const BADGES: Badge[] = [
  {
    id: "first-steps",
    name: "First Steps",
    nameAr: "الخطوات الأولى",
    description: "Complete your very first lesson.",
    descriptionAr: "أكمل درسك الأول.",
    tier: "green",
    mark: "dune",
    req: "completedLessons",
    threshold: 1,
  },
  {
    id: "falcon-scholar",
    name: "Falcon Scholar",
    nameAr: "عالم الصقر",
    description: "Complete three lessons with honours.",
    descriptionAr: "أكمل ثلاثة دروس بامتياز.",
    tier: "gold",
    mark: "falcon",
    req: "completedLessons",
    threshold: 3,
  },
  {
    id: "seven-stars",
    name: "Seven Stars",
    nameAr: "النجوم السبع",
    description: "Earn seven stars across your lessons.",
    descriptionAr: "احصل على سبع نجوم في الدروس.",
    tier: "gold",
    mark: "star",
    req: "totalStars",
    threshold: 7,
  },
  {
    id: "perfect-scholar",
    name: "Perfect Scholar",
    nameAr: "العالم المثالي",
    description: "Finish three lessons with a perfect score.",
    descriptionAr: "أنهِ ثلاثة دروس بنتيجة مثالية.",
    tier: "gold",
    mark: "crescent",
    req: "perfectLessons",
    threshold: 3,
  },
  {
    id: "dune-runner",
    name: "Dune Runner",
    nameAr: "عدّاء الكثبان",
    description: "Keep a 5-day learning streak alive.",
    descriptionAr: "حافظ على تسلسل تعلم لمدة ٥ أيام.",
    tier: "red",
    mark: "lotus",
    req: "streak",
    threshold: 5,
  },
  {
    id: "crescent-keeper",
    name: "Crescent Keeper",
    nameAr: "حارس الهلال",
    description: "Complete three daily challenges.",
    descriptionAr: "أكمل ثلاثة تحديات يومية.",
    tier: "gold",
    mark: "book",
    req: "dailyCompleted",
    threshold: 3,
  },
  {
    id: "heart-champion",
    name: "Heart Champion",
    nameAr: "بطل القلب",
    description: "Learn how the heart keeps you alive.",
    descriptionAr: "تعلم كيف يبقيك القلب على قيد الحياة.",
    tier: "red",
    mark: "heart",
    req: "completedLessons",
    threshold: 3,
  },
  {
    id: "guardian",
    name: "Guardian",
    nameAr: "الحارس",
    description: "Master the body's defence system.",
    descriptionAr: "تمكن من نظام دفاع الجسم.",
    tier: "green",
    mark: "shield",
    req: "completedLessons",
    threshold: 7,
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
  badges: [BADGES[0], BADGES[1], BADGES[2], BADGES[4]],
};

export const LEADERBOARD: LeaderEntry[] = [
  { rank: 1, name: "Fatima Al Shamsi", initials: "FS", xp: 2940, color: "#C8A951" },
  { rank: 2, name: "Ahmed Al Mansoori", initials: "AM", xp: 1840, color: "#EF3340", you: true },
  { rank: 3, name: "Khalid Al Hosani", initials: "KH", xp: 1720, color: "#009A44" },
  { rank: 4, name: "Mariam Al Zaabi", initials: "MZ", xp: 1580, color: "#F4D97A" },
  { rank: 5, name: "Saeed Al Nuaimi", initials: "SN", xp: 1420, color: "#6B7A99" },
  { rank: 6, name: "Noura Al Ali", initials: "NA", xp: 1310, color: "#2CC46A" },
];

export const STREAK_HISTORY: StreakDay[] = [
  { day: "Mon", dayAr: "اثن", active: true, xp: 120 },
  { day: "Tue", dayAr: "ثلا", active: true, xp: 180 },
  { day: "Wed", dayAr: "أرب", active: true, xp: 160 },
  { day: "Thu", dayAr: "خمس", active: true, xp: 200 },
  { day: "Fri", dayAr: "جمع", active: true, xp: 240 },
  { day: "Sat", dayAr: "سبت", active: false, xp: 0 },
  { day: "Sun", dayAr: "أحد", active: false, xp: 0 },
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

export const XP_PER_LEVEL: readonly number[] = [0, 300, 700, 1200, 2400, 4200, 6600, 9600];

export const DAILY_BONUS_XP = 350;

export function levelFromXp(xp: number): number {
  let level = 1;
  for (let i = 0; i < XP_PER_LEVEL.length; i += 1) {
    if (xp >= XP_PER_LEVEL[i]) {
      level = i + 1;
    }
  }
  return level;
}

export function nextLevelThreshold(xp: number): number {
  for (let i = 0; i < XP_PER_LEVEL.length; i += 1) {
    if (xp < XP_PER_LEVEL[i]) {
      return XP_PER_LEVEL[i];
    }
  }
  return XP_PER_LEVEL[XP_PER_LEVEL.length - 1] + 3000;
}

export function levelInfoFromXp(xp: number): LevelInfo {
  const level = levelFromXp(xp);
  const currentThreshold = XP_PER_LEVEL[level - 1] ?? 0;
  const nextThreshold = nextLevelThreshold(xp);
  const xpForLevel = Math.max(1, nextThreshold - currentThreshold);
  const xpIntoLevel = Math.max(0, xp - currentThreshold);
  return { level, xpIntoLevel, xpForLevel, nextThreshold };
}

export function starsFromScore(correct: number, total: number): number {
  if (total === 0) return 0;
  const pct = correct / total;
  if (pct >= 0.95) return 3;
  if (pct >= 0.7) return 2;
  if (pct > 0) return 1;
  return 0;
}

export function getBadgeProgress(
  badge: Badge,
  stats: {
    completedLessons: number;
    totalStars: number;
    perfectLessons: number;
    streak: number;
    dailyCompleted: number;
    xp: number;
  },
): { current: number; earned: boolean } {
  const current = stats[badge.req];
  return { current, earned: current >= badge.threshold };
}
