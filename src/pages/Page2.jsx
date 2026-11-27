// Projects. Content: src/locales/<lang>/page2.json
const PROJECTS = [
  ["website", "Ravi", "on_track", 72],
  ["mobile", "Anita", "at_risk", 41],
  ["billing", "Karan", "on_track", 58],
  ["onboarding", "Meera", "done", 100],
];

export default function Page2({ t }) {
  const p = (key, args) => t(`page2.${key}`, args);

  return (
    <>
      <section className="hero">
        <div className="text">
          <h1>{p("header.title")}</h1>
          <p>{p("header.subtitle", { count: PROJECTS.length })}</p>
        </div>
        <div className="actions">
          <button className="btn primary">{p("header.new_project")}</button>
        </div>
      </section>

      <section className="card">
        {PROJECTS.length === 0 ? <p>{p("empty")}</p> : (
          <table>
            <thead>
              <tr>
                <th>{p("columns.name")}</th>
                <th>{p("columns.owner")}</th>
                <th>{p("columns.status")}</th>
                <th>{p("columns.progress")}</th>
              </tr>
            </thead>
            <tbody>
              {PROJECTS.map(([key, owner, status, progress]) => (
                <tr key={key}>
                  <td>{p(`items.${key}`)}</td>
                  <td>{owner}</td>
                  <td><span className={`chip status ${status}`}>{p(`status.${status}`)}</span></td>
                  <td>
                    <div className="bar"><div style={{ width: `${progress}%` }} /></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </>
  );
}
