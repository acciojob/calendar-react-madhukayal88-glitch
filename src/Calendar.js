import React, { useState } from 'react';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Calendar() {
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [isEditingYear, setIsEditingYear] = useState(false);
  const [yearInput, setYearInput] = useState(currentDate.getFullYear().toString());

  // Days in selected month (handles leap years automatically)
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  
  // Starting day index (0 = Sun, 1 = Mon, etc.)
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  // Navigation handlers
  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear((prev) => prev - 1);
      setYearInput((selectedYear - 1).toString());
    } else {
      setSelectedMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear((prev) => prev + 1);
      setYearInput((selectedYear + 1).toString());
    } else {
      setSelectedMonth((prev) => prev + 1);
    }
  };

  const handlePrevYear = () => {
    const newYear = selectedYear - 1;
    setSelectedYear(newYear);
    setYearInput(newYear.toString());
  };

  const handleNextYear = () => {
    const newYear = selectedYear + 1;
    setSelectedYear(newYear);
    setYearInput(newYear.toString());
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(Number(e.target.value));
  };

  // Year double-click & input handlers
  const handleYearDoubleClick = () => {
    setIsEditingYear(true);
  };

  const handleYearInputChange = (e) => {
    setYearInput(e.target.value);
  };

  const saveYear = () => {
    const parsedYear = parseInt(yearInput, 10);
    if (!isNaN(parsedYear) && parsedYear > 0) {
      setSelectedYear(parsedYear);
    } else {
      setYearInput(selectedYear.toString()); // Revert if invalid
    }
    setIsEditingYear(false);
  };

  const handleYearKeyDown = (e) => {
    if (e.key === 'Enter') {
      saveYear();
    }
  };

  // Build grid matrix for calendar table
  const renderCalendarMatrix = () => {
    const totalDays = getDaysInMonth(selectedYear, selectedMonth);
    const startDay = getFirstDayOfMonth(selectedYear, selectedMonth);
    
    const rows = [];
    let currentDay = 1;

    for (let row = 0; row < 6; row++) {
      const cells = [];
      for (let col = 0; col < 7; col++) {
        if ((row === 0 && col < startDay) || currentDay > totalDays) {
          cells.push(<td key={`${row}-${col}`}></td>);
        } else {
          cells.push(<td key={`${row}-${col}`}>{currentDay}</td>);
          currentDay++;
        }
      }
      rows.push(<tr key={row}>{cells}</tr>);
      if (currentDay > totalDays) break;
    }
    return rows;
  };

  return (
    <div className="calendar-container">
      {/* 1. Heading */}
      <h1 id="heading">Calendar</h1>

      {/* Controls Bar */}
      <div className="controls">
        {/* Navigation Buttons */}
        <button id="prev-year" onClick={handlePrevYear}>&lt;&lt;</button>
        <button id="prev-month" onClick={handlePrevMonth}>&lt;</button>

        {/* Month Dropdown */}
        <select id="month" value={selectedMonth} onChange={handleMonthChange}>
          {MONTHS.map((monthName, index) => (
            <option key={monthName} value={index}>
              {monthName}
            </option>
          ))}
        </select>

        {/* Editable Year */}
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
          <span id="year" onDoubleClick={handleYearDoubleClick}>
            {selectedYear}
          </span>
        )}

        <button id="next-month" onClick={handleNextMonth}>&gt;</button>
        <button id="next-year" onClick={handleNextYear}>&gt;&gt;</button>
      </div>

      {/* 2. Days Table */}
      <table id="days-table">
        <thead>
          <tr>
            {DAYS_OF_WEEK.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>{renderCalendarMatrix()}</tbody>
      </table>
    </div>
  );
}
