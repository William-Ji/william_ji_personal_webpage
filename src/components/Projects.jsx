import { useEffect, useState } from 'react'
import { site } from '../data'
import Reveal from './Reveal'

export default function Projects() {
  const [projects, setProjects] = useState(site.projects)

  useEffect(() => {
    const gh = site.github
    if (!gh.autoFetch || !gh.username || gh.username === '你的用户名') return
    fetch(`https://api.github.com/users/${gh.username}/repos?sort=updated&per_page=6`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((repos) => {
        const mapped = repos
          .filter((r) => !r.fork)
          .map((r) => ({
            title: r.name,
            desc: r.description || 'GitHub 仓库',
            tags: [r.language].filter(Boolean),
            link: r.html_url
          }))
        if (mapped.length) setProjects(mapped)
      })
      .catch(() => {})
  }, [])

  const mp = site.masterProjects

  return (
    <section className="section" id="projects">
      <div className="container">
        <h2 className="section__title">项目经历 <span className="section__title-en">Projects</span></h2>
        <p className="section__sub">大学期间的小组作业（GitHub 可见）。</p>
        <div className="projects">
          {projects.map((pr, i) => (
            <Reveal className="project-card" key={i}>
              <h3>{pr.title}</h3>
              <p>{pr.desc}</p>
              <div className="tags">{(pr.tags || []).map((t) => <span className="tag" key={t}>{t}</span>)}</div>
              {pr.link && <a href={pr.link} target="_blank" rel="noopener noreferrer">GitHub ↗</a>}
            </Reveal>
          ))}
        </div>

        <h3 className="projects__subtitle">
          🎓 硕士项目
          <span className="badge">{mp.ready ? '已上线' : '敬请期待'}</span>
        </h3>
        <p className="section__sub">{mp.note}</p>
        <div className="projects projects--coming">
          {mp.items.map((it, i) => (
            <div className="project-card" key={i}>
              <div className="coming-icon">🔭</div>
              <h3>{it.title}</h3>
              <span className="tag">{it.status}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
