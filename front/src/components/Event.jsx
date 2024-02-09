import React, { useState, useEffect } from 'react';
import EventColorPicker from './EventColorPicker';
import Notification from './Notification';
import axios from 'axios';

const Event = ({ onClose, startDate, endDate, eventDetails, onDelete, categories, prof}) => {
  const [eventID, setEventID] = useState(0);
  const [eventName, setEventName] = useState('');
  const [eventSlug, setEventSlug] = useState('');
  const [eventCategory, setEventCategory] = useState(0);
  const [startHour, setStartHour] = useState(0);
  const [startMinute, setStartMinute] = useState(0);
  const [startSecond, setStartSecond] = useState(0);
  const [endHour, setEndHour] = useState(0);
  const [endMinute, setEndMinute] = useState(0);
  const [endSecond, setEndSecond] = useState(0);
  const [selectedColor, setSelectedColor] = useState('#d44b4bea');
  const [category, setCategory] = useState('');
  const [sd, setSD] = useState(null);
  const [sDate, setSDate] = useState(null);
  const [ed, setED] = useState(null);
  const [eDate, setEDate] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [updatedNotification, setUpdatedNotification] = useState(null);
  const [no, setNo] = useState(false);

  const axiosInstance = axios.create({
    headers: {
      'Authorization': 'Bearer '+ window.sessionStorage.getItem("auth_token"),
    }
  });

  const handleAddEvent = () => {
    if (eventName.trim() !== '' && startDate && endDate) {
      const event = {
        id: eventID,
        name: eventName,
        slug: eventSlug,
        category: eventCategory,
        startDate: {
          day: startDate.day,
          month: startDate.month,
          year: startDate.year,
          hour: startHour,
          minute: startMinute,
          second: startSecond
        },
        endDate: {
          day: endDate.day,
          month: endDate.month,
          year: endDate.year,
          hour: endHour,
          minute: endMinute,
          second: endSecond
        },
        color: selectedColor
      };

      onClose(event);
      //onDelete(event);

    }
    console.log(startDate);
  };

  const handleEditEvent = () => {
    if (eventName.trim() !== '') {
      const event = {
        id: eventID,
        name: eventName,
        slug: eventSlug,
        category: eventCategory,
        startDate: {
          day: eventDetails.startDate.getDate(),
          month: eventDetails.startDate.getMonth()+1,
          year: eventDetails.startDate.getFullYear(),
          hour: startHour,
          minute: startMinute,
          second: startSecond
        },
        endDate: {
          day: eventDetails.endDate.getDate(),
          month: eventDetails.endDate.getMonth()+1,
          year: eventDetails.endDate.getFullYear(),
          hour: endHour,
          minute: endMinute,
          second: endSecond
        },
        color: selectedColor,
        sd:sd,
        ed:ed,
        sDate: sDate,
        eDate: eDate
      };

      onClose(event);
    }
  };


  const handleClose = () => {
    onClose();
  };

  const handleDelete = () => {
    onDelete(eventDetails);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };
  const latitude = 40.7128; // Latitude of New York City
const longitude = -74.0060; // Longitude of New York City
const date = '2024-02-10'; // Date for which you want to retrieve weather forecast data

  useEffect(() => {
    if(eventDetails != null){
    if(eventID == 0)
      setEventID(eventDetails.id);
    if(startHour == 0)
    setStartHour(eventDetails.startDate.getHours());
    if(startMinute == 0)
    setStartMinute(eventDetails.startDate.getMinutes());
    if(startSecond == 0)
    setStartSecond(eventDetails.startDate.getSeconds());
    
    if(endHour == 0)
    setEndHour(eventDetails.endDate.getHours());
    if(endMinute == 0)
    setEndMinute(eventDetails.endDate.getMinutes());
    if(endSecond == 0)
    setEndSecond(eventDetails.endDate.getSeconds());
    if(eventName == '')
    setEventName(eventDetails.name);
    if(eventSlug == ''){
    setEventSlug(eventDetails.slug);
    setSelectedColor(eventDetails.color);
    }
    if(eventCategory==0)
      setEventCategory(eventDetails.category.id === undefined ? eventDetails.category : eventDetails.category.id);
    console.log(eventCategory);
    if(sd == null){
      setSD(`${eventDetails.startDate.getFullYear()}-${eventDetails.startDate.getMonth()+1}-${eventDetails.startDate.getDate()}`);
      setSDate(eventDetails.startDate);
    }
    if(ed == null){
      setED(`${eventDetails.endDate.getFullYear()}-${eventDetails.endDate.getMonth()+1}-${eventDetails.endDate.getDate()}`);
      setEDate(eventDetails.endDate);
    }
    }
    if(!updatedNotification && eventID != 0 && !no){
        setNo(true);
      axiosInstance.get(`api/events/${eventID}/notifications/1`).then((res) => {
        console.log(res.data);
        setUpdatedNotification({
          id: res.data.id,
          title: res.data.title, 
          description: res.data.description,
          slug: res.data.slug, 
          hoursBefore: res.data.hoursBefore,
          event_id: res.data.event_id.id
        });
      }).catch((e)=>{
          console.log(e);
        });
    }

  });

  async function getWeatherForecastForDate(latitude, longitude, date) {
    try {
      let key = '2c863b40e5ac50b49d0e72931f74f81d';
      // Make a request to the OpenWeatherMap API
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=current,minutely,hourly,alerts&appid=${key}}`
      );
  
      // Extract the forecast data
      const forecastData = response.data.daily;
  
      // Find the forecast for the specific date
      const desiredForecast = forecastData.find(forecast => {
        const forecastDate = new Date(forecast.dt * 1000);
        return forecastDate.toISOString().split('T')[0] === date;
      });
  
      // Print the forecast data for the specific date
      console.log(desiredForecast);
    } catch (error) {
      console.error('Error fetching weather forecast data:', error.message);
    }
  }

  const handleAddNotification = () => {
    setShowNotification(true);
  };
  
  const handleCloseNotification = (notification) => {
    setShowNotification(false);

    if(notification){
      if(isNaN(notification.hoursBefore)){
      alert("Hours before must be numeric!");}
      else{
    if (!updatedNotification) {
      axiosInstance.post("api/notifications", {title: notification.title, description: notification.description,
        slug: notification.slug, hoursBefore: notification.hoursBefore, event_id: eventID
      }).then((res)=>{console.log(res.data);
        setUpdatedNotification({
          id: res.data[1].id,
          title: notification.title, 
          description: notification.description,
          slug: notification.slug, 
          hoursBefore: notification.hoursBefore,
          event_id: eventID
        });
  
        console.log('Updated Notification:', updatedNotification);
        }).catch((e)=>{
          console.log(e);
        });
    }
    else
    {
      axiosInstance.put(`api/notifications/${updatedNotification.id}`, {title: notification.title, description: notification.description,
        slug: notification.slug, hoursBefore: notification.hoursBefore, event_id: eventID
      }).then((res)=>{console.log(res.data);
        setUpdatedNotification({
          id: updatedNotification.id,
          title: notification.title, 
          description: notification.description,
          slug: notification.slug, 
          hoursBefore: notification.hoursBefore,
          event_id: eventID
        });
  
        console.log('Updated Notification:', updatedNotification);
        }).catch((e)=>{
          console.log(e);
        });
    }
  }
  }
  }

  const handleNotificationDelete = (notificationToDelete) => {
    if (notificationToDelete) {
      setUpdatedNotification(null);
      axiosInstance.delete(`api/notifications/${notificationToDelete.id}`).then((res) => {console.log(res.data)});
    }
  }
  

  return (
    <div className="event-modal">
      {prof ? (
    // Show Event Details
    <div>
      <div className="event-header">Event Details</div>
      <div className="event-dates">
        <div>Name: {eventDetails.name}</div>
        <div>Slug: {eventDetails.slug}</div>
        <div>Category: {(eventDetails.category != null) ? eventDetails.category.name : 'none'}</div>
        <div>Start Date: {`${eventDetails.startDate.getDate()}-${eventDetails.startDate.getMonth() + 1}-${eventDetails.startDate.getFullYear()} ${eventDetails.startDate.getHours()}:${eventDetails.startDate.getMinutes()}:${eventDetails.startDate.getSeconds()}`}</div>
        <div>End Date: {`${eventDetails.endDate.getDate()}-${eventDetails.endDate.getMonth() + 1}-${eventDetails.endDate.getFullYear()} ${eventDetails.endDate.getHours()}:${eventDetails.endDate.getMinutes()}:${eventDetails.endDate.getSeconds()}`}</div>
        <div>Colour: 
        <button
          className="color-button"
          style={{ backgroundColor: selectedColor, border: '3px solid black'}}
        ></button>
        </div>
        {updatedNotification && (<div><div>Notification title: {updatedNotification.title}
          </div><div>Notification description: {updatedNotification.description}
          </div><div>Hours before: {updatedNotification.hoursBefore}
          </div></div>)}
      </div>
      <button className="event-btn" onClick={handleClose}>
        Close
      </button>
    </div>
  ) : (
    <div>
      {eventDetails ? (
        //detalji
        <div>
          <div className="event-header">Edit Event Details</div>
          <div className="event-dates">
            <div>
              Start Date:
              <input
            type="text"
            className="event-input"
            placeholder="Start Date"
            defaultValue={sd}
            onChange={(e) => setSD(e.target.value)}
          />
            </div>
            <div className="number-selector">
              <button className="arrow-button" onClick={() => setStartHour(Math.max(startHour - 1, 0))}>&#9666;</button>
              <input
                type="text"
                className="event-input-time"
                placeholder="hrs"
                value={startHour}
                onChange={(e) => setStartHour(Math.max(0, Math.min(parseInt(e.target.value) || 0, 23)))}
              />
              <button className="arrow-button" onClick={() => setStartHour(Math.min(startHour + 1, 23))}>&#9656;</button>
              <p>:</p>
              <button className="arrow-button" onClick={() => setStartMinute(Math.max(startMinute - 1, 0))}>&#9666;</button>
              <input
                type="text"
                className="event-input-time"
                placeholder="min"
                value={startMinute}
                onChange={(e) => setStartMinute(Math.max(0, Math.min(parseInt(e.target.value) || 0, 59)))}
              />
              <button className="arrow-button" onClick={() => setStartMinute(Math.min(startMinute + 1, 59))}>&#9656;</button>
              <p>:</p>
              <button className="arrow-button" onClick={() => setStartSecond(Math.max(startSecond - 1, 0))}>&#9666;</button>
              <input
                type="text"
                className="event-input-time"
                placeholder="sec"
                value={startSecond}
                onChange={(e) => setStartSecond(Math.max(0, Math.min(parseInt(e.target.value) || 0, 59)))}
              />
              <button className="arrow-button" onClick={() => setStartSecond(Math.min(startSecond + 1, 59))}>&#9656;</button>
            </div>
            <div>
              End Date:
              <input
            type="text"
            className="event-input"
            placeholder="End Date"
            defaultValue={ed}
            onChange={(e) => setED(e.target.value)}
          />
            </div>
            <div className="number-selector">
              <button className="arrow-button" onClick={() => setEndHour(Math.max(endHour - 1, 0))}>&#9666;</button>
              <input
                type="text"
                className="event-input-time"
                placeholder="hrs"
                value={endHour}
                onChange={(e) => setEndHour(Math.max(0, Math.min(parseInt(e.target.value) || 0, 23)))}
              />
              <button className="arrow-button" onClick={() => setEndHour(Math.min(endHour + 1, 23))}>&#9656;</button>
              <p>:</p>
              <button className="arrow-button" onClick={() => setEndMinute(Math.max(endMinute - 1, 0))}>&#9666;</button>
              <input
                type="text"
                className="event-input-time"
                placeholder="min"
                value={endMinute}
                onChange={(e) => setEndMinute(Math.max(0, Math.min(parseInt(e.target.value) || 0, 59)))}
              />
              <button className="arrow-button" onClick={() => setEndMinute(Math.min(endMinute + 1, 59))}>&#9656;</button>
              <p>:</p>
              <button className="arrow-button" onClick={() => setEndSecond(Math.max(endSecond - 1, 0))}>&#9666;</button>
              <input
                type="text"
                className="event-input-time"
                placeholder="sec"
                value={endSecond}
                onChange={(e) => setEndSecond(Math.max(0, Math.min(parseInt(e.target.value) || 0, 59)))}
              />
              <button className="arrow-button" onClick={() => setEndSecond(Math.min(endSecond + 1, 59))}>&#9656;</button>
            </div>
          </div>
          <input
            type="text"
            className="event-input"
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
          <input
            type="text"
            className="event-input"
            placeholder="Event Slug"
            value={eventSlug}
            onChange={(e) => setEventSlug(e.target.value)}
          />
          <select
            className="event-input"
            value={eventCategory}
            onChange={(e) => setEventCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <EventColorPicker selectedColor={selectedColor} onSelectColor={handleColorSelect} />
          {updatedNotification && (<div>Notification title: <input
                type="text"
                className="event-input"
                value={updatedNotification.title}
                readOnly = {true}
              /></div>)}
          <div className="event-buttons">
          <button className="event-btn" onClick={handleDelete}>
            Delete Event
          </button>
            {!updatedNotification && (<button className="event-btn" onClick={handleAddNotification}>
            Add notification
          </button>)}
          {updatedNotification && (<button className="event-btn" onClick={handleAddNotification}>
            Edit notification
          </button>)}
          
          {showNotification && (<div className="notification-container">
          <Notification onClose={handleCloseNotification} event_id={eventID} notification={updatedNotification} onDelete={handleNotificationDelete}/>
        </div>)}
        
         {}
            <button className="event-btn" onClick={handleEditEvent}>
              Save changes
            </button>
            <button className="event-btn" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      ) : (
        // add event
        <div>
          <div className="event-header">Add Event</div>
          <div className="event-dates">
            <div>
              Start Date: {startDate && `${startDate.day}-${startDate.month}-${startDate.year}`}
            </div>
            <div className="number-selector">
              <button className="arrow-button" onClick={() => setStartHour(Math.max(startHour - 1, 0))}>&#9666;</button>
              <input
                type="text"
                className="event-input-time"
                placeholder="hrs"
                value={startHour}
                onChange={(e) => setStartHour(Math.max(0, Math.min(parseInt(e.target.value) || 0, 23)))}
              />
              <button className="arrow-button" onClick={() => setStartHour(Math.min(startHour + 1, 23))}>&#9656;</button>
              <p>:</p>
              <button className="arrow-button" onClick={() => setStartMinute(Math.max(startMinute - 1, 0))}>&#9666;</button>
              <input
                type="text"
                className="event-input-time"
                placeholder="min"
                value={startMinute}
                onChange={(e) => setStartMinute(Math.max(0, Math.min(parseInt(e.target.value) || 0, 59)))}
              />
              <button className="arrow-button" onClick={() => setStartMinute(Math.min(startMinute + 1, 59))}>&#9656;</button>
              <p>:</p>
              <button className="arrow-button" onClick={() => setStartSecond(Math.max(startSecond - 1, 0))}>&#9666;</button>
              <input
                type="text"
                className="event-input-time"
                placeholder="sec"
                value={startSecond}
                onChange={(e) => setStartSecond(Math.max(0, Math.min(parseInt(e.target.value) || 0, 59)))}
              />
              <button className="arrow-button" onClick={() => setStartSecond(Math.min(startSecond + 1, 59))}>&#9656;</button>
            </div>
            <div>
              End Date: {endDate && `${endDate.day}-${endDate.month}-${endDate.year}`}
            </div>
            <div className="number-selector">
              <button className="arrow-button" onClick={() => setEndHour(Math.max(endHour - 1, 0))}>&#9666;</button>
              <input
                type="text"
                className="event-input-time"
                placeholder="hrs"
                value={endHour}
                onChange={(e) => setEndHour(Math.max(0, Math.min(parseInt(e.target.value) || 0, 23)))}
              />
              <button className="arrow-button" onClick={() => setEndHour(Math.min(endHour + 1, 23))}>&#9656;</button>
              <p>:</p>
              <button className="arrow-button" onClick={() => setEndMinute(Math.max(endMinute - 1, 0))}>&#9666;</button>
              <input
                type="text"
                className="event-input-time"
                placeholder="min"
                value={endMinute}
                onChange={(e) => setEndMinute(Math.max(0, Math.min(parseInt(e.target.value) || 0, 59)))}
              />
              <button className="arrow-button" onClick={() => setEndMinute(Math.min(endMinute + 1, 59))}>&#9656;</button>
              <p>:</p>
              <button className="arrow-button" onClick={() => setEndSecond(Math.max(endSecond - 1, 0))}>&#9666;</button>
              <input
                type="text"
                className="event-input-time"
                placeholder="sec"
                value={endSecond}
                onChange={(e) => setEndSecond(Math.max(0, Math.min(parseInt(e.target.value) || 0, 59)))}
              />
              <button className="arrow-button" onClick={() => setEndSecond(Math.min(endSecond + 1, 59))}>&#9656;</button>
            </div>
          </div>
          <input
            type="text"
            className="event-input"
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
          <input
            type="text"
            className="event-input"
            placeholder="Event Slug"
            value={eventSlug}
            onChange={(e) => setEventSlug(e.target.value)}
          />
          <select
            className="event-input"
            value={eventCategory}
            onChange={(e) => setEventCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <EventColorPicker selectedColor={selectedColor} onSelectColor={handleColorSelect} />
          <div className="event-buttons">
            <button className="event-btn" onClick={handleAddEvent}>
              Add Event
            </button>
            <button className="event-btn" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )}
  </div>
)};

export default Event;
