import React, { useState, useEffect } from 'react';
import Button from './Button';
import ChangeInfoModal from './ChangeInfoModal';
import Event from './Event';
import axios from 'axios';

const Profile = ({ events, setEvents, currentUser, updateCurrentUser, categories }) => {
  const [isChangeInfoModalVisible, setChangeInfoModalVisible] = useState(false);
  const [selectedEventDetails, setSelectedEventDetails] = useState(null);
  const [isChangePasswordMode, setChangePasswordMode] = useState(false); // Add this line
  const [eventCategory, setEventCategory] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [evnts, setEvnts] = useState();
  const [sortBy, setSortBy] = useState('Date');
  const [sortOrder, setSortOrder] = useState('ASC');


  let i = 0;
  

  console.log('Events in Profile:', events);

  const [user, setUser] = useState({
    username: currentUser.username,
    email: currentUser.email,
    photoUrl: 'https://placekitten.com/100/100',
  });


  const axiosInstance = axios.create({
    headers: {
      'Authorization': 'Bearer ' + window.sessionStorage.getItem("auth_token"),
    }
  });

  useEffect(() => {
    axiosInstance.get(`api/users/${window.sessionStorage.getItem("user_id")}`).then((res) => {
      updateCurrentUser({
        username: res.data.username,
        email: res.data.email
      });
      setUser({
        username: res.data.username,
        email: res.data.email,
        photoUrl: 'https://placekitten.com/100/100'
      });
    }).catch((e) => {
      console.log(e);
    });
    setEvnts(Object.values(events));
  }, [])

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
    alert('Change Password Clicked');
  };

  const handleChangePasswordModal = () => {
    console.log('Before handleChangePasswordModal:', isChangePasswordMode);
    handleOpenChangeInfoModal(true);
    console.log('After handleChangePasswordModal:', isChangePasswordMode);
  };

  const handleCategoryChange = (event) => {
    setEventCategory(event.target.value);
    axiosInstance.get(`api/categories/${event.target.value}/events`).then((res) => {
      console.log(res.data);
    });
  };


  const toggleSortBy = () => {
  const sortingOptions = ['Start Date', 'End Date', 'Name', 'Category', 'Date Added'];
  const currentIndex = sortingOptions.indexOf(sortBy);
  const nextIndex = (currentIndex + 1) % sortingOptions.length;
  setSortBy(sortingOptions[nextIndex]);
  };

  const toggleSortOrder= () => {
    setSortOrder(sortOrder == 'ASC' ? 'DESC' : 'ASC');
};

  const handleSort = () => {
    let sortedEvents = [...evnts];

    if (sortBy == 'Start Date') {
      sortedEvents.sort((a, b) => {
        const dateA = new Date((a[0]).startDate);
        const dateB = new Date((b[0]).startDate);
        return sortOrder == 'ASC' ? dateA - dateB : dateB - dateA;
      });
    } if (sortBy == 'End Date') {
      sortedEvents.sort((a, b) => {
        const dateA = new Date((a[0]).endDate);
        const dateB = new Date((b[0]).endDate);
        return sortOrder == 'ASC' ? dateA - dateB : dateB - dateA;
      });
    } else if (sortBy == 'Name') {
    sortedEvents.sort((a, b) => {
      const nameA = (a[0]).name.toLowerCase();
      const nameB = (b[0]).name.toLowerCase();
      return sortOrder == 'ASC' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });
  } else if (sortBy == 'Category') {
    sortedEvents.sort((a, b) => {
      let nameA = 'zzz';
      let nameB = 'zzz';
      if(a[0].category)
        nameA = (a[0]).category.name.toLowerCase();
      if(b[0].category)
        nameB = (b[0]).category.name.toLowerCase();
      return sortOrder == 'ASC' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });
  } else if (sortBy == 'Date Added') {
    sortedEvents.sort((a, b) => {
      const idA = (a[0]).id;
      const idB = (b[0]).id;
      return sortOrder == 'ASC' ? idA-idB : idB-idA;
    });
  }
    setEvnts(sortedEvents);
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

        <hr></hr>
<div style={{ display: 'flex', alignItems: 'center' }}>
        <Button onClick={() => handleSort()} className="small-button-sort">
            Sort events by
          </Button>
        <button onClick={toggleSortBy} style={{ marginLeft: '10px', marginRight: '10px', borderRadius: '5px'}}>{sortBy}</button>
        <button onClick={toggleSortOrder} style={{ marginLeft: '10px', marginRight: '10px', borderRadius: '5px' }}>{sortOrder}</button>
        </div>
        <input 
        type="text"
        className="event-input"
        placeholder="Search events by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
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
        {evnts && evnts.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: '0' }}>
            
              <div>
                {evnts.map((event, index) => {
                  event = event[0];
  if ((event.category && event.category.id == eventCategory || eventCategory == 0) && event.name.toLowerCase().includes(searchTerm.toLowerCase())) {
    i++;
    return (
      <li
      key={index}
      style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
      <div key={index} onClick={() => handleEventClick(event)}>
        <strong>{event.name}</strong> ({event.category ? event.category.name : 'None'}):{' '}
        {`${event.startDate.getDate()}-${event.startDate.getMonth() + 1}-${event.startDate.getFullYear()}`}{' '}
        to {`${event.endDate.getDate()}-${event.endDate.getMonth() + 1}-${event.endDate.getFullYear()}`}
      </div>
      </li>
    );
  }
  return null;
})}
              </div>
            
            {i == 0 && (<p>No upcoming events for selected category.</p>)}
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