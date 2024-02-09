import React, { useState } from 'react';
import axios from 'axios';

const ChangeInfoModal = ({ onClose, onChange, isChangePasswordMode, onChangePassword, updateCurrentUser }) => {
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleSave = () => {
   if (isChangePasswordMode) {
      if (oldPassword.trim() === '' || newPassword.trim() === '' || confirmNewPassword.trim() === '') {
        alert('Please fill in all fields');
      } else if (newPassword !== confirmNewPassword) {
        alert('New passwords do not match');
      } else {
        onChangePassword(newPassword);
        onClose();
      }
    } else {
      onChange(newUsername, newEmail);
      const axiosInstance = axios.create({
        headers: {
          'Authorization': 'Bearer '+ window.sessionStorage.getItem("auth_token"),
        }
      });
      console.log(newEmail + ' ' + newUsername);
      const data = {
        email: newEmail,
        username: newUsername
      };
      axiosInstance.put("api/users", data).then((res)=>{console.log(res.data);
        updateCurrentUser(data);
      });
      onClose();
    }
  };
  return (
    <div className="modal-container">
      <div className="modal-header">
        <h2>{isChangePasswordMode ? 'Change Password' : 'Change Information'}</h2>
      </div>
      <div className="modal-content">
        {isChangePasswordMode && (
          <>
            <label>Old Password:</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </>
        )}
       <label>{isChangePasswordMode ? 'New Password:' : 'New Username:'}</label>
<input
  type={isChangePasswordMode ? 'password' : 'text'}
  value={isChangePasswordMode ? newPassword : newUsername}
  onChange={(e) =>
    isChangePasswordMode ? setNewPassword(e.target.value) : setNewUsername(e.target.value)
  }
/>
<label>{isChangePasswordMode ? 'Confirm New Password:' : 'New Email:'}</label>
<input
 type={isChangePasswordMode ? 'password' : 'text'}
  value={isChangePasswordMode ? confirmNewPassword : newEmail}
  onChange={(e) =>
    isChangePasswordMode
      ? setConfirmNewPassword(e.target.value)
      : setNewEmail(e.target.value)
  }
/>

      </div>
      <div className="modal-buttons">
        <button className="modal-btn" onClick={handleSave}>
          Save Changes
        </button>
        <button className="modal-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ChangeInfoModal;
