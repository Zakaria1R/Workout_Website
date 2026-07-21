import { describe, it, expect } from 'vitest'
import { getWorkoutCategories, youtubeEmbedUrl } from './workoutContent'

describe('getWorkoutCategories', () => {
  it('returns chest, triceps, shoulders for day 1 under a month', () => {
    const cats = getWorkoutCategories(1, 'under_month')
    expect(cats.map((c) => c.id)).toEqual(['chest', 'triceps', 'shoulders'])
    expect(cats[0].exercises).toHaveLength(2)
    expect(cats[0].exercises[0].youtubeId).toBe('UH6y0fhbw8w')
    expect(cats[0].exercises[1].youtubeId).toBe('eGjt4lk6g34')
    expect(cats[1].exercises[0].youtubeId).toBe('XpeCPOHJTK8')
    expect(cats[1].exercises[1].youtubeId).toBe('9Ark9S11uXw')
    expect(cats[2].exercises[0].youtubeId).toBe('6v4nrRVySj0')
    expect(cats[2].exercises[1].youtubeId).toBe('Crwdh2qlNO0')
  })

  it('returns back, biceps, core/abs for day 2 under a month', () => {
    const cats = getWorkoutCategories(2, 'under_month')
    expect(cats.map((c) => c.id)).toEqual(['back', 'biceps', 'core-abs'])
    expect(cats[0].exercises.map((e) => e.youtubeId)).toEqual(['bNmvKpJSWKM', 'qD1WZ5pSuvk'])
    expect(cats[1].exercises.map((e) => e.youtubeId)).toEqual(['EhC6ejgDGF0', 'fSfgRE_vcOo'])
    expect(cats[2].exercises.map((e) => e.youtubeId)).toEqual(['xe2MXatLTUw', 'RQRKLIpwIJs'])
  })

  it('returns lower body exercises for day 3 under a month', () => {
    const cats = getWorkoutCategories(3, 'under_month')
    expect(cats.map((c) => c.id)).toEqual(['lower-body'])
    expect(cats[0].exercises.map((e) => e.youtubeId)).toEqual([
      'dW3zj79xfrc',
      'EotSw18oR9w',
      'lGNeJsdqJwg',
      'ZBQk4FRQdFQ',
      '36EB4I915sU',
      '_OewEscCsbo',
    ])
  })

  it('differs for over_month on day 1', () => {
    const a = getWorkoutCategories(1, 'under_month')
    const b = getWorkoutCategories(1, 'over_month')
    expect(JSON.stringify(a)).not.toBe(JSON.stringify(b))
  })
})

describe('youtubeEmbedUrl', () => {
  it('builds nocookie embed with autoplay', () => {
    expect(youtubeEmbedUrl('UH6y0fhbw8w')).toContain('youtube-nocookie.com/embed/UH6y0fhbw8w')
    expect(youtubeEmbedUrl('UH6y0fhbw8w')).toContain('autoplay=1')
  })
})
