import React from 'react';

const CLIENT_ID = 'a4de3f164e524c4f9625b5c6e500ed99';
const REDIRECT_URI = window.location.origin + '/callback';
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';
const SCOPES = [
  'user-read-private',
  'user-read-email',
  'playlist-read-private',
  'playlist-read-collaborative',
];

const LoginPage = () => {
  const handleLogin = () => {
    const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&response_type=${RESPONSE_TYPE}&scope=${SCOPES.join('%20')}`;
    window.location = authUrl;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#121212] text-white">
      <img src="/spotify_logo.png" alt="Spotify Logo" className="w-32 mb-8" />
      <h1 className="text-3xl font-bold mb-4">Sign in to Spotify</h1>
      <button
        onClick={handleLogin}
        className="bg-green-500 text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-400 transition"
      >
        Login with Spotify
      </button>
    </div>
  );
};

export default LoginPage; 