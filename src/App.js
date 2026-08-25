import React, { useState } from 'react';
import './App.css';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date(2023, 1, 1)); // February 2023
  const [selectedMonth, setSelectedMonth] = useState(1); // February = 1
  const [selectedYear, setSelectedYear] = useState(2023);
  const [isEditingYear, setIsEditingYear] = useState(false);
  const [yearInput, setYearInput] = useState('2023');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);
    const days = [];

    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  // Handle month change from dropdown
  const handleMonthChange = (event) => {
    const newMonth = parseInt(event.target.value);
    setSelectedMonth(newMonth);
    setCurrentDate(new Date(selectedYear, newMonth, 1));
  };

  // Handle year editing
  const handleYearDoubleClick = () => {
    setIsEditingYear(true);
    setYearInput(selectedYear.toString());
  };

  const handleYearInputChange = (event) => {
    setYearInput(event.target.value);
  };

  const handleYearInputBlur = () => {
    const newYear = parseInt(yearInput);
    if (!isNaN(newYear) && newYear > 0 && newYear < 10000) {
      setSelectedYear(newYear);
      setCurrentDate(new Date(newYear, selectedMonth, 1));
    }
    setIsEditingYear(false);
  };

  const handleYearInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleYearInputBlur();
    }
    if (event.key === 'Escape') {
      setIsEditingYear(false);
      setYearInput(selectedYear.toString());
    }
  };

  // Navigation handlers
  const handlePrevMonth = () => {
    let newMonth = selectedMonth - 1;
    let newYear = selectedYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }
    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
    setCurrentDate(new Date(newYear, newMonth, 1));
  };

  const handleNextMonth = () => {
    let newMonth = selectedMonth + 1;
    let newYear = selectedYear;
    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }
    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
    setCurrentDate(new Date(newYear, newMonth, 1));
  };

  const handlePrevYear = () => {
    const newYear = selectedYear - 1;
    setSelectedYear(newYear);
    setCurrentDate(new Date(newYear, selectedMonth, 1));
  };

  const handleNextYear = () => {
    const newYear = selectedYear + 1;
    setSelectedYear(newYear);
    setCurrentDate(new Date(newYear, selectedMonth, 1));
  };

  // Build calendar rows
  const buildCalendarRows = () => {
    const rows = [];
    const totalDays = calendarDays.length;
    const numRows = Math.ceil(totalDays / 7);

    for (let i = 0; i < numRows; i++) {
      const start = i * 7;
      const end = Math.min(start + 7, totalDays);
      const row = calendarDays.slice(start, end);
      // Pad row with empty cells if needed
      while (row.length < 7) {
        row.push(null);
      }
      rows.push(row);
    }

    return rows;
  };

  const calendarRows = buildCalendarRows();

  return (
    <div className="App" id="calendar-app">
      <h1 id="calendar-heading">Calendar</h1>
      
      <div id="calendar-controls">
        <div id="month-year-controls">
          <select 
            id="month-select" 
            value={selectedMonth} 
            onChange={handleMonthChange}
          >
            {months.map((month, index) => (
              <option key={index} value={index}>
                {month}
              </option>
            ))}
          </select>
          
          <div id="year-display">
            {isEditingYear ? (
              <input
                id="year-input"
                type="number"
                value={yearInput}
                onChange={handleYearInputChange}
                onBlur={handleYearInputBlur}
                onKeyDown={handleYearInputKeyDown}
                autoFocus
                min="1"
                max="9999"
              />
            ) : (
              <span 
                id="year-text" 
                onDoubleClick={handleYearDoubleClick}
              >
                {selectedYear}
              </span>
            )}
          </div>
        </div>
        
        <div id="navigation-buttons">
          <button id="prev-month" onClick={handlePrevMonth}>← Month</button>
          <button id="next-month" onClick={handleNextMonth}>Month →</button>
          <button id="prev-year" onClick={handlePrevYear}>← Year</button>
          <button id="next-year" onClick={handleNextYear}>Year →</button>
        </div>
      </div>

      <table id="calendar-table">
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
          {calendarRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((day, colIndex) => (
                <td key={colIndex}>
                  {day !== null ? day : ''}
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
