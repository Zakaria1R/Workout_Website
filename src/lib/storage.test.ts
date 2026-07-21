import { describe, it, expect, beforeEach } from 'vitest'
import { getGmt1DateString, loadPrefs, savePrefs, applyMidnightReset } from './storage'

function memoryStorage(): Storage {
  const map = new Map<string, string>()
  return {
    get length() {
      return map.size
    },
    clear() {
      map.clear()
    },
    getItem(k) {
      return map.has(k) ? map.get(k)! : null
    },
    setItem(k, v) {
      map.set(k, String(v))
    },
    removeItem(k) {
      map.delete(k)
    },
    key() {
      return null
    },
  }
}

describe('getGmt1DateString', () => {
  it('returns YYYY-MM-DD in fixed UTC+1', () => {
    const d = new Date(Date.UTC(2026, 6, 21, 23, 30, 0))
    expect(getGmt1DateString(d)).toBe('2026-07-22')
  })

  it('stays on same calendar day just before GMT+1 midnight', () => {
    const d = new Date(Date.UTC(2026, 6, 21, 22, 59, 0))
    expect(getGmt1DateString(d)).toBe('2026-07-21')
  })
})

describe('applyMidnightReset', () => {
  let storage: Storage
  beforeEach(() => {
    storage = memoryStorage()
  })

  it('clears activeDay when GMT+1 date changed', () => {
    savePrefs(
      {
        lang: 'en',
        experience: 'under_month',
        activeDay: 2,
        lastGmt1Date: '2026-07-20',
      },
      storage,
    )
    const now = new Date(Date.UTC(2026, 6, 21, 10, 0, 0))
    const prefs = applyMidnightReset(now, storage)
    expect(prefs.activeDay).toBeNull()
    expect(prefs.lang).toBe('en')
    expect(prefs.experience).toBe('under_month')
    expect(prefs.lastGmt1Date).toBe('2026-07-21')
  })

  it('keeps activeDay when still same GMT+1 date', () => {
    savePrefs(
      {
        lang: 'fr',
        experience: 'over_month',
        activeDay: 1,
        lastGmt1Date: '2026-07-21',
      },
      storage,
    )
    const now = new Date(Date.UTC(2026, 6, 21, 10, 0, 0))
    const prefs = applyMidnightReset(now, storage)
    expect(prefs.activeDay).toBe(1)
    expect(prefs.lang).toBe('fr')
  })
})

describe('loadPrefs defaults', () => {
  it('defaults experience to under_month and null lang/day', () => {
    const prefs = loadPrefs(memoryStorage())
    expect(prefs.lang).toBeNull()
    expect(prefs.activeDay).toBeNull()
    expect(prefs.experience).toBe('under_month')
  })
})
