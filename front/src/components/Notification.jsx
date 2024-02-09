import React, { useState, useEffect } from 'react';
import EventColorPicker from './EventColorPicker';

const Notification = ({onClose, onDelete, notification }) => {

    const [notificationID, setNotificationID] = useState(0);
    const [notificationTitle, setNotificationTitle] = useState('');
    const [notificationDescription, setNotificationDescription] = useState('');
    const [notificationSlug, setNotificationSlug] = useState('');
    const [notificationHoursBefore, setNotificationHoursBefore] = useState('');
    const [eventID, setEventID] = useState(0);

    const handleAddNotification = () => {
        if (notificationTitle.trim() !== '') {
          const notification = {
            id: notificationID,
            title: notificationTitle,
            description: notificationDescription,
            slug: notificationSlug,
            hoursBefore: notificationHoursBefore,
            event_id: eventID
          };
    
          onClose(notification);
    
        }
      };

      useEffect(() => {
        if(notification){
            if(notificationID == 0)
            setNotificationID(notification.id);
            if(notificationTitle == '')
            setNotificationTitle(notification.title);
            if(notificationDescription == '')
            setNotificationDescription(notification.description);
            if(notificationSlug == '')
            setNotificationSlug(notification.slug);
            if(notificationHoursBefore == '')
            setNotificationHoursBefore(notification.hoursBefore);
            if(eventID == 0)
            setEventID(notification.event_id);
        }
      });

    const handleClose = () => {
        onClose();
      };

      const handleDelete = () => {
        onDelete(notification);
      };

  return (
    <div>
        
          <div className="event-header">{notification && <div>Edit Notification</div>}
          {!notification && <div>Add Notification</div>}
          </div>
          {notification && <div>Notification Title:</div>}
          <input
            type="text"
            className="event-input"
            placeholder="Notification Title"
            value={notificationTitle}
            onChange={(e) => setNotificationTitle(e.target.value)}
          />
          {notification && <div>Notification Description:</div>}
          <input
            type="text"
            className="event-input"
            placeholder="Notification Description"
            value={notificationDescription}
            onChange={(e) => setNotificationDescription(e.target.value)}
          />
          {notification && <div>Notification Slug:</div>}
          <input
            type="text"
            className="event-input"
            placeholder="Notification Slug"
            value={notificationSlug}
            onChange={(e) => setNotificationSlug(e.target.value)}
          />
          {notification && <div>Notify hours before event:</div>}
          <input
            type="text"
            className="event-input"
            placeholder="Notify hours before event"
            value={notificationHoursBefore}
            onChange={(e) => setNotificationHoursBefore(e.target.value)}
          />
          <div className="event-buttons">
          {notification && <button className="event-btn" onClick={handleDelete}>
                Delete Notification
            </button>}
            <button className="event-btn" onClick={handleAddNotification}>
            {!notification && <div>Add Notification</div>}
            {notification && <div>Save Changes</div>}
            </button>
            <button className="event-btn" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
)};

export default Notification;
