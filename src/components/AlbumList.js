import React, { useState, useEffect } from 'react';
import AlbumList from './AlbumList';

// ParentComponent is responsible for fetching album data and rendering AlbumList
const ParentComponent = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    // Function to fetch albums from an API
    const fetchAlbums = async () => {
      try {
        
        const response = await fetch('https://api.imgur.com/3/account/me/albums', {
          headers: { Authorization: 'https://api.imgur.com/oauth2/token' },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Update state with the fetched albums
        setAlbums(data.data);
      } catch (error) {
        console.error('Failed to fetch albums:', error);
      }
    };

    fetchAlbums();
  }, []); 

  // Render AlbumList and pass fetched albums as props
  return <AlbumList albums={albums} />;
};

export default ParentComponent;
