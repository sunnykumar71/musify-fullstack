import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PlayerContext } from "../context/PlayerContext";
import { assets } from "../assets/assets";
import { Clock } from "lucide-react";

const DisplayAlbum = ({ album }) => {
  const { id } = useParams();
  const { albumsData, songsData } = useContext(PlayerContext);
  const [albumData, setAlbumData] = useState(null);

  const albumSongs = songsData?.filter(
    song => song.album === album?.name
  );


  return albumsData ? (
    <>
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <img
          src={album?.imageUrl}
          alt=''
          className="w-48 rounded"
        />
        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">
            {album?.name}
          </h2>
          <h4>{album?.desc}</h4>
          <p className='mt-1'>
            <img src={assets.logo} alt="logo" className='inline-block w-5 mr-1' />
            <b>Musify</b> . 1,23,456 likes . <b>6 Songs</b> about 2 hr 30min
          </p>
        </div>
      </div>

      <div className='grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]'>
        <p>
          <b className='mr-4'>#</b>
        </p>
        <p>Album</p>
        <p className='hidden sm:block'> Date Added</p>
        <Clock className='m-auto w-4' />
      </div>
      <hr />

      {albumSongs?.length === 0 && (
        <p className="mt-5 text-red-400">No songs found for this album</p>
      )}

      {albumSongs?.map((item, index) => (
        <div
          className='grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff12]'
          key={item._id || index}
        >
          <p className='text-white'>
            <b className='mr-4 text-[#a7a7a7]'>{index + 1}</b>
            <img src={item.image} alt="" className='inline w-10 mr-5' />
            {item.name}
          </p>
          <p className='text-[#15px]'>{album?.name}</p>
          <p className="text-[#15px] hidden sm:block">5 days ago</p>
          <p className="text-[#15px] hidden sm:block">{item.duration}</p>
        </div>
      ))}

    </>
  ) : null;
};

export default DisplayAlbum;
