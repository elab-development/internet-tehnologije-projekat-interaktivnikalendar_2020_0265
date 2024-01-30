import React, { useState } from 'react';

const Profile = () => {
  const user = {
    username: 'Username',
    email: 'username@gmail.com',
    photoUrl: 'https://placekitten.com/100/100',
  };

  const [events, setEvents] = useState([
    { id: 1, title: 'event 1', date: '2024-02-15' },
    { id: 2, title: 'event 2', date: '2024-02-20' },
    
  ]);

  const handleChangePassword = () => {
    
    alert('Change Password Clicked');
  };

  return (
    <div className="profile-container">
      <div className="user-details">
        <div className="profile-image">
          <img src={user.photoUrl} alt="User Profile" />
        </div>
        <div className="profile-info">
          <h2>{user.username}</h2>
          <p>{user.email}</p>
        </div>
        <div className="change-password-btn">
          <button onClick={handleChangePassword}>Change Password</button>
        </div>
      </div>

      <div className="upcoming-events">
        <h3>Upcoming Events</h3>
        {events.length > 0 ? (
          <ul className="event-list">
            {events.map((event) => (
              <li key={event.id} className="event-item">
                <strong>{event.title}</strong> - {event.date}
              </li>
            ))}
          </ul>
        ) : (
          <p>No upcoming events.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;


