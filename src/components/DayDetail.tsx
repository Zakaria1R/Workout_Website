import { useState } from 'react'
import type { DayId, Experience, Lang } from '../lib/storage'
import { t, type MessageKey } from '../lib/i18n'
import { getWorkoutCategories, type WorkoutExercise } from '../lib/workoutContent'
import { AppHeader } from './AppHeader'
import { VideoModal } from './VideoModal'
import { SetSchemeDisplay } from './SetSchemeDisplay'

type Props = {
  lang: Lang
  day: DayId
  experience: Experience
  onExperience: (e: Experience) => void
  onBack: () => void
  onOpenSettings: () => void
}

function exerciseTitle(lang: Lang, titleKey: string): string {
  if (titleKey.startsWith('placeholder:')) {
    return titleKey.replace('placeholder:', 'Coming soon · ')
  }
  return t(lang, titleKey as MessageKey)
}

export function DayDetail({
  lang,
  day,
  experience,
  onExperience,
  onBack,
  onOpenSettings,
}: Props) {
  const categories = getWorkoutCategories(day, experience)
  const dayKey = (`day${day}` as 'day1' | 'day2' | 'day3')
  const [active, setActive] = useState<WorkoutExercise | null>(null)

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

      <div className="category-stack" key={`${day}-${experience}`}>
        {categories.map((cat) => (
          <section key={cat.id} className="category-block">
            <h2 className="category-title">{exerciseTitle(lang, cat.titleKey)}</h2>
            <div className="exercise-grid">
              {cat.exercises.map((ex) => {
                const title = exerciseTitle(lang, ex.titleKey)
                const playable = Boolean(ex.youtubeId)
                return (
                  <button
                    key={ex.id}
                    type="button"
                    className="exercise-box"
                    disabled={!playable}
                    onClick={() => playable && setActive(ex)}
                  >
                    <span className="exercise-box-title">{title}</span>
                    {ex.scheme && <SetSchemeDisplay scheme={ex.scheme} />}
                  </button>
                )
              })}
            </div>
          </section>
        ))}
      </div>

      {active && (
        <VideoModal
          youtubeId={active.youtubeId}
          title={exerciseTitle(lang, active.titleKey)}
          closeLabel={t(lang, 'close')}
          onClose={() => setActive(null)}
        />
      )}
    </section>
  )
}
