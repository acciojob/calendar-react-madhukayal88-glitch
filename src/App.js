import React, { useState } from "react";
import "./App.css";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function App() {
  // If your problem statement specifies a starting month/year, hardcode here.
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [isEditingYear, setIsEditingYear] = useState(false);
  const [yearInput, setYearInput] = useState(String(today.getFullYear()));

  const getDaysInMonth = (m, y) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (m, y) => new Date(y, m, 1).getDay();

  const daysInMonth = getDaysInMonth(month, year);
  const firstDay = getFirstDayOfMonth(month, year);

  const daysArray = [];
  for (let i = 0; i < firstDay; i++) daysArray.push(null);
  for (let d = 1; d <= daysInMonth; d++) daysArray.push(d);

  // pad to full weeks
  const totalCells = Math.ceil(daysArray.length / 7) * 7;
  while (daysArray.length < totalCells) daysArray.push(null);

  const handleMonthChange = (e) => setMonth(Number(e.target.value));

  const handleYearDoubleClick = () => {
    setIsEditingYear(true);
    setYearInput(String(year));
  };

  const handleYearInputChange = (e) => {
    const v = e.target.value;
    setYearInput(v);
    const parsed = parseInt(v, 10);
    if (!isNaN(parsed)) setYear(parsed); // live commit
  };

  const commitYear = () => {
    const parsed = parseInt(yearInput, 10);
    if (!isNaN(parsed)) setYear(parsed);
    setIsEditingYear(false);
  };

  const handlePrevMonth = () => {
    if (month === 0) { setMonth(11); setYear((y) => y - 1); }
    else setMonth((m) => m - 1);
  };

  const handleNextMonth = () => {
    if (month === 11) { setMonth(0); setYear((y) => y + 1); }
    else setMonth((m) => m + 1);
  };

  const handlePrevYear = () => setYear((y) => y - 1);
  const handleNextYear = () => setYear((y) => y + 1);

  return (
    <div>
      <h1 id="heading">Calendar</h1>

      <select id="month-dropdown" value={month} onChange={handleMonthChange}>
        {MONTHS.map((m, i) => (
          <option key={m} value={i}>{m}</option>
        ))}
      </select>

      {isEditingYear ? (
        <input
          id="year-input"
          type="number"
          value={yearInput}
          onChange={handleYearInputChange}
          onBlur={commitYear}
          onKeyDown={(e) => {
            if (e.key === "Enter") { e.preventDefault(); commitYear(); }
          }}
          autoFocus
        />
      ) : (
        <span id="year-text" onDoubleClick={handleYearDoubleClick}>
          {year}
        </span>
      )}

      <div>
        <button id="prev-month" onClick={handlePrevMonth}>Prev Month</button>
        <button id="next-month" onClick={handleNextMonth}>Next Month</button>
        <button id="prev-year" onClick={handlePrevYear}>Prev Year</button>
        <button id="next-year" onClick={handleNextYear}>Next Year</button>
      </div>

      <table id="calendar-table">
        <thead>
          <tr>
            <th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th>
            <th>Thu</th><th>Fri</th><th>Sat</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: totalCells / 7 }).map((_, weekIdx) => (
            <tr key={weekIdx}>
              {daysArray.slice(weekIdx * 7, weekIdx * 7 + 7).map((day, i) => (
                <td key={i} id={day ? `day-${day}` : undefined}>
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

export default App;
