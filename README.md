# 我的个人作品集网站（React + Vite）

一个求职用的个人作品集网站，包含：视频展示、照片画廊、教育背景、项目经历（GitHub）、硕士项目预留位、简历（可导出 PDF）。

**技术栈**：React 18 + Vite 5，构建产物为纯静态文件，可直接部署到 GitHub Pages。

## 目录结构

```
portfolio/
├── index.html             # Vite 入口（一般不用改）
├── package.json
├── vite.config.js         # base: './'，适配 GitHub Pages 任意路径
├── public/
│   └── photos/            # 你的真实照片（运行时原样拷贝到构建产物）
├── src/
│   ├── main.jsx           # React 入口
│   ├── App.jsx            # 页面组装
│   ├── data.js            # ★ 核心配置文件：改这里的内容，全站自动更新
│   ├── photos.js          # 照片数据（由 import_photos.py 生成，也可手动编辑）
│   ├── index.css          # 样式
│   └── components/        # 各分区组件
├── .github/workflows/deploy.yml  # GitHub Pages 自动部署
└── import_photos.py       # 照片一键导入脚本
```

## 一、填写你的信息（最重要）

打开 `src/data.js`，修改里面的内容即可，全站会自动更新。照片在 `src/photos.js` 里维护。

| 位置 | 内容 |
|------|------|
| `profile` | 姓名、副标题、社交链接、首屏关键词/亮点 |
| `about` | 个人简介 + 技能标签 |
| `education` | 本科、硕士学校专业 |
| `videos` | B 站视频标题 + `bvid`（BV 号）+ 封面图 |
| `github` | GitHub 用户名（`autoFetch` 设为 true 可自动拉取仓库） |
| `projects` | 大学小组作业 |
| `masterProjects` | 硕士项目预留位 |
| `resume` | 简历内容 |

## 二、本地开发

```bash
npm install      # 首次安装依赖
npm run dev      # 启动开发服务器（默认 http://localhost:5173）
```

## 三、构建

```bash
npm run build    # 产物输出到 dist/
npm run preview  # 本地预览构建产物
```

## 四、导入照片

```bash
python import_photos.py "D:\我的照片\作品集"
```
脚本会复制照片到 `public/photos/`，按子文件夹名分类，生成 `src/photos.js`。

## 五、部署到 GitHub Pages（两种方式任选）

### 方式 A：GitHub Actions 自动部署（推荐）

1. 在 GitHub 新建仓库（例如 `portfolio`）。
2. 把 `portfolio` 目录里的内容推到仓库（`.gitignore` 已排除 node_modules/dist）。
3. 仓库 Settings → Pages → Build and deployment → Source 选 **GitHub Actions**。
4. 推送代码到 `main` 分支，Actions 会自动构建并部署。
5. 访问 `https://你的用户名.github.io/portfolio/`。

### 方式 B：本地构建手动推送

```bash
npm run build
# 把 dist/ 里的内容推到 gh-pages 分支，或直接推 dist/ 到 Pages 源
```

> 说明：`vite.config.js` 里 `base: './'` 使用相对路径，所以无论部署在 `用户名.github.io` 还是 `用户名.github.io/仓库名/` 都能正常加载。

## 六、把视频接上 B 站

在 `src/data.js` 的 `videos` 里填 `bvid`（形如 `BV1xx411c7mD`），点卡片就会弹出 B 站播放器。
