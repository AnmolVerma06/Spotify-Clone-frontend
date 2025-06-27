import React, { useContext } from 'react'
import Sidebar from './components/Sidebar'
import Player from './components/Player'
import Display from './components/Display'
import { PlayerContext } from './context/PlayerContext'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import CallbackHandler from './components/CallbackHandler'

const App = () => {
  const { audioRef, track } = useContext(PlayerContext)
  const location = useLocation();
  const accessToken = localStorage.getItem('spotify_access_token');

  // If not authenticated and not on /login or /callback, redirect to /login
  if (!accessToken && location.pathname !== '/login' && location.pathname !== '/callback') {
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/callback" element={<CallbackHandler />} />
      <Route path="/*" element={
        <div className='h-screen bg-black'>
          <div className='h-[90%] flex'>
            <Sidebar />
            <Display />
          </div>
          <Player />
          <audio ref={audioRef} src={track.file} preload='auto'></audio>
        </div>
      } />
    </Routes>
  )
}

export default App
