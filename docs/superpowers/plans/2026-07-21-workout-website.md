# 3-Day Workout Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Vite + React multilingual 3-day workout app with language picker, day menu, experience toggle + placeholder lists, settings, and midnight GMT+1 reset to the day menu.

**Architecture:** Client-only SPA. Screen routing is driven by `localStorage` prefs (language, experience, active day, last GMT+1 date). Pure helpers in `src/lib/` own persistence and i18n; React components render screens. No backend.

**Tech Stack:** Vite 6, React 19, TypeScript, Vitest, CSS (no UI library). Deploy static build to Vercel via GitHub.

## Global Constraints

- Fixed UTC+1 calendar date for midnight reset (not DST-aware `Europe/Paris`)
- Languages: `en` | `fr` | `ar`; Arabic sets `dir="rtl"`, others `dir="ltr"`
- Flags: UK for English, France for French, Saudi Arabia for Arabic
- Experience values: `under_month` | `over_month` (persist across midnight)
- Active day cleared on GMT+1 date change; language + experience kept
- No brand name; optional small star mark in header only
- Exercise lists are placeholders this phase; real content later
- After meaningful changes: commit and push to `origin/main` for Vercel

---

## File structure

| Path | Responsibility |
|------|----------------|
| `package.json`, `vite.config.ts`, `tsconfig*.json`, `index.html` | Vite + React + Vitest scaffold |
| `src/main.tsx` | React mount |
| `src/App.tsx` | Screen routing + midnight check loop |
| `src/index.css` | Global theme, layout, motion |
| `src/lib/storage.ts` | Prefs read/write + GMT+1 date + midnight apply |
| `src/lib/storage.test.ts` | Storage / midnight tests |
| `src/lib/i18n.ts` | Translation map + `dirFor(lang)` |
| `src/lib/i18n.test.ts` | i18n tests |
| `src/lib/placeholders.ts` | Placeholder exercise strings per day × experience |
| `src/components/LanguagePicker.tsx` | First-run language choice |
| `src/components/DayMenu.tsx` | Title + 3 day boxes |
| `src/components/DayDetail.tsx` | Toggle + list |
| `src/components/Settings.tsx` | Language change panel |
| `src/components/AppHeader.tsx` | Star mark + settings control |
| `vercel.json` | SPA fallback for static deploy |
| `README.md` | Run / deploy notes |

---

### Task 1: Scaffold Vite + React + TypeScript + Vitest

**Files:**
- Create: project root via Vite template (overwrites nothing important; keep existing `docs/` and `.git`)
- Create: `vercel.json`
- Modify: `README.md`
- Keep: `docs/superpowers/**`

**Interfaces:**
- Consumes: none
- Produces: runnable `npm run dev`, `npm run build`, `npm test`

- [ ] **Step 1: Scaffold in a temp folder and merge into the repo root**

Working directory: `C:\Users\itsal\OneDrive\Desktop\Rahmouni\Workout program website`

```powershell
npm create vite@latest _scaffold -- --template react-ts
Copy-Item -Recurse -Force _scaffold\* .
Remove-Item -Recurse -Force _scaffold
npm install
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 2: Configure Vitest in `vite.config.ts`**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
})
```

Create `src/test/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest'
```

Add to `package.json` scripts:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 3: Add `vercel.json` for SPA routing**

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

- [ ] **Step 4: Verify scaffold**

Run: `npm run build`
Expected: build succeeds

Run: `npm test`
Expected: pass (0 tests or default template cleaned — remove `src/App.css` demo content in Task 6; for now leave Vite starter until App rewrite)

- [ ] **Step 5: Commit and push**

```powershell
git add -A
git commit -m "chore: scaffold Vite React TypeScript app with Vitest"
git push
```

---

### Task 2: Storage helpers + midnight GMT+1

**Files:**
- Create: `src/lib/storage.ts`
- Create: `src/lib/storage.test.ts`

**Interfaces:**
- Consumes: `localStorage` (injectable for tests)
- Produces:
  - `export type Lang = 'en' | 'fr' | 'ar'`
  - `export type Experience = 'under_month' | 'over_month'`
  - `export type DayId = 1 | 2 | 3`
  - `export type Prefs = { lang: Lang | null; experience: Experience; activeDay: DayId | null; lastGmt1Date: string }`
  - `export function getGmt1DateString(now?: Date): string`
  - `export function loadPrefs(storage?: Storage): Prefs`
  - `export function savePrefs(partial: Partial<Prefs>, storage?: Storage): Prefs`
  - `export function applyMidnightReset(now?: Date, storage?: Storage): Prefs` — if `lastGmt1Date !== getGmt1DateString(now)`, set `activeDay: null` and update `lastGmt1Date`

- [ ] **Step 1: Write failing tests**

```ts
// src/lib/storage.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { getGmt1DateString, loadPrefs, savePrefs, applyMidnightReset } from './storage'

function memoryStorage(): Storage {
  const map = new Map<string, string>()
  return {
    get length() { return map.size },
    clear() { map.clear() },
    getItem(k) { return map.has(k) ? map.get(k)! : null },
    setItem(k, v) { map.set(k, String(v)) },
    removeItem(k) { map.delete(k) },
    key() { return null },
  }
}

describe('getGmt1DateString', () => {
  it('returns YYYY-MM-DD in fixed UTC+1', () => {
    // 2026-07-21 23:30 UTC => 2026-07-22 00:30 GMT+1
    const d = new Date(Date.UTC(2026, 6, 21, 23, 30, 0))
    expect(getGmt1DateString(d)).toBe('2026-07-22')
  })

  it('stays on same calendar day just before GMT+1 midnight', () => {
    // 2026-07-21 22:59 UTC => 2026-07-21 23:59 GMT+1
    const d = new Date(Date.UTC(2026, 6, 21, 22, 59, 0))
    expect(getGmt1DateString(d)).toBe('2026-07-21')
  })
})

describe('applyMidnightReset', () => {
  let storage: Storage
  beforeEach(() => { storage = memoryStorage() })

  it('clears activeDay when GMT+1 date changed', () => {
    savePrefs({
      lang: 'en',
      experience: 'under_month',
      activeDay: 2,
      lastGmt1Date: '2026-07-20',
    }, storage)
    const now = new Date(Date.UTC(2026, 6, 21, 10, 0, 0)) // 11:00 GMT+1 on 2026-07-21
    const prefs = applyMidnightReset(now, storage)
    expect(prefs.activeDay).toBeNull()
    expect(prefs.lang).toBe('en')
    expect(prefs.experience).toBe('under_month')
    expect(prefs.lastGmt1Date).toBe('2026-07-21')
  })

  it('keeps activeDay when still same GMT+1 date', () => {
    savePrefs({
      lang: 'fr',
      experience: 'over_month',
      activeDay: 1,
      lastGmt1Date: '2026-07-21',
    }, storage)
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
```

- [ ] **Step 2: Run tests — expect FAIL**

Run: `npm test -- src/lib/storage.test.ts`
Expected: FAIL (module not found / exports missing)

- [ ] **Step 3: Implement `src/lib/storage.ts`**

```ts
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

const defaultPrefs = (): Prefs => ({
  lang: null,
  experience: 'under_month',
  activeDay: null,
  lastGmt1Date: getGmt1DateString(),
})

export function getGmt1DateString(now: Date = new Date()): string {
  const shifted = new Date(now.getTime() + 60 * 60 * 1000)
  const y = shifted.getUTCFullYear()
  const m = String(shifted.getUTCMonth() + 1).padStart(2, '0')
  const d = String(shifted.getUTCDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

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
```

- [ ] **Step 4: Run tests — expect PASS**

Run: `npm test -- src/lib/storage.test.ts`
Expected: all PASS

- [ ] **Step 5: Commit and push**

```powershell
git add src/lib/storage.ts src/lib/storage.test.ts
git commit -m "feat: add prefs storage and GMT+1 midnight reset"
git push
```

---

### Task 3: i18n strings + document direction

**Files:**
- Create: `src/lib/i18n.ts`
- Create: `src/lib/i18n.test.ts`

**Interfaces:**
- Consumes: `Lang` from `./storage`
- Produces:
  - `export type MessageKey = ...` (union of keys)
  - `export function t(lang: Lang, key: MessageKey): string`
  - `export function dirFor(lang: Lang): 'rtl' | 'ltr'`
  - Keys must cover: language screen title, each language label, program title, Day 1–3 labels, muscle lines, back, settings, settings title, less/more than a month, placeholder empty hint

- [ ] **Step 1: Write failing tests**

```ts
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
    expect(t('fr', 'programTitle')).toBe('Programme d\'entraînement de 3 jours')
    expect(t('ar', 'programTitle')).toBe('برنامج تمرين لثلاثة أيام')
  })
})
```

- [ ] **Step 2: Run tests — expect FAIL**

Run: `npm test -- src/lib/i18n.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement `src/lib/i18n.ts`**

Include at minimum these keys (exact English values shown; French/Arabic must be real translations, not English copies):

```ts
import type { Lang } from './storage'

export type MessageKey =
  | 'chooseLanguage'
  | 'langEn' | 'langFr' | 'langAr'
  | 'programTitle'
  | 'day1' | 'day2' | 'day3'
  | 'muscles1' | 'muscles2' | 'muscles3'
  | 'back'
  | 'settings'
  | 'settingsTitle'
  | 'underMonth'
  | 'overMonth'
  | 'exercisesHeading'

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
    muscles2: 'Back · Biceps · Core',
    muscles3: 'Lower body',
    back: 'Back',
    settings: 'Settings',
    settingsTitle: 'Settings',
    underMonth: 'Less than a month',
    overMonth: 'More than a month',
    exercisesHeading: 'Exercises',
  },
  fr: {
    chooseLanguage: 'Choisissez votre langue',
    langEn: 'Anglais',
    langFr: 'Français',
    langAr: 'Arabe',
    programTitle: "Programme d'entraînement de 3 jours",
    day1: 'Jour 1',
    day2: 'Jour 2',
    day3: 'Jour 3',
    muscles1: 'Pectoraux · Triceps · Épaules',
    muscles2: 'Dos · Biceps · Centre',
    muscles3: 'Bas du corps',
    back: 'Retour',
    settings: 'Paramètres',
    settingsTitle: 'Paramètres',
    underMonth: "Moins d'un mois",
    overMonth: "Plus d'un mois",
    exercisesHeading: 'Exercices',
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
    muscles2: 'ظهر · بايسبس · كور',
    muscles3: 'الجزء السفلي',
    back: 'رجوع',
    settings: 'الإعدادات',
    settingsTitle: 'الإعدادات',
    underMonth: 'أقل من شهر',
    overMonth: 'أكثر من شهر',
    exercisesHeading: 'التمارين',
  },
}

export function t(lang: Lang, key: MessageKey): string {
  return messages[lang][key]
}

export function dirFor(lang: Lang): 'rtl' | 'ltr' {
  return lang === 'ar' ? 'rtl' : 'ltr'
}
```

- [ ] **Step 4: Run tests — expect PASS**

Run: `npm test -- src/lib/i18n.test.ts`
Expected: PASS

- [ ] **Step 5: Commit and push**

```powershell
git add src/lib/i18n.ts src/lib/i18n.test.ts
git commit -m "feat: add en/fr/ar translations and text direction"
git push
```

---

### Task 4: Placeholder exercise lists

**Files:**
- Create: `src/lib/placeholders.ts`
- Create: `src/lib/placeholders.test.ts`

**Interfaces:**
- Consumes: `DayId`, `Experience` from `./storage`
- Produces: `export function getPlaceholderExercises(day: DayId, experience: Experience): string[]` — returns ≥3 distinct strings; lists for `under_month` vs `over_month` must differ for the same day

- [ ] **Step 1: Write failing test**

```ts
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
```

- [ ] **Step 2: Run — expect FAIL**

Run: `npm test -- src/lib/placeholders.test.ts`

- [ ] **Step 3: Implement placeholders**

Use clearly labeled placeholder names (e.g. `Day1 · Beginner · Exercise A`) so UI review is obvious; real names come later.

```ts
import type { DayId, Experience } from './storage'

const data: Record<DayId, Record<Experience, string[]>> = {
  1: {
    under_month: ['Day1 · <1mo · Press variation A', 'Day1 · <1mo · Triceps A', 'Day1 · <1mo · Shoulders A'],
    over_month: ['Day1 · >1mo · Press variation B', 'Day1 · >1mo · Triceps B', 'Day1 · >1mo · Shoulders B', 'Day1 · >1mo · Finisher'],
  },
  2: {
    under_month: ['Day2 · <1mo · Row A', 'Day2 · <1mo · Curl A', 'Day2 · <1mo · Core A'],
    over_month: ['Day2 · >1mo · Row B', 'Day2 · >1mo · Curl B', 'Day2 · >1mo · Core B', 'Day2 · >1mo · Pull finisher'],
  },
  3: {
    under_month: ['Day3 · <1mo · Squat A', 'Day3 · <1mo · Hinge A', 'Day3 · <1mo · Calf A'],
    over_month: ['Day3 · >1mo · Squat B', 'Day3 · >1mo · Hinge B', 'Day3 · >1mo · Lunge B', 'Day3 · >1mo · Calf B'],
  },
}

export function getPlaceholderExercises(day: DayId, experience: Experience): string[] {
  return data[day][experience]
}
```

- [ ] **Step 4: Run — expect PASS**

- [ ] **Step 5: Commit and push**

```powershell
git add src/lib/placeholders.ts src/lib/placeholders.test.ts
git commit -m "feat: add placeholder exercise lists by day and experience"
git push
```

---

### Task 5: UI components (LanguagePicker, DayMenu, DayDetail, Settings, AppHeader)

**Files:**
- Create: `src/components/LanguagePicker.tsx`
- Create: `src/components/DayMenu.tsx`
- Create: `src/components/DayDetail.tsx`
- Create: `src/components/Settings.tsx`
- Create: `src/components/AppHeader.tsx`
- Create: `src/index.css` (theme — charcoal/steel athletic look; **no** purple gradients, **no** cream+terracotta, **no** broadsheet; expressive font via Google Fonts link in `index.html`: e.g. `Syne` + `Source Sans 3`)

**Interfaces:**
- `LanguagePicker({ onSelect: (lang: Lang) => void })`
- `DayMenu({ lang: Lang; onOpenDay: (day: DayId) => void; onOpenSettings: () => void })`
- `DayDetail({ lang: Lang; day: DayId; experience: Experience; onExperience: (e: Experience) => void; onBack: () => void; onOpenSettings: () => void })`
- `Settings({ lang: Lang; open: boolean; onClose: () => void; onChangeLang: (lang: Lang) => void })`
- `AppHeader({ lang: Lang; onOpenSettings: () => void; showSettings?: boolean })` — star mark + settings button

Flag implementation: use inline SVG or `https://flagcdn.com/w80/gb.png`, `fr.png`, `sa.png` (UK / France / Saudi). Prefer `<img>` with those URLs and proper `alt`.

- [ ] **Step 1: Implement `LanguagePicker`**

Three large tappable options (not dense cards-as-decoration — these are the interaction). Each shows flag + translated language name. Call `onSelect` on click/keyboard Enter.

- [ ] **Step 2: Implement `DayMenu`**

Title from `t(lang,'programTitle')`. Three buttons for days with muscles lines. Include `AppHeader`.

- [ ] **Step 3: Implement `DayDetail`**

Back button. Segmented control / two-option toggle for `underMonth` / `overMonth`. List `getPlaceholderExercises(day, experience)` as `<ul>`.

- [ ] **Step 4: Implement `Settings`**

When `open`, show a simple panel/dialog with the same three language options; selecting calls `onChangeLang` then `onClose`.

- [ ] **Step 5: Visual CSS in `src/index.css`**

- Full-bleed dark athletic atmosphere: deep charcoal base + subtle diagonal steel gradient or gym-floor texture feel (CSS only)
- One clear accent (e.g. electric lime or signal red — pick one and stick to CSS variables)
- At least 2–3 motions: language options fade/rise on load; day buttons slight press scale; toggle slide
- Mobile-first; works on desktop

- [ ] **Step 6: Manual smoke (dev server)**

Run: `npm run dev`  
Check: language screen → day menu → day detail → toggle changes list → settings changes language → RTL for Arabic

- [ ] **Step 7: Commit and push**

```powershell
git add src/components src/index.css index.html
git commit -m "feat: add language, day menu, day detail, and settings UI"
git push
```

---

### Task 6: Wire `App.tsx` + midnight listeners

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/main.tsx` (if needed)
- Delete leftover Vite demo assets (`src/App.css`, `src/assets/react.svg`, etc.)

**Interfaces:**
- App state mirrors `Prefs` + `settingsOpen: boolean`
- On mount: `applyMidnightReset()` then `loadPrefs()`
- Subscribe: `visibilitychange` + `setInterval` every 60s calling `applyMidnightReset`; if `activeDay` cleared, update React state
- If `lang === null` → `LanguagePicker`
- Else if `activeDay === null` → `DayMenu`
- Else → `DayDetail`
- Settings overlay available whenever `lang !== null`

- [ ] **Step 1: Implement App routing**

```tsx
// Core shape — expand with imports and Settings wiring
function App() {
  const [prefs, setPrefs] = useState(() => applyMidnightReset())
  const [settingsOpen, setSettingsOpen] = useState(false)

  useEffect(() => {
    const sync = () => setPrefs(applyMidnightReset())
    const id = window.setInterval(sync, 60_000)
    document.addEventListener('visibilitychange', sync)
    return () => {
      window.clearInterval(id)
      document.removeEventListener('visibilitychange', sync)
    }
  }, [])

  useEffect(() => {
    if (!prefs.lang) return
    document.documentElement.lang = prefs.lang
    document.documentElement.dir = dirFor(prefs.lang)
  }, [prefs.lang])

  // handlers: savePrefs + setPrefs for lang / day / experience
  // render screens...
}
```

- [ ] **Step 2: Run unit tests**

Run: `npm test`
Expected: all PASS

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: success

- [ ] **Step 4: Commit and push**

```powershell
git add -A
git commit -m "feat: wire app screens and midnight GMT+1 navigation reset"
git push
```

---

### Task 7: Final verification against success criteria

**Files:** none new (fix only)

- [ ] **Step 1: Fresh profile check**

Clear site storage → first screen is language flags (UK / France / Saudi).

- [ ] **Step 2: Persistence**

Choose language → reload → day menu (not language picker). Set experience + open Day 2 → reload same GMT+1 day → still Day 2.

- [ ] **Step 3: Midnight simulation**

In DevTools, set `lastGmt1Date` in `workout_prefs_v1` to yesterday → trigger visibility sync or reload → lands on day menu; language + experience unchanged.

- [ ] **Step 4: i18n**

Switch to Arabic in settings → RTL + Arabic strings. French/English LTR.

- [ ] **Step 5: Toggle**

On any day, flip Less/More than a month → list content changes.

- [ ] **Step 6: Confirm Vercel**

After push, open the Vercel deployment URL and repeat Steps 1–2 on mobile width.

- [ ] **Step 7: Commit only if fixes were needed; otherwise done**

---

## Spec coverage self-check

| Spec requirement | Task |
|------------------|------|
| Language picker + flags | 5, 6 |
| Day menu title + 3 boxes + muscles | 5, 6 |
| Day detail + experience toggle + list | 4, 5, 6 |
| Settings language change | 5, 6 |
| Persist language + experience | 2, 6 |
| Midnight GMT+1 clears active day only | 2, 6 |
| en/fr/ar + RTL | 3, 6 |
| Placeholders this phase | 4 |
| Vercel via GitHub push | 1 (`vercel.json`), commits each task |

## Placeholder scan

No TBD/TODO steps; storage, i18n, and placeholder modules include concrete code.

## Type consistency

`Lang`, `Experience`, `DayId`, `Prefs` defined in Task 2 and reused in Tasks 3–6.
