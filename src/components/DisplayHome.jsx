import React from 'react'
import Navbar from './Navbar'
import { albumsData, songsData, genresData } from '../assets/assets'
import AlbumItem from './AlbumItem'
import SongItem from './SongItem'
import HorizontalScrollWrapper from './HorizontalScrollWrapper'
import GenreItem from './GenreItem'

const DisplayHome = () => {
  return (
    <>
      <Navbar />

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
