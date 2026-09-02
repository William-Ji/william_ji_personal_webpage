import { useEffect, useState } from 'react'
import { site } from '../data'

function useTypewriter(words) {
  const [text, setText] = useState('')
  useEffect(() => {
    let wi = 0
    let ci = 0
    let deleting = false
    let timer

    const tick = () => {
      const w = words[wi]
      if (!deleting) {
        ci += 1
        if (ci === w.length) {
          deleting = true
          timer = setTimeout(tick, 1200)
        } else {
          timer = setTimeout(tick, 90)
        }
      } else {
        ci -= 1
        if (ci === 0) {
          deleting = false
          wi = (wi + 1) % words.length
          timer = setTimeout(tick, 300)
        } else {
          timer = setTimeout(tick, 45)
        }
      }
      setText(w.slice(0, ci))
    }

    timer = setTimeout(tick, 300)
    return () => clearTimeout(timer)
  }, [words])

  return text
}

export default function Hero() {
  const p = site.profile
  const typed = useTypewriter(p.typewriter)

  return (
    <section className="hero" id="home">
      <div className="hero__bg">
        <span className="blob blob--1"></span>
        <span className="blob blob--2"></span>
        <span className="blob blob--3"></span>
        <span className="ring ring--1"></span>
        <span className="ring ring--2"></span>
      </div>
      <div className="hero__content">
        <p className="hero__hello">👋 你好，我是</p>
        <h1 className="hero__name">{p.name}</h1>
        <p className="hero__role">{p.role}</p>
        <p className="hero__type">
          我热衷于 <span className="typewriter">{typed}</span><span className="caret">|</span>
        </p>
        <div className="hero__highlights">
          {p.highlights.map((h) => (
            <span className="highlight" key={h.label}>{h.icon} {h.label}</span>
          ))}
        </div>
        <div className="hero__actions">
          <a href="#projects" className="btn btn--primary">看看我的作品 ↓</a>
          <a href="#resume" className="btn btn--ghost">📄 查看简历</a>
        </div>
        <div className="hero__socials">
          {p.socials.map((s) => (
            <a key={s.name} className="social-pill" style={{ background: s.color }} href={s.url} target="_blank" rel="noopener noreferrer">
              {s.name}
            </a>
          ))}
        </div>
      </div>
      <a href="#about" className="hero__scroll" aria-label="向下滚动">⌄</a>
    </section>
  )
}
