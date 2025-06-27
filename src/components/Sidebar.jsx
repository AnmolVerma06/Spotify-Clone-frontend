import React, { useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { PlaylistContext } from '../context/PlaylistContext'
import CreatePlaylistModal from './CreatePlaylistModal'

const Sidebar = () => {
    const navigate = useNavigate();
    const { playlists, createPlaylist } = useContext(PlaylistContext);
    const [showModal, setShowModal] = useState(false);

    const handleCreate = (name) => {
        createPlaylist(name);
        setShowModal(false);
    };

    return (
        <div className='w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex '>
            <CreatePlaylistModal isOpen={showModal} onClose={() => setShowModal(false)} onCreate={handleCreate} />
            <div className='bg-[#121212] h-[15%] rounded flex flex-col justify-around'>
                <div onClick={()=>navigate('/')} className='flex items-center gap-3 pl-8 cursor-pointer'>
                    <img className='w-6' src={assets.home_icon} alt='' />
                    <p className='font-bold'>Home</p>
                </div>
                <div onClick={()=>navigate('/search')} className='flex items-center gap-3 pl-8 cursor-pointer'>
                    <img className='w-6' src={assets.search_icon} alt='' />
                    <p className='font-bold'>Search</p>
                </div>
            </div>
            <div className='bg-[#121212] h-[85%] rounded'>
                <div className='p-4 flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <img className='w-8' src={assets.stack_icon} alt='' />
                        <p className='font-semibold'>Your Library</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <img className='w-5' src={assets.arrow_icon} alt='' />
                        <img className='w-5 cursor-pointer' src={assets.plus_icon} alt='' onClick={() => setShowModal(true)} />
                    </div>
                </div>
                {/* Only show create message if no playlists */}
                {playlists.length === 0 && (
                    <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4'>
                        <h1>Create your first playlist</h1>
                        <p className='font-light'>it's easy we will help you</p>
                        <button className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4' onClick={() => setShowModal(true)}>Create Playlist</button>
                    </div>
                )}
                {/* Playlists List directly under 'Your Library' */}
                {playlists.length > 0 && (
                    <div className='px-4'>
                        <ul className='flex flex-col gap-2'>
                            {playlists.map((pl) => {
                                const img = pl.songs.length > 0 ? pl.songs[0].image : assets.stack_icon;
                                return (
                                    <li key={pl.id} className='cursor-pointer hover:bg-[#232323] flex items-center gap-3 rounded p-1' onClick={() => navigate(`/playlist/${pl.id}`)}>
                                        <img src={img} alt='' className='w-10 h-10 rounded object-cover'/>
                                        <div className='flex flex-col'>
                                            <span className='font-semibold truncate max-w-[120px]'>{pl.name}</span>
                                            <span className='text-xs text-slate-400'>Playlist • You</span>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
                <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4'>
                    <h1>Let's find some podcasts to follow</h1>
                    <p className='font-light'>we'll keep you update on new episodes</p>
                    <button className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4'>Browse Podcasts</button>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
