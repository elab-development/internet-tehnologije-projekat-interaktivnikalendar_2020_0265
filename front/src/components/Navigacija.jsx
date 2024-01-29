import React from 'react'

const Navigacija = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
      Navbar
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
          Kalendar
        </a>
        <a className="nav-link" href="#">
          Profil
        </a>
        <a className="nav-link" href="#">
          LogOut
        </a>
        
      </div>
    </div>
  </div>
</nav>

    </div>
  )
}

export default Navigacija
