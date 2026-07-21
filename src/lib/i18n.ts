import type { Lang } from './storage'

export type MessageKey =
  | 'chooseLanguage'
  | 'langEn'
  | 'langFr'
  | 'langAr'
  | 'programTitle'
  | 'day1'
  | 'day2'
  | 'day3'
  | 'muscles1'
  | 'muscles2'
  | 'muscles3'
  | 'back'
  | 'close'
  | 'settings'
  | 'settingsTitle'
  | 'underMonth'
  | 'overMonth'
  | 'exercisesHeading'
  | 'catChest'
  | 'catTriceps'
  | 'catShoulders'
  | 'exSeatedChestPress'
  | 'exChestFly'
  | 'exTricepsPushdown'
  | 'exOverheadExtensions'
  | 'exMachineShoulderPress'
  | 'exBarbellUprightRows'

const messages: Record<Lang, Record<MessageKey, string>> = {
  en: {
    chooseLanguage: 'Choose your language',
    langEn: 'English',
    langFr: 'French',
    langAr: 'Arabic',
    programTitle: '3-Day Workout Program',
    day1: 'Day 1',
    day2: 'Day 2',
    day3: 'Day 3',
    muscles1: 'Chest · Triceps · Shoulders',
    muscles2: 'Back · Biceps · Core',
    muscles3: 'Lower body',
    back: 'Back',
    close: 'Close',
    settings: 'Settings',
    settingsTitle: 'Settings',
    underMonth: 'Less than a month',
    overMonth: 'More than a month',
    exercisesHeading: 'Exercises',
    catChest: 'Chest',
    catTriceps: 'Triceps',
    catShoulders: 'Shoulders',
    exSeatedChestPress: 'Seated chest press machine',
    exChestFly: 'Chest fly machine',
    exTricepsPushdown: 'Triceps pushdown',
    exOverheadExtensions: 'Overhead extensions',
    exMachineShoulderPress: 'Machine shoulder press',
    exBarbellUprightRows: 'Barbell upright rows',
  },
  fr: {
    chooseLanguage: 'Choisissez votre langue',
    langEn: 'Anglais',
    langFr: 'Français',
    langAr: 'Arabe',
    programTitle: "Programme d'entraînement de 3 jours",
    day1: 'Jour 1',
    day2: 'Jour 2',
    day3: 'Jour 3',
    muscles1: 'Pectoraux · Triceps · Épaules',
    muscles2: 'Dos · Biceps · Centre',
    muscles3: 'Bas du corps',
    back: 'Retour',
    close: 'Fermer',
    settings: 'Paramètres',
    settingsTitle: 'Paramètres',
    underMonth: "Moins d'un mois",
    overMonth: "Plus d'un mois",
    exercisesHeading: 'Exercices',
    catChest: 'Pectoraux',
    catTriceps: 'Triceps',
    catShoulders: 'Épaules',
    exSeatedChestPress: 'Développé assis à la machine',
    exChestFly: 'Écarté à la machine',
    exTricepsPushdown: 'Pushdown triceps',
    exOverheadExtensions: 'Extensions au-dessus de la tête',
    exMachineShoulderPress: 'Développé épaules à la machine',
    exBarbellUprightRows: 'Rowing menton à la barre',
  },
  ar: {
    chooseLanguage: 'اختر لغتك',
    langEn: 'الإنجليزية',
    langFr: 'الفرنسية',
    langAr: 'العربية',
    programTitle: 'برنامج تمرين لثلاثة أيام',
    day1: 'اليوم 1',
    day2: 'اليوم 2',
    day3: 'اليوم 3',
    muscles1: 'صدر · ترايسبس · أكتاف',
    muscles2: 'ظهر · بايسبس · كور',
    muscles3: 'الجزء السفلي',
    back: 'رجوع',
    close: 'إغلاق',
    settings: 'الإعدادات',
    settingsTitle: 'الإعدادات',
    underMonth: 'أقل من شهر',
    overMonth: 'أكثر من شهر',
    exercisesHeading: 'التمارين',
    catChest: 'صدر',
    catTriceps: 'ترايسبس',
    catShoulders: 'أكتاف',
    exSeatedChestPress: 'ضغط الصدر جالسًا على الجهاز',
    exChestFly: 'تفتيح الصدر على الجهاز',
    exTricepsPushdown: 'تمرين الترايسبس لأسفل',
    exOverheadExtensions: 'تمديد فوق الرأس',
    exMachineShoulderPress: 'ضغط الأكتاف على الجهاز',
    exBarbellUprightRows: 'سحب عمودي بالبار',
  },
}

export function t(lang: Lang, key: MessageKey): string {
  return messages[lang][key]
}

export function dirFor(lang: Lang): 'rtl' | 'ltr' {
  return lang === 'ar' ? 'rtl' : 'ltr'
}
