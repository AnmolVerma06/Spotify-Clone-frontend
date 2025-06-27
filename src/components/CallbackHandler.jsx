import React, { useEffect } from 'react';

const clientId = 'a4de3f164e524c4f9625b5c6e500ed99';
const redirectUri = 'https://anmolverma06.github.io/Spotify-Clone-frontend/#/callback';

const CallbackHandler = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const codeVerifier = localStorage.getItem('pkce_code_verifier');

    if (code && codeVerifier) {
      const body = new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      });

      fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.access_token) {
            localStorage.setItem('spotify_access_token', data.access_token);
            // Redirect to home (DisplayHome)
            window.location.hash = '#/';
          } else {
            alert('Failed to get access token');
          }
        });
    }
  }, []);

  return (
    <div className="text-white p-10">Logging in with Spotify...</div>
  );
};

export default CallbackHandler; 