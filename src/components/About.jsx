import { site } from '../data'
import Reveal from './Reveal'

// 在段落中把高亮关键词包成 <span class="hl">
function renderHighlighted(text, keywords) {
  if (!keywords || !keywords.length) return text
  const pattern = new RegExp(`(${keywords.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g')
  const parts = text.split(pattern)
  return parts.map((part, i) =>
    keywords.includes(part) ? <span className="hl" key={i}>{part}</span> : <span key={i}>{part}</span>
  )
}

// 技能泡泡的自然分布坐标（top/left %、旋转°、缩放）
const bubbleLayout = [
  { top: 4, left: 12, rot: -5, scale: 1.18 },
  { top: 16, left: 58, rot: 4, scale: 1.06 },
  { top: 0, left: 72, rot: -2, scale: 0.96 },
  { top: 42, left: 6, rot: 6, scale: 1.02 },
  { top: 52, left: 64, rot: -7, scale: 0.92 },
  { top: 34, left: 40, rot: 2, scale: 1.0 },
  { top: 62, left: 26, rot: -4, scale: 1.04 },
  { top: 70, left: 56, rot: 5, scale: 0.94 },
  { top: 12, left: 2, rot: 7, scale: 1.0 },
  { top: 46, left: 82, rot: -3, scale: 0.9 }
]

export default function About() {
  const a = site.about
  return (
    <section className="section" id="about">
      <div className="container">
        <h2 className="section__title">关于我 <span className="section__title-en">About</span></h2>
        <div className="about">
          <Reveal className="about__text">
            {a.paragraphs.map((t, i) => <p key={i}>{renderHighlighted(t, a.highlights)}</p>)}
          </Reveal>
          <Reveal className="about__skills">
            <h3>技能</h3>
            <div className="skill-bubbles">
              {a.skills.map((s, i) => {
                const b = bubbleLayout[i] || { top: 50, left: 50, rot: 0, scale: 1 }
                return (
                  <span
                    key={s}
                    className="skill-bubble"
                    style={{
                      top: `${b.top}%`,
                      left: `${b.left}%`,
                      transform: `translate(-50%, -50%) rotate(${b.rot}deg) scale(${b.scale})`
                    }}
                  >
                    {s}
                  </span>
                )
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}