import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { site } from '../data'

const links = [
  { href: '#about', label: '关于我' },
  { href: '#education', label: '教育' },
  { href: '#videos', label: '视频' },
  { href: '#gallery', label: '照片' },
  { href: '#projects', label: '项目' },
  { href: '#resume', label: '简历' },
  { href: '#contact', label: '联系' }
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)
  const linksRef = useRef([])
  const indicatorRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = [...document.querySelectorAll('section[id]')]
      let current = ''
      sections.forEach((sec) => {
        if (window.scrollY >= sec.offsetTop - 120) current = sec.id
      })
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 滑动指示器：跟随当前激活的导航项，带弹性跳动
  const moveIndicator = () => {
    const idx = links.findIndex((l) => l.href.slice(1) === active)
    const el = idx >= 0 ? linksRef.current[idx] : null
    const ind = indicatorRef.current
    if (!ind) return
    if (el) {
      ind.style.opacity = '1'
      ind.style.width = `${el.offsetWidth}px`
      ind.style.transform = `translateX(${el.offsetLeft}px)`
    } else {
      ind.style.opacity = '0'
    }
  }
  useLayoutEffect(() => {
    moveIndicator()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])
  useEffect(() => {
    const onResize = () => moveIndicator()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav__inner">
        <a href="#home" className="nav__logo">✦ {site.profile.name}</a>
        <nav className={`nav__links ${open ? 'open' : ''}`}>
          <span ref={indicatorRef} className="nav__indicator" aria-hidden="true"></span>
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              ref={(el) => (linksRef.current[i] = el)}
              className={active === l.href.slice(1) ? 'active' : ''}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#resume" className="nav__cta">下载简历</a>
        <button className="nav__burger" aria-label="菜单" onClick={() => setOpen((v) => !v)}>
          <span></span><span></span><span></span>
</button>
      </div>
    </header>
  )
}