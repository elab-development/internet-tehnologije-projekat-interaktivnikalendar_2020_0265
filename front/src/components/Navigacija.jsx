import React from 'react';
import { useState,  useEffect } from 'react';

import { Link, useNavigate,useLocation, } from 'react-router-dom';

const Navigacija = () => {

    const location = useLocation();
  const [shouldShowNavigationBar, setShouldShowNavigationBar] = useState(true);

  useEffect(() => {
    const isOnLoginPage = location.pathname.includes('login');
    const isOnRegisterPage = location.pathname.includes('register');

    setShouldShowNavigationBar(!isOnLoginPage && !isOnRegisterPage);
  }, [location.pathname]);


  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');

    if (confirmLogout) {
      navigate('/login');
    }
  };

  return (
    <>
      {shouldShowNavigationBar && (
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/">
                Menu
              </Link>
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
                  <Link className="nav-link" to="/calendar">
                    Calendar
                  </Link>
                  <Link className="nav-link" to="/profile">
                    Profil
                  </Link>
                  <a className="nav-link" href="#" onClick={handleLogout}>
                    LogOut
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navigacija;



