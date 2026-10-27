import { site } from '../data'
import Reveal from './Reveal'

const ps = site.projectSite

export default function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <h2 className="section__title">项目作品 <span className="section__title-en">Projects</span></h2>
        <p className="section__sub">
          <strong>{ps.name}</strong> —— {ps.desc}
        </p>

        <div className="project-links">
          {/* Big Picture：链接卡片 */}
          <Reveal className="project-feature">
            <div className="project-feature__body">
              <span className="project-feature__tag">📊 链接</span>
              <h3>{ps.bigPicture.title}</h3>
              <p>{ps.bigPicture.desc}</p>
              <a className="btn btn--primary" href={ps.bigPicture.url} target="_blank" rel="noopener noreferrer">
                打开 Big Picture ↗
              </a>
            </div>
          </Reveal>

          {/* Interactive：内嵌展示（可关闭嵌入，改为纯链接） */}
          {ps.interactive.embed && (
            <Reveal className="project-feature">
              <div className="project-feature__head">
                <span className="project-feature__tag">🕹 内嵌</span>
                <h3>{ps.interactive.title}</h3>
                <a href={ps.interactive.url} target="_blank" rel="noopener noreferrer">
                  新窗口打开 ↗
                </a>
              </div>
              <div className="project-frame">
                <span className="project-frame__loading">加载中…（数据较多时可能稍慢）</span>
                <iframe
                  src={ps.interactive.url}
                  title={ps.interactive.title}
                  loading="lazy"
                />
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}