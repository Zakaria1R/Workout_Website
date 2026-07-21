import type { DayId, Experience } from './storage'

/** Language-neutral set scheme: each number is reps for that set. */
export type SetScheme = {
  reps: number[]
  /** Weight increases each set */
  progressiveLoad?: boolean
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

const day1UnderMonth: WorkoutCategory[] = [
  {
    id: 'chest',
    titleKey: 'catChest',
    exercises: [
      {
        id: 'seated-chest-press',
        titleKey: 'exSeatedChestPress',
        youtubeId: 'UH6y0fhbw8w',
        scheme: { reps: [12, 10, 8], progressiveLoad: true },
      },
      { id: 'chest-fly', titleKey: 'exChestFly', youtubeId: 'eGjt4lk6g34' },
    ],
  },
  {
    id: 'triceps',
    titleKey: 'catTriceps',
    exercises: [
      { id: 'triceps-pushdown', titleKey: 'exTricepsPushdown', youtubeId: 'XpeCPOHJTK8' },
      { id: 'overhead-extensions', titleKey: 'exOverheadExtensions', youtubeId: '9Ark9S11uXw' },
    ],
  },
  {
    id: 'shoulders',
    titleKey: 'catShoulders',
    exercises: [
      { id: 'machine-shoulder-press', titleKey: 'exMachineShoulderPress', youtubeId: '6v4nrRVySj0' },
      { id: 'barbell-upright-rows', titleKey: 'exBarbellUprightRows', youtubeId: 'Crwdh2qlNO0' },
    ],
  },
]

const day2UnderMonth: WorkoutCategory[] = [
  {
    id: 'back',
    titleKey: 'catBack',
    exercises: [
      { id: 'lat-pulldown', titleKey: 'exLatPulldown', youtubeId: 'bNmvKpJSWKM' },
      { id: 'seated-cable-rows', titleKey: 'exSeatedCableRows', youtubeId: 'qD1WZ5pSuvk' },
    ],
  },
  {
    id: 'biceps',
    titleKey: 'catBiceps',
    exercises: [
      { id: 'single-arm-cable-curl', titleKey: 'exSingleArmCableCurl', youtubeId: 'EhC6ejgDGF0' },
      { id: 'rope-curls', titleKey: 'exRopeCurls', youtubeId: 'fSfgRE_vcOo' },
    ],
  },
  {
    id: 'core-abs',
    titleKey: 'catCoreAbs',
    exercises: [
      { id: 'planks', titleKey: 'exPlanks', youtubeId: 'xe2MXatLTUw' },
      { id: 'heel-touches', titleKey: 'exHeelTouches', youtubeId: 'RQRKLIpwIJs' },
    ],
  },
]

const day3UnderMonth: WorkoutCategory[] = [
  {
    id: 'lower-body',
    titleKey: 'catLowerBody',
    exercises: [
      { id: 'squat', titleKey: 'exSquat', youtubeId: 'dW3zj79xfrc' },
      { id: 'leg-press', titleKey: 'exLegPress', youtubeId: 'EotSw18oR9w' },
      { id: 'hamstring-curls', titleKey: 'exHamstringCurls', youtubeId: 'lGNeJsdqJwg' },
      { id: 'seated-hip-abduction', titleKey: 'exSeatedHipAbduction', youtubeId: 'ZBQk4FRQdFQ' },
      { id: 'seated-hip-adduction', titleKey: 'exSeatedHipAdduction', youtubeId: '36EB4I915sU' },
      { id: 'calf-raises', titleKey: 'exCalfRaises', youtubeId: '_OewEscCsbo' },
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
