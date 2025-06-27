import React from 'react'
import Navbar from './Navbar'
import { albumsData, songsData, genresData } from '../assets/assets'
import AlbumItem from './AlbumItem'
import SongItem from './SongItem'
import HorizontalScrollWrapper from './HorizontalScrollWrapper'
import GenreItem from './GenreItem'
import pkceChallenge from 'pkce-challenge'

const clientId = 'a4de3f164e524c4f9625b5c6e500ed99';
const redirectUri = 'https://anmolverma06.github.io/Spotify-Clone-frontend/callback';
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

const DisplayHome = () => {
  const isAuthed = !!localStorage.getItem('spotify_access_token');
  return (
    <>
      <Navbar />
      {!isAuthed && (
        <div className='mb-4'>
          <button className='bg-green-500 text-black px-4 py-2 rounded font-bold' onClick={loginWithSpotify}>
            Login with Spotify
          </button>
        </div>
      )}

      {/* Featured Charts */}
      <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Featured Charts</h1>
        <HorizontalScrollWrapper>
          {albumsData.map((item, index) => (
            <AlbumItem key={index} {...item} />
          ))}
        </HorizontalScrollWrapper>
      </div>

      
      <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Today's biggest hits</h1>
        <HorizontalScrollWrapper>
          {songsData.map((item, index) => (
            <SongItem key={index} {...item} />
          ))}
        </HorizontalScrollWrapper>
      </div>

      <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Genres</h1>
        <HorizontalScrollWrapper>
          {genresData.map((item, index) => (
            <GenreItem key={index} {...item} />
          ))}
        </HorizontalScrollWrapper>
      </div>
    </>
  )
}

export default DisplayHome
