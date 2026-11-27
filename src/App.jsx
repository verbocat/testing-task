import { useEffect, useMemo, useState } from "react";
import { initialLanguage, isRtl, languageName, languages, saveLanguage, translator } from "./i18n";
import Page1 from "./pages/Page1.jsx";
import Page2 from "./pages/Page2.jsx";
import Page3 from "./pages/Page3.jsx";

// Hash routes: #/ (page1), #/projects (page2), #/reports (page3)
const ROUTES = [
  { path: "/", nav: "home", Page: Page1 },
  { path: "/projects", nav: "projects", Page: Page2 },
  { path: "/reports", nav: "reports", Page: Page3 },
];
const currentPath = () => window.location.hash.replace(/^#/, "") || "/";

export default function App() {
  const [lang, setLang] = useState(initialLanguage);
  const [path, setPath] = useState(currentPath);
  const [toast, setToast] = useState("");
  const t = useMemo(() => translator(lang), [lang]);
  const route = ROUTES.find((r) => r.path === path) || ROUTES[0];

  useEffect(() => {
    const onHash = () => setPath(currentPath());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // The page language drives the font size (see styles.css) and the text direction
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl(lang) ? "rtl" : "ltr";
    document.title = `${t("common.app.name")} · ${t("common.app.tagline")}`;
    saveLanguage(lang);
  }, [lang, t]);

  useEffect(() => {
    if (!toast) return undefined;
    const id = setTimeout(() => setToast(""), 2200);
    return () => clearTimeout(id);
  }, [toast]);

  return (
    <>
      <header>
        <div className="logo">{t("common.app.name")}</div>
        <nav>
          {ROUTES.map((r) => (
            <a key={r.path} href={`#${r.path}`} className={r === route ? "active" : ""}>
              {t(`common.nav.${r.nav}`)}
            </a>
          ))}
        </nav>
        <div className="lang">
          <span>{t("common.nav.language")}</span>
          <select value={lang} onChange={(e) => setLang(e.target.value)} aria-label="Language">
            {languages.map((code) => <option key={code} value={code}>{languageName(code)}</option>)}
          </select>
        </div>
        <button className="btn ghost small spill">{t("common.nav.logout")}</button>
      </header>

      <main>
        <route.Page t={t} notify={setToast} />
      </main>

      <footer>
        <a href="#">{t("common.footer.privacy")}</a>
        <a href="#">{t("common.footer.terms")}</a>
        <a href="#">{t("common.footer.help")}</a>
        <span className="copy">{t("common.footer.copyright")}</span>
      </footer>

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
