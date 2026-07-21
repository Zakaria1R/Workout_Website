import { useEffect, useState } from 'react'
import {
  applyMidnightReset,
  savePrefs,
  type DayId,
  type Experience,
  type Lang,
  type Prefs,
} from './lib/storage'
import { dirFor } from './lib/i18n'
import { LanguagePicker } from './components/LanguagePicker'
import { DayMenu } from './components/DayMenu'
import { DayDetail } from './components/DayDetail'
import { Settings } from './components/Settings'

function App() {
  const [prefs, setPrefs] = useState<Prefs>(() => applyMidnightReset())
  const [settingsOpen, setSettingsOpen] = useState(false)

  useEffect(() => {
    const sync = () => setPrefs(applyMidnightReset())
    const id = window.setInterval(sync, 60_000)
    document.addEventListener('visibilitychange', sync)
    return () => {
      window.clearInterval(id)
      document.removeEventListener('visibilitychange', sync)
    }
  }, [])

  useEffect(() => {
    if (!prefs.lang) {
      document.documentElement.lang = 'en'
      document.documentElement.dir = 'ltr'
      return
    }
    document.documentElement.lang = prefs.lang
    document.documentElement.dir = dirFor(prefs.lang)
  }, [prefs.lang])

  const update = (partial: Partial<Prefs>) => {
    setPrefs(savePrefs(partial))
  }

  const onSelectLang = (lang: Lang) => update({ lang })
  const onOpenDay = (day: DayId) => update({ activeDay: day })
  const onBack = () => update({ activeDay: null })
  const onExperience = (experience: Experience) => update({ experience })

  return (
    <div className="app-shell">
      {!prefs.lang ? (
        <LanguagePicker onSelect={onSelectLang} />
      ) : prefs.activeDay === null ? (
        <DayMenu
          lang={prefs.lang}
          onOpenDay={onOpenDay}
          onOpenSettings={() => setSettingsOpen(true)}
        />
      ) : (
        <DayDetail
          lang={prefs.lang}
          day={prefs.activeDay}
          experience={prefs.experience}
          onExperience={onExperience}
          onBack={onBack}
          onOpenSettings={() => setSettingsOpen(true)}
        />
      )}

      {prefs.lang && (
        <Settings
          lang={prefs.lang}
          open={settingsOpen}
          onClose={() => setSettingsOpen(false)}
          onChangeLang={onSelectLang}
        />
      )}
    </div>
  )
}

export default App
