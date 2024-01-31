import React, { useState } from 'react';

const Event = ({ onClose, startDate, endDate, eventDetails }) => {
  const [eventName, setEventName] = useState('');

  const handleAddEvent = () => {
    // Check if eventName is not empty and both start and end dates are provided
    if (eventName.trim() !== '' && startDate && endDate) {
      const event = {
        name: eventName,
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
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="event-modal">
      {eventDetails ? (
        // Display event details
        <div>
          <div className="event-header">Event Details</div>
          <div className="event-dates">
            <div>Name: {eventDetails.name}</div>
            <div>Start Date: {`${eventDetails.startDate.getDate()}-${eventDetails.startDate.getMonth() + 1}-${eventDetails.startDate.getFullYear()}`}</div>
          <div>End Date: {`${eventDetails.endDate.getDate()}-${eventDetails.endDate.getMonth() + 1}-${eventDetails.endDate.getFullYear()}`}</div>
          </div>
          <button className="event-btn" onClick={handleClose}>
            Close
          </button>
        </div>
      ) : (
        // Display event add form
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
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
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
