import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.imgur.com/3/',
  headers: {
    'Authorization': `Client-ID ${process.env.REACT_APP_IMGUR_CLIENT_ID}`,
  },
});

// Function to upload an image to an album using the Imgur API
export const uploadImage = async (imageData, albumId) => {
  const formData = new FormData();
  formData.append('image', imageData);
  if (albumId) formData.append('album', albumId); 

  try {
    // Making a POST request to upload the image
    const response = await instance.post('/image', formData, {
      headers: { 'Authorization': `Bearer ${process.env.REACT_APP_IMGUR_ACCESS_TOKEN}` },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

// Function to delete an image from an album using Imgur API
export const deleteImage = async (deletehash) => {
  try {
    // Making a DELETE request to remove the image
    const response = await instance.delete(`/image/${deletehash}`, {
      headers: { 'Authorization': `Bearer ${process.env.REACT_APP_IMGUR_ACCESS_TOKEN}` },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};

// Placeholder function for refreshing OAuth token, implementation depends on specific OAuth flow
export const refreshToken = async () => {
  
};

// Function to fetch albums with pagination, adjusting for username and page number
export const fetchAlbumsWithPagination = async (username, page = 1) => {
  try {
    const response = await instance.get(`account/${username}/albums/?page=${page}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching albums with pagination:", error);
    throw error;
  }
};
