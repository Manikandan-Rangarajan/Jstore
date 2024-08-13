import React, { useState, useEffect } from 'react';
import './AboutUs.css';
import Navbar from './Navbar'
import Panda from '../assets/Panda.jpg'

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
    <div  style={{ backgroundImage: `url(${Panda})`}} className="min-h-screen w-full bg-no-repeat bg-cover" >
    <Navbar/>
    <div className="cont">
      <div className="imgcont">
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
    </div>
  );
};

export default ProfileDownload;