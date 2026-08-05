import React, { useState } from 'react';
import './styles.css';

function Calendar() {
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [isEditingYear, setIsEditingYear] = useState(false);
  const [yearInput, setYearInput] = useState(currentDate.getFullYear().toString());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const prevYear = () => {
    setCurrentYear(currentYear - 1);
  };

  const nextYear = () => {
    setCurrentYear(currentYear + 1);
  };

  const handleMonthChange = (e) => {
    setCurrentMonth(parseInt(e.target.value));
  };

  const handleYearDoubleClick = () => {
    setIsEditingYear(true);
    setYearInput(currentYear.toString());
  };

  const handleYearInputChange = (e) => {
    setYearInput(e.target.value);
  };

  const handleYearInputBlur = () => {
    const year = parseInt(yearInput);
    if (!isNaN(year) && year > 0 && year < 3000) {
      setCurrentYear(year);
    } else {
      setYearInput(currentYear.toString());
    }
    setIsEditingYear(false);
  };

  const handleYearInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleYearInputBlur();
    }
  };

  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() && 
           currentMonth === today.getMonth() && 
           currentYear === today.getFullYear();
  };

  return (
    <div className="calendar-container">
      <h1 id="heading" className="calendar-title">Calendar</h1>

      <div className="controls">
        <div className="month-selector">
          <label htmlFor="month-select">Month:</label>
          <select 
            id="month-select" 
            value={currentMonth} 
            onChange={handleMonthChange}
            className="month-dropdown"
          >
            {months.map((month, index) => (
              <option key={index} value={index}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <div className="year-selector">
          <span className="year-label">Year:</span>
          {isEditingYear ? (
            <input
              type="text"
              className="year-input"
              value={yearInput}
              onChange={handleYearInputChange}
              onBlur={handleYearInputBlur}
              onKeyPress={handleYearInputKeyPress}
              autoFocus
            />
          ) : (
            <span 
              id="year-display"
              className="year-display" 
              onDoubleClick={handleYearDoubleClick}
            >
              {currentYear}
            </span>
          )}
        </div>

        <div className="nav-buttons">
          <button id="prev-month-btn" onClick={prevMonth} className="nav-btn">◀ Month</button>
          <button id="next-month-btn" onClick={nextMonth} className="nav-btn">Month ▶</button>
          <button id="prev-year-btn" onClick={prevYear} className="nav-btn">◀ Year</button>
          <button id="next-year-btn" onClick={nextYear} className="nav-btn">Year ▶</button>
        </div>
      </div>

      <table className="calendar-table">
        <thead>
          <tr>
            {daysOfWeek.map((day, index) => (
              <th key={index}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(() => {
            const rows = [];
            for (let i = 0; i < calendarDays.length; i += 7) {
              const week = calendarDays.slice(i, i + 7);
              rows.push(
                <tr key={i}>
                  {week.map((day, index) => (
                    <td 
                      key={index} 
                      className={day !== null ? (isToday(day) ? 'today' : '') : 'empty'}
                    >
                      {day !== null ? day : ''}
                    </td>
                  ))}
                </tr>
              );
            }
            return rows;
          })()}
        </tbody>
      </table>

      <div className="calendar-footer">
        <span>📅 {months[currentMonth]} {currentYear}</span>
        <span className="today-info">Today: {new Date().toLocaleDateString()}</span>
      </div>
    </div>
  );
}

export default Calendar;
