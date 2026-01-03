import React from 'react'
import { useAuth } from '../context/AuthContext';
import { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import AlbumItem from './AlbumItem';
import SongItem from './SongItem';

const DisplayHome = () => {
  const {songsData, albumsData} =useContext(PlayerContext);
  
  return (
    <>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
        <div className='flex overflow-auto'>
          {/* Display the albums data */}
          {albumsData.map((item,index)=>(
            <AlbumItem
              key={index}
              name={item.name}
              desc={item.desc}
              id={item._id}
              image={item.imageUrl}
            />
          ))}
        </div>
        <div>
          <h1 className="my-5 font-bold text-2xl">Today's biggest hits</h1>
          <div className='flex overflow-auto'>
            {/* Display the songs auto */}

            {songsData.map((item,index)=>(
              <SongItem 
              key={index}
              name={item.name}
              desc={item.desc}
              id={item._id}
              image={item.image}
              />
            ))}
          </div>
        </div>
      </div>
    </>

  )
}

export default DisplayHome