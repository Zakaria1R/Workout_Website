const KEY = 'workout_prefs_v1'

export type Lang = 'en' | 'fr' | 'ar'
export type Experience = 'under_month' | 'over_month'
export type DayId = 1 | 2 | 3

export type Prefs = {
  lang: Lang | null
  experience: Experience
  activeDay: DayId | null
  lastGmt1Date: string
}

export function getGmt1DateString(now: Date = new Date()): string {
  const shifted = new Date(now.getTime() + 60 * 60 * 1000)
  const y = shifted.getUTCFullYear()
  const m = String(shifted.getUTCMonth() + 1).padStart(2, '0')
  const d = String(shifted.getUTCDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

const defaultPrefs = (): Prefs => ({
  lang: null,
  experience: 'under_month',
  activeDay: null,
  lastGmt1Date: getGmt1DateString(),
})

function store(storage?: Storage): Storage {
  return storage ?? window.localStorage
}

export function loadPrefs(storage: Storage = store()): Prefs {
  try {
    const raw = storage.getItem(KEY)
    if (!raw) return defaultPrefs()
    const parsed = JSON.parse(raw) as Partial<Prefs>
    return {
      ...defaultPrefs(),
      ...parsed,
    }
  } catch {
    return defaultPrefs()
  }
}

export function savePrefs(partial: Partial<Prefs>, storage: Storage = store()): Prefs {
  const next = { ...loadPrefs(storage), ...partial }
  storage.setItem(KEY, JSON.stringify(next))
  return next
}

export function applyMidnightReset(now: Date = new Date(), storage: Storage = store()): Prefs {
  const today = getGmt1DateString(now)
  const prefs = loadPrefs(storage)
  if (prefs.lastGmt1Date !== today) {
    return savePrefs({ activeDay: null, lastGmt1Date: today }, storage)
  }
  return prefs
}
