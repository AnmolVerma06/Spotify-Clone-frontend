import React, { useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import DisplayHome from './DisplayHome';
import DisplayAlbum from './DisplayAlbum';
import { albumsData, genresData } from '../assets/assets';
import DisplayGenre from './DisplayGenre';
import DisplaySearch from './DisplaySearch';
import DisplayPlaylist from './DisplayPlaylist';

const Display = () => {

  const displayRef = useRef();
  const location = useLocation();

  const isAlbum = location.pathname.startsWith('/album/');
  const isGenre = location.pathname.startsWith('/genre/');
  const isSearch = location.pathname === '/search';

  const id = location.pathname.split('/').pop();
  let bgColor;

  if (isAlbum) {
    const album = albumsData.find((album) => album.id.toString() === id);
    if (album) {
      bgColor = album.bgColor;
    }
  } else if (isGenre) {
    const genre = genresData.find((genre) => genre.id.toString() === id);
    if (genre) {
      bgColor = genre.bgColor;
    }
  }

  useEffect(() => {
    if (bgColor && !isSearch) {
      displayRef.current.style.background = `linear-gradient(${bgColor}, #121212)`;
    } else {
      displayRef.current.style.background = '#121212';
    }
  }, [bgColor, isSearch]);

  return (
    <div ref={displayRef} className='w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0'>
        <Routes>
            <Route path='/' element={<DisplayHome/>}></Route>
            <Route path='/album/:id' element={<DisplayAlbum/>}></Route>
            <Route path='/genre/:id' element={<DisplayGenre/>}></Route>
            <Route path='/search' element={<DisplaySearch />} />
            <Route path='/playlist/:id' element={<DisplayPlaylist />} />
        </Routes>   
    </div>
  )
}

export default Display
