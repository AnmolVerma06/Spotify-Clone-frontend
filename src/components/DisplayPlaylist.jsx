import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PlaylistContext } from '../context/PlaylistContext';
import { assets } from '../assets/assets';

const defaultPlaylistImg = assets.stack_icon;

const DisplayPlaylist = () => {
  const { id } = useParams();
  const { playlists, removeSongFromPlaylist } = useContext(PlaylistContext);
  const playlist = playlists.find((pl) => pl.id === id);

  if (!playlist) return <div className='text-white p-10'>Playlist not found</div>;

  // Use first song's image or default
  const playlistImg = playlist.songs.length > 0 ? playlist.songs[0].image : defaultPlaylistImg;
  const headerBg = playlist.bgColor || '#232323';

  return (
    <div style={{ minHeight: '100vh', background: `linear-gradient(135deg, ${headerBg}, #121212 80%)` }} className="w-full m-0 px-6 pt-4 rounded text-white overflow-auto lg:w-[100%] lg:ml-0">
      {/* Playlist Header */}
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <img className="w-48 rounded" src={playlistImg} alt="" />
        <div className="flex flex-col justify-end">
          <p>Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">{playlist.name}</h2>
          <h4 className="text-slate-300">Your custom playlist</h4>
          <p className="mt-1 text-sm text-slate-300">
            <img className="inline-block w-5" src={assets.spotify_logo} alt="" />
            <b> Spotify</b> • {playlist.songs.length} songs
          </p>
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p>
          <b className="mr-4">#</b>Title
        </p>
        <p>Album</p>
        <p className="hidden sm:block">Date Added</p>
        <img className="m-auto w-4" src={assets.clock_icon} alt="" />
      </div>
      <hr />
      {/* Songs List */}
      {playlist.songs.length === 0 ? (
        <p className='text-slate-300 mt-8'>No songs in this playlist yet.</p>
      ) : (
        playlist.songs.map((song, index) => (
          <div
            key={song.id}
            className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
          >
            <p className="text-white">
              <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
              <img className="inline w-10 mr-5" src={song.image} alt="" />
              {song.name}
            </p>
            <p className="text-[15px]">{playlist.name}</p>
            <p className="text-[15px] hidden sm:block">Just now</p>
            <p className="text-[15px] text-center">{song.duration || '--:--'}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default DisplayPlaylist; 