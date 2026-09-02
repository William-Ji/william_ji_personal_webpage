import { useEffect, useState } from 'react'
import { site } from '../data'

export default function Gallery() {
  const cats = site.photoCategories
  const [cat, setCat] = useState('全部')
  const [lightbox, setLightbox] = useState(null)

  const list = cat === '全部' ? site.photos : site.photos.filter((p) => p.category === cat)

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e) => { if (e.key === 'Escape') setLightbox(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])

  return (
    <section className="section section--alt" id="gallery">
      <div className="container">
        <h2 className="section__title">照片画廊 <span className="section__title-en">Gallery</span></h2>
        <p className="section__sub">目前还是糖水片 :)</p>
        <div className="gallery__filters">
          {cats.map((c) => (
            <button
              key={c}
              className={`filter-btn ${cat === c ? 'active' : ''}`}
              onClick={() => setCat(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="gallery">
          {list.map((ph) => (
            <div className="gallery__item" key={ph.src} onClick={() => setLightbox(ph)}>
              <img src={ph.src} alt={ph.title} loading="lazy" />
              <div className="gallery__overlay"><span>{ph.title}</span></div>
            </div>
          ))}
        </div>
      </div>

      {lightbox && (
        <div className="lightbox open" onClick={() => setLightbox(null)}>
          <button className="lightbox__close" onClick={() => setLightbox(null)} aria-label="关闭">✕</button>
          <img className="lightbox__img" src={lightbox.src} alt={lightbox.title} />
          <p className="lightbox__caption">{lightbox.title}</p>
        </div>
      )}
    </section>
  )
}