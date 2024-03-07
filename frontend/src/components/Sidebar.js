import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/Sidebar.css';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style={{ width: '280px' }}>
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <a type="button" onClick={() => navigate("/profile")} className={`nav-link ${isActive('/profile') ? 'active' : ''}`} aria-current="page">
            <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#home"></use></svg>
            Môj profil
          </a>
        </li>
        <li>
          <a type="button" onClick={() => navigate("/profile/cars")} className={`nav-link ${isActive('/profile/cars') ? 'active' : ''}`}>
            <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#speedometer2"></use></svg>
            Moje autá
          </a>
        </li>
        <li>
        <a type="button" onClick={() => navigate("/profile/written-reviews")} className={`nav-link ${isActive('/profile/written-reviews') ? 'active' : ''}`}>
            <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#table"></use></svg>
            Napísané recenzie
          </a>
        </li>
        <li>
        <a type="button" onClick={() => navigate("/profile/reviews-about-me")} className={`nav-link ${isActive('/profile/reviews-about-me') ? 'active' : ''}`}>
            <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#grid"></use></svg>
            Recenzie o mne
          </a>
        </li>
        <li>
        <a type="button" onClick={() => navigate("/profile/chats")} className={`nav-link ${isActive('/profile/chats') ? 'active' : ''}`}>
            <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#people-circle"></use></svg>
            Chaty
          </a>
        </li>
        <li>
          <a type="button" onClick={() => navigate("/profile/ride-history")} className={`nav-link ${isActive('/profile/ride-history') ? 'active' : ''}`}>
            <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#grid"></use></svg>
            História jázd
          </a>
        </li>

      </ul>
      <hr />
    </div>
  );
}