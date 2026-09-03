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
  { top: 18, left: 26, rot: -5, scale: 1.08 },
  { top: 30, left: 54, rot: 4, scale: 1.0 },
  { top: 12, left: 62, rot: -2, scale: 0.94 },
  { top: 46, left: 24, rot: 6, scale: 0.98 },
  { top: 56, left: 54, rot: -7, scale: 0.9 },
  { top: 38, left: 42, rot: 2, scale: 1.0 },
  { top: 68, left: 32, rot: -4, scale: 1.0 },
  { top: 78, left: 54, rot: 5, scale: 0.92 },
  { top: 24, left: 8, rot: 7, scale: 0.95 },
  { top: 50, left: 72, rot: -3, scale: 0.9 }
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