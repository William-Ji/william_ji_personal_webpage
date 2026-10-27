// =====================================================================
//  个人作品集 · 集中配置文件
//  ---------------------------------------------------------------------
//  你只需要改这一个文件，全站内容会自动更新。
//  照片在 src/photos.js 里维护。
// =====================================================================

import { photos } from './photos'

export const site = {
  /* ---------------- 基本信息 ---------------- */
  profile: {
    name: "Jiangbei Ji",
    role: "数据 · 摄影 · 视频",
    tagline: "用数据洞察世界，用镜头记录世界。",
    location: "中国 · 北京",
    email: "william01112000@163.com",

    typewriter: ["数据分析", "SQL · Python · SAS", "手表微距 · 摄影", "视频剪辑", "应用计量经济"],

    highlights: [
      { icon: "🎬", label: "B站 视频创作" },
      { icon: "📷", label: "手表微距 · 摄影" },
      { icon: "📊", label: "数据分析" },
      { icon: "🎓", label: "USC 经济学硕士" }
    ],

    socials: [
      { name: "GitHub", url: "https://github.com/William-Ji", color: "#181717" },
      { name: "B站", url: "https://space.bilibili.com/3392250", color: "#FB7299" },
      { name: "LinkedIn", url: "https://www.linkedin.com/in/jiangbeiji76/", color: "#0A66C2" },
      { name: "小红书", url: "https://www.xiaohongshu.com/user/profile/753470256", color: "#FF2442" },
      { name: "邮箱", url: "mailto:william01112000@163.com", color: "#7c3aed" }
    ]
  },

  /* ---------------- 关于我 ---------------- */
  about: {
    paragraphs: [
      "你好，我是 Jiangbei Ji（William），南加大（USC）应用经济学与计量经济学硕士，波士顿大学经济学 + 国际关系双专业本科。",
      "白天，我在保险公司做核保、产品配置和数据对接——用 SQL 和 Excel 把数据变成决策依据。",
      "镜头后，我是一个摄影师，爱好风景和微距摄影，也是一个 B 站视频创作者（@礵Parks）。"
    ],
    // 在正文中需要加深红色的关键词（首次出现处）
    highlights: [
      "应用经济学与计量经济学硕士",
      "波士顿大学",
      "核保",
      "数据",
      "摄影师",
      "微距摄影",
      "B 站视频创作者"
    ],
    // 技能词云（用于浮动泡泡渲染）
    skills: ["Python", "SQL", "SAS", "STATA", "R", "计量经济", "数据可视化", "DaVinci Resolve", "Photoshop", "Helicon Focus"]
  },

  /* ---------------- 教育背景 ---------------- */
  education: [
    {
      degree: "硕士",
      school: "University of Southern California（US News 25）",
      major: "Applied Economics and Econometrics · Master of Science",
      period: "2022.05 – 2024.05",
      desc: "GPA 3.74 / 4.0。核心课程：应用计量经济、经济咨询 I & II、金融经济基础、时间序列分析、宏微观经济、数据库系统。"
    },
    {
      degree: "本科",
      school: "Boston University",
      major: "Economics & International Relations（双专业）· Minor: Statistics",
      period: "2018.09 – 2022.05",
      desc: "GPA 3.65 / 4.0 · GRE 326（写作 5.0）· 连续四年 Dean's List。定量课程：统计 II、线性代数、方差分析、应用多元回归、Data Science in R。"
    }
  ],

  /* ---------------- 视频作品（B站 @礵Parks） ---------------- */
  videos: [
    {
      title: "【腕表分享】苏联 Slava 脉搏计手表 2428 手动机芯",
      bvid: "BV1jT421U7Qu",
      cover: "videos/BV1jT421U7Qu.jpg",
      desc: "B 站播放 5.6k · 手表微距与开箱分享。"
    },
    {
      title: "【腕表分享】Kopernik 2609.HA 手动机芯",
      bvid: "BV1kp421X717",
      cover: "videos/BV1kp421X717.jpg",
      desc: "B 站播放 1.6k · 最感动的一只无缺陷表。"
    },
    {
      title: "【腕表分享】苏联星期日期腕表 Raketa 2627h",
      bvid: "BV14r421V7NA",
      cover: "videos/BV14r421V7NA.jpg",
      desc: "B 站播放 627 · 苏联老日历机芯介绍。"
    },
    {
      title: "【守望MLG】安燃.exe",
      bvid: "BV1MicJzWEHH",
      cover: "videos/BV1MicJzWEHH.jpg",
      desc: "B 站播放 2.9k · 守望先锋游戏剪辑代表作。"
    },
    {
      title: "【守望先锋】我 是 铁 头 功",
      bvid: "BV1XucRzZEJ1",
      cover: "videos/BV1XucRzZEJ1.jpg",
      desc: "守望先锋短篇，剪辑节奏练习。"
    },
    {
      title: "【三角洲行动】攀 升 战 车 道",
      bvid: "BV1SCUxYJEpZ",
      cover: "videos/BV1SCUxYJEpZ.jpg",
      desc: "三角洲行动搞笑剪辑。"
    }
  ],

  /* ---------------- 照片画廊 ---------------- */
  photoCategories: ["全部", "手表微距", "荷花风景", "生活随拍"],
  photos,

  /* ---------------- 项目（团队数据分析项目站点） ---------------- */
  projectSite: {
    name: "The US Shooting Case Analysis · CBWFM Team",
    desc: "团队数据分析项目：基于 2015–2019 年美国警察枪击公开数据，从受害者特征、环境因素到持枪预测模型的多维分析。",
    analysis: {
      title: "Analysis · 分析与图表",
      url: "https://team-cbwfm.netlify.app/analysis/",
      desc: "分析全文：Introduction / EDA / Modeling，文字讲解配图表。",
      embed: true
    },
    interactive: {
      title: "Interactive · 交互图表",
      url: "https://team-cbwfm.netlify.app/interactive/",
      desc: "可交互的探索式图表，可直接操作；也可在新窗口打开。",
      embed: true
    }
  },

  /* ---------------- 简历（双语，不展示技能条） ---------------- */
  resume: {
    en: {
      summary: "Data and economics professional with a Master's in Applied Economics & Econometrics (USC). Currently driving data-driven insurance operations at Ping An. Bridging analytical rigor and visual storytelling through photography and video editing.",
      experience: [
        {
          role: "Non-Auto & Accident Insurance · Underwriting & Product Configuration",
          org: "Ping An Property & Casualty Insurance · Beijing",
          period: "2025.08 – Present",
          points: [
            "Quoting & Advisory: Evaluated 13 sales inquiries, screened 5 risk items, actualized 9 projects based on private & public data.",
            "Product Configuration: Created/modified 165 insurance products — provisions, premium rates, coverage limits.",
            "Internal Training: Hosted 3 training sessions for 150+ participants; created and tested 3 new SOPs.",
            "Data Function Liaison: Built 8 automated dashboards and 1 AI-powered Q&A bot for department data requests."
          ]
        },
        {
          role: "Auto Insurance · System Configuration & Automation",
          org: "Ping An Property & Casualty Insurance · Beijing",
          period: "2024.12 – 2025.08",
          points: [
            "System Configuration: Corrected 1,680 duplicate / obsolete auto-underwriting programs ahead of 200 remote staff onboarding.",
            "RPA & Automation: Built scripts processing 1,000+ tasks/day, reducing manual workload by 2 person-hours per day.",
            "SOP Documentation: Authored 13 procedural manuals (25,200 Chinese characters); integrated into internal AI knowledge agent."
          ]
        },
        {
          role: "ESG Consulting Intern",
          org: "Cushman & Wakefield Shenzhen Valuation · Beijing",
          period: "2023.05 – 2023.08",
          points: [
            "Client Research: In-depth interviews with 21 department heads across 3 clients; 140k-word transcript, 40k-word summary.",
            "Report Writing: Studied 8 ESG frameworks (MSCI, HKEX, UN); assisted consultants in writing ESG reports.",
            "Service Promotion: Researched 6 potential clients and 10 peer reports; assisted in service proposals (50 slides)."
          ]
        }
      ],
      awards: [
        "Dean's List Honor · Boston University (2018 – 2022)",
        "GRE Total 326 · Analytical Writing 5.0",
        "GPA 3.74/4.0 · USC Master's"
      ]
    },
    zh: {
      summary: "应用经济学与计量经济学硕士（USC）。现就职于平安产险北京分公司，从事数据驱动的保险业务运营。以摄影与视频为桥，连接数据逻辑与视觉表达。",
      experience: [
        {
          role: "非车险 & 意健险部 · 核保与产品配置",
          org: "中国平安财产保险 · 北京分公司",
          period: "2025.08 – 至今",
          points: [
            "报价与核保：评估 13 个销售部门询单，筛选 5 个风险项目，实际落地 9 个项目（基于内外部数据）。",
            "产品配置：通过内部工具创建/修改 165 个保险产品（含特别约定、投保人告知、保费率、可变保额）。",
            "内部培训：2026 上半年主持 3 场培训（150+ 人），覆盖保险产品与系统使用；编写并测试 3 个新 SOP。",
            "数据对接：作为部门数据联络人，构建 8 个自动化看板 + 1 个基于内部文档的 AI 问答机器人。"
          ]
        },
        {
          role: "车险部 · 系统配置与自动化",
          org: "中国平安财产保险 · 北京分公司",
          period: "2024.12 – 2025.08",
          points: [
            "系统配置：在 200 名远程员工上岗前，修正 1,680 个重复/过时的车险核保自动程序。",
            "RPA 自动化：开发脚本与监管平台对接，日均处理 1,000+ 任务，减少人工 2 人时/日。",
            "SOP 文档：编写 13 份标准操作手册（含图示，共 25,200 中文字），集成进内部知识 AI 助手。"
          ]
        },
        {
          role: "ESG 咨询实习生",
          org: "戴德梁行深圳估价 · 北京分公司（Cushman & Wakefield）",
          period: "2023.05 – 2023.08",
          points: [
            "客户研究：深度访谈 3 家客户的 21 位部门负责人，整理 14 万字访谈记录与 4 万字摘要。",
            "报告撰写：研究 MSCI、港交所、UN 等 8 家机构的 ESG 框架，协助撰写 ESG 报告。",
            "服务推广：调研 6 家潜在客户与 10 份同行报告，协助撰写服务方案（50 页幻灯片）。"
          ]
        }
      ],
      awards: [
        "Dean's List · 波士顿大学（2018 – 2022，连续四年）",
        "GRE 总分 326 · 写作 5.0",
        "GPA 3.74/4.0 · USC 硕士"
      ]
    }
  }
}

export default site