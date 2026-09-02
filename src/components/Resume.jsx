import { useState } from 'react'
import { site } from '../data'

export default function Resume() {
  const r = site.resume
  const p = site.profile
  const [lang, setLang] = useState('zh')
  const data = r[lang]

  return (
    <section className="section section--alt" id="resume">
      <div className="container container--narrow">
        <h2 className="section__title">简历 <span className="section__title-en">Resume</span></h2>
        <div className="resume">
          <div className="resume__head">
            <div>
              <h3>{p.name}</h3>
              <p>{p.role}</p>
            </div>
            <div className="resume__head-right">
              <div className="lang-tabs" role="tablist">
                <button
                  className={`lang-tab ${lang === 'en' ? 'active' : ''}`}
                  onClick={() => setLang('en')}
                  role="tab"
                  aria-selected={lang === 'en'}
                >English</button>
                <button
                  className={`lang-tab ${lang === 'zh' ? 'active' : ''}`}
                  onClick={() => setLang('zh')}
                  role="tab"
                  aria-selected={lang === 'zh'}
                >中文</button>
              </div>
              <button className="btn btn--primary" onClick={() => window.print()}>⬇ 导出 PDF / 打印</button>
            </div>
          </div>
          <p className="resume__summary">{data.summary}</p>
          <div className="resume__experience">
            {data.experience.map((ex, i) => (
              <div className="resume__exp" key={i}>
                <h5>{ex.role}</h5>
                <div className="org">{ex.org}</div>
                <div className="period">{ex.period}</div>
                <ul>{ex.points.map((pt, j) => <li key={j}>{pt}</li>)}</ul>
              </div>
            ))}
          </div>
          <div className="resume__awards-section">
            <h4>荣誉 / Awards</h4>
            <ul className="resume__awards">
              {data.awards.map((a, i) => <li key={i}>{a}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}