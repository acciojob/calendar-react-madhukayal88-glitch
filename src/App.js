import React, { useState } from 'react';

function App() {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [editingYear, setEditingYear] = useState(false);
  const [yearInput, setYearInput] = useState(year);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  // handlers...

  return (
    <div>
      <h1 id="heading">Calendar</h1>
      <select id="month-dropdown" value={month} onChange={...}>
        ...
      </select>
      <span id="year" onDoubleClick={...}>{year}</span>
      {editingYear && <input id="year-input" ... />}
      <table id="days-table">
        ...
      </table>
      <button id="prev-month">Prev Month</button>
      <button id="next-month">Next Month</button>
      <button id="prev-year">Prev Year</button>
      <button id="next-year">Next Year</button>
    </div>
  );
}

export default App;
