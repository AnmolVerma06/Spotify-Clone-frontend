import React, { useState, useEffect } from 'react';
import { songsData, albumsData } from '../assets/assets';
import SongItem from './SongItem';
import AlbumItem from './AlbumItem';

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const DisplaySearch = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [spotifySongs, setSpotifySongs] = useState([]);
  const [spotifyAlbums, setSpotifyAlbums] = useState([]);
  const isAuthed = !!localStorage.getItem('spotify_access_token');

  useEffect(() => {
    if (isAuthed && debouncedQuery) {
      const token = localStorage.getItem('spotify_access_token');
      fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(debouncedQuery)}&type=track,album&limit=10`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          setSpotifySongs(data.tracks ? data.tracks.items : []);
          setSpotifyAlbums(data.albums ? data.albums.items : []);
        });
    } else {
      setSpotifySongs([]);
      setSpotifyAlbums([]);
    }
  }, [debouncedQuery, isAuthed]);

  useEffect(() => {
    if (!isAuthed && debouncedQuery) {
      const lowercasedQuery = debouncedQuery.toLowerCase();
      setFilteredSongs(
        songsData.filter((song) =>
          song.name.toLowerCase().includes(lowercasedQuery)
        )
      );
      setFilteredAlbums(
        albumsData.filter((album) =>
          album.name.toLowerCase().includes(lowercasedQuery)
        )
      );
    } else {
      setFilteredSongs([]);
      setFilteredAlbums([]);
    }
  }, [debouncedQuery, isAuthed]);

  return (
    <div>
      <div className="flex items-center gap-2 mt-4">
        <input
          type="text"
          placeholder="What do you want to listen to?"
          className="bg-white text-black px-4 py-2 rounded-full w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="mt-4">
        {query ? (
          <>
            {isAuthed ? (
              <>
                {spotifySongs.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold mb-2">Spotify Songs</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {spotifySongs.map((item) => (
                        <div key={item.id} className="bg-[#181818] p-3 rounded">
                          <img src={item.album.images[0]?.url} alt={item.name} className="w-full rounded mb-2" />
                          <div className="font-bold text-white">{item.name}</div>
                          <div className="text-xs text-gray-400">{item.artists.map(a => a.name).join(', ')}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {spotifyAlbums.length > 0 && (
                  <div className="mt-4">
                    <h2 className="text-xl font-bold mb-2">Spotify Albums</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {spotifyAlbums.map((item) => (
                        <div key={item.id} className="bg-[#181818] p-3 rounded">
                          <img src={item.images[0]?.url} alt={item.name} className="w-full rounded mb-2" />
                          <div className="font-bold text-white">{item.name}</div>
                          <div className="text-xs text-gray-400">{item.artists.map(a => a.name).join(', ')}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {spotifySongs.length === 0 && spotifyAlbums.length === 0 && (
                  <p>No results found for "{query}"</p>
                )}
              </>
            ) : (
              <>
                {filteredSongs.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold mb-2">Songs</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {filteredSongs.map((item) => (
                        <SongItem key={item.id} {...item} />
                      ))}
                    </div>
                  </div>
                )}
                {filteredAlbums.length > 0 && (
                  <div className="mt-4">
                    <h2 className="text-xl font-bold mb-2">Albums</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {filteredAlbums.map((item) => (
                        <AlbumItem key={item.id} {...item} />
                      ))}
                    </div>
                  </div>
                )}
                {filteredSongs.length === 0 && filteredAlbums.length === 0 && (
                  <p>No results found for "{query}"</p>
                )}
              </>
            )}
          </>
        ) : (
          <p>Browse all</p>
        )}
      </div>
    </div>
  );
};

export default DisplaySearch; 