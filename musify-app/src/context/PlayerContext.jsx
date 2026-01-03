import { useEffect, useRef, useState } from 'react'
import { createContext } from 'react'
import { API_BASE_URL, useAuth } from "./AuthContext.jsx";
import axios from "axios";

export const PlayerContext = createContext();

export const PlayerContextProvider = ({ children }) => {

    const [songsData, setSongsData] = useState([]);
    const [albumsData, setAlbumsData] = useState([]);
    const { user, token, getAuthHeaders } = useAuth();
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const [track, setTrack] = useState(songsData[0]);
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0
        },
        totalTime: {
            second: 0,
            minute: 0
        }
    });


    const play = () => {
        audioRef.current.play();
        setPlayStatus(true);
    }
    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    }

    const playWithId = async (id) => {
        songsData.map(item => {
            if (id === item._id) {
                setTrack(item);
            }
        });
        await audioRef.current.play();
        setPlayStatus(true);
    }

    const previous = async () => {
        songsData.map(async (item, index) => {
            if (track._id === item._id && index > 0) {
                await setTrack(songsData[index - 1]);
                await audioRef.current.play();
                setPlayStatus(true);
            }
        })
    }

    const next = async () => {
        songsData.map(async (item, index) => {
            if (track._id === item._id && index < songsData.length - 1) {
                await setTrack(songsData[index + 1]);
                await audioRef.current.play();
                setPlayStatus(true);
            }
        })
    }

    const seekSong = (e) => {
        const audio = audioRef.current;
        const seek = seekBg.current;

        if (!audio || !seek) return;
        if (!isFinite(audio.duration) || audio.duration === 0) return;

        const width = seek.offsetWidth;
        if (!width) return;

        const clickX = e.nativeEvent.offsetX;
        const newTime = (clickX / width) * audio.duration;

        if (!isFinite(newTime)) return;

        audio.currentTime = newTime;
    };




    const getSongsData = async () => {
        // API call logic later
        try {
            const response = await axios.get(`${API_BASE_URL}/api/songs`, { headers: getAuthHeaders() });
            const songs = response.data.songs || [];
            setSongsData(songs);
            if (songs.length > 0) {
                setTrack(songs[0]);
            }
        } catch (error) {
            console.error(error);
            setSongsData([]);
        }
    }

    const getAlbumsData = async () => {
        // API call logic later
        try {
            const response = await axios.get(`${API_BASE_URL}/api/albums`, { headers: getAuthHeaders() });
            const albums = response.data?.albums || [];
            setAlbumsData(albums);
        } catch (e) {
            console.error(e);
            setAlbumsData([]);
        }
    }
    // Setup audio event listeners
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateSeekBar = () => {
            if (seekBar.current && audio.duration) {
                const progress = (audio.currentTime / audio.duration) * 100;
                seekBar.current.style.width = Math.floor(progress) + "%";

                setTime({
                    currentTime: {
                        second: Math.floor(audio.currentTime % 60),
                        minute: Math.floor(audio.currentTime / 60)
                    },
                    totalTime: {
                        second: Math.floor(audio.duration % 60),
                        minute: Math.floor(audio.duration / 60)
                    }
                });
            }
        };

        const handleLoadedMetadata = () => {
            if (seekBar.current) {
                seekBar.current.style.width = "0%";
            }
        };

        //add event listeners
        audio.addEventListener("timeupdate", updateSeekBar);
        audio.addEventListener("loadedmetadata", handleLoadedMetadata);

        //cleanup function
        return () => {
            audio.removeEventListener("timeupdate", updateSeekBar);
            audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        };
    }, [track]);

    const contextValue = {
        getSongsData,
        getAlbumsData,
        songsData,
        albumsData,
        audioRef,
        seekBar,
        seekBg,
        track,
        setTrack,
        time,
        setTime,
        setPlayStatus,
        playStatus,
        play,
        pause,
        playWithId,
        previous,
        next,
        seekSong


    }

    useEffect(() => {
        if (user && token) {
            getAlbumsData();
            getSongsData();
        } else {
            setSongsData([]);
            setAlbumsData([]);
            setTrack(null);
        }
    }, [user, token]);

    return (
        <PlayerContext.Provider value={contextValue}>
            {children}
        </PlayerContext.Provider>
    )
}
