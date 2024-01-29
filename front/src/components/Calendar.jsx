import React, { useState } from 'react';
import Event from './Event';

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [hoveredDay, setHoveredDay] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEventVisible, setIsEventVisible] = useState(false);
  const [events, setEvents] = useState({});

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
          const currentDay = dayCounter;
          const isDayHovered = currentDay === hoveredDay;

          const key = `${date.getMonth() + 1}-${date.getFullYear()}-${currentDay}`;
          const dayEvents = events[key] || [];

          week.push(
            <td
              key={dayCounter}
              onClick={() => handleDayClick(currentDay)}
              onMouseEnter={() => setHoveredDay(currentDay)}
              onMouseLeave={() => setHoveredDay(null)}
              style={{
                backgroundColor: isDayHovered ? '#d88f8f' : 'inherit',
                position: 'relative',
                verticalAlign: 'top',
              }}
            >
              {dayCounter}
              {dayEvents.length > 0 && (
                <div className="event-container">
                  {dayEvents.map((event, index) => (
                    <div key={index} className="event-card">
                      {event}
                    </div>
                  ))}
                </div>
              )}
            </td>
          );
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
    setSelectedEvent(day);
    setIsEventVisible(true);
  };

  const handleCloseEvent = (eventName) => {
    setIsEventVisible(false);

    if (eventName) {
      const key = `${date.getMonth() + 1}-${date.getFullYear()}-${selectedEvent}`;
      setEvents((prevEvents) => ({
        ...prevEvents,
        [key]: [...(prevEvents[key] || []), eventName],
      }));
    }
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
      <div>
        {isEventVisible && (
          <Event onClose={handleCloseEvent} content={selectedEvent} />
        )}
      </div>
    </div>
  );
};

export default Calendar;