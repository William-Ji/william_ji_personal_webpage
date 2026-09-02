import { site } from '../data'

export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} {site.profile.name} · 用 ♥ 和 React 搭建</p>
    </footer>
  )
}
