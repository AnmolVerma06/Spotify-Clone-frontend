import React from 'react';
import pkceChallenge from 'pkce-challenge';

const clientId = 'a4de3f164e524c4f9625b5c6e500ed99';
const redirectUri = 'https://anmolverma06.github.io/Spotify-Clone-frontend/#/callback';
const scopes = [
  'user-read-private',
  'user-read-email',
  'playlist-read-private',
  'playlist-read-collaborative',
  'user-library-read',
  'user-top-read',
  'user-read-recently-played',
  'user-follow-read'
].join(' ');

function loginWithSpotify() {
  const { code_verifier, code_challenge } = pkceChallenge();
  localStorage.setItem('pkce_code_verifier', code_verifier);
  const params = new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: redirectUri,
    code_challenge_method: 'S256',
    code_challenge,
    scope: scopes,
  });
  window.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

const LoginPage = () => (
  <div style={{
    background: '#1ed760',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png" alt="Spotify" style={{ width: 250, marginBottom: 40 }} />
    <button
      onClick={loginWithSpotify}
      style={{
        background: 'black',
        color: 'white',
        border: 'none',
        borderRadius: 30,
        padding: '16px 40px',
        fontSize: 20,
        fontWeight: 600,
        cursor: 'pointer'
      }}
    >
      Connect Spotify
    </button>
  </div>
);

export default LoginPage; 