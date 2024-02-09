import React, { useState } from 'react';
import Button from './Button';
import ChangeInfoModal from './ChangeInfoModal';
import Event from './Event';
const Profile = ({ events, setEvents, currentUser, updateCurrentUser, categories }) => {
  const [isChangeInfoModalVisible, setChangeInfoModalVisible] = useState(false);
  const [selectedEventDetails, setSelectedEventDetails] = useState(null);
  const [isChangePasswordMode, setChangePasswordMode] = useState(false); // Add this line

  console.log('Events in Profile:', events);

  const [user, setUser] = useState({
    username: currentUser.username,
    email: currentUser.email,
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
      updatedEvents[key] = updatedEvents[key].filter((event) => {
        return !(event.name === eventDetails.name && new Date(event.startDate).getTime() === startDate.getTime());
      });

      if (updatedEvents[key].length === 0) {
        delete updatedEvents[key];
      }



    }
    setEvents(updatedEvents);
    setSelectedEventDetails(null);


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

  const handleOpenChangeInfoModal = (changePasswordMode = false) => {

    console.log('Before setChangePasswordMode:', isChangePasswordMode);
    setChangePasswordMode(changePasswordMode);
    console.log('After setChangePasswordMode:', isChangePasswordMode);
    setChangeInfoModalVisible(true);
    console.log('After setChangeInfoModalVisible:', isChangePasswordMode);
  };

  const handleCloseChangeInfoModal = () => {
    setChangeInfoModalVisible(false);
  };

  const handleChangePassword = () => {
    /*dodati posle*/
    alert('Change Password Clicked');
  };

  const handleChangePasswordModal = () => {
    console.log('Before handleChangePasswordModal:', isChangePasswordMode);
    handleOpenChangeInfoModal(true);
    console.log('After handleChangePasswordModal:', isChangePasswordMode);
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
        <div className="change-info-btn">
          <Button onClick={() => handleOpenChangeInfoModal()} className="small-button">
            Change Username/Email
          </Button>
        </div>
        <div className="change-password-btn">
          <Button onClick={() => handleChangePasswordModal()} className="custom-button">
            Change Password
          </Button>
        </div>

        {isChangeInfoModalVisible && (
          <ChangeInfoModal
            onClose={handleCloseChangeInfoModal}
            onChange={handleChangeInfo}
            isChangePasswordMode={isChangePasswordMode}
            onChangePassword={handleChangePassword}
            updateCurrentUser={updateCurrentUser}
          />
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
                {console.log(eventList)}
                {eventList.map((event, index) => (
                  <div key={index} onClick={() => handleEventClick(event)}>                    <strong>{event.name}</strong> ({(event.category != null) ? event.category.name : 'none'}):{' '}
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
          categories={categories}
          prof={true}
        />
      )}
    </div>
  );
};

export default Profile;