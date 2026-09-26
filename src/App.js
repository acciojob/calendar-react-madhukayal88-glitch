import React, { useState } from 'react';
import './App.css';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAYS_OF_WEEK = [
  'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
];

function App() {
  const today = new Date();

  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const [isEditingYear, setIsEditingYear] = useState(false);
  const [yearInput, setYearInput] = useState(
    today.getFullYear().toString()
  );

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const handleMonthChange = (e) => {
    setMonth(Number(e.target.value));
  };

  const handlePrevMonth = () => {
    if (month === 0) {
      const newYear = year - 1;
      setMonth(11);
      setYear(newYear);
      setYearInput(newYear.toString());
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      const newYear = year + 1;
      setMonth(0);
      setYear(newYear);
      setYearInput(newYear.toString());
    } else {
      setMonth(month + 1);
    }
  };

  const handlePrevYear = () => {
    const newYear = year - 1;
    setYear(newYear);
    setYearInput(newYear.toString());
  };

  const handleNextYear = () => {
    const newYear = year + 1;
    setYear(newYear);
    setYearInput(newYear.toString());
  };

  const handleYearDoubleClick = () => {
    setYearInput(year.toString());
    setIsEditingYear(true);
  };

  const handleYearInputChange = (e) => {
    setYearInput(e.target.value);
  };

  const saveYear = () => {
    const parsedYear = parseInt(yearInput, 10);

    if (!isNaN(parsedYear) && parsedYear > 0) {
      setYear(parsedYear);
    } else {
      setYearInput(year.toString());
    }

    setIsEditingYear(false);
  };

  const handleYearKeyDown = (e) => {
    if (e.key === 'Enter') {
      saveYear();
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const rows = [];
    let day = 1;

    // Maximum 6 rows in a calendar
    for (let row = 0; row < 6; row++) {
      const cells = [];

      for (let col = 0; col < 7; col++) {
        const cellIndex = row * 7 + col;

        if (
          cellIndex < firstDay ||
          day > daysInMonth
        ) {
          cells.push(
            <td key={col}></td>
          );
        } else {
          cells.push(
            <td key={col}>{day}</td>
          );
          day++;
        }
      }

      rows.push(
        <tr key={row}>
          {cells}
        </tr>
      );

      if (day > daysInMonth) {
        break;
      }
    }

    return rows;
  };

  return (
    <div className="calendar-container">

      <h1 id="heading">Calendar</h1>

      <div className="controls">

        <select
          id="month-select"
          value={month}
          onChange={handleMonthChange}
        >
          {MONTHS.map((monthName, index) => (
            <option key={index} value={index}>
              {monthName}
            </option>
          ))}
        </select>

        {isEditingYear ? (
          <input
            id="year-input"
            type="number"
            value={yearInput}
            onChange={handleYearInputChange}
            onBlur={saveYear}
            onKeyDown={handleYearKeyDown}
            autoFocus
          />
        ) : (
          <span
            id="year-display"
            onDoubleClick={handleYearDoubleClick}
          >
            {year}
          </span>
        )}

      </div>

      <table id="days-table">
        <thead>
          <tr>
            {DAYS_OF_WEEK.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {renderCalendar()}
        </tbody>
      </table>

      <div>

        <button
          id="prev-year-btn"
          onClick={handlePrevYear}
        >
          &lt;&lt;
        </button>

        <button
          id="prev-month-btn"
          onClick={handlePrevMonth}
        >
          &lt;
        </button>

        <button
          id="next-month-btn"
          onClick={handleNextMonth}
        >
          &gt;
        </button>

        <button
          id="next-year-btn"
          onClick={handleNextYear}
        >
          &gt;&gt;
        </button>

      </div>

    </div>
  );
}

export default App;
