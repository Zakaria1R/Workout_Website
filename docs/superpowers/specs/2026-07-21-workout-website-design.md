# 3-Day Workout Website — Design Spec

**Date:** 2026-07-21  
**Status:** Approved for implementation planning  
**Stack:** Vite + React (static deploy on Vercel)

## Goal

A multilingual workout helper that guides users through a 3-day program. Language and experience level persist in the browser. Navigation to a specific day resets to the day menu at midnight GMT+1.

## Screens

### 1. Language picker (first visit only, until language is set)

Three selectable options with flags:

| Language | Flag |
|----------|------|
| English  | United Kingdom |
| French   | France |
| Arabic   | Saudi Arabia |

Choosing a language saves it and continues to the day menu. No separate brand name; an optional small star mark may appear in the header later.

### 2. Day menu (main menu)

- Title: **3-Day Workout Program** (translated)
- Three clickable boxes:

| Day | Muscle focus |
|-----|----------------|
| Day 1 | Chest · Triceps · Shoulders |
| Day 2 | Back · Biceps · Core |
| Day 3 | Lower body |

### 3. Day detail

- Header with back control to the day menu
- Experience toggle (two options):
  - Less than a month
  - More than a month
- Exercise list below the toggle
- **This phase:** list shows placeholders that change when the toggle flips; real exercise content comes in a later pass

Day 1, Day 2, and Day 3 all use the same layout pattern.

### 4. Settings

Accessible from day menu and day detail. Lets the user change language at any time without clearing experience level or forcing a remount of other prefs beyond re-rendering translations / RTL.

## Persistence (`localStorage`)

| Key purpose | Behavior |
|-------------|----------|
| Language (`en` / `fr` / `ar`) | Persists across visits and midnight |
| Experience (`under_month` / `over_month`) | Persists; user can toggle anytime |
| Active day view (`1` / `2` / `3` / none) | Cleared when the GMT+1 calendar date changes |
| Last seen GMT+1 date (`YYYY-MM-DD`) | Used to detect midnight rollover |

## Midnight GMT+1 reset

1. Compute “today” as the calendar date in **GMT+1** (Africa/Lagos / Europe/Paris style offset; use a fixed `+01:00` or `Europe/Paris` without relying on DST unless later specified — **decision: use UTC+1 fixed offset** so “midnight” is unambiguous year-round).
2. On app load (and on an interval or `visibilitychange`), if stored date ≠ current GMT+1 date:
   - Clear active day view → show day menu
   - Update stored date
   - Keep language and experience level

## Internationalization

- All user-facing strings via a small translation map (`en`, `fr`, `ar`)
- Arabic: `dir="rtl"` on the document root
- French / English: `dir="ltr"`

## Architecture (units)

| Unit | Responsibility |
|------|----------------|
| `storage` | Read/write prefs; midnight date check |
| `i18n` | Translations + `dir` |
| `LanguagePicker` | First-run language selection |
| `DayMenu` | Title + three day boxes |
| `DayDetail` | Toggle + placeholder list |
| `Settings` | Language change |
| `App` | Screen routing based on stored state |

No backend. No auth. Client-only.

## Out of scope (later)

- Real exercise content, sets/reps, videos
- Accounts, cloud sync, analytics
- Push notifications
- Brand identity beyond optional star mark

## Success criteria

- First visit shows language flags; later visits skip to day menu (language remembered)
- Day boxes navigate to day detail with working experience toggle and distinct placeholder lists
- Settings can change language; Arabic is RTL
- After GMT+1 date change, user lands on day menu with language + experience intact
- Deployed via GitHub → Vercel on push
