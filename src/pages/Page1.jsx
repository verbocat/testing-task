// Home / dashboard. Content: src/locales/<lang>/page1.json
const TASKS = ["item_1", "item_2", "item_3"];
const STATS = [
  ["open", 12, ""],
  ["done", 48, ""],
  ["overdue", 3, "bad"],
  ["team", 7, ""],
];

export default function Page1({ t, notify }) {
  const p = (key, args) => t(`page1.${key}`, args);

  return (
    <>
      <div className="banner">
        <span>{p("banner.text")}</span>
        <button className="btn primary small spill">{p("banner.action")}</button>
      </div>

      <section className="hero">
        <div className="text">
          <h1>{p("hero.welcome", { name: "Ravi" })}</h1>
          <p>{p("hero.subtitle", { count: 5 })}</p>
        </div>
        <div className="actions">
          <button className="btn primary">{p("hero.primary")}</button>
          <button className="btn ghost">{p("hero.secondary")}</button>
        </div>
      </section>

      <section className="stats">
        {STATS.map(([key, value, cls]) => (
          <div className="stat" key={key}>
            <div className="label">{p(`stats.${key}`)}</div>
            <div className={`value ${cls}`}>{value}</div>
          </div>
        ))}
      </section>

      <section className="grid">
        <div className="card">
          <h2>{p("tasks.title")}</h2>
          <div className="filters">
            <span className="chip on">{p("tasks.filter_all")}</span>
            <span className="chip">{p("tasks.filter_mine")}</span>
            <span className="chip">{p("tasks.filter_urgent")}</span>
          </div>
          {TASKS.map((key) => (
            <div className="task" key={key}>
              <span className="name">{p(`tasks.${key}`)}</span>
              <button className="btn ghost small">{p("tasks.mark_done")}</button>
            </div>
          ))}
        </div>

        <form className="card" onSubmit={(e) => { e.preventDefault(); notify(t("common.messages.saved")); }}>
          <h2>{p("form.title")}</h2>
          <label htmlFor="task">{p("form.task_label")}</label>
          <input id="task" placeholder={p("form.task_placeholder")} />
          <div className="row">
            <div>
              <label htmlFor="due">{p("form.due_label")}</label>
              <input id="due" type="date" />
            </div>
            <div>
              <label htmlFor="prio">{p("form.priority_label")}</label>
              <select id="prio">
                <option>{p("form.priority_low")}</option>
                <option>{p("form.priority_high")}</option>
              </select>
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn primary spill">{p("form.save")}</button>
            <button type="reset" className="btn ghost spill">{p("form.cancel")}</button>
          </div>
        </form>
      </section>
    </>
  );
}
