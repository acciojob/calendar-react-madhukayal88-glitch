import React, { useState, useRef, useEffect } from "react";
import "./App.css";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function App() {
  const today = new Date();

  const [month, setMonth] = useState(today.getMonth()); // 0 - 11
  const [year, setYear] = useState(today.getFullYear());

  const [isEditingYear, setIsEditingYear] = useState(false);
  const [yearDraft, setYearDraft] = useState(String(today.getFullYear()));
  const yearInputRef = useRef(null);

  /* Focus + select the year input as soon as it appears */
  useEffect(() => {
    if (isEditingYear && yearInputRef.current) {
      yearInputRef.current.focus();
      yearInputRef.current.select();
    }
  }, [isEditingYear]);

  /* ---------- Year editing (double click) ---------- */
  const startEditYear = () => {
    setYearDraft(String(year));
    setIsEditingYear(true);
  };

  const commitYear = () => {
    const parsed = parseInt(yearDraft, 10);
    if (!Number.isNaN(parsed) && parsed > 0) {
      setYear(parsed);
    }
    setIsEditingYear(false);
  };

  const handleYearKeyDown = (e) => {
    if (e.key === "Enter") {
      commitYear();
    } else if (e.key === "Escape") {
      setIsEditingYear(false);
    }
  };

  /* ---------- Navigation ---------- */
  const stepMonth = (delta) => {
    const total = year * 12 + month + delta;
    setYear(Math.floor(total / 12));
    setMonth(((total % 12) + 12) % 12);
  };

  const stepYear = (delta) => setYear((y) => y + delta);

  /* ---------- Build the grid ---------- */
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstWeekday = new Date(year, month, 1).getDay();

  const cells = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  const isToday = (day) =>
    day !== null &&
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  return (
    <div className="calendar-container">
      <h1 id="heading">Calendar</h1>

      <div className="controls">
        <select
          id="month-dropdown"
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
        >
          {MONTHS.map((name, index) => (
            <option key={name} value={index}>
              {name}
            </option>
          ))}
        </select>

        {isEditingYear ? (
          <input
            id="year-input"
            ref={yearInputRef}
            type="text"
            value={yearDraft}
            onChange={(e) => setYearDraft(e.target.value)}
            onKeyDown={handleYearKeyDown}
            onBlur={commitYear}
            className="year-input"
          />
        ) : (
          <span 
            id="year" 
            onDoubleClick={startEditYear} 
            title="Double click to edit"
            className="year-text"
          >
            {year}
          </span>
        )}
      </div>

      <table id="calendar-table">
        <thead>
          <tr>
            {WEEKDAYS.map((d) => (
              <th key={d}>{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, wi) => (
            <tr key={wi}>
              {week.map((day, di) => (
                <td key={di} className={isToday(day) ? "today" : ""}>
                  {day === null ? "" : day}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Navigation buttons moved to the bottom as per the blueprint */}
      <div className="navigation-buttons">
        <button id="prev-year" onClick={() => stepYear(-1)} title="Previous Year">
          &lt;&lt;
        </button>
        <button id="prev-month" onClick={() => stepMonth(-1)} title="Previous Month">
          &lt;
        </button>
        <button id="next-month" onClick={() => stepMonth(1)} title="Next Month">
          &gt;
        </button>
        <button id="next-year" onClick={() => stepYear(1)} title="Next Year">
          &gt;&gt;
        </button>
      </div>
    </div>
  );
}
