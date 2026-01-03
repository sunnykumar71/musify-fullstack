import React, { useState } from "react";
import {
  Home,
  Search,
  X,
  Menu,
  Library,
  ArrowRight,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/SearchContext.jsx";

const Sidebar = () => {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  const navigate = useNavigate();
  const { searchQuery, setSearchQuery, setIsSearchActive, clearSearch } =
    useSearch();

  /* ------------------ Handlers ------------------ */

  const openMobileSidebar = () => setOpenSidebar(true);
  const closeMobileSidebar = () => setOpenSidebar(false);

  const handleHomeClick = () => {
    navigate("/");
    clearSearch();
    closeMobileSidebar();
    setShowSearchInput(false);
  };

  const handleSearchClick = () => {
    setShowSearchInput(true);
    setIsSearchActive(true);
    navigate("/search");
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCloseSearch = () => {
    setShowSearchInput(false);
    clearSearch();
    navigate("/");
  };

  /* ---------------------------------------------- */

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#121212] p-2 rounded-full text-white"
        onClick={openMobileSidebar}
      >
        <Menu />
      </button>

      {/* Overlay */}
      {openSidebar && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static top-0 left-0 h-full
          w-[80%] sm:w-[60%] lg:w-[25%]
          bg-[#121212] text-white p-4
          z-50 transform transition-transform duration-300
          ${openSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Close Button (Mobile) */}
        <div className="flex justify-end lg:hidden mb-4">
          <button onClick={closeMobileSidebar}>
            <X />
          </button>
        </div>

        {/* Home */}
        <div
          className="flex items-center gap-3 mb-6 cursor-pointer font-bold hover:text-green-500 transition-colors"
          onClick={handleHomeClick}
        >
          <Home className="w-6 h-6" />
          <span>Home</span>
        </div>

        {/* Search */}
        {!showSearchInput ? (
          <div
            className="flex items-center gap-3 cursor-pointer font-bold hover:text-green-500 transition-colors"
            onClick={handleSearchClick}
          >
            <Search className="w-6 h-6" />
            <span>Search</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 mt-3">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              autoFocus
              placeholder="What do you want to listen to?"
              onChange={handleSearchInputChange}
              className="
                flex-1 bg-[#2a2a2a] text-white text-sm
                placeholder-gray-400 px-3 py-2 rounded-full
                focus:outline-none focus:ring-2 focus:ring-green-400
              "
            />
            <button onClick={handleCloseSearch}>
              <X className="w-4 h-4 text-gray-400 hover:text-white" />
            </button>
          </div>
        )}

        {/* Library Section */}
        <div className="bg-[#121212] h-[85%] rounded mt-6">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer">
              <Library className="w-8 h-8" />
              <p className="font-semibold">Your Library</p>
            </div>

            <div className="flex items-center gap-3">
              <ArrowRight className="w-5 h-5 hover:text-green-400 cursor-pointer" />
              <Plus className="w-5 h-5 hover:text-green-400 cursor-pointer" />
            </div>
          </div>

          {/* Playlist Card */}
          <div className="p-4 m-2 bg-[#242424] rounded font-semibold flex flex-col gap-1">
            <h1>Create your first playlist</h1>
            <p className="font-light">It's easy, we will help you</p>
            <button className="px-4 py-1.5 mt-4 bg-white text-orange-400 text-[15px] rounded-full">
              Create playlist
            </button>
          </div>

          {/* Podcast Card */}
          <div className="p-4 m-2 mt-4 bg-[#212424] rounded font-semibold flex flex-col gap-1">
            <h1>Let's find some podcasts to follow</h1>
            <p className="font-light">
              We will keep you updated on new episodes
            </p>
            <button className="px-4 py-1.5 mt-4 bg-white text-orange-400 text-[15px] rounded-full">
              Browse podcasts
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
