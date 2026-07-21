import type { DayId, Experience, Lang } from '../lib/storage'
import { t } from '../lib/i18n'
import { getPlaceholderExercises } from '../lib/placeholders'
import { AppHeader } from './AppHeader'

type Props = {
  lang: Lang
  day: DayId
  experience: Experience
  onExperience: (e: Experience) => void
  onBack: () => void
  onOpenSettings: () => void
}

export function DayDetail({
  lang,
  day,
  experience,
  onExperience,
  onBack,
  onOpenSettings,
}: Props) {
  const exercises = getPlaceholderExercises(day, experience)
  const dayKey = (`day${day}` as 'day1' | 'day2' | 'day3')

  return (
    <section className="screen day-detail">
      <AppHeader lang={lang} onOpenSettings={onOpenSettings} />
      <div className="detail-top">
        <button type="button" className="ghost-btn" onClick={onBack}>
          ← {t(lang, 'back')}
        </button>
        <h1 className="screen-title">{t(lang, dayKey)}</h1>
      </div>

      <div className="experience-toggle" role="group" aria-label="Experience">
        <button
          type="button"
          className={experience === 'under_month' ? 'toggle-opt active' : 'toggle-opt'}
          onClick={() => onExperience('under_month')}
        >
          {t(lang, 'underMonth')}
        </button>
        <button
          type="button"
          className={experience === 'over_month' ? 'toggle-opt active' : 'toggle-opt'}
          onClick={() => onExperience('over_month')}
        >
          {t(lang, 'overMonth')}
        </button>
      </div>

      <h2 className="list-heading">{t(lang, 'exercisesHeading')}</h2>
      <ul className="exercise-list" key={`${day}-${experience}`}>
        {exercises.map((name) => (
          <li key={name} className="exercise-item">
            {name}
          </li>
        ))}
      </ul>
    </section>
  )
}
