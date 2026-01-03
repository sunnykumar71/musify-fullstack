import React, { useContext, useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./Navbar";
import DisplayHome from "./DisplayHome";
import DisplayAlbum from "./DisplayAlbum";
import Search from "./Search";
import { PlayerContext } from "../context/PlayerContext";

const Display = () => {
  const { albumsData } = useContext(PlayerContext);
  const location = useLocation();
  const displayRef = useRef();
  const isAlbum = location.pathname.includes("album");
  const albumId = isAlbum ? location.pathname.split("/").pop() : "";
  // const album = albumsData.find(x => x._id == albumId);
  const album = isAlbum? albumsData.find(x=> x._id==albumId) : null;
  const bgColor=album?album.bgColor :'#121212'
  // const bgColor = isAlbum ? albumsData.find(x => x._id == albumId).bgColour : '#121212';

  useEffect(() => {
    if (isAlbum) {
      displayRef.current.style.background =
        `linear-gradient(${bgColor}, #121212)`;
    } else {
      displayRef.current.style.background = '#121212';
    }
  }, [isAlbum, bgColor]);

  return (
    <div ref={displayRef}
      className="w-full lg:w-[75%] m-2 lg:ml-0 bg-[#121212] text-white flex flex-col rounded-lg overflow-hidden">

      {/* Sticky Navbar */}
      <header className="sticky top-0 z-20 bg-[#121212]/95 backdrop-blur-md border-b border-gray-800">
        <Navbar />
      </header>

      {/* Page Content */}
      <main className="flex-1 px-6 py-4 overflow-y-auto">
        <Routes>
          <Route path="/" element={<DisplayHome />} />
          <Route path="/album/:id" element={<DisplayAlbum album={albumsData.find((x) => x._id == albumId)} />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </main>

    </div>
  );
};

export default Display;
