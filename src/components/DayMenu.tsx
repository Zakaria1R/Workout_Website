import type { DayId, Lang } from '../lib/storage'
import { t } from '../lib/i18n'
import { AppHeader } from './AppHeader'

type Props = {
  lang: Lang
  onOpenDay: (day: DayId) => void
  onOpenSettings: () => void
}

const days: { id: DayId; dayKey: 'day1' | 'day2' | 'day3'; muscleKey: 'muscles1' | 'muscles2' | 'muscles3' }[] =
  [
    { id: 1, dayKey: 'day1', muscleKey: 'muscles1' },
    { id: 2, dayKey: 'day2', muscleKey: 'muscles2' },
    { id: 3, dayKey: 'day3', muscleKey: 'muscles3' },
  ]

export function DayMenu({ lang, onOpenDay, onOpenSettings }: Props) {
  return (
    <section className="screen day-menu">
      <AppHeader lang={lang} onOpenSettings={onOpenSettings} />
      <h1 className="screen-title rise">{t(lang, 'programTitle')}</h1>
      <div className="day-grid">
        {days.map((day, i) => (
          <button
            key={day.id}
            type="button"
            className="day-box"
            style={{ animationDelay: `${0.06 * (i + 1)}s` }}
            onClick={() => onOpenDay(day.id)}
          >
            <span className="day-label">{t(lang, day.dayKey)}</span>
            <span className="day-muscles">{t(lang, day.muscleKey)}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
