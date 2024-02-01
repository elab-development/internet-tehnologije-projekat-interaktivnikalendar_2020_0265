import React, { useState } from 'react';
// Your ChangeInfoModal component
const ChangeInfoModal = ({ onClose, onChange }) => {
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
  
    const handleSave = () => {
      onChange(newUsername, newEmail);
      onClose();
    };
  
    return (
      <div className="modal-container">
        <div className="modal-header">
          <h2>Change Information</h2>
        </div>
        <div className="modal-content">
          <label>New Username:</label>
          <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
          <label>New Email:</label>
          <input type="text" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
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
  