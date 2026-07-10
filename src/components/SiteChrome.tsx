import Link from "next/link";
import AmbientCrossField from "@/components/AmbientCrossField";
import { navItems } from "@/lib/site";

type SiteChromeProps = {
  children: React.ReactNode;
};

export default function SiteChrome({ children }: SiteChromeProps) {
  return (
    <>
      <AmbientCrossField />
      <main className="site-shell">
        <nav
          className="top-nav"
          aria-label="主导航"
          style={{
            backdropFilter: "blur(22px) saturate(150%)",
            WebkitBackdropFilter: "blur(22px) saturate(150%)",
          }}
        >
          <Link className="brand-mark" href="/" aria-label="树先生宇宙首页">
            <span className="brand-glyph">木</span>
            <span>树先生宇宙</span>
          </Link>
          <div className="nav-links">
            {navItems.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
          <Link className="nav-action" href="/links">
            连接我
          </Link>
        </nav>
        {children}
      </main>
    </>
  );
}
