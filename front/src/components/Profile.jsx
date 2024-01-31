import React, { useState } from 'react';
import Button from './Button';

const Profile = ({ events }) => {
  
  console.log('Events in Profile:', events);
  
  const user = {
    username: 'Username',
    email: 'username@gmail.com',
    photoUrl: 'https://placekitten.com/100/100',
  };

 

  const handleChangePassword = () => {
    /*dodati posle*/
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
          <Button onClick={handleChangePassword} className="custom-button">
            Change Password
          </Button>
        </div>
      </div>

      <div className="upcoming-events">
        <h3>Upcoming Events</h3>
        {Object.keys(events).length > 0 ? (
          <ul style={{ listStyle: 'none', padding: '0' }}>
            {Object.entries(events).map(([key, eventList]) => (
              <li
                key={key}
                style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}
              >
                {eventList.map((event, index) => (
                  <div key={index}>
                    <strong>{event.name}</strong> ({event.category}):{' '}
                    {`${event.startDate.getDate()}-${event.startDate.getMonth() + 1}-${event.startDate.getFullYear()}`}{' '}
                    to {`${event.endDate.getDate()}-${event.endDate.getMonth() + 1}-${event.endDate.getFullYear()}`}
                  </div>
                ))}
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