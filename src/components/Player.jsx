import React, { useContext, useRef, useState, useEffect, useCallback } from 'react';
import { assets } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext';

const Player = () => {
  const context = useContext(PlayerContext);
  const audioRef = context?.audioRef;
  const [volume, setVolume] = useState(1);
  const volumeRef = useRef();
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    if (audioRef && audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume, audioRef]);

  // Exit fullscreen on Esc
  useEffect(() => {
    if (!fullscreen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') setFullscreen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [fullscreen]);

  if (!context || !context.time || !context.time.currentTime || !context.time.totalTime) {
    return <div className='text-white text-center'>Loading Player...</div>;
  }

  const {
    track,
    seekBar,
    seekBg,
    playStatus,
    play,
    pause,
    time,
    previous,
    next,
    seekSong,
  } = context;

  const formatTime = (val) =>
    typeof val === 'number' ? val.toString().padStart(2, '0') : '00';

  // Fullscreen overlay
  const FullscreenOverlay = () => (
    <div className="fixed inset-0 z-50 flex flex-col justify-center items-center pb-[10%]">
      {/* Blurred background only behind the image/info, not the player bar */}
      <div
        className="absolute left-0 right-0 top-0"
        style={{ height: '90vh', background: `rgba(0,0,0,0.7)`, backdropFilter: 'blur(30px)', backgroundImage: `url(${track?.image})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(20px)' }}
      ></div>
      {/* Big song image in the center */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 w-full h-full" style={{ minHeight: '70vh' }}>
        <img
          src={track?.image}
          alt={track?.name}
          className="rounded-2xl shadow-2xl mb-8"
          style={{ width: '350px', height: '350px', objectFit: 'cover' }}
        />
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-2">{track?.name}</h2>
          <p className="text-xl text-slate-200">{track?.desc}</p>
        </div>
      </div>
      {/* Player bar at the bottom, same as normal */}
      <div className='w-full fixed bottom-0 left-0 right-0 z-50'>
        {renderPlayerBar(true)}
      </div>
    </div>
  );

  // Extracted player bar for reuse
  const renderPlayerBar = (isFullscreen = false) => (
    <div className='h-[10%] bg-black flex justify-between items-center text-white px-4'>
      {/* Track Info */}
      <div className='hidden lg:flex items-center gap-4'>
        <img className='w-12' src={track?.image} alt='' />
        <div>
          <p>{track?.name}</p>
          <p>{track?.desc?.slice(0, 12)}</p>
        </div>
      </div>

      {/* Player Controls */}
      <div className='flex flex-col items-center gap-1 m-auto'>
        <div className='flex gap-4'>
          <img className='w-4 cursor-pointer' src={assets.shuffle_icon} alt='' />
          <img onClick={previous} className='w-4 cursor-pointer' src={assets.prev_icon} alt='' />
          {playStatus ? (
            <img onClick={pause} className='w-4 cursor-pointer' src={assets.pause_icon} alt='' />
          ) : (
            <img onClick={play} className='w-4 cursor-pointer' src={assets.play_icon} alt='' />
          )}
          <img onClick={next} className='w-4 cursor-pointer' src={assets.next_icon} alt='' />
          <img className='w-4 cursor-pointer' src={assets.loop_icon} alt='' />
        </div>

        {/* Progress Bar */}
        <div className='flex items-center gap-5'>
          <p>
            {formatTime(time.currentTime.minute)}:
            {formatTime(time.currentTime.second)}
          </p>
          <div
            ref={seekBg} onClick={seekSong}
            className='w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer'
          >
            <hr
              ref={seekBar}
              className='h-1 border-none w-0 bg-green-800 rounded-full'
            />
          </div>
          <p>
            {formatTime(time.totalTime.minute)}:
            {formatTime(time.totalTime.second)}
          </p>
        </div>
      </div>

      {/* Volume and Options */}
      <div className='hidden lg:flex items-center gap-2 opacity-75'>
        <img className='w-4' src={assets.plays_icon} alt='' />
        <img className='w-4' src={assets.mic_icon} alt='' />
        <img className='w-4' src={assets.queue_icon} alt='' />
        <img className='w-4' src={assets.speaker_icon} alt='' />
        <img className='w-4' src={assets.volume_icon} alt='' />
        <input
          ref={volumeRef}
          type='range'
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={e => setVolume(Number(e.target.value))}
          className='w-20 accent-green-600 bg-slate-50 h-1 rounded appearance-none outline-none'
          style={{ accentColor: '#22c55e', height: '4px' }}
        />
        <img className='w-4' src={assets.mini_player_icon} alt='' />
        <img
          className='w-4 cursor-pointer'
          src={assets.zoom_icon}
          alt=''
          onClick={() => setFullscreen(!isFullscreen)}
        />
      </div>
    </div>
  );

  return (
    <>
      {fullscreen ? (
        <FullscreenOverlay />
      ) : (
        renderPlayerBar(false)
      )}
    </>
  );
};

export default Player;
