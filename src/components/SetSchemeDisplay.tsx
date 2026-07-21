import type { SetScheme } from '../lib/workoutContent'

type Props = {
  scheme: SetScheme
}

/** Organized set × reps grid. Ascending bars = heavier weight each set. */
export function SetSchemeDisplay({ scheme }: Props) {
  return (
    <div className="set-scheme" role="group">
      {scheme.reps.map((reps, index) => {
        const setNumber = index + 1
        const weightLevel = scheme.progressiveLoad ? index + 1 : 1
        return (
          <div key={setNumber} className="set-cell">
            <span className="set-num">{setNumber}</span>
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
