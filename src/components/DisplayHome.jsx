import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { albumsData, songsData, genresData } from '../assets/assets'
import AlbumItem from './AlbumItem'
import SongItem from './SongItem'
import HorizontalScrollWrapper from './HorizontalScrollWrapper'
import GenreItem from './GenreItem'
import pkceChallenge from 'pkce-challenge'

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

const DisplayHome = () => {
  const isAuthed = !!localStorage.getItem('spotify_access_token');
  const [spotifyPlaylists, setSpotifyPlaylists] = useState([]);
  const [spotifySongs, setSpotifySongs] = useState([]);

  useEffect(() => {
    if (isAuthed) {
      const token = localStorage.getItem('spotify_access_token');
      // Fetch user playlists
      fetch('https://api.spotify.com/v1/me/playlists?limit=10', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => setSpotifyPlaylists(data.items || []));
      // Fetch recently played tracks
      fetch('https://api.spotify.com/v1/me/player/recently-played?limit=10', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => setSpotifySongs(data.items || []));
    }
  }, [isAuthed]);

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

      {/* Featured Playlists */}
      <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Featured Playlists</h1>
        <HorizontalScrollWrapper>
          {isAuthed && spotifyPlaylists.length > 0
            ? spotifyPlaylists.map((item) => (
                <div key={item.id} className='min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]'>
                  <img className='rounded' src={item.images[0]?.url} alt='' />
                  <p className='font-bold mt-2 mb-1'>{item.name}</p>
                  <p className='text-slate-200 text-sm'>{item.owner.display_name}</p>
                </div>
              ))
            : albumsData.map((item, index) => <AlbumItem key={index} {...item} />)}
        </HorizontalScrollWrapper>
      </div>

      {/* Recently Played Songs */}
      <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Recently Played Songs</h1>
        <HorizontalScrollWrapper>
          {isAuthed && spotifySongs.length > 0
            ? spotifySongs.map((item, index) => (
                <div key={index} className='min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]'>
                  <img className='rounded' src={item.track.album.images[0]?.url} alt='' />
                  <p className='font-bold mt-2 mb-1'>{item.track.name}</p>
                  <p className='text-slate-200 text-sm'>{item.track.artists.map(a => a.name).join(', ')}</p>
                </div>
              ))
            : songsData.map((item, index) => <SongItem key={index} {...item} />)}
        </HorizontalScrollWrapper>
      </div>

      {/* Genres */}
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
