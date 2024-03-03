import React, { useState, useEffect } from 'react';

// Represents an individual album, allowing for image upload and management.
const Album = ({ albumId }) => {
  const [albumTitle, setAlbumTitle] = useState('Loading album title...');
  const [images, setImages] = useState([]);
  const [feedback, setFeedback] = useState('');

  // Effect to fetch and set the album title upon component mount or albumId change.
  useEffect(() => {
    const fetchAlbumTitle = async () => {
      setAlbumTitle('Dynamic Album Title');
    };
    fetchAlbumTitle();
  }, [albumId]);

  // Function to handle image file selection and upload to Imgur.
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      setFeedback('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file); 

    try {
      // Perform the Imgur API call for image upload.
      const response = await fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_IMGUR_ACCESS_TOKEN}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error('Network response was not ok.');

      const data = await response.json();
      if (data.success) {
        // Update the state with the new image and provide user feedback.
        setImages([...images, { id: images.length, url: data.data.link, deletehash: data.data.deletehash }]);
        setFeedback('Image uploaded successfully!');
      } else {
        throw new Error('Failed to upload image.');
      }
    } catch (error) {
      setFeedback(error.message);
    }
  };

  // Function to handle the deletion of an image from Imgur.
  const handleImageDelete = async (deletehash) => {
    try {
      const response = await fetch(`https://api.imgur.com/3/image/${deletehash}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_IMGUR_ACCESS_TOKEN}`, // Securely use the access token.
        },
      });

      if (!response.ok) throw new Error('Network response was not ok.');

      const data = await response.json();
      if (data.success) {
        // Update the state to remove the deleted image and provide user feedback.
        setImages(images.filter(image => image.deletehash !== deletehash));
        setFeedback('Image deleted successfully!');
      } else {
        throw new Error('Failed to delete image.');
      }
    } catch (error) {
      setFeedback(error.message);
    }
  };

  // Renders the album component UI.
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
