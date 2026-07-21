import { describe, it, expect } from 'vitest'
import { getPlaceholderExercises } from './placeholders'

describe('getPlaceholderExercises', () => {
  it('returns different lists for under vs over month on day 1', () => {
    const a = getPlaceholderExercises(1, 'under_month')
    const b = getPlaceholderExercises(1, 'over_month')
    expect(a.length).toBeGreaterThanOrEqual(3)
    expect(b.length).toBeGreaterThanOrEqual(3)
    expect(a.join('|')).not.toBe(b.join('|'))
  })

  it('varies by day', () => {
    const d1 = getPlaceholderExercises(1, 'under_month')
    const d2 = getPlaceholderExercises(2, 'under_month')
    expect(d1.join('|')).not.toBe(d2.join('|'))
  })
})
