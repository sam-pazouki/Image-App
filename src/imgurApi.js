/* eslint-disable no-undef */
import axios from 'axios';

// Upload an image to an album
export const uploadImage = async (imageData, albumId) => {
  const formData = new FormData();
  formData.append('image', imageData);
  formData.append('album', albumId);

  const CLIENT_ID = process.env.REACT_APP_IMGUR_CLIENT_ID;

const instance = axios.create({
  baseURL: 'https://api.imgur.com/3/',
  headers: {
    Authorization: `Client-ID ${CLIENT_ID}`,
    'Content-Type': 'application/json',
  },
});

  try {
    const response = await instance.post('/image', formData, {
      headers: {
        Authorization: `https://api.imgur.com/oauth2/token`, 
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

// Delete an image
export const deleteImage = async (deletehash) => {
  try {
    const response = await instance.delete(`/image/${deletehash}`, {
      headers: {
        Authorization: `https://api.imgur.com/oauth2/token`, 
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};

// Refresh OAuth token 
export const refreshToken = async () => {
};

// Example function adjusted for pagination
export const fetchAlbumsWithPagination = async (username, page = 1) => {
  try {
    const response = await instance.get(`account/${username}/albums/?page=${page}`);
    return response.data.data; 
  } catch (error) {
    console.error("Error fetching albums with pagination:", error);
    throw error;
  }
};
