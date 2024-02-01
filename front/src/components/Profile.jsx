import React, { useState } from 'react';
import Button from './Button';
import ChangeInfoModal from './ChangeInfoModal';
import Event from './Event';
const Profile = ({ events }) => {
  const [isChangeInfoModalVisible, setChangeInfoModalVisible] = useState(false);
  const [selectedEventDetails, setSelectedEventDetails] = useState(null);

  console.log('Events in Profile:', events);
  
  const [user, setUser] = useState({
    username: 'Username',
    email: 'username@gmail.com',
    photoUrl: 'https://placekitten.com/100/100',
  });

  const handleEventClick = (eventDetails) => {
    setSelectedEventDetails(eventDetails);
  };

  const handleCloseEventDetails = () => {
    setSelectedEventDetails(null);
  };

  const handleEventDelete = (eventDetails) => {
    const startDate = new Date(eventDetails.startDate);
    const key = `${startDate.getMonth() + 1}-${startDate.getFullYear()}-${startDate.getDate()}`;

    const updatedEvents = { ...events };

    if (updatedEvents[key]) {
      updatedEvents[key] = updatedEvents[key].filter(
        (event) =>
          !(event.name === eventDetails.name && event.startDate === eventDetails.startDate)
      );

      if (updatedEvents[key].length === 0) {
        delete updatedEvents[key];
      }

      //setEvents(updatedEvents); 
      setSelectedEventDetails(null);
    }

    console.log('Posle brisanja:', events);
  };

  const handleChangeInfo = (newUsername, newEmail) => {
    setUser(prevUser => ({
      ...prevUser,
      username: newUsername !== '' ? newUsername : prevUser.username,
      email: newEmail !== '' ? newEmail : prevUser.email,
    }));
    handleCloseChangeInfoModal();
    console.log('Updated User:', user);
  };

  const handleOpenChangeInfoModal = () => {
    setChangeInfoModalVisible(true);
  };

  const handleCloseChangeInfoModal = () => {
    setChangeInfoModalVisible(false);
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
        <div className="change-info-btn">
        <Button onClick={handleOpenChangeInfoModal} className="small-button">
          Change Username/Email
        </Button>
      </div>

      {isChangeInfoModalVisible && (
        <ChangeInfoModal onClose={handleCloseChangeInfoModal} onChange={handleChangeInfo} />
      )}
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
 <div key={index} onClick={() => handleEventClick(event)}>                    <strong>{event.name}</strong> ({event.category}):{' '}
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

      {selectedEventDetails && (
        <Event
          onClose={handleCloseEventDetails}
          eventDetails={selectedEventDetails}
          onDelete={handleEventDelete}
        />
      )}
    </div>
  );
};

export default Profile;