import React, { useState, useEffect } from 'react';
import Event from './Event';
import Button from './Button';
import axios from 'axios';

const Calendar = ({ events, updateEvents, currentUser, categories, updateCategories }) => {

  const [date, setDate] = useState(new Date());
  const [hoveredDay, setHoveredDay] = useState(null);
  const [startDay, setStartDay] = useState(null);
  const [endDay, setEndDay] = useState(null);
  const [clickCount, setClickCount] = useState(0);
  const [isEventVisible, setIsEventVisible] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedEventDetails, setSelectedEventDetails] = useState(null);

  const axiosInstance = axios.create({
    headers: {
      'Authorization': 'Bearer '+ window.sessionStorage.getItem("auth_token"),
    }
  });
  useEffect(()=>{

    if (events == null) {
      axiosInstance.get("api/events").then((res) => {
        console.log(res.data);
        const updatedEvents = { ...events };
    
        res.data.events.forEach(event => {
          if (event.user != null && event.user.id == window.sessionStorage.getItem("user_id")) {
            const eventDate = new Date(event.start);
            const key = `${eventDate.getMonth() + 1}-${eventDate.getFullYear()}-${eventDate.getDate()}`;
            
            if (updatedEvents[key]) {
              // ako ima bar jedan event na danu
              updatedEvents[key].push({
                id: event.id,
                name: event.name,
                slug: event.slug,
                startDate: new Date(event.start),
                endDate: new Date(event.end),
                category: event.category,
                color: event.color
              });
            } else {
              // ako je dan prazan
              updatedEvents[key] = [{
                id: event.id,
                name: event.name,
                slug: event.slug,
                startDate: new Date(event.start),
                endDate: new Date(event.end),
                category: event.category,
                color: event.color
              }];
            }
          }
        });
    
        console.log('Updated Events:', updatedEvents);
        updateEvents(updatedEvents);
      });
    }
    if(categories == null){
      axiosInstance.get("api/categories").then((res) => {
        const updatedCategories = res.data.categories.map(category => ({
          id: category.id,
          name: category.name
        }));

      console.log('Updated Categories:', updatedCategories);
      updateCategories(updatedCategories);
      })
    }
  }, []);

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
          const dayEvents = events && events[key] ? events[key] : [];
    
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
            backgroundColor: `${event.color}`
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
      
      axiosInstance.post("api/events", {name: event.name,
        slug: event.slug, start: `${event.startDate.year}-${event.startDate.month}-${event.startDate.day} ${event.startDate.hour}:${event.startDate.minute}:${event.startDate.second}`, 
        end: `${event.endDate.year}-${event.endDate.month}-${event.endDate.day} ${event.endDate.hour}:${event.endDate.minute}:${event.endDate.second}`, category_id: event.category, color: event.color
      }).then((res)=>{console.log(res.data);
        if (updatedEvents[key]) {
          updatedEvents[key].push({
            id: res.data[1].id,
            name: event.name,
            slug: event.slug,
            category: event.category,
            startDate: new Date(event.startDate.year, event.startDate.month - 1, event.startDate.day, event.startDate.hour, event.startDate.minute, event.startDate.second),
            endDate: new Date(date.getFullYear(), date.getMonth(), endDay, event.endDate.hour, event.endDate.minute, event.endDate.second),
            color: event.color
          });
        } else {
            // >:(
          updatedEvents[key] = [{
            id: res.data[1].id,
            name: event.name,
            slug: event.slug,
            category: event.category,
            startDate: new Date(event.startDate.year, event.startDate.month - 1, event.startDate.day, event.startDate.hour, event.startDate.minute, event.startDate.second),
            endDate: new Date(date.getFullYear(), date.getMonth(), endDay, event.endDate.hour, event.endDate.minute, event.endDate.second),
            color: event.color
          }];
        }
        console.log(`${event.startDate.year}-${event.startDate.month}-${event.startDate.day} ${event.startDate.hour}:${event.startDate.minute}:${event.startDate.second}`);
        
  
        console.log('Updated Events:', updatedEvents);
        updateEvents(updatedEvents);
        }).catch((e)=>{
          console.log(e);
          alert("Category field is required!");
        });
    }
    else if(event)
    {
      const updatedEvents = { ...events };
      const currentDate = new Date(date.getFullYear(), date.getMonth(), event.startDate.day);
      const key = `${currentDate.getMonth() + 1}-${currentDate.getFullYear()}-${event.startDate.day}`;
      console.log(event.color);
      axiosInstance.put(`api/events/${event.id}`, {name: event.name,
        slug: event.slug, start: `${event.sd.split('-')[0]}-${event.sd.split('-')[1]}-${event.sd.split('-')[2]} ${event.startDate.hour}:${event.startDate.minute}:${event.startDate.second}`, 
        end: `${event.ed.split('-')[0]}-${event.ed.split('-')[1]}-${event.ed.split('-')[2]} ${event.endDate.hour}:${event.endDate.minute}:${event.endDate.second}`, category_id: event.category, color: event.color
      }).then((res)=>{console.log(res.data);
          updatedEvents[key] = [{
            id: event.id,
            name: event.name,
            slug: event.slug,
            category: event.category,
            startDate: new Date(parseInt(event.sd.split('-')[0], 10), parseInt(event.sd.split('-')[1], 10)-1, parseInt(event.sd.split('-')[2], 10), event.startDate.hour, event.startDate.minute, event.startDate.second),
            endDate: new Date(parseInt(event.ed.split('-')[0], 10), parseInt(event.ed.split('-')[1], 10)-1, parseInt(event.ed.split('-')[2], 10), event.endDate.hour, event.endDate.minute, event.endDate.second),
            color: event.color
          }];
        console.log(updatedEvents[key]);
        
  
        console.log('Updated Events:', updatedEvents);
        updateEvents(updatedEvents);
        }).catch((e)=>{
          console.log(e);
          alert("Category field is required!");
        });
    }
  
    setClickCount(0);
    setStartDay(null);
    setEndDay(null);
    setSelectedEventDetails(null);
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
      let id = 0;
      axiosInstance.get(`api/events/${eventToDelete.id}/notifications/1`).then((res) => {console.log(res.data); id = res.data.id
        if(id != 0)
        axiosInstance.delete(`api/notifications/${id}`).then((res) => {console.log(res.data)});
      }).catch((e)=>{
        console.log(e);
      });
      
      axiosInstance.delete(`api/events/${eventToDelete.id}`).then((res) => {console.log(res.data)});
      
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
          categories={categories}
        />
        )}
 {selectedEventDetails && (
        <Event
          onClose={handleCloseEvent}
          eventDetails={selectedEventDetails}
          onDelete={handleEventDelete}
          categories={categories}
        />
      )}

      </div>
    </div>
  );
};

export default Calendar;
