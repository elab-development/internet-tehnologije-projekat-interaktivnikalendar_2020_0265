import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navigacija = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');

    if (confirmLogout) {
      
      navigate('/login');
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Menu
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse show" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link active" aria-current="page" href="/calendar">
                Calendar
              </a>
              <a className="nav-link" href="#">
                Profil
              </a>
              <a className="nav-link" href="#" onClick={handleLogout}>
                LogOut
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigacija;


