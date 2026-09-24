import React, { useState } from 'react';
import './App.css';

function App() {
  const today = new Date();

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [isEditingYear, setIsEditingYear] = useState(false);
  const [yearInput, setYearInput] = useState(today.getFullYear());

  const getDaysInMonth = (m, y) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (m, y) => new Date(y, m, 1).getDay();

  const buildCalendar = () => {
    const firstDay = getFirstDayOfMonth(month, year);
    const daysInMonth = getDaysInMonth(month, year);
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
    const rows = [];
    let day = 1;
    for (let i = 0; i < totalCells; i++) {
      const rowIdx = Math.floor(i / 7);
      if (!rows[rowIdx]) rows[rowIdx] = [];
      if (i < firstDay || day > daysInMonth) {
        rows[rowIdx].push('');
      } else {
        rows[rowIdx].push(day);
        day++;
      }
    }
    return rows;
  };

  const handlePrevMonth = () => {
    if (month === 0) { setMonth(11); setYear(year - 1); }
    else setMonth(month - 1);
  };

  const handleNextMonth = () => {
    if (month === 11) { setMonth(0); setYear(year + 1); }
    else setMonth(month + 1);
  };

  const handlePrevYear = () => setYear(year - 1);
  const handleNextYear = () => setYear(year + 1);

  const handleYearDoubleClick = () => {
    setYearInput(year);
    setIsEditingYear(true);
  };

  const commitYear = () => {
    const parsed = parseInt(yearInput, 10);
    if (!isNaN(parsed) && parsed > 0) setYear(parsed);
    setIsEditingYear(false);
  };

  const rows = buildCalendar();

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1 id="heading">Calendar</h1>

      <div style={{ marginBottom: 10 }}>
        <select
          id="month-select"
          value={month}
          onChange={(e) => setMonth(parseInt(e.target.value, 10))}
        >
          {months.map((name, idx) => (
            <option key={idx} value={idx}>{name}</option>
          ))}
        </select>

        <span
          id="year-display"
          onDoubleClick={handleYearDoubleClick}
          style={{ display: isEditingYear ? 'none' : 'inline', marginLeft: 8, cursor: 'pointer' }}
        >
          {year}
        </span>

        <input
          id="year-input"
          type="number"
          value={yearInput}
          onChange={(e) => setYearInput(e.target.value)}
          onBlur={commitYear}
          onKeyDown={(e) => { if (e.key === 'Enter') commitYear(); }}
          style={{ display: isEditingYear ? 'inline-block' : 'none', width: 70, marginLeft: 8 }}
        />
      </div>

      <table id="days-table" style={{ borderCollapse: 'collapse', marginBottom: 10 }}>
        <thead>
          <tr>
            <th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th>
            <th>Thu</th><th>Fri</th><th>Sat</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  style={{ border: '1px solid #ccc', width: 40, height: 40, textAlign: 'center', boxSizing: 'border-box' }}
                >
                  {cell === '' ? '\u00A0' : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button id="prev-year-btn" onClick={handlePrevYear}>&lt;&lt;</button>
        <button id="prev-month-btn" onClick={handlePrevMonth}>&lt;</button>
        <button id="next-month-btn" onClick={handleNextMonth}>&gt;</button>
        <button id="next-year-btn" onClick={handleNextYear}>&gt;&gt;</button>
      </div>
    </div>
  );
}

export default App;
