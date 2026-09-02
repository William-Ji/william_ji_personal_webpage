import { useEffect, useState } from 'react'
import { site } from '../data'
import Reveal from './Reveal'

export default function Videos() {
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (!active) return
    const onKey = (e) => { if (e.key === 'Escape') setActive(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])

  return (
    <section className="section" id="videos">
      <div className="container">
        <h2 className="section__title">视频作品 <span className="section__title-en">Videos</span></h2>
        <p className="section__sub">在 B 站持续创作的内容，点击卡片可播放。</p>
        <div className="videos">
          {site.videos.map((v) => (
            <Reveal className="video-card" key={v.bvid} onClick={() => setActive(v)}>
              <div className="video-card__thumb">
                <img src={v.cover} alt={v.title} loading="lazy" />
                <div className="video-card__play"><span>▶</span></div>
              </div>
              <div className="video-card__body">
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {active && (
        <div className="modal open" onClick={() => setActive(null)}>
          <div className="modal__mask"></div>
          <div className="modal__box" onClick={(e) => e.stopPropagation()}>
            <button className="modal__close" onClick={() => setActive(null)} aria-label="关闭">✕</button>
            <h3 className="modal__title">{active.title}</h3>
            <div className="modal__player">
              {active.bvid ? (
                <iframe
                  src={`https://player.bilibili.com/player.html?bvid=${active.bvid}&page=1&high_quality=1&danmaku=0`}
                  title={active.title}
                  allowFullScreen
                  scrolling="no"
                  frameBorder="0"
                />
              ) : (
                <div className="modal__empty">🎬 这里会播放你的 B 站视频<br />请在 src/data.js 里填入 bvid</div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
