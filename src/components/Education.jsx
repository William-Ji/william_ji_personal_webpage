import { site } from '../data'
import Reveal from './Reveal'

export default function Education() {
  return (
    <section className="section section--alt" id="education">
      <div className="container">
        <h2 className="section__title">教育背景 <span className="section__title-en">Education</span></h2>
        <div className="timeline">
          {site.education.map((e, i) => (
            <Reveal className="timeline__item" key={i}>
              <span className="timeline__degree">{e.degree}</span>
              <h3>{e.school}</h3>
              <div className="major">{e.major}</div>
              <div className="period">{e.period}</div>
              <p>{e.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
