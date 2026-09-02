import { site } from '../data'

export default function Contact() {
  const p = site.profile
  return (
    <section className="section contact" id="contact">
      <div className="container">
        <h2 className="section__title">联系我 <span className="section__title-en">Contact</span></h2>
        <p className="contact__text">如果你对我感兴趣，欢迎通过以下方式找到我 👇</p>
        <div className="contact__socials">
          {p.socials.map((s) => (
            <a key={s.name} className="social-pill" style={{ background: s.color }} href={s.url} target="_blank" rel="noopener noreferrer">
              {s.name}
            </a>
          ))}
        </div>
        <p className="contact__email">📧 {p.email}</p>
      </div>
    </section>
  )
}
