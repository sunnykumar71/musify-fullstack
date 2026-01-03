import React from 'react'
import { useSearch } from '../context/SearchContext'
import { Music, SearchIcon } from 'lucide-react'
import SongItem from './SongItem'
import AlbumItem from './AlbumItem'

const Search = () => {
  const { searchQuery, searchResults, isSearchActive } = useSearch()
  const { songs, albums } = searchResults
  const totalResults = songs.length + albums.length

  // No results case (vertically centered)
  if (totalResults === 0 && isSearchActive) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <SearchIcon className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">No results found</h2>
        <p className="text-gray-400">Try searching for something else</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 min-h-screen px-4">
      {/* Search Results Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Search Results</h1>
        <p className="text-gray-400">
          Found {totalResults} result{totalResults !== 1 ? 's' : ''} for "{searchQuery}"
        </p>
      </div>

      {/* Songs Section */}
      {songs.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Music className="w-6 h-6 text-green-400" />
            <h2 className="text-2xl font-bold text-white">Songs</h2>
            <span className="text-gray-400">({songs.length})</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {songs.map(song => (
              <SongItem
                key={song._id}
                id={song._id}
                name={song.name}
                desc={song.desc}
                image={song.image}
              />
            ))}
          </div>
        </div>
      )}

      {/* Albums Section */}
      {albums.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Music className="w-6 h-6 text-green-400" />
            <h2 className="text-2xl font-bold text-white">Albums</h2>
            <span className="text-gray-400">({albums.length})</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {albums.map(album => (
              <AlbumItem
                key={album._id}
                id={album._id}
                name={album.name}
                desc={album.desc}
                image={album.imageUrl}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Search
