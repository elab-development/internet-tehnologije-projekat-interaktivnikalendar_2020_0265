import React from 'react'
import { useState } from 'react';
const Calendar = () => {

    const [date, setDate] = useState(new Date());

    const daysInMonth = (month, year) => {
      return new Date(year, month + 1, 0).getDate();
    };
  
    const startOfMonth = () => {
      const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      return firstDay.getDay();
    };
  
    const generateCalendar = () => {
      const totalDays = daysInMonth(date.getMonth(), date.getFullYear());
      const startingDay = startOfMonth();
  
      const calendar = [];
  
      let dayCounter = 1;
  
      for (let i = 0; i < 6; i++) {
        const week = [];
  
        for (let j = 0; j < 7; j++) {
          if (i === 0 && j < startingDay) {
            week.push(<td key={`empty-${j}`}></td>);
          } else if (dayCounter <= totalDays) {
            week.push(<td key={dayCounter}>{dayCounter}</td>);
            dayCounter++;
          } else {
            week.push(<td key={`empty-${j}`}></td>);
          }
        }
  
        calendar.push(<tr key={`week-${i}`}>{week}</tr>);
      }
  
      return calendar;
    };

  return (
    <div>
      <h2>{date.toLocaleString('default', { month: 'long' })} {date.getFullYear()}</h2>
      <table>
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
          {generateCalendar()}
        </tbody>
      </table>
    </div>
  );
}

export default Calendar
