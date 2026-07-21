import type { Lang } from '../lib/storage'
import type { SetScheme } from '../lib/workoutContent'
import { t } from '../lib/i18n'

type Props = {
  scheme: SetScheme
  lang: Lang
}

/** Set cards: label, reps, ascending bars = heavier each set. */
export function SetSchemeDisplay({ scheme, lang }: Props) {
  return (
    <div className="set-scheme" role="group">
      {scheme.reps.map((reps, index) => {
        const setNumber = index + 1
        const weightLevel = scheme.progressiveLoad ? index + 1 : 1
        return (
          <div key={setNumber} className="set-cell">
            <span className="set-num">
              {t(lang, 'setLabel')} {setNumber}
            </span>
            <span className="set-reps">{reps}</span>
            {scheme.progressiveLoad && (
              <span className="set-load" aria-hidden="true">
                {Array.from({ length: weightLevel }, (_, i) => (
                  <span key={i} className="set-load-bar" />
                ))}
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}
