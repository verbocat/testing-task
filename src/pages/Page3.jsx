import { useState } from "react";

// Reports. Content: src/locales/<lang>/page3.json
const PERIODS = ["week", "month", "quarter"];
const WEEKS = [
  [1, 34, 30, 2],
  [2, 41, 38, 1],
  [3, 29, 25, 4],
  [4, 37, 36, 0],
];

export default function Page3({ t, notify }) {
  const p = (key, args) => t(`page3.${key}`, args);
  const [period, setPeriod] = useState("month");

  return (
    <>
      <section className="hero">
        <div className="text">
          <h1>{p("header.title")}</h1>
          <p>{p("header.subtitle")}</p>
        </div>
        <div className="actions">
          <select value={period} onChange={(e) => setPeriod(e.target.value)} aria-label={p("period.label")}>
            {PERIODS.map((k) => <option key={k} value={k}>{p(`period.${k}`)}</option>)}
          </select>
          <button className="btn ghost" onClick={() => notify(p("messages.exported"))}>{p("header.export")}</button>
        </div>
      </section>

      <section className="stats">
        <div className="stat"><div className="label">{p("summary.created")}</div><div className="value">141</div></div>
        <div className="stat"><div className="label">{p("summary.completed")}</div><div className="value">129</div></div>
        <div className="stat"><div className="label">{p("summary.on_time")}</div><div className="value">94%</div></div>
        <div className="stat"><div className="label">{p("summary.avg_time")}</div><div className="value">{p("summary.days", { count: 2.4 })}</div></div>
      </section>

      <section className="card">
        <h2>{p("table.title")}</h2>
        <table>
          <thead>
            <tr>
              <th />
              <th>{p("table.created")}</th>
              <th>{p("table.completed")}</th>
              <th>{p("table.overdue")}</th>
            </tr>
          </thead>
          <tbody>
            {WEEKS.map(([n, created, completed, overdue]) => (
              <tr key={n}>
                <td>{p("table.week", { number: n })}</td>
                <td>{created}</td>
                <td>{completed}</td>
                <td className={overdue ? "bad" : ""}>{overdue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
