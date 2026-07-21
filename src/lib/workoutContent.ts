import type { DayId, Experience } from './storage'

export type WorkoutExercise = {
  id: string
  /** i18n message key for the exercise title */
  titleKey: string
  youtubeId: string
}

export type WorkoutCategory = {
  id: string
  /** i18n message key for the category heading */
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
      },
      {
        id: 'chest-fly',
        titleKey: 'exChestFly',
        youtubeId: 'eGjt4lk6g34',
      },
    ],
  },
  {
    id: 'triceps',
    titleKey: 'catTriceps',
    exercises: [
      {
        id: 'triceps-pushdown',
        titleKey: 'exTricepsPushdown',
        youtubeId: 'XpeCPOHJTK8',
      },
      {
        id: 'overhead-extensions',
        titleKey: 'exOverheadExtensions',
        youtubeId: '9Ark9S11uXw',
      },
    ],
  },
  {
    id: 'shoulders',
    titleKey: 'catShoulders',
    exercises: [
      {
        id: 'machine-shoulder-press',
        titleKey: 'exMachineShoulderPress',
        youtubeId: '6v4nrRVySj0',
      },
      {
        id: 'barbell-upright-rows',
        titleKey: 'exBarbellUprightRows',
        youtubeId: 'Crwdh2qlNO0',
      },
    ],
  },
]

/** Placeholder categories until real content is provided */
function placeholderCategories(day: DayId, experience: Experience): WorkoutCategory[] {
  const tag = experience === 'under_month' ? '<1mo' : '>1mo'
  return [
    {
      id: `d${day}-${experience}`,
      titleKey: 'exercisesHeading',
      exercises: [
        {
          id: `ph-${day}-${experience}-a`,
          titleKey: `placeholder:${day}:${tag}:A`,
          youtubeId: '',
        },
        {
          id: `ph-${day}-${experience}-b`,
          titleKey: `placeholder:${day}:${tag}:B`,
          youtubeId: '',
        },
        {
          id: `ph-${day}-${experience}-c`,
          titleKey: `placeholder:${day}:${tag}:C`,
          youtubeId: '',
        },
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
    under_month: placeholderCategories(2, 'under_month'),
    over_month: placeholderCategories(2, 'over_month'),
  },
  3: {
    under_month: placeholderCategories(3, 'under_month'),
    over_month: placeholderCategories(3, 'over_month'),
  },
}

export function getWorkoutCategories(day: DayId, experience: Experience): WorkoutCategory[] {
  return data[day][experience]
}

export function youtubeEmbedUrl(youtubeId: string): string {
  return `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`
}
