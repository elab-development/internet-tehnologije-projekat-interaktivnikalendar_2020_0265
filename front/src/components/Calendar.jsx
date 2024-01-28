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
        const weeksNeeded = Math.ceil((totalDays + startingDay) / 7);
      
        const calendar = [];
      
        let dayCounter = 1;
      
        for (let i = 0; i < weeksNeeded; i++) {
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
    const handleDayClick = (day) => {
        alert(`Clicked on day ${day}`);
        // You can implement additional logic for handling day click
      };
    
      const handlePrevMonth = () => {
        const newDate = new Date(date);
        newDate.setMonth(date.getMonth() - 1);
        setDate(newDate);
      };
    
      const handleNextMonth = () => {
        const newDate = new Date(date);
        newDate.setMonth(date.getMonth() + 1);
        setDate(newDate);
      };

  return (
    <div>
      <div>
      <div className="button-container">
        <button onClick={handlePrevMonth}>Previous Month</button>
        <h1>{date.toLocaleString('default', { month: 'long' })} {date.getFullYear()}</h1>
        <button onClick={handleNextMonth}>Next Month</button>
      </div>

      </div>
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
