import React, { useState } from 'react';
import Event from './Event';
import Button from './Button';

const Calendar = ({ events, updateEvents  }) => {

  const [date, setDate] = useState(new Date());
  const [hoveredDay, setHoveredDay] = useState(null);
  const [startDay, setStartDay] = useState(null);
  const [endDay, setEndDay] = useState(null);
  const [clickCount, setClickCount] = useState(0);
  const [isEventVisible, setIsEventVisible] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedEventDetails, setSelectedEventDetails] = useState(null);

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const startOfMonth = () => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return firstDay.getDay();
  };

  const handleEventClick = (event, e) => {
    e.stopPropagation(); 
    setSelectedEventDetails(event);
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
              onClick={() => handleDayClick(currentDay, dayEvents)}
              onMouseEnter={() => setHoveredDay(currentDay)}
              onMouseLeave={() => setHoveredDay(null)}
              style={{
                backgroundColor: isDayHovered ? '#d88f8f' : 'inherit',
                position: 'relative',
                verticalAlign: 'top',
              }}
            >
               <div>
               {dayCounter}
          </div>
          {dayEvents.length > 0 && (
    <div className="event-container">
      {dayEvents.map((event, index) => (
        <div
          key={index}
          className="event-card"
          onClick={(e) => handleEventClick(event, e)}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: `${index * 28}px`,
            marginBottom: '5px',
          }}
        >
          {event.name}
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
    if (clickCount === 0) {
      setSelectedStartDate({
        day,
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      });
      setStartDay(day);
    } else if (clickCount === 1) {
      setSelectedEndDate({
        day,
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      });
      setEndDay(day);
      setIsEventVisible(true);
    }

    setClickCount((prevClickCount) => prevClickCount + 1);
  };

  const handleCloseEvent = (event) => {
    setIsEventVisible(false);
  
    if (event && startDay && endDay) {
      const updatedEvents = { ...events };
      const currentDate = new Date(date.getFullYear(), date.getMonth(), startDay);
      const key = `${currentDate.getMonth() + 1}-${currentDate.getFullYear()}-${startDay}`;
  
     
      if (updatedEvents[key]) {
        
        updatedEvents[key].push({
          name: event.name,
          category: event.category,
          startDate: new Date(event.startDate.year, event.startDate.month - 1, event.startDate.day),
          endDate: new Date(date.getFullYear(), date.getMonth(), endDay),
        });
      } else {
          // >:(
        updatedEvents[key] = [{
          name: event.name,
          category: event.category,
          startDate: new Date(event.startDate.year, event.startDate.month - 1, event.startDate.day),
          endDate: new Date(date.getFullYear(), date.getMonth(), endDay),
        }];
      }
  
      console.log('Updated Events:', updatedEvents);
      updateEvents(updatedEvents);
    }
  
    setClickCount(0);
    setStartDay(null);
    setEndDay(null);
    console.log(events);
  };
  
  const handleEventDelete = (eventToDelete) => {
    const startDate = new Date(eventToDelete.startDate);
    const key = `${startDate.getMonth() + 1}-${startDate.getFullYear()}-${startDate.getDate()}`;
  
    const updatedEvents = { ...events };
  
    if (updatedEvents[key]) {
      // >:(
      updatedEvents[key] = updatedEvents[key].filter(
        (event) => !(event.name === eventToDelete.name && event.startDate === eventToDelete.startDate)
      );
  
      if (updatedEvents[key].length === 0) {
        delete updatedEvents[key];
      }
  
      updateEvents(updatedEvents);
     
      //onDeleteEvent(eventToDelete);
      setSelectedEventDetails(null);
    }
  
    console.log("Posle brisanja:", events);
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
        <Button onClick={handlePrevMonth} className="custom-button small-button">
            Previous Month
          </Button>
          <h1>{date.toLocaleString('default', { month: 'long' })} {date.getFullYear()}</h1>
          <Button onClick={handleNextMonth} className="custom-button small-button">
            Next Month
         
          </Button>
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
      {isEventVisible && !selectedEventDetails && (
        <Event
          onClose={handleCloseEvent}
          startDate={selectedStartDate}
          endDate={selectedEndDate}
        />
        )}
 {selectedEventDetails && (
        <Event
          onClose={() => setSelectedEventDetails(null)}
          eventDetails={selectedEventDetails}
          onDelete={handleEventDelete}
        />
      )}

      </div>
    </div>
  );
};

export default Calendar;
