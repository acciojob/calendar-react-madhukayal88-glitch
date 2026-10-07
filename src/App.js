<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Calendar React</title>
<style>
  body { font-family: Arial, Helvetica, sans-serif; margin: 20px; color: #222; }
  h1 { font-size: 24px; }
  .controls { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin: 12px 0; }
  select, input, button { font-size: 15px; padding: 4px 8px; }
  table { border-collapse: collapse; margin-top: 12px; }
  td, th { border: 1px solid #999; width: 44px; height: 34px; text-align: center; }
  th { background: #f0f0f0; }
  .nav-group { display: inline-flex; align-items: center; gap: 6px; }
  #year { cursor: pointer; font-size: 17px; font-weight: bold; padding: 0 6px; }
  #year-input { width: 70px; }
  .today { background: #cfe8ff; font-weight: bold; }
</style>
</head>
<body>
<div id="root"></div>

<script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

<script type="text/babel">
const { useState } = React;

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const DAYS_HEADER = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function Calendar() {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [editingYear, setEditingYear] = useState(false);
  const [yearInput, setYearInput] = useState(String(today.getFullYear()));

  // First day of month and number of days in month
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Build weeks grid (rows of 7)
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  // Handlers
  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };
  const prevYear = () => setYear(y => y - 1);
  const nextYear = () => setYear(y => y + 1);

  const startEditYear = () => {
    setYearInput(String(year));
    setEditingYear(true);
  };
  const commitYear = () => {
    const parsed = parseInt(yearInput, 10);
    if (!isNaN(parsed)) setYear(parsed);
    setEditingYear(false);
  };
  const onYearKeyDown = (e) => {
    if (e.key === "Enter") commitYear();
    else if (e.key === "Escape") setEditingYear(false);
  };

  const isToday = (d) =>
    d === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  return (
    <div>
      <h1>Calendar</h1>

      <div className="controls">
        {/* Month dropdown */}
        <select
          id="month-dropdown"
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
        >
          {MONTHS.map((m, i) => (
            <option key={m} value={i}>{m}</option>
          ))}
        </select>

        {/* Year display / editable on double-click */}
        <div className="nav-group">
          <button id="year-prev" onClick={prevYear}>{"<"}</button>
          {editingYear ? (
            <input
              id="year-input"
              type="number"
              value={yearInput}
              autoFocus
              onChange={(e) => setYearInput(e.target.value)}
              onBlur={commitYear}
              onKeyDown={onYearKeyDown}
            />
          ) : (
            <span id="year" onDoubleClick={startEditYear} title="Double-click to edit">
              {year}
            </span>
          )}
          <button id="year-next" onClick={nextYear}>{">"}</button>
        </div>

        {/* Month navigation */}
        <button id="month-prev" onClick={prevMonth}>Previous Month</button>
        <button id="month-next" onClick={nextMonth}>Next Month</button>
      </div>

      {/* Days table */}
      <table id="calendar-table">
        <thead>
          <tr>
            {DAYS_HEADER.map((d) => <th key={d}>{d}</th>)}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, wi) => (
            <tr key={wi}>
              {week.map((day, di) => (
                <td key={di} className={day && isToday(day) ? "today" : ""}>
                  {day || ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Calendar />);
</script>
</body>
</html>
