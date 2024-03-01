import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

const Callback = () => {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    // Extract the authorization code from the URL
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');

    // If a code is present, attempt to exchange it for a token
    if (code) {
      exchangeCodeForToken(code);
    } else {
      // Redirect to home if no code is found
      history.push('/');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, history]);

  const exchangeCodeForToken = async (code) => {
    try {
      
      
      const response = await fetch('https://api.imgur.com/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `client_id=${process.env.d763bfd5cd14a3d}&client_secret=${process.env.a73ccc6c6a5e3f138e919f51b651d7ee019871a2}&code=${code}&grant_type=authorization_code&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`,
      });
      const data = await response.json();

      if (data.access_token) {
        // Store the access token securely, then redirect to albums
        localStorage.setItem('accessToken', data.access_token);
        history.push('/albums');
      } else {
        throw new Error('Failed to retrieve access token');
      }
    } catch (error) {
      console.error('Error exchanging code for token:', error);
      // Redirect the user to the login page with an error message
      history.push('/login?error=exchange_failed');
    }
  };

  // Informing the user that authentication is being processed
  return (
    <div>
      Processing your authentication...
    </div>
  );
};

export default Callback;
