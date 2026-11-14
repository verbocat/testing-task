import { useEffect, useMemo, useState } from "react";
import { initialLanguage, isRtl, languageName, languages, saveLanguage, translator } from "./i18n";

const TASKS = ["tasks.item_1", "tasks.item_2", "tasks.item_3"];
const STATS = [
  ["stats.open", 12, ""],
  ["stats.done", 48, ""],
  ["stats.overdue", 3, "bad"],
  ["stats.team", 7, ""],
];

export default function App() {
  const [lang, setLang] = useState(initialLanguage);
  const [toast, setToast] = useState("");
  const t = useMemo(() => translator(lang), [lang]);

  // The page language drives the font size (see styles.css) and the text direction
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl(lang) ? "rtl" : "ltr";
    document.title = `${t("app.name")} · ${t("app.tagline")}`;
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
        <div className="logo">{t("app.name")}</div>
        <nav>
          <a href="#" className="active">{t("nav.home")}</a>
          <a href="#">{t("nav.projects")}</a>
          <a href="#">{t("nav.reports")}</a>
          <a href="#">{t("nav.settings")}</a>
        </nav>
        <div className="lang">
          <span>{t("nav.language")}</span>
          <select value={lang} onChange={(e) => setLang(e.target.value)} aria-label="Language">
            {languages.map((code) => <option key={code} value={code}>{languageName(code)}</option>)}
          </select>
        </div>
        <button className="btn ghost small spill">{t("nav.logout")}</button>
      </header>

      <main>
        <div className="banner">
          <span>{t("banner.text")}</span>
          <button className="btn primary small spill">{t("banner.action")}</button>
        </div>

        <section className="hero">
          <div className="text">
            <h1>{t("hero.welcome", { name: "Ravi" })}</h1>
            <p>{t("hero.subtitle", { count: 5 })}</p>
          </div>
          <div className="actions">
            <button className="btn primary">{t("hero.primary")}</button>
            <button className="btn ghost">{t("hero.secondary")}</button>
          </div>
        </section>

        <section className="stats">
          {STATS.map(([key, value, cls]) => (
            <div className="stat" key={key}>
              <div className="label">{t(key)}</div>
              <div className={`value ${cls}`}>{value}</div>
            </div>
          ))}
        </section>

        <section className="grid">
          <div className="card">
            <h2>{t("tasks.title")}</h2>
            <div className="filters">
              <span className="chip on">{t("tasks.filter_all")}</span>
              <span className="chip">{t("tasks.filter_mine")}</span>
              <span className="chip">{t("tasks.filter_urgent")}</span>
            </div>
            {TASKS.map((key) => (
              <div className="task" key={key}>
                <span className="name">{t(key)}</span>
                <button className="btn ghost small">{t("tasks.mark_done")}</button>
              </div>
            ))}
          </div>

          <form className="card" onSubmit={(e) => { e.preventDefault(); setToast(t("messages.saved")); }}>
            <h2>{t("form.title")}</h2>
            <label htmlFor="task">{t("form.task_label")}</label>
            <input id="task" placeholder={t("form.task_placeholder")} />
            <div className="row">
              <div>
                <label htmlFor="due">{t("form.due_label")}</label>
                <input id="due" type="date" />
              </div>
              <div>
                <label htmlFor="prio">{t("form.priority_label")}</label>
                <select id="prio">
                  <option>{t("form.priority_low")}</option>
                  <option>{t("form.priority_high")}</option>
                </select>
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn primary spill">{t("form.save")}</button>
              <button type="reset" className="btn ghost spill">{t("form.cancel")}</button>
            </div>
          </form>
        </section>
      </main>

      <footer>
        <a href="#">{t("footer.privacy")}</a>
        <a href="#">{t("footer.terms")}</a>
        <a href="#">{t("footer.help")}</a>
        <span className="copy">{t("footer.copyright")}</span>
      </footer>

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
