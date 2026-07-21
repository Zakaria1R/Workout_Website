import { describe, it, expect } from 'vitest'
import { t, dirFor } from './i18n'

describe('dirFor', () => {
  it('rtl for Arabic, ltr otherwise', () => {
    expect(dirFor('ar')).toBe('rtl')
    expect(dirFor('en')).toBe('ltr')
    expect(dirFor('fr')).toBe('ltr')
  })
})

describe('t', () => {
  it('returns English program title', () => {
    expect(t('en', 'programTitle')).toBe('3-Day Workout Program')
  })
  it('returns French and Arabic titles', () => {
    expect(t('fr', 'programTitle')).toBe("Programme d'entraînement sur 3 jours")
    expect(t('ar', 'programTitle')).toBe('برنامج تمرين لثلاثة أيام')
  })
})
