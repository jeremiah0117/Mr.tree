import type { Metadata } from "next";
import SiteChrome from "@/components/SiteChrome";
import { labProjects } from "@/lib/site";

export const metadata: Metadata = {
  title: "实验室",
  description:
    "树先生宇宙实验室，用来沉淀 AI 工具箱、Prompt 工作台、研究报告和未来商业化验证。",
};

export default function LabPage() {
  return (
    <SiteChrome>
      <section className="page-hero compact-page-hero">
        <p className="section-kicker">Lab & Commerce</p>
        <h1>把表达影响力，变成可持续的价值系统</h1>
        <p>
          实验室负责把内容中的高频问题变成工具、报告、资料包和服务。先验证需求，再设计产品。
        </p>
      </section>

      <section className="content-section">
        <div className="lab-project-grid">
          {labProjects.map((project) => (
            <article className="knowledge-card" key={project.title}>
              <div className="card-meta">
                <span>{project.status}</span>
                <span>Lab</span>
              </div>
              <h2>{project.title}</h2>
              <p>{project.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section two-column">
        <div>
          <p className="section-kicker">Commercial Path</p>
          <h2>商业化不是突然开始，而是从信任中自然长出来</h2>
        </div>
        <div className="system-list">
          <p>第一阶段：订阅通讯和资料包 waitlist，收集高频需求。</p>
          <p>第二阶段：工具箱、Prompt 库、研究报告，形成可交付资产。</p>
          <p>第三阶段：咨询、工作坊、社群，服务高意愿用户。</p>
        </div>
      </section>
    </SiteChrome>
  );
}
