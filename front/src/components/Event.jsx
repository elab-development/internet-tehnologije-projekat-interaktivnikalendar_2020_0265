import React, { useState } from 'react';

const Event = ({ onClose, startDate, endDate, eventDetails, onDelete }) => {
  const [eventName, setEventName] = useState('');
  const [eventCategory, setEventCategory] = useState('');

  const handleAddEvent = () => {
  
    if (eventName.trim() !== '' && startDate && endDate) {
      const event = {
        name: eventName,
        category: eventCategory, 
        startDate: {
          day: startDate.day,
          month: startDate.month,
          year: startDate.year,
        },
        endDate: {
          day: endDate.day,
          month: endDate.month,
          year: endDate.year,
        },
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
  
  return (
    <div className="event-modal">
      {eventDetails ? (
        //detalji
        <div>
          <div className="event-header">Event Details</div>
          <div className="event-dates">
            <div>Name: {eventDetails.name}</div>
            <div>Category: {eventDetails.category}</div>
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
            <div>
              End Date: {endDate && `${endDate.day}-${endDate.month}-${endDate.year}`}
            </div>
          </div>
          <input
            type="text"
            className="event-input"
            placeholder="Event Name"S
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
          <input
            type="text"
            className="event-input"
            placeholder="Event Category"
            value={eventCategory}
            onChange={(e) => setEventCategory(e.target.value)}
          />
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
