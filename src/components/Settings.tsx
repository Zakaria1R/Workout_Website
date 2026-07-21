import type { Lang } from '../lib/storage'
import { t } from '../lib/i18n'

type Props = {
  lang: Lang
  open: boolean
  onClose: () => void
  onChangeLang: (lang: Lang) => void
}

const options: { lang: Lang; flag: string; labelKey: 'langEn' | 'langFr' | 'langAr' }[] = [
  { lang: 'en', flag: 'https://flagcdn.com/w80/gb.png', labelKey: 'langEn' },
  { lang: 'fr', flag: 'https://flagcdn.com/w80/fr.png', labelKey: 'langFr' },
  { lang: 'ar', flag: 'https://flagcdn.com/w80/sa.png', labelKey: 'langAr' },
]

export function Settings({ lang, open, onClose, onChangeLang }: Props) {
  if (!open) return null

  return (
    <div className="settings-backdrop" role="presentation" onClick={onClose}>
      <div
        className="settings-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="settings-head">
          <h2 id="settings-title">{t(lang, 'settingsTitle')}</h2>
          <button type="button" className="ghost-btn" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="lang-grid settings-langs">
          {options.map((opt) => (
            <button
              key={opt.lang}
              type="button"
              className={opt.lang === lang ? 'lang-option active' : 'lang-option'}
              onClick={() => {
                onChangeLang(opt.lang)
                onClose()
              }}
            >
              <img src={opt.flag} alt="" width={56} height={42} className="flag" />
              <span>{t(lang, opt.labelKey)}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
