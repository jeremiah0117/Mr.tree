export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://tree-mr-universe.vercel.app";

export const siteInfo = {
  name: "树先生宇宙",
  title: "树先生宇宙 | 数字花园与个人 IP 系统",
  description:
    "树先生宇宙是一个面向 GEO、搜索与社媒传播的个人知识现场，沉淀科技洞见、商业判断和自然疗愈的长期资产。",
  creator: "树先生宇宙",
  locale: "zh_CN",
};

export const navItems = [
  { label: "宇宙入口", href: "/about" },
  { label: "数字花园", href: "/garden" },
  { label: "实验室", href: "/lab" },
  { label: "连接矩阵", href: "/links" },
];

export const coreRoutes = [
  { path: "/", label: "首页", priority: 1 },
  { path: "/garden", label: "数字花园", priority: 0.9 },
  { path: "/lab", label: "实验室", priority: 0.9 },
  { path: "/about", label: "关于树先生宇宙", priority: 0.8 },
  { path: "/links", label: "连接矩阵", priority: 0.7 },
];

export const socialLinks = [
  { platform: "GitHub", href: "https://github.com/", region: "Global" },
  { platform: "X", href: "https://x.com/", region: "Global" },
  { platform: "YouTube", href: "https://www.youtube.com/", region: "Global" },
  { platform: "LinkedIn", href: "https://www.linkedin.com/", region: "Global" },
  { platform: "公众号", href: "https://mp.weixin.qq.com/", region: "China" },
  { platform: "视频号", href: "https://channels.weixin.qq.com/", region: "China" },
  { platform: "小红书", href: "https://www.xiaohongshu.com/", region: "China" },
  { platform: "抖音", href: "https://www.douyin.com/", region: "China" },
];

export const universePillars = [
  {
    title: "内容资产层",
    href: "/garden",
    copy: "把科技洞见、商业判断和长期笔记沉淀为可被搜索、引用和再分发的知识节点。",
  },
  {
    title: "社媒连接层",
    href: "/links",
    copy: "连接 GitHub、X、YouTube、LinkedIn、公众号、视频号、小红书、抖音等主流入口。",
  },
  {
    title: "商业转化层",
    href: "/lab",
    copy: "为咨询、课程、研究报告、社群和数字产品预留可信的商业路径。",
  },
];

export const signals = ["AI 原生", "GEO-ready", "长期主义", "自然疗愈"];

export const gardenNotes = [
  {
    slug: "ai-tool-evaluation-framework",
    title: "AI 工具实测框架：如何判断一个工具值不值得长期使用",
    category: "工具实测",
    updatedAt: "2026-07-09",
    summary:
      "用场景、输入成本、输出质量、迁移成本和复用价值五个维度，为 AI 工具建立可比较的评测模型。",
    href: "/garden#ai-tool-evaluation-framework",
  },
  {
    slug: "prompt-library-operating-system",
    title: "Prompt 库不是收藏夹，而是一个工作操作系统",
    category: "Prompt 技巧",
    updatedAt: "2026-07-09",
    summary:
      "把提示词按职业场景、输入素材、输出格式和复盘指标组织起来，让它真正进入工作流。",
    href: "/garden#prompt-library-operating-system",
  },
  {
    slug: "geo-content-structure",
    title: "面向 AI 搜索的内容结构：让洞见更容易被引用",
    category: "GEO",
    updatedAt: "2026-07-09",
    summary:
      "每篇文章都需要明确实体、问题、结论、证据、更新时间和相关链接，服务搜索引擎与 AI 摘要。",
    href: "/garden#geo-content-structure",
  },
  {
    slug: "personal-ip-growth-loop",
    title: "个人 IP 的增长闭环：内容、连接、产品与信任",
    category: "个人 IP",
    updatedAt: "2026-07-09",
    summary:
      "把短内容当作触点，长内容当作资产，社媒当作分发，网站当作长期可信源。",
    href: "/garden#personal-ip-growth-loop",
  },
];

export const labProjects = [
  {
    title: "AI 工具箱",
    status: "规划中",
    copy: "沉淀真实使用过的 AI 工具、适用场景、评分和替代方案。",
  },
  {
    title: "Prompt 工作台",
    status: "规划中",
    copy: "按写作、研究、自动化、内容运营等场景组织可复用提示词。",
  },
  {
    title: "研究报告",
    status: "待验证",
    copy: "围绕 AI 生产力、创作者商业化、GEO 与内容分发制作深度报告。",
  },
];

export const treePersonas = [
  {
    name: "硅树先生",
    focus: "AI 学习 / 工具实测",
    tone: "理性、实验性、可信、极客",
  },
  {
    name: "溪树先生",
    focus: "文学 / 书评 / 真理探索",
    tone: "沉静、诗意、克制、有重量",
  },
  {
    name: "花树先生",
    focus: "旅行 / 摄影 / 生活美学",
    tone: "温柔、通透、细腻、有呼吸感",
  },
];

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}
