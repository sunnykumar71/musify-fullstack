import React, { useEffect, useState } from 'react'
import DashBoardLayout from '../layout/DashBoardLayout'
import { Check, Music, Image, FileJson } from 'lucide-react';
import { albumsAPI, songsAPI } from '../services/apiService';
import toast from 'react-hot-toast';

const AddSong = () => {
  const [image, setImage] = useState(false);
  const [song, setSong] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [album, setAlbum] = useState("none");
  const [loading, setLoading] = useState(false);
  const [albumData, setAlbumData] = useState([]);


  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      
      const formData = new FormData();

      const request = {
        name,
        desc,
        album
      };

      formData.append("request", new Blob([JSON.stringify(request)], { type: "application/json" }));
      formData.append("audio", song);
      formData.append("image", image);

      const response = await songsAPI.add(formData);

      if (response.status === 201) {
        toast.success("Song added!");
        setName("");
        setDesc("");
        setAlbum("none");
        setImage(false);
        setSong(false);
      } else {
        toast.error("Something went wrong while adding song Please try again");
      }
    } catch (error) {
      console.error("error",error);
      toast.error("Something went wrong while adding song");
    } finally {
      setLoading(false);
    }
  };

  const loadAlbumData = async () => {
    try {
      const response = await albumsAPI.list();
      setAlbumData(response.data.albums);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load albums');
    }
  }


  useEffect(() => {
    loadAlbumData();
  }, [])

  return (
    <div>
      <DashBoardLayout activeMenu="Add Song">
        {loading ? (
          <div className="grid place-items-center min-h-[80vh]">
            <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
          </div>
        ) : (
          <form
            onSubmit={onSubmitHandler} className="flex flex-col items-start gap-8 text-gray-600 mt-5">
            <div className="flex gap-8">
              {/* Upload song */}
              <div className="flex flex-col gap-4">
                <p>Upload Song</p>

                <input
                  type="file"
                  accept="audio/*"
                  id="song"
                  hidden
                  onChange={(e) => setSong(e.target.files[0])}
                />

                <label
                  htmlFor="song"
                  className="flex flex-col items-center justify-center w-16 h-16 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-green-400 transition-colors overflow-hidden"
                >
                  {song ? (
                    <Check className='w-8 h-8 text-green-500' />
                  ) : (
                    <Music className='w-8 h-8 text-green-500' />
                  )}
                </label>
              </div>
              {/* Upload image */}
              <div className="flex flex-col gap-4">
                <p>Upload Image</p>
 
                <input
                  type="file"
                  accept="image/*"
                  id="image"
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />

                <label
                  htmlFor="image"
                  className="flex flex-col items-center justify-center w-16 h-16 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-green-400 transition-colors overflow-hidden"
                >
                  {image ? (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <Image className='w-8 h-8 text-gray-500' />
                  )}
                </label>
              </div>
            </div>

            {/* song name */}
            <div className='flex flex-col gap-2.5'>
              <p>Song name</p>
              <input type="text"
                className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]'
                placeholder='Type here'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* song description */}
            <div className='flex flex-col gap-2.5'>
              <p>Song description</p>
              <input type="text"
                className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]'
                placeholder='Type here'
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>

            {/* Albums */}
            <div className="flex flex-col gap-2.5">
              <p>Album</p>
              <select
                value={album}
                onChange={(e) => setAlbum(e.target.value)}>

                <option value="none">None</option>

                {albumData.map((album, index) => (
                  <option value={album._id} key={album._id || index}>
                    {album.name}
                  </option>
                ))}

              </select>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="
            bg-[#3be477]
            text-white
            text-base
            font-medium
            py-2.5
            px-6
            rounded-md
            shadow-sm
            hover:bg-[#34d96c]
            active:scale-95
            transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed">ADD SONG</button>

          </form>
        )}
      </DashBoardLayout>
    </div>
  )
}

export default AddSong
