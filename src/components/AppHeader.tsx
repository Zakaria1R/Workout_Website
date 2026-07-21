import type { Lang } from '../lib/storage'
import { t } from '../lib/i18n'

type Props = {
  lang: Lang
  onOpenSettings: () => void
  showSettings?: boolean
}

export function AppHeader({ lang, onOpenSettings, showSettings = true }: Props) {
  return (
    <header className="app-header">
      <span className="star-mark" aria-hidden="true">
        ★
      </span>
      {showSettings ? (
        <button type="button" className="ghost-btn" onClick={onOpenSettings}>
          {t(lang, 'settings')}
        </button>
      ) : (
        <span className="header-spacer" />
      )}
    </header>
  )
}
