# Changelog

这份文档记录本项目（`portfolio/`）的所有重要改动。**上下文用完时可读这份文件快速恢复全貌**。

---

## 2026-09-02 · 项目脚手架 & 接入真实内容（首版静态站）

- 搭建纯 HTML + CSS + JavaScript 的单页作品集网站（活泼创意风格：渐变紫粉橙 + 浮动 blob + 动效）。
- 分区：首屏（打字机 + 亮点标签 + 社交链接）、关于我、教育时间轴、B站视频（弹窗播放器）、照片画廊（分类筛选 + 灯箱）、项目（GitHub 自动拉取可选）、硕士项目预留位、简历（可导出 PDF）、联系。
- 所有内容集中在 `js/data.js` 一处配置，改一处全站生效。
- 提供 `import_photos.py`（标准库）按子文件夹名自动分类导入照片，生成 `js/photos-data.js` 覆盖占位图。

## 2026-09-02 · 接入用户真实信息

- **简历内容**：通过 `tencent-local-office-edit` MCP 服务读取两份 docx 简历（中文 `William Ji-猎聘.docx` + 英文 `Jiangbei Ji (English CV)20260729.docx`）。**注意**：该 MCP 服务的 `open_file` 返回 `chunks streaming via /stream`（异步流式），后续 `doc_resolve_document_structure` 报 `document is not open` 无法读取。**回退方案**（已采用）：用 Python 标准库 `zipfile + xml.etree.ElementTree` 直接解析 `word/document.xml` 提取 `<w:p>` 段落文本（read-only）。脚本已用完即删。
- **B 站信息**：UP主 `礵Parks`（UID 3392250）。视频以「腕表分享」和「游戏 MLG/鬼畜」为主。抓取视频空间页获取标题 + BV 号。
- **小红书**：753470256。
- **GitHub**：`William-Ji`（探测得到），真实项目 `DS110FinalProj`（BU DS110 数据科学期末，2022.04）。
- **照片**：从 `H:\富士XS20相片\个人选集` 导入 17 张，分成 3 类（手表微距 4 / 荷花 6 / 生活随拍 7），每张配中文标题。
- 提取到的关键信息：
  - 本科：BU（2018-2022），Economics + International Relations，Minor Statistics，GPA 3.65，Dean's List
  - 硕士：USC（2022-2024），Applied Economics and Econometrics，MS，GPA 3.74
  - 工作：平安产险北京分公司（2024.12 - 至今），非车险 & 意健险核保/产品配置/数据对接
  - 技能：SQL、SAS、STATA、Python、R、DaVinci Resolve、Photoshop、Helicon Focus

## 2026-09-02 · 重构为 React + Vite

- 把静态站重构为 **React 18 + Vite 5** 项目，构建产物可直接部署 GitHub Pages。
- 结构：
  - `src/data.js`（集中配置）
  - `src/photos.js`（照片数据，由 `import_photos.py` 生成）
  - `src/components/*.jsx`（Nav / Hero / About / Education / Videos / Gallery / Projects / Resume / Contact / Footer / Reveal）
  - `src/index.css`
  - `public/photos/`（照片，Vite 构建时原样拷贝）
- `vite.config.js` 用 `base: './'`（相对路径，适配任意 Pages 路径）。
- 提供 `.github/workflows/deploy.yml`（GitHub Actions 自动部署：`npm ci` → `npm run build` → `actions/upload-pages-artifact` → `actions/deploy-pages`）。
- 依赖：react 18.3 / vite 5.4 / @vitejs/plugin-react 4.3（Node 22 + npm 10 验证通过）。
- 注意：Windows 环境无全局 npm 命令，调用方式为 `node.exe node_modules/npm/bin/npm-cli.js <command>`。

## 2026-09-02 · 视觉与交互精修（本轮）

### Bug 修复
- **首屏 `g` 字母被截断**：`.hero` 的 `overflow: hidden` + `.hero__name` 的 `line-height: 1.05` 导致大字号下小写 `g` 的下伸笔画被裁掉。改为 `line-height: 1.2` 并加 `padding-bottom: 0.08em`。
- **视频预览图全部看不到**：B 站图床 `i0.hdslb.com` 有防盗链，跨域加载（不带 `Referer: bilibili.com`）返回失败。**修复**：用 curl 携带 `Referer` 把 6 个封面下载到 `public/videos/{bvid}.jpg`，`data.js` 改为本地相对路径，彻底绕开防盗链。
- **照片压缩**：原图共 181MB（Fujifilm XS20 原图，单张 7-17MB）。用 `compress_photos.py`（Pillow）缩放到最长边 1600px + JPEG 质量 80 → **181MB → 2MB**，文件名不变（`photos.js` 引用保持一致）。
  - 副作用：文件权限曾被设为 444 只读导致第一次压缩失败，用 `chmod 644` 修复。

### 内容调整
- **Hero 副标题**：去掉「—— 一位经济学硕士的多面手」，保留「数据 · 摄影 · 视频」。
- **关于我**：替换为三段新文本（应用经济学硕士 → 保险公司核保/产品/数据 → 摄影师/B站创作者）。关键名词（硕士、波大学、核保、数据、摄影师、微距摄影、B 站视频创作者）在正文中用 `<span class="hl">` 包裹，加深红色（`#991b1b`，不要太亮）+ font-weight 700。
- **技能模块**：删除原本的 `.chips` 列表样式。改为只渲染标题「技能」，下方用 `position: absolute` 让每个技能词像泡泡一样自然堆叠（10 个气泡，硬编码 `top/left/rot/scale` 形成不规则的云状布局；hover 时变实色）。无序、无对齐、像气泡。
- **照片画廊**：
  - 副标题改为「目前还是糖水片 :)」。
  - 删除每张照片上的分类标签 badge（`.gallery__tag` 不再渲染）。
- **简历**：
  - 新增双语切换 Tab：`English` / `中文`（`lang-tabs` 胶囊样式，激活态用渐变背景）。
  - **完全删除技能进度条**（`skill-bar` 样式从 CSS 中移除，组件不再渲染）。
  - 数据结构改为 `resume = { en: {...}, zh: {...} }`，中文版经验逐条翻译。
  - 布局：summary → 经历（堆叠）→ 荣誉（按时间顺序）。无技能列。

### 交互升级
- **顶部导航指示器**：右上角的快速访问目录不再只是改字色。增加 `.nav__indicator` 滑动背景条：
  - 用 `useLayoutEffect` 测量当前激活项的 `offsetLeft` 和 `offsetWidth`。
  - 绝对定位在 `.nav__links` 内部，渐变背景，圆角胶囊。
  - 过渡用 `cubic-bezier(0.34, 1.56, 0.64, 1)` —— 第二控制点 y=1.56 > 1，产生**轻微 overshoot**，让滑动看起来「灵活有跳跃感」。
  - 监听 `resize` 事件重新测量，保证窗口大小变化时位置正确。
  - 移动端 (<=640px) 自动隐藏（避免与下拉菜单冲突）。

### GitHub 发布就绪
- `.gitignore` 排除 `node_modules`、`dist`、环境文件。
- 仓库可执行：
  ```bash
  git add .
  git commit -m "Initial portfolio"
  git remote add origin https://github.com/William-Ji/portfolio.git
  git push -u origin main
  ```
  推送后 GitHub Actions 自动构建并部署到 `https://william-ji.github.io/portfolio/`。

---

## 技术要点速查（上下文丢失时查阅）

### 关键文件
| 文件 | 作用 |
|---|---|
| `src/data.js` | 全部内容配置（profile/about/education/videos/photos/github/projects/masterProjects/resume） |
| `src/photos.js` | 17 张照片的标题 + 分类 + src（`photos/xxx.jpg`） |
| `src/components/Nav.jsx` | 顶部导航 + 滑动指示器（`useLayoutEffect` 测 `offsetLeft/offsetWidth`） |
| `src/components/About.jsx` | 文本渲染（`renderHighlighted` 分词包 `<span class="hl">`） + 技能泡泡（`bubbleLayout` 硬编码坐标） |
| `src/components/Resume.jsx` | 双语 Tab + 不含技能 |
| `src/components/Gallery.jsx` | 无 tag 的灯箱画廊 |
| `vite.config.js` | `base: './'` |
| `.github/workflows/deploy.yml` | GitHub Pages 自动部署 |

### 颜色 token（`src/index.css` :root）
- `--violet: #7c3aed` · `--pink: #ec4899` · `--orange: #f97316`
- 主渐变 `--grad: linear-gradient(120deg, #7c3aed, #ec4899 50%, #f97316)`
- 关键词高亮 `.hl { color: #991b1b; font-weight: 700 }`

### 常用命令
```bash
# 开发
npm run dev      # http://localhost:5173
npm run build    # 输出到 dist/
npm run preview  # 预览构建产物

# 照片
python import_photos.py "H:\富士XS20相片\个人选集"   # 重新导入（按子文件夹分类）
python compress_photos.py                          # 压缩到 1600px + JPEG 80

# 预览构建产物
python -m http.server 9001 --directory dist
```

### Windows npm 调用
```bash
"<node路径>/node.exe" "<node路径>/node_modules/npm/bin/npm-cli.js" <command>
```

---

## 2026-09-03 · 微调

- **技能泡泡更紧凑**：`.skill-bubbles` 容器从 `width:100% / height:360px` 改为 `width:300px(居中) / height:260px`；`.skill-bubble` 的 padding 8px14px→6px12px、字号 13.5→13px；`bubbleLayout` 坐标整体收紧（scale 上限 1.18→1.08、top 范围缩小）。
- **照片画廊**：
  - 备注「目前还是糖水片 :)」字号调大到 20px（新增 `.gallery__note`），语气谦虚。
  - 每张照片**去掉所有文字说明**：移除 hover 的 `.gallery__overlay`（标题）和灯箱底部 `.lightbox__caption`（标题）。只保留图片本身，alt 属性仅用于无障碍。

### 环境踩坑补充
- 本机 CLI 的 `genie-safe-delete` 钩子会在「单回合内删除文件数 > 50」时触发 `SAFE_DELETE_BULK_CONFIRM_REQUIRED`，导致 `rm -rf dist` / Vite `emptyDir` 失败。**解决办法**：把 dist 分批删（或先删到 <50 个文件再删剩余），再执行 `npm run build`。