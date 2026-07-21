import type { Lang } from '../lib/storage'
import { t } from '../lib/i18n'

type Props = {
  onSelect: (lang: Lang) => void
}

const options: { lang: Lang; flag: string; nativeLabel: string }[] = [
  { lang: 'en', flag: 'https://flagcdn.com/w80/gb.png', nativeLabel: 'English' },
  { lang: 'fr', flag: 'https://flagcdn.com/w80/fr.png', nativeLabel: 'Français' },
  { lang: 'ar', flag: 'https://flagcdn.com/w80/sa.png', nativeLabel: 'العربية' },
]

export function LanguagePicker({ onSelect }: Props) {
  return (
    <section className="screen language-screen">
      <p className="star-mark language-star" aria-hidden="true">
        ★
      </p>
      <h1 className="screen-title rise">{t('en', 'chooseLanguage')}</h1>
      <div className="lang-grid">
        {options.map((opt, i) => (
          <button
            key={opt.lang}
            type="button"
            className="lang-option rise"
            style={{ animationDelay: `${0.08 * (i + 1)}s` }}
            onClick={() => onSelect(opt.lang)}
          >
            <img src={opt.flag} alt="" width={64} height={48} className="flag" />
            <span>{opt.nativeLabel}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
