import React, { useState } from 'react';
import EventColorPicker from './EventColorPicker';

const Event = ({ onClose, startDate, endDate, eventDetails, onDelete, categories}) => {
  const [eventName, setEventName] = useState('');
  const [eventSlug, setEventSlug] = useState('');
  const [eventCategory, setEventCategory] = useState('');
  const [startHour, setStartHour] = useState(0);
  const [startMinute, setStartMinute] = useState(0);
  const [startSecond, setStartSecond] = useState(0);
  const [endHour, setEndHour] = useState(0);
  const [endMinute, setEndMinute] = useState(0);
  const [endSecond, setEndSecond] = useState(0);
  const [selectedColor, setSelectedColor] = useState('#d44b4bea');
  const [category, setCategory] = useState('');

  const handleAddEvent = () => {
  
    if (eventName.trim() !== '' && startDate && endDate) {
      const event = {
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

  const handleCategory = (category) => {
    setCategory(category);
  };

  return (
    <div className="event-modal">
      {eventDetails ? (
        //detalji
        <div>
          <div className="event-header">Event Details</div>
          <div className="event-dates">
            <div>Name: {eventDetails.name}</div>
            <div>Slug: {eventDetails.slug}</div>
            <div>Category: {(eventDetails.category != null) ? eventDetails.category.name : 'none'}</div>
            <div>Start Date: {`${eventDetails.startDate.getDate()}-${eventDetails.startDate.getMonth() + 1}-${eventDetails.startDate.getFullYear()}`}</div>
          <div>End Date: {`${eventDetails.endDate.getDate()}-${eventDetails.endDate.getMonth() + 1}-${eventDetails.endDate.getFullYear()}`}</div>
          </div>
          <button className="event-btn" onClick={handleDelete}>
            Delete Event
          </button>
          <button className="event-btn" onClick={handleClose}>
            Close
          </button>
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
  );
};

export default Event;
