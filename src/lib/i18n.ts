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
  | 'settings'
  | 'settingsTitle'
  | 'underMonth'
  | 'overMonth'
  | 'exercisesHeading'

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
    settings: 'Settings',
    settingsTitle: 'Settings',
    underMonth: 'Less than a month',
    overMonth: 'More than a month',
    exercisesHeading: 'Exercises',
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
    settings: 'Paramètres',
    settingsTitle: 'Paramètres',
    underMonth: "Moins d'un mois",
    overMonth: "Plus d'un mois",
    exercisesHeading: 'Exercices',
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
    settings: 'الإعدادات',
    settingsTitle: 'الإعدادات',
    underMonth: 'أقل من شهر',
    overMonth: 'أكثر من شهر',
    exercisesHeading: 'التمارين',
  },
}

export function t(lang: Lang, key: MessageKey): string {
  return messages[lang][key]
}

export function dirFor(lang: Lang): 'rtl' | 'ltr' {
  return lang === 'ar' ? 'rtl' : 'ltr'
}
