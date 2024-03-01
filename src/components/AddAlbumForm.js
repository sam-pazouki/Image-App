import React, { useState } from 'react';

// Component for adding a new album
const AddAlbumForm = ({ onAddAlbum }) => {
  // State for the album name input
  const [albumName, setAlbumName] = useState('');
  // State for displaying success and error messages to the user
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  // State for showing validation messages
  const [validationMessage, setValidationMessage] = useState('');

  // Validates the album name based on predefined criteria
  const validateAlbumName = (name) => {
    if (name.length < 3) {
      setValidationMessage('Album name must be at least 3 characters long.');
      return false;
    }
    // Clears the validation message if criteria are met
    setValidationMessage('');
    return true;
  };

  // Handles the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validates the album name before proceeding
    const isValid = validateAlbumName(albumName);
    if (!isValid) {
      return;
    }
    try {
      // Attempts to create the album using the provided function and shows success message
      await onAddAlbum(albumName);
      setSuccessMessage('Album created successfully!');
      setErrorMessage('');
      setAlbumName('');
    } catch (error) {
      // Catches and displays any errors encountered during album creation
      setErrorMessage('Failed to create album. Please try again.');
      setSuccessMessage('');
    }
  };

  // Renders the album creation form and any applicable messages
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
