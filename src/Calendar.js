import React, { useState } from 'react';
import './App.css';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAYS_OF_WEEK = [
  'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
];

function Calendar() {
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

  const saveYear = () => {
    const newYear = parseInt(yearInput, 10);

    if (!isNaN(newYear) && newYear > 0) {
      setYear(newYear);
    } else {
      setYearInput(year.toString());
    }

    setIsEditingYear(false);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const rows = [];
    let day = 1;

    for (let row = 0; row < 6; row++) {
      const cells = [];

      for (let col = 0; col < 7; col++) {
        const position = row * 7 + col;

        if (position < firstDay || day > daysInMonth) {
          cells.push(<td key={col}></td>);
        } else {
          cells.push(<td key={col}>{day}</td>);
          day++;
        }
      }

      rows.push(<tr key={row}>{cells}</tr>);

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
          {MONTHS.map((name, index) => (
            <option key={index} value={index}>
              {name}
            </option>
          ))}
        </select>

        {isEditingYear ? (
          <input
            id="year-input"
            type="number"
            value={yearInput}
            onChange={(e) => setYearInput(e.target.value)}
            onBlur={saveYear}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                saveYear();
              }
            }}
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

        <button id="prev-year-btn" onClick={handlePrevYear}>
          &lt;&lt;
        </button>

        <button id="prev-month-btn" onClick={handlePrevMonth}>
          &lt;
        </button>

        <button id="next-month-btn" onClick={handleNextMonth}>
          &gt;
        </button>

        <button id="next-year-btn" onClick={handleNextYear}>
          &gt;&gt;
        </button>

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

    </div>
  );
}

export default Calendar;
