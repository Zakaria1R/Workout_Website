import type { Lang } from '../lib/storage'
import { schemeSetCount, type SetScheme } from '../lib/workoutContent'
import { t } from '../lib/i18n'

type Props = {
  scheme: SetScheme
  lang: Lang
}

/** Set cards: label + target (reps / MAX). Bars only when load progresses. */
export function SetSchemeDisplay({ scheme, lang }: Props) {
  const count = schemeSetCount(scheme)

  return (
    <div className="set-scheme" role="group">
      {Array.from({ length: count }, (_, index) => {
        const setNumber = index + 1
        const weightLevel =
          scheme.kind === 'reps' && scheme.progressiveLoad ? index + 1 : 0

        let value: string
        let valueClass = 'set-reps'
        if (scheme.kind === 'reps') {
          value = String(scheme.reps[index])
        } else if (scheme.kind === 'max_time') {
          value = `⏱ ${t(lang, 'maxLabel')}`
          valueClass = 'set-reps set-reps-max'
        } else {
          value = t(lang, 'maxLabel')
          valueClass = 'set-reps set-reps-max'
        }

        return (
          <div key={setNumber} className="set-cell">
            <span className="set-num">
              {t(lang, 'setLabel')} {setNumber}
            </span>
            <span className={valueClass}>{value}</span>
            {weightLevel > 0 && (
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
