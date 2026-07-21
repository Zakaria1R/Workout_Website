import type { DayId, Experience } from './storage'

const data: Record<DayId, Record<Experience, string[]>> = {
  1: {
    under_month: [
      'Day1 · <1mo · Press variation A',
      'Day1 · <1mo · Triceps A',
      'Day1 · <1mo · Shoulders A',
    ],
    over_month: [
      'Day1 · >1mo · Press variation B',
      'Day1 · >1mo · Triceps B',
      'Day1 · >1mo · Shoulders B',
      'Day1 · >1mo · Finisher',
    ],
  },
  2: {
    under_month: ['Day2 · <1mo · Row A', 'Day2 · <1mo · Curl A', 'Day2 · <1mo · Core A'],
    over_month: [
      'Day2 · >1mo · Row B',
      'Day2 · >1mo · Curl B',
      'Day2 · >1mo · Core B',
      'Day2 · >1mo · Pull finisher',
    ],
  },
  3: {
    under_month: ['Day3 · <1mo · Squat A', 'Day3 · <1mo · Hinge A', 'Day3 · <1mo · Calf A'],
    over_month: [
      'Day3 · >1mo · Squat B',
      'Day3 · >1mo · Hinge B',
      'Day3 · >1mo · Lunge B',
      'Day3 · >1mo · Calf B',
    ],
  },
}

export function getPlaceholderExercises(day: DayId, experience: Experience): string[] {
  return data[day][experience]
}
