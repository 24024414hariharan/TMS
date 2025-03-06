import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";

const Header: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleFAQClick = () => {
    navigate("/faq");
  };

  const handleTitleClick = () => {
    navigate("/tickets");
  };

  const handleProfileClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDropdown(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <h1 
        onClick={handleTitleClick} 
        style={{ cursor: 'pointer' }}
      >
        Tour Management System - Customer Support
      </h1>
      <div className="header-right">
        <span className="faqs-text" onClick={handleFAQClick}>
          FAQs
        </span>
        <div
          ref={profileRef}
          className="profile"
          onClick={handleProfileClick}
        >
          <img
            src="/user.png"
            alt="Profile"
            className="profile-icon"
          />
          {showDropdown && (
            <div
              className="dropdown"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;