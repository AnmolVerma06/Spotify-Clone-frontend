import React, { useState } from 'react';

const CreatePlaylistModal = ({ isOpen, onClose, onCreate }) => {
  const [name, setName] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#181818] p-6 rounded-lg w-80 flex flex-col gap-4">
        <h2 className="text-xl font-bold text-white">Create Playlist</h2>
        <input
          className="px-3 py-2 rounded bg-[#242424] text-white outline-none"
          placeholder="Playlist name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <div className="flex gap-2 justify-end">
          <button
            className="px-4 py-1 rounded bg-gray-600 text-white"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-1 rounded bg-green-500 text-white"
            onClick={() => {
              if (name.trim()) {
                onCreate(name.trim());
                setName('');
              }
            }}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePlaylistModal; 