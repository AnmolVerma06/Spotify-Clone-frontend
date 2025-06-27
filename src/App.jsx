import React from 'react'
import LoginPage from './components/LoginPage';
import Sidebar from './components/Sidebar'
import Player from './components/Player'
import Display from './components/Display'
import { PlayerContext } from './context/PlayerContext'

const App = () => {
  const isAuthed = !!localStorage.getItem('spotify_access_token');

  if (!isAuthed) {
    return <LoginPage />;
  }

  return (
    <div className='h-screen bg-black'>
      <div className='h-[90%] flex'>
        <Sidebar />
        <Display />
      </div>
      <Player />
    </div>
  )
}

export default App
