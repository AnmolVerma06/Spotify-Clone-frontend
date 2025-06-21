import React, { useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import { assets, songsData, genresData } from '../assets/assets'
import { PlayerContext } from '../context/PlayerContext'

const DisplayGenre = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { playWithId } = useContext(PlayerContext)

  const currentId = parseInt(id)
  const genreData = genresData[currentId]

  // Navigate to previous genre if exists
  const handlePrevGenre = () => {
    if (currentId > 0) {
      navigate(`/genre/${currentId - 1}`)
    }
  }

  // Navigate to next genre if exists
  const handleNextGenre = () => {
    if (currentId < genresData.length - 1) {
      navigate(`/genre/${currentId + 1}`)
    }
  }

  // If invalid genre ID
  if (!genreData) return <div className="text-white p-10">Genre not found</div>

  return (
    <>
      {/* Navbar with prev/next handlers passed in */}
      <Navbar onPrev={handlePrevGenre} onNext={handleNextGenre} />

      {/* Genre Header */}
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <img className="w-48 rounded" src={genreData.image} alt="" />
        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">{genreData.name}</h2>
          <h4>{genreData.desc}</h4>
          <p className="mt-1 text-sm text-slate-300">
            <img className="inline-block w-5" src={assets.spotify_logo} alt="" />
            <b> Spotify</b> • 1,323,154 likes • <b>50 songs,</b> about 2hr 30 min
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
      {songsData
        .filter((song) => song.genre === genreData.name)
        .map((item, index) => (
          <div
            key={index}
            onClick={() => playWithId(item.id)}
            className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
          >
            <p className="text-white">
              <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
              <img className="inline w-10 mr-5" src={item.image} alt="" />
              {item.name}
            </p>
            <p className="text-[15px]">{genreData.name}</p>
            <p className="text-[15px] hidden sm:block">5 days ago</p>
            <p className="text-[15px] text-center">{item.duration}</p>
          </div>
        ))}
    </>
  )
}

export default DisplayGenre 