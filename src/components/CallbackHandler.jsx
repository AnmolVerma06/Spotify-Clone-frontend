import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CallbackHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Parse the access token from the URL hash
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace('#', '?'));
    const accessToken = params.get('access_token');
    if (accessToken) {
      localStorage.setItem('spotify_access_token', accessToken);
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return <div className="text-white p-10">Logging you in...</div>;
};

export default CallbackHandler; 