import React, { useState } from 'react';
import { assets } from '../assets/assets';

const AddToPlaylistModal = ({ isOpen, playlists, onAdd, onCreatePlaylist, onClose, song }) => {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState('');

  if (!isOpen) return null;

  const filtered = playlists.filter(pl => pl.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-[#181818] rounded-lg w-[350px] max-w-[90vw] p-4 flex flex-col gap-3">
        <h2 className="text-lg font-bold text-white mb-2">Add to playlist</h2>
        <input
          className="w-full px-3 py-2 rounded bg-[#232323] text-white outline-none mb-2"
          placeholder="Find a playlist"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button
          className="flex items-center gap-2 text-left w-full px-2 py-2 rounded hover:bg-[#232323] text-white font-semibold"
          onClick={() => setCreating(true)}
        >
          <span className="text-xl">+</span> New playlist
        </button>
        {creating && (
          <div className="flex gap-2 mt-2">
            <input
              className="flex-1 px-2 py-1 rounded bg-[#232323] text-white outline-none"
              placeholder="Playlist name"
              value={newName}
              onChange={e => setNewName(e.target.value)}
            />
            <button
              className="px-3 py-1 bg-green-600 text-white rounded"
              onClick={() => {
                if (newName.trim()) {
                  onCreatePlaylist(newName.trim());
                  setNewName('');
                  setCreating(false);
                }
              }}
            >Create</button>
            <button className="px-2 py-1 text-slate-300" onClick={() => setCreating(false)}>Cancel</button>
          </div>
        )}
        <div className="max-h-48 overflow-y-auto mt-2">
          {filtered.length === 0 && <div className="text-slate-400 text-sm px-2 py-2">No playlists found</div>}
          {filtered.map(pl => {
            const img = pl.songs.length > 0 ? pl.songs[0].image : assets.stack_icon;
            return (
              <div
                key={pl.id}
                className={`flex items-center gap-3 px-2 py-2 rounded cursor-pointer hover:bg-[#232323] ${selected === pl.id ? 'bg-[#232323]' : ''}`}
                onClick={() => setSelected(pl.id)}
              >
                <img src={img} alt='' className='w-10 h-10 rounded object-cover'/>
                <div className='flex flex-col flex-1'>
                  <span className='font-semibold truncate'>{pl.name}</span>
                  <span className='text-xs text-slate-400'>{pl.songs.length} songs</span>
                </div>
                {selected === pl.id && <span className='text-green-400 text-xl'>✔</span>}
              </div>
            );
          })}
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button className="px-4 py-1 rounded bg-gray-600 text-white" onClick={onClose}>Cancel</button>
          <button
            className="px-4 py-1 rounded bg-green-500 text-white"
            disabled={!selected}
            onClick={() => {
              if (selected) onAdd(selected);
            }}
          >Done</button>
        </div>
      </div>
    </div>
  );
};

export default AddToPlaylistModal; 