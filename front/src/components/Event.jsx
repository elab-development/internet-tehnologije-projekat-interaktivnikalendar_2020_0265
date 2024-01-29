import React, { useState } from 'react';

const Event = ({ onClose, content }) => {
  const [eventName, setEventName] = useState('');

  const handleAddEvent = () => {
    // Pass the event name to the parent component
    onClose(eventName);
  };

  const handleClose = () => {
    onClose(); // Close without passing any content
  };

  return (
    <div className="event-modal">
    <div className="event-header">Add Event</div>
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
  );
};

export default Event;