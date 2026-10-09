# Calendar React

import React, { useState } from 'react';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [year, setYear] = useState(currentDate.getFullYear());
    const [month, setMonth] = useState(currentDate.getMonth());

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const handleMonthChange = (event) => {
        setMonth(event.target.value);
    };

    const handleYearChange = (event) => {
        setYear(event.target.value);
    };

    const handleYearDoubleClick = () => {
        const input = document.getElementById('year-input');
        input.style.display = 'block';
        input.focus();
    };

    const updateDays = () => {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
        return daysArray;
    };

    const navigateMonth = (direction) => {
        if (direction === 'next') {
            setMonth(month === 11 ? 0 : month + 1);
            if (month === 11) setYear(year + 1);
        } else {
            setMonth(month === 0 ? 11 : month - 1);
            if (month === 0) setYear(year - 1);
        }
    };

    return (
        <div>
            <h1 id="calendar-heading">Calendar</h1>
            <select id="month-dropdown" onChange={handleMonthChange} value={month}>
                {months.map((monthName, index) => (
                    <option key={index} value={index}>{monthName}</option>
                ))}
            </select>
            <div id="year-display" onDoubleClick={handleYearDoubleClick}>
                <input
                    id="year-input"
                    type="number"
                    value={year}
                    onChange={handleYearChange}
                    style={{ display: 'none' }}
                />
                {year}
            </div>
            <table>
                <tbody>
                    <tr>
                        {updateDays().map(day => (
                            <td key={day}>{day}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
            <button onClick={() => navigateMonth('prev')}>Previous</button>
            <button onClick={() => navigateMonth('next')}>Next</button>
        </div>
    );
};

export default Calendar;
