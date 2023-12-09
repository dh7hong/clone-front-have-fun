import React, { useState, useEffect } from "react";
import Base from "../layout/Base";
import FirstGridArea from "../FirstGridArea";
import SecondGridArea from "../SecondGridArea";
import {
  YoutubeLinksInput,
  YoutubePlayer,
  YoutubeLinksButton,
} from "../../shared/style/Jukebox";
import ReactPlayer from "react-player";
import axios from "axios";
import {
  addVideo,
  deleteVideo,
  setVideos,
  updateVolume,
} from "../../redux/modules/jukeboxSlice";
import { useDispatch, useSelector } from "react-redux";
import { passiveSupport } from 'passive-events-support/src/utils'

export default function Jukebox() {

  
  // Place the override code at the beginning of the component
  const originalConsoleError = console.error;
  console.error = (...args) => {
    if (args.some(arg => {
      if (typeof arg === 'string') {
        return arg.includes("Failed to execute");
      } else if (arg instanceof Error && arg.message) {
        return arg.message.includes("Failed to execute");
      } else {
        return arg.toString().includes("Failed to execute");
      }
    })) {
      return;
    }
    originalConsoleError(...args);
  };
  
  useEffect(() => {
    // Store the original console.warn function
    const originalConsoleWarn = console.warn;

    // Override console.warn
    console.warn = (...args) => {
      if (args.some(arg => {
        // Your conditions to check for specific warnings
        if (typeof arg === 'string') {
          return arg.includes('non-passive event listener') || arg.includes("Added non-passive event listener to a scroll-blocking 'touchstart' event");
        } else if (arg instanceof Error && arg.message) {
          return arg.message.includes('non-passive event listener') || arg.message.includes("Added non-passive event listener to a scroll-blocking 'touchstart' event");
        } else {
          return arg.toString().includes('non-passive event listener') || arg.toString().includes("Added non-passive event listener to a scroll-blocking 'touchstart' event");
        }
      })) {
        return;
      }
      originalConsoleWarn(...args);
    };

    // Reset console.warn when the component unmounts
    return () => {
      console.warn = originalConsoleWarn;
    };
  }, []);

  passiveSupport({ events: ['touchstart', 'touchmove'] })

  const [errorMessage, setErrorMessage] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const dispatch = useDispatch();
  const memberId = localStorage.getItem("memberId");
  const videos = useSelector(
    (state) => state.jukebox.videosByMemberId[memberId] || []
  );

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_AUTH_URL}/api/users/${memberId}/jukebox`)
      .then((response) => {
        dispatch(setVideos({ memberId, videos: response.data.videos }));
        setErrorMessage(""); // Clear any previous error messages
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setErrorMessage("No videos found for this user");
        } else {
          setErrorMessage("An error occurred while fetching videos");
        }
      });
  }, [dispatch, memberId]);

  const handleInputChange = (e) => setVideoUrl(e.target.value);

  const handleInputSubmit = () => {
    const newVideo = { url: videoUrl, volume: 0.5 };
    dispatch(addVideo({ memberId, video: newVideo }));
    setVideoUrl("");
  };

  const handleDeleteVideo = (index) => {
    const updatedVideos = videos.filter((_, i) => i !== index);
    dispatch(deleteVideo({ memberId, index }));
    axios.post(
      `${process.env.REACT_APP_AUTH_URL}/api/users/${memberId}/jukebox`,
      { videos: updatedVideos }
    );
  };

  const handleVolumeChange = (index, newVolume) => {
    const updatedVideos = videos.map((video, i) =>
      i === index ? { ...video, volume: newVolume } : video
    );
    dispatch(updateVolume({ memberId, index, volume: newVolume }));
  };

  const handleSaveVideos = () => {
    axios
      .post(`${process.env.REACT_APP_AUTH_URL}/api/users/${memberId}/jukebox`, {
        videos,
      })
      .then((response) => console.log("Videos saved:", response.data))
      .catch((error) => console.error("Error saving videos", error));
  };

  return (
    <div>
      <Base>
        <FirstGridArea />
        <SecondGridArea>
          <YoutubePlayer>
            <YoutubeLinksInput
              value={videoUrl}
              onChange={handleInputChange}
              placeholder="Enter YouTube URL"
            />
            <YoutubeLinksButton onClick={handleInputSubmit}>
              Add Video
            </YoutubeLinksButton>
            <YoutubeLinksButton onClick={handleSaveVideos}>
              Save Videos
            </YoutubeLinksButton>
          </YoutubePlayer>

          {/* Grid of Videos */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            {videos.map((video, index) => (
              <div key={index} style={{ marginBottom: "20px" }}>
                <ReactPlayer
                  url={video.url}
                  width="300px"
                  height="160px"
                  playing={false}
                  muted={false}
                  controls={true}
                  volume={video.volume}
                />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={video.volume}
                  onChange={(e) =>
                    handleVolumeChange(index, parseFloat(e.target.value))
                  }
                  style={{ width: "300px" }}
                />
                <br />
                <button
                  onClick={() => handleDeleteVideo(index)}
                  style={{ marginTop: "10px" }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </SecondGridArea>
      </Base>
    </div>
  );
}
