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
  | 'catBack'
  | 'catBiceps'
  | 'catCoreAbs'
  | 'catLowerBody'
  | 'exSeatedChestPress'
  | 'exChestFly'
  | 'exTricepsPushdown'
  | 'exOverheadExtensions'
  | 'exMachineShoulderPress'
  | 'exBarbellUprightRows'
  | 'exLatPulldown'
  | 'exSeatedCableRows'
  | 'exSingleArmCableCurl'
  | 'exRopeCurls'
  | 'exPlanks'
  | 'exHeelTouches'
  | 'exSquat'
  | 'exLegPress'
  | 'exHamstringCurls'
  | 'exSeatedHipAbduction'
  | 'exSeatedHipAdduction'
  | 'exCalfRaises'

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
    muscles2: 'Back · Biceps · Core / Abs',
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
    catBack: 'Back',
    catBiceps: 'Biceps',
    catCoreAbs: 'Core / Abs',
    catLowerBody: 'Lower body',
    exSeatedChestPress: 'Seated chest press machine',
    exChestFly: 'Chest fly machine',
    exTricepsPushdown: 'Triceps pushdown',
    exOverheadExtensions: 'Overhead extensions',
    exMachineShoulderPress: 'Machine shoulder press',
    exBarbellUprightRows: 'Barbell upright rows',
    exLatPulldown: 'Lat Pulldown',
    exSeatedCableRows: 'Seated cable rows',
    exSingleArmCableCurl: 'Single arm cable bicep curl',
    exRopeCurls: 'Rope Curls',
    exPlanks: 'Planks',
    exHeelTouches: 'Heel touches',
    exSquat: 'Squat',
    exLegPress: 'Leg press',
    exHamstringCurls: 'Hamstring curls',
    exSeatedHipAbduction: 'Seated Hip Abduction',
    exSeatedHipAdduction: 'Seated hip adduction',
    exCalfRaises: 'Calf Raises',
  },
  fr: {
    chooseLanguage: 'Choisissez votre langue',
    langEn: 'Anglais',
    langFr: 'Français',
    langAr: 'Arabe',
    programTitle: "Programme d'entraînement sur 3 jours",
    day1: 'Jour 1',
    day2: 'Jour 2',
    day3: 'Jour 3',
    muscles1: 'Pectoraux · Triceps · Épaules',
    muscles2: 'Dos · Biceps · Gainage / Abdos',
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
    catBack: 'Dos',
    catBiceps: 'Biceps',
    catCoreAbs: 'Gainage / Abdos',
    catLowerBody: 'Bas du corps',
    exSeatedChestPress: 'Presse à pectoraux assise',
    exChestFly: 'Écarté pectoraux à la machine',
    exTricepsPushdown: 'Extensions triceps à la poulie haute',
    exOverheadExtensions: 'Extensions triceps au-dessus de la tête',
    exMachineShoulderPress: 'Presse à épaules (machine)',
    exBarbellUprightRows: 'Tirage menton à la barre',
    exLatPulldown: 'Tirage vertical (lat pulldown)',
    exSeatedCableRows: 'Rowing assis à la poulie',
    exSingleArmCableCurl: 'Curl biceps unilatéral à la poulie',
    exRopeCurls: 'Curl biceps à la corde',
    exPlanks: 'Planche',
    exHeelTouches: 'Toucher des talons',
    exSquat: 'Squat',
    exLegPress: 'Presse à cuisses',
    exHamstringCurls: 'Curl ischio-jambiers',
    exSeatedHipAbduction: 'Abduction de hanche assise',
    exSeatedHipAdduction: 'Adduction de hanche assise',
    exCalfRaises: 'Élévations de mollets',
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
    muscles2: 'ظهر · بايسبس · كور / بطن',
    muscles3: 'الجزء السفلي من الجسم',
    back: 'رجوع',
    close: 'إغلاق',
    settings: 'الإعدادات',
    settingsTitle: 'الإعدادات',
    underMonth: 'أقل من شهر',
    overMonth: 'أكثر من شهر',
    exercisesHeading: 'التمارين',
    catChest: 'الصدر',
    catTriceps: 'الترايسبس',
    catShoulders: 'الأكتاف',
    catBack: 'الظهر',
    catBiceps: 'البايسبس',
    catCoreAbs: 'الكور / البطن',
    catLowerBody: 'الجزء السفلي من الجسم',
    exSeatedChestPress: 'ضغط الصدر جالسًا على الجهاز',
    exChestFly: 'تفتيح الصدر على الجهاز (فلاى)',
    exTricepsPushdown: 'دفع الترايسبس لأسفل (بوش داون)',
    exOverheadExtensions: 'تمديد الترايسبس فوق الرأس',
    exMachineShoulderPress: 'ضغط الأكتاف على الجهاز',
    exBarbellUprightRows: 'السحب العمودي بالبار (أبرايت رو)',
    exLatPulldown: 'سحب اللات من الأعلى (لات بول داون)',
    exSeatedCableRows: 'تجديف جالس بالكابل',
    exSingleArmCableCurl: 'كارل بايسبس بذراع واحدة بالكابل',
    exRopeCurls: 'كارل البايسبس بالحبل',
    exPlanks: 'البلانك',
    exHeelTouches: 'لمس الكعبين',
    exSquat: 'سكوات',
    exLegPress: 'ضغط الأرجل (ليج برس)',
    exHamstringCurls: 'كارل أوتار الركبة',
    exSeatedHipAbduction: 'تبعيد الورك جالسًا',
    exSeatedHipAdduction: 'تقريب الورك جالسًا',
    exCalfRaises: 'رفع السمانة',
  },
}

export function t(lang: Lang, key: MessageKey): string {
  return messages[lang][key]
}

export function dirFor(lang: Lang): 'rtl' | 'ltr' {
  return lang === 'ar' ? 'rtl' : 'ltr'
}
