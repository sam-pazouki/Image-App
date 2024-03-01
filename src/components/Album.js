import React, { useState, useEffect } from 'react';

// Represents an individual album, allowing for image upload and display
const Album = ({ albumId }) => {
  const [albumTitle, setAlbumTitle] = useState('Loading album title...'); 
  const [images, setImages] = useState([]); 
  const [feedback, setFeedback] = useState('');

  // Fetches the album title on component mount
  useEffect(() => {
    // Dummy function to set album title
    const fetchAlbumTitle = async () => {
      setAlbumTitle('Dynamic Album Title');
    };
    fetchAlbumTitle();
  }, [albumId]);

  // Handles image file selection and uploads the image to Imgur
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      setFeedback('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    
    try {
      const response = await fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
          Authorization: 'https://api.imgur.com/oauth2/token',
        },
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setImages([...images, { id: images.length, url: data.data.link, deletehash: data.data.deletehash }]);
        setFeedback('Image uploaded successfully!');
      } else {
        setFeedback('Failed to upload image.');
      }
    } catch (error) {
      setFeedback('Error uploading image.');
    }
  };

  // Handles the deletion of an image from Imgur
  const handleImageDelete = async (deletehash) => {
    try {
      // Note: Replace 'YOUR_ACCESS_TOKEN' with your actual Imgur access token
      const response = await fetch(`https://api.imgur.com/3/image/${deletehash}`, {
        method: 'DELETE',
        headers: {
          Authorization: 'https://api.imgur.com/oauth2/token',
        },
      });

      const data = await response.json();
      if (data.success) {
        setImages(images.filter(image => image.deletehash !== deletehash));
        setFeedback('Image deleted successfully!');
      } else {
        setFeedback('Failed to delete image.');
      }
    } catch (error) {
      setFeedback('Error deleting image.');
    }
  };

  // Renders the album UI
  return (
    <div className="album">
      <h2>{albumTitle}</h2>
      <input type="file" onChange={handleImageUpload} />
      {feedback && <p>{feedback}</p>} 
      <div>
        {images.map(image => (
          <div key={image.id}>
            <img src={image.url} alt="" style={{ width: '100px', height: 'auto' }} />
            <button onClick={() => handleImageDelete(image.deletehash)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Album;
