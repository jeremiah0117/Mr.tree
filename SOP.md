# 树先生宇宙 · 开发到部署上线 SOP 与版本修改记录

> **本文档是项目的「单一事实来源（single source of truth）」。**
> 任何 agent 修改本项目后，**必须在文末【版本修改记录表】追加一行**（见 §7 模板）。
> 未来接手的 agent 无需重读全部会话上下文——读本文档即可完整了解项目结构、部署方式与历次修改。
> 最后更新：2026-07-10

---

## 0. 一句话概览

个人 IP 品牌站「树先生宇宙」——基于 **Next.js 16（App Router）+ React 19 + TypeScript + Tailwind v4** 的多页数字花园，暗色荧光绿「赛博森林」视觉。源码托管于 GitHub，通过 Vercel 自动部署上线。

---

## 1. 项目基本信息

| 项 | 值 |
|---|---|
| **GitHub 仓库** | `https://github.com/jeremiah0117/Mr.tree.git` |
| **默认分支** | `main` |
| **本地路径** | `/Users/jeremiah/WorkBuddy/Claw/树先生宇宙/tree-universe-site` |
| **框架** | Next.js 16.2.10（App Router） |
| **UI 运行时** | React 19.2.4 + react-dom 19.2.4 |
| **语言** | TypeScript 5（strict） |
| **样式** | Tailwind CSS v4（`@tailwindcss/postcss`）+ 手写 `globals.css`（设计系统） |
| **第三方运行时依赖** | **无**（仅 next / react / react-dom；Markdown 解析、RSS、动画均自写，零额外库） |
| **线上部署** | Vercel（Import 该 GitHub 仓库，`main` 推送即自动构建部署） |
| **本地预览** | `npm run dev` → `http://localhost:3000`（Turbopack 热更新） |

---

## 2. 目录结构与各层职责

```
tree-universe-site/
├── SOP.md                    # 本文档：开发部署 SOP + 版本记录表（agent 必读必更新）
├── src/
│   ├── app/
│   │   ├── layout.tsx        # 根布局：字体(Geist)、metadata(OG/Twitter/JSON-LD 引用)、<html lang="zh-CN">
│   │   ├── page.tsx          # 首页：Hero(π数字环+像素小鹿+星点) + 五段式框架 sections
│   │   ├── globals.css       # 完整设计系统（~1333 行：CSS 变量/动画/响应式/reduced-motion）
│   │   ├── about/            # 宇宙入口页（static）
│   │   ├── garden/           # 数字花园列表（static）
│   │   │   └── [slug]/       # 文章详情（SSG，读 content/articles/*.md）
│   │   ├── lab/              # 实验室页（static）
│   │   ├── links/            # 连接矩阵页（static）
│   │   ├── feed.xml/route.ts # RSS 订阅（dynamic）
│   │   ├── sitemap.ts        # sitemap.xml（static）
│   │   └── robots.ts         # robots.txt（static）
│   ├── components/
│   │   ├── SiteChrome.tsx     # 统一导航 + 玻璃拟态
│   │   ├── AmbientCrossField.tsx  # canvas 十字粒子背景（跟随指针+滚动+呼吸）
│   │   ├── StarField.tsx      # 随机字符星点（"use client"，每次闪烁换字符）
│   │   └── JsonLd.tsx         # 结构化数据注入
│   └── lib/
│       ├── site.ts            # 站点配置中枢：导航/社媒/支柱/花园笔记/实验室/三线人格
│       └── content.ts         # Markdown 内容引擎（自写 frontmatter 解析 + 阅读时长 + 摘要）
├── content/articles/         # 4 篇 seed 文章（.md + frontmatter）
├── public/                   # 静态资源（默认 SVG 占位）
├── artifacts/                # 设计稿截图（⚠️ 未跟踪/未提交，见 §4.5）
├── output/                   # 构建/导出产物（⚠️ 未跟踪，见 §4.5）
└── 配置：next.config.ts / eslint / postcss / tsconfig / package.json / .gitignore
```

**设计原则**：所有视觉动效均为纯 CSS `@keyframes` / SVG，零动画库；内容数据集中在 `lib/site.ts` 与 `content/articles/`，改文案不必动组件。

---

## 3. 本地开发 SOP

### 3.1 启动开发服务器
```bash
cd /Users/jeremiah/WorkBuddy/Claw/树先生宇宙/tree-universe-site
npm run dev          # → http://localhost:3000（Turbopack）
```

### 3.2 生产构建（⚠️ 本机必坑）
本机环境变量 `NODE_OPTIONS=--use-system-ca` 会导致 Next 的 worker 报
`ERR_WORKER_INVALID_EXEC_ARGV` 而构建失败。构建前必须清空该变量：
```bash
cd /Users/jeremiah/WorkBuddy/Claw/树先生宇宙/tree-universe-site
env -u NODE_OPTIONS NEXT_TELEMETRY_DISABLED=1 npm run build
```
> 另：`.next` 是缓存，若构建异常需清理，用 `mv .next /tmp/xxx`（WorkBuddy 沙箱会拦截 `rm -rf .next`）。

### 3.3 类型检查 / Lint
```bash
npx tsc --noEmit     # 类型校验
npm run lint         # eslint（package.json 中脚本为 "eslint"）
```

---

## 4. Git 与 GitHub 部署 SOP（关键）

### 4.1 认证方式（macOS keychain PAT，**不落盘**）
GitHub PAT 已存于本机钥匙串（账户 `227528249` / `jeremiah0117`）。**切勿把 token 写进 `.git/config` 或任何文件**。每次操作用变量注入：
```bash
TOKEN=$(security find-internet-password -s github.com -g 2>&1 \
  | grep -oE 'password: "[^"]+"' | sed 's/password: "//;s/"$//')
```

### 4.2 提交规范
- 提交信息用 `type: 简述`（feat / fix / perf / docs / refactor）。
- 提交前用 `git status -s` 确认只 stage 了源码（`src/` `content/` `public/` 配置），**不要把 `artifacts/`、`output/` 带进去**。

### 4.3 推送命令（token 不持久化到配置）
```bash
git add <具体文件>
git commit -m "type: 简述"
git -c url."https://${TOKEN}@github.com/".insteadOf="https://github.com/" push origin main
```
`insteadOf` 仅本次命令生效，token 不写入 `.git/config`、不出现在日志。

### 4.4 平行历史冲突处理（重要）
**现象**：`git push` 被拒 `! [rejected] (fetch first)`，因为远程已有内容相同的提交（同一份改动在另一台机器/WorkBuddy 实例已自行提交并 push，仅 SHA 不同）。

**判定**：先 `git fetch origin`，再 `git diff --stat HEAD origin/main` + 比对两树 hash
（`git rev-parse HEAD^{tree}` vs `origin/main^{tree}`）。**若两树 hash 完全相同** → 内容字节级一致。

**处理（不要强推、不要 merge，否则产生重复提交）**：
```bash
git fetch origin
git reset --soft origin/main     # 本地对齐远程，工作树不动、源码零丢失
git push origin main             # 此时返回 "Everything up-to-date"
```

### 4.5 .gitignore 现状与待决项
`.gitignore` 已排除：`node_modules/ .next/ .vercel/ .env* /coverage` 等。
**待决定**：`artifacts/`（40 张设计稿截图）与 `output/` 目前**未跟踪也未忽略**。
它们是非源码的设计验证截图，建议二选一：
1. 加进 `.gitignore`（推荐，保持仓库干净）；
2. 或单独提交入库（若要在 GitHub 保留设计迭代记录）。
**当前默认：不提交它们。**

---

## 5. 线上部署（Vercel）

1. 打开 Vercel → New Project → Import `jeremiah0117/Mr.tree`。
2. Framework 自动识别 Next.js，构建命令 `next build`，无需额外配置。
3. 绑定域名（可选）。此后**每次 `main` 推送即自动重新部署**。
4. 验证：部署后访问生产域名，检查 Hero 动效、各路由、RSS(`/feed.xml`)、sitemap。

---

## 6. 版本修改记录表

> 累计版本数：**11**（v0.0 → v1.3）。每次修改后由 agent 追加一行（见 §7）。
> 「关联提交」列：标注该修改最终落地的 Git SHA；标注「并入 X」表示本机为未单独提交的工
> 作树改动，最终随某次提交一并入库。

| 版本 | 日期 | 修改内容概述 | 关键文件 | 关联 Git 提交 | 部署状态 | 修改人/agent |
|---|---|---|---|---|---|---|
| v0.0 | 2026-07-08 21:53 | Create Next App 脚手架（Next 16 + React 19 + TS + Tailwind v4） | package.json, src/app/*, 配置 | `c87c768` | 已入库 | WorkBuddy agent |
| v0.1 | 2026-07-08 22:36 | 品牌落地页初版：Hero code-wave + 像素「树先生」+ 暗色荧光绿设计系统；**首次推送 GitHub** | globals.css, page.tsx, layout.tsx, next.config.ts, artifacts/ | `f1f481c` | 已入库+已推送 | WorkBuddy agent |
| v0.2 | 2026-07-08 晚 | globals.css 四改：纯黑底 / 十字透明度降低且平铺更稀疏 / Chrome 滚动驱动浮动 / 全站统一柔和圆角（4 变量）/ 沉稳辉光 | globals.css | 并入 `baf86a6` | 已并入 | WorkBuddy agent |
| v0.3 | 2026-07-09~10 | Hero 改为**同心代码环** CodeRingsHero：SVG `<textPath>` 5 圈代码文字沿圆弧排列，55s~160s 正反旋转 | page.tsx, globals.css | 并入 `baf86a6` | 已并入 | WorkBuddy agent |
| v0.4 | 2026-07-09~10 | 去掉 3 个气泡，替换为**随机位置星点** StarField（36 颗，21 字符池，独立亮灭） | page.tsx, globals.css | 并入 `baf86a6` | 已并入 | WorkBuddy agent |
| v0.5 | 2026-07-09~10 | 星点**字符也随机**：新客户端组件 `StarField.tsx`，`onAnimationIteration` 每次闪烁换字符 | src/components/StarField.tsx | 并入 `baf86a6` | 已并入 | WorkBuddy agent |
| v0.6 | 2026-07-09~10 | 中央像素图重设计为**小树**（分层松树，去掉拟人脸部，保留荧光绿梯度） | page.tsx (PixelTree) | 并入 `baf86a6` | 已并入 | WorkBuddy agent（UI Designer 角色） |
| v1.0 | 2026-07-10 10:10 | **多页数字花园系统**：路由 about/garden/garden[slug]/lab/links + RSS(feed.xml) + sitemap.ts + robots.ts + JSON-LD + lib/site.ts + lib/content.ts（自写 MD 解析）+ DeerMascot（会眨眼像素小鹿）+ π 数字环 NumberRings | 多文件（app/components/lib 全量） | `baf86a6` | 已入库+已推送 | WorkBuddy agent |
| v1.1 | 2026-07-10 11:12 | 首页数字环动效优化 | page.tsx (NumberRings) | `d6e5c7f` | 已入库+已推送（远程） | WorkBuddy agent（另一实例） |
| v1.2 | 2026-07-10 11:29 | 保证数字环字符间隔修复 | page.tsx | `b28b229` | 已入库+已推送（远程） | WorkBuddy agent（另一实例） |
| v1.3 | 2026-07-10 11:40 | **沉淀本 SOP 文档**（开发→部署全链路 SOP + 版本修改记录表），供未来 agent 免上下文接手 | SOP.md（新增） | `c3e3ec0` | 已入库+已推送 | WorkBuddy agent |

> 注：v1.1 / v1.2 由另一台机器提交并推送，造成与本地平行历史；本机通过 §4.4 的
> `reset --soft origin/main` 对齐，未产生重复提交。

---

## 7. 未来 agent 操作约定（必读）

1. **每次修改完，立即在 §6 表格末尾追加一行**（复制下方模板），填写版本号、日期、内容、关键文件、关联提交、部署状态、你的角色。
2. **版本号递增规则**：小改动（如调一个参数）→ 末位 +0.1；结构性改动（新增路由/大模块）→ 主版本 +0.1（如 v1.x → v2.0）。
3. **不要提交 `artifacts/` 与 `output/`**（设计稿，非源码），除非用户明确要求。
4. **构建前**务必 `env -u NODE_OPTIONS`（见 §3.2）。
5. **push 前**先 `git fetch`；遇 §4.4 平行历史，用 `reset --soft origin/main`，**禁止强推/merge**。
6. 提交信息遵循 `type: 简述`，token 用 §4.1–4.3 的变量注入方式，不落盘。

**表格追加模板（复制此行，替换括号内容）：**
```
| vX.Y | YYYY-MM-DD HH:MM | （本次修改概述） | （关键文件） | （关联提交 SHA 或「并入 X」） | （已入库/已推送/待推送） | （你的角色） |
```

---

## 8. 待办 / 开放问题

- [ ] **社媒链接仍为平台首页占位**（about/links 中 8 个入口指向 `github.com/` `x.com/` 等，非真实账号）——P1。
- [ ] **`artifacts/` 与 `output/` 入库 or 加 `.gitignore`**——待用户决策（§4.5）。
- [ ] **Vercel 线上部署**尚未实际绑定（仓库已就位，需 Import 触发首次生产构建）。
- [ ] 移动端 ≤980px 导航当前为 `display:none`，可改汉堡菜单（P3）。
