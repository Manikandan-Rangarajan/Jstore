import React, { useState, useEffect } from 'react';
import './AboutUs.css';

const ProfileDownload = () => {
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    const fetchProfileImage = async () => {
      setProfileImage('./zip.jpg');
    };fetchProfileImage();
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = './P_assets.zip'; 
    link.download = 'P_assets.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container">
      <div className="profile-image-container">
        {profileImage ? (
          <img src={profileImage} alt="Profile" className="profile-image" />
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <button className="download-button" onClick={handleDownload}>
        Download Profile Zip
      </button>
    </div>
  );
};

export default ProfileDownload;
