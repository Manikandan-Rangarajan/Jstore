import React, { useState, useEffect } from 'react';
import './AboutUs.css';
import Navbar from './Navbar';
import Panda from '../assets/Panda.jpg';
import axios from 'axios';

const ProfileDownload = () => {
  const [profileImage, setProfileImage] = useState('');
  const [projects, setProjects] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchProfileImage = async () => {
      setProfileImage('./zip.jpg'); // Set your image source here
    };
    fetchProfileImage();
  }, []);

  useEffect(() => {
    axios.get('/pricing/api/projects')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const handleDownload = (pr) => {
    window.open(pr.zip_url, '_blank');
  };

  return (
    <div style={{ backgroundImage: `url(${Panda})` }} className="min-h-screen w-full bg-no-repeat bg-cover">
      <Navbar />
      {Array.isArray(projects) && projects.length > 0 ? (
        projects.map((pr) => (
          pr.User === userId && (
            <div key={pr._id} className="cont">
              <div className="imgcont">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="profile-image" />
                ) : (
                  <p>Loading...</p>
                )}
              </div>
              <button className="download-button" onClick={() => handleDownload(pr)}>
                Download Profile Zip
              </button>
            </div>
          )
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default ProfileDownload;
