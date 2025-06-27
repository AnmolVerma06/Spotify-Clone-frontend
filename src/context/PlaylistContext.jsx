import React, { createContext, useState } from 'react';

export const PlaylistContext = createContext();

export const PlaylistProvider = ({ children }) => {
  const [playlists, setPlaylists] = useState([]); // [{id, name, songs: [songObj], bgColor}]

  // Palette of nice colors
  const colorPalette = [
    '#2a4365', '#22543d', '#742a2a', '#44337a', '#234e52', '#744210', '#b91c1c', '#0ea5e9', '#f59e0b', '#4b5563', '#8b5cf6'
  ];

  const getRandomColor = () => colorPalette[Math.floor(Math.random() * colorPalette.length)];

  const createPlaylist = (name) => {
    const newPlaylist = {
      id: Date.now().toString(),
      name,
      songs: [],
      bgColor: getRandomColor(),
    };
    setPlaylists((prev) => [...prev, newPlaylist]);
  };

  const addSongToPlaylist = (playlistId, song) => {
    setPlaylists((prev) =>
      prev.map((pl) =>
        pl.id === playlistId && !pl.songs.find((s) => s.id === song.id)
          ? { ...pl, songs: [...pl.songs, song] }
          : pl
      )
    );
  };

  const removeSongFromPlaylist = (playlistId, songId) => {
    setPlaylists((prev) =>
      prev.map((pl) =>
        pl.id === playlistId
          ? { ...pl, songs: pl.songs.filter((s) => s.id !== songId) }
          : pl
      )
    );
  };

  return (
    <PlaylistContext.Provider value={{ playlists, createPlaylist, addSongToPlaylist, removeSongFromPlaylist }}>
      {children}
    </PlaylistContext.Provider>
  );
}; 