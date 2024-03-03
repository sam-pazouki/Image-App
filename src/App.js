import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddAlbumForm from './components/AddAlbumForm';
import './App.css';

// The main App component where the state and functions related to albums are managed.
const App = () => {
  // State to hold the list of albums
  const [albums, setAlbums] = useState([]);

  // Function to add a new album to the albums state
  const addAlbum = (albumName) => {
    setAlbums([...albums, { name: albumName, images: [] }]);
  };

  return (
    // Router setup to handle navigation within the app
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Image Album Manager</h1>
          <AddAlbumForm onAddAlbum={addAlbum} />
        </header>
        <Routes>
          <Route></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
