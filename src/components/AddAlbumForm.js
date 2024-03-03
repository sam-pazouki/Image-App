import React, { useState } from 'react';

// Defines a form component for adding a new album using the Imgur API.
const AddAlbumForm = ({ onAddAlbum }) => {
 
  const [albumName, setAlbumName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [validationMessage, setValidationMessage] = useState('');

  // Function to validate the album name input by the user.
  const validateAlbumName = (name) => {
    if (name.length < 3) {
      setValidationMessage('Album name must be at least 3 characters long.');
      return false;
    }
    setValidationMessage('');
    return true;
  };

  // Asynchronous function to handle the form submission event.
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const isValid = validateAlbumName(albumName); 
    if (!isValid) return; 

    try {
      // Defines the URL and headers for the Imgur API request.
      const url = 'https://api.imgur.com/3/album';
      const headers = {
        'Authorization': 'd763bfd5cd14a3d', 
        'Content-Type': 'application/json'
      };

      // Executes the POST request to the Imgur API to create a new album.
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ title: albumName }) 
      });

      // Throws an error if the response from Imgur API is not OK.
      if (!response.ok) {
        const errorData = await response.json(); 
        throw new Error(errorData.data.error); 
      }

      // Parses the successful response and updates the UI accordingly.
      const data = await response.json();
      await onAddAlbum(data.data); 
      setSuccessMessage('Album created successfully!'); 
      setAlbumName(''); 
    } catch (error) {
      setErrorMessage(error.message || 'Failed to create album. Please try again.'); 
    } finally {
      setErrorMessage(''); 
    }
  };

  // Renders the form and any success, error, or validation messages to the UI.
  return (
    <div>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {validationMessage && <div className="validation-message">{validationMessage}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={albumName}
          onChange={(e) => setAlbumName(e.target.value)}
          placeholder="Album Name"
          required
        />
        <button type="submit">Create Album</button>
      </form>
    </div>
  );
};

export default AddAlbumForm; 
