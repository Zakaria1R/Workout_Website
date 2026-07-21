import { useEffect } from 'react'
import { youtubeEmbedUrl } from '../lib/workoutContent'

type Props = {
  youtubeId: string
  title: string
  closeLabel: string
  onClose: () => void
}

export function VideoModal({ youtubeId, title, closeLabel, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  return (
    <div className="video-backdrop" role="presentation" onClick={onClose}>
      <div
        className="video-modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="video-modal-head">
          <h2 className="video-modal-title">{title}</h2>
          <button type="button" className="ghost-btn" onClick={onClose}>
            {closeLabel}
          </button>
        </div>
        <div className="video-frame-wrap">
          <iframe
            className="video-frame"
            src={youtubeEmbedUrl(youtubeId)}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}
