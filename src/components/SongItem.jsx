import React, { useContext, useState } from 'react'
import { PlayerContext } from '../context/PlayerContext'
import { PlaylistContext } from '../context/PlaylistContext'
import { assets } from '../assets/assets'
import AddToPlaylistModal from './AddToPlaylistModal'

const SongItem = ({name, image, desc, id, ...songProps}) => {
  const { playWithId } = useContext(PlayerContext)
  const { playlists, addSongToPlaylist, createPlaylist } = useContext(PlaylistContext)
  const [showModal, setShowModal] = useState(false)

  const handleAdd = (playlistId) => {
    addSongToPlaylist(playlistId, { name, image, desc, id, ...songProps })
    setShowModal(false)
  }

  const handleCreate = (playlistName) => {
    createPlaylist(playlistName)
  }

  return (
    <div className='relative min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]'>
      <div onClick={() => playWithId(id)} className='relative'>
        <img className='rounded w-full' src={image} alt='' />
        <button
          className='absolute top-2 right-2 bg-green-600 hover:bg-green-700 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-lg z-20'
          onClick={e => { e.stopPropagation(); setShowModal(true) }}
        >
          <span className='text-lg font-bold'>+</span>
        </button>
      </div>
      <p className='text-slate-200 text-sm mt-2'>{desc}</p>
      <AddToPlaylistModal
        isOpen={showModal}
        playlists={playlists}
        onAdd={handleAdd}
        onCreatePlaylist={handleCreate}
        onClose={() => setShowModal(false)}
        song={{ name, image, desc, id, ...songProps }}
      />
    </div>
  )
}

export default SongItem
