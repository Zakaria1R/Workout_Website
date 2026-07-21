import type { DayId, Experience } from './storage'

/** Each number is reps for that set. */
export type SetScheme = {
  reps: number[]
  /** Weight increases each set */
  progressiveLoad?: boolean
}

/** Default for all exercises unless overridden */
export const DEFAULT_SCHEME: SetScheme = {
  reps: [12, 10, 8],
  progressiveLoad: true,
}

export type WorkoutExercise = {
  id: string
  titleKey: string
  youtubeId: string
  scheme?: SetScheme
}

export type WorkoutCategory = {
  id: string
  titleKey: string
  exercises: WorkoutExercise[]
}

function ex(
  id: string,
  titleKey: string,
  youtubeId: string,
  scheme: SetScheme = DEFAULT_SCHEME,
): WorkoutExercise {
  return { id, titleKey, youtubeId, scheme }
}

const day1UnderMonth: WorkoutCategory[] = [
  {
    id: 'chest',
    titleKey: 'catChest',
    exercises: [
      ex('seated-chest-press', 'exSeatedChestPress', 'UH6y0fhbw8w'),
      ex('chest-fly', 'exChestFly', 'eGjt4lk6g34'),
    ],
  },
  {
    id: 'triceps',
    titleKey: 'catTriceps',
    exercises: [
      ex('triceps-pushdown', 'exTricepsPushdown', 'XpeCPOHJTK8'),
      ex('overhead-extensions', 'exOverheadExtensions', '9Ark9S11uXw'),
    ],
  },
  {
    id: 'shoulders',
    titleKey: 'catShoulders',
    exercises: [
      ex('machine-shoulder-press', 'exMachineShoulderPress', '6v4nrRVySj0'),
      ex('barbell-upright-rows', 'exBarbellUprightRows', 'Crwdh2qlNO0'),
    ],
  },
]

const day2UnderMonth: WorkoutCategory[] = [
  {
    id: 'back',
    titleKey: 'catBack',
    exercises: [
      ex('lat-pulldown', 'exLatPulldown', 'bNmvKpJSWKM'),
      ex('seated-cable-rows', 'exSeatedCableRows', 'qD1WZ5pSuvk'),
    ],
  },
  {
    id: 'biceps',
    titleKey: 'catBiceps',
    exercises: [
      ex('single-arm-cable-curl', 'exSingleArmCableCurl', 'EhC6ejgDGF0'),
      ex('rope-curls', 'exRopeCurls', 'fSfgRE_vcOo'),
    ],
  },
  {
    id: 'core-abs',
    titleKey: 'catCoreAbs',
    exercises: [
      ex('planks', 'exPlanks', 'xe2MXatLTUw'),
      ex('heel-touches', 'exHeelTouches', 'RQRKLIpwIJs'),
    ],
  },
]

const day3UnderMonth: WorkoutCategory[] = [
  {
    id: 'lower-body',
    titleKey: 'catLowerBody',
    exercises: [
      ex('squat', 'exSquat', 'dW3zj79xfrc'),
      ex('leg-press', 'exLegPress', 'EotSw18oR9w'),
      ex('hamstring-curls', 'exHamstringCurls', 'lGNeJsdqJwg'),
      ex('seated-hip-abduction', 'exSeatedHipAbduction', 'ZBQk4FRQdFQ'),
      ex('seated-hip-adduction', 'exSeatedHipAdduction', '36EB4I915sU'),
      ex('calf-raises', 'exCalfRaises', '_OewEscCsbo'),
    ],
  },
]

function placeholderCategories(day: DayId, experience: Experience): WorkoutCategory[] {
  const tag = experience === 'under_month' ? '<1mo' : '>1mo'
  return [
    {
      id: `d${day}-${experience}`,
      titleKey: 'exercisesHeading',
      exercises: [
        { id: `ph-${day}-${experience}-a`, titleKey: `placeholder:${day}:${tag}:A`, youtubeId: '' },
        { id: `ph-${day}-${experience}-b`, titleKey: `placeholder:${day}:${tag}:B`, youtubeId: '' },
        { id: `ph-${day}-${experience}-c`, titleKey: `placeholder:${day}:${tag}:C`, youtubeId: '' },
      ],
    },
  ]
}

const data: Record<DayId, Record<Experience, WorkoutCategory[]>> = {
  1: {
    under_month: day1UnderMonth,
    over_month: placeholderCategories(1, 'over_month'),
  },
  2: {
    under_month: day2UnderMonth,
    over_month: placeholderCategories(2, 'over_month'),
  },
  3: {
    under_month: day3UnderMonth,
    over_month: placeholderCategories(3, 'over_month'),
  },
}

export function getWorkoutCategories(day: DayId, experience: Experience): WorkoutCategory[] {
  return data[day][experience]
}

export function youtubeEmbedUrl(youtubeId: string): string {
  return `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`
}
