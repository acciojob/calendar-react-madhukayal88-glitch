import React, { useState } from 'react';
import './App.css';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [isEditingYear, setIsEditingYear] = useState(false);
  const [yearInput, setYearInput] = useState(selectedYear.toString());

  // Get days in month
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);
    const days = [];

    // Empty cells for days before the first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Actual days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const calendarDays = generateCalendarDays();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Handlers
  const handleMonthChange = (e) => {
    const newMonth = parseInt(e.target.value);
    setSelectedMonth(newMonth);
    const newDate = new Date(selectedYear, newMonth, 1);
    setCurrentDate(newDate);
  };

  const handleYearDoubleClick = () => {
    setIsEditingYear(true);
    setYearInput(selectedYear.toString());
  };

  const handleYearInputChange = (e) => {
    setYearInput(e.target.value);
  };

  const handleYearInputBlur = () => {
    const newYear = parseInt(yearInput);
    if (!isNaN(newYear) && newYear > 0) {
      setSelectedYear(newYear);
      const newDate = new Date(newYear, selectedMonth, 1);
      setCurrentDate(newDate);
    }
    setIsEditingYear(false);
  };

  const handleYearInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleYearInputBlur();
    }
  };

  const handlePrevMonth = () => {
    let newMonth = selectedMonth - 1;
    let newYear = selectedYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }
    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
    const newDate = new Date(newYear, newMonth, 1);
    setCurrentDate(newDate);
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
    const newDate = new Date(newYear, newMonth, 1);
    setCurrentDate(newDate);
  };

  const handlePrevYear = () => {
    const newYear = selectedYear - 1;
    setSelectedYear(newYear);
    const newDate = new Date(newYear, selectedMonth, 1);
    setCurrentDate(newDate);
  };

  const handleNextYear = () => {
    const newYear = selectedYear + 1;
    setSelectedYear(newYear);
    const newDate = new Date(newYear, selectedMonth, 1);
    setCurrentDate(newDate);
  };

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
            {monthNames.map((month, index) => (
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
          {Array.from({ length: Math.ceil(calendarDays.length / 7) }, (_, weekIndex) => {
            const start = weekIndex * 7;
            const end = start + 7;
            const week = calendarDays.slice(start, end);
            return (
              <tr key={weekIndex}>
                {week.map((day, dayIndex) => (
                  <td key={dayIndex}>
                    {day !== null ? day : ''}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
