import React, { useEffect, useState } from 'react'
import DashBoardLayout from '../layout/DashBoardLayout'
import { Image } from 'lucide-react'
import toast from 'react-hot-toast';
import { albumsAPI } from '../services/apiService';


const AddAlbum = () => {
  const [image, setImage] = useState(false);
  const [colour, setColour] = useState("#3be477");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!image) {
        toast.error("Please upload an album image");
        setLoading(false);
        return;
      }

      const formData = new FormData();

      const request = {
        name,
        desc,
        bgColor: colour
      };

      formData.append(
        "request",
        new Blob([JSON.stringify(request)], { type: "application/json" })
      );

      formData.append("file", image);

      const response = await albumsAPI.add(formData);

      if (response.status === 201) {
        toast.success("Album added!");
        setName("");
        setDesc("");
        setImage(false);
        setColour("#3be477");
      } else {
        toast.error("Something went wrong while adding album");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error adding album. Please try again");
    } finally {
      setLoading(false);
    }
  };




  return (
    <DashBoardLayout activeMenu="Add Album">
      {loading ? (
        <div className="grid place-items-center min-h-[80vh]">
          <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
        </div>
      ) : (
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col items-start gap-8 text-gray-600 mt-5"
        >
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

          {/* ALbum name */}
          <div className='flex flex-col gap-2.5'>
            <p>Album name</p>
            <input type="text"
              className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]'
              placeholder='Type here'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Album description */}
          <div className='flex flex-col gap-2.5'>
            <p>Album description</p>
            <input type="text"
              className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]'
              placeholder='Type here'
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>

          {/* Album background colour */}
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-gray-700">Background Colour</p>

            <div className="flex items-center gap-4">
              <input
                type="color"
                value={colour}
                onChange={(e) => setColour(e.target.value)}
                className="w-20 h-12 p-1 border rounded-xl cursor-pointer bg-white"
              />
            </div>
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
            transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed">ADD ALBUM</button>

        </form>

      )}
    </DashBoardLayout>
  )
}

export default AddAlbum
