import { site } from '../data'
import Reveal from './Reveal'

const ps = site.projectSite

function EmbedCard({ data, tag }) {
  return (
    <Reveal className="project-feature">
      <div className="project-feature__head">
        <span className="project-feature__tag">{tag}</span>
        <h3>{data.title}</h3>
        <a href={data.url} target="_blank" rel="noopener noreferrer">
          新窗口打开 ↗
        </a>
      </div>
      <div className="project-frame">
        <span className="project-frame__loading">加载中…</span>
        <iframe src={data.url} title={data.title} loading="lazy" />
      </div>
    </Reveal>
  )
}

export default function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <h2 className="section__title">项目作品 <span className="section__title-en">Projects</span></h2>
        <p className="section__sub">
          <strong>{ps.name}</strong> —— {ps.desc}
        </p>

        <div className="project-links">
          <EmbedCard data={ps.analysis} tag="📝 内嵌" />
          <EmbedCard data={ps.interactive} tag="🕹 内嵌" />
        </div>
      </div>
    </section>
  )
}