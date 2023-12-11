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
import { passiveSupport } from "passive-events-support/src/utils";
import { generateUniqueId } from "../../util/generateUniqueId";
import { getDateTime } from "../../util/getDateTime";
import moment from "moment";

export default function Jukebox() {
  passiveSupport({ events: ["touchstart", "touchmove"] });

  const [errorMessage, setErrorMessage] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const dispatch = useDispatch();
  const memberId = localStorage.getItem("memberId");
  const videos = useSelector(
    (state) => state.jukebox.videosByMemberId[memberId] || []
  );

  // Refactor the sorting logic into a function
  const sortVideos = (videos) => {
    return videos.sort((a, b) => {
      // Parse the dates using the specified format
      const dateA = moment(a.createdAt, "YYYY-MM-DD HH:mm:ss");
      const dateB = moment(b.createdAt, "YYYY-MM-DD HH:mm:ss");
      // Subtract the dates to get a value that sort can use to order the videos
      return dateB.diff(dateA); // For descending order, more recent dates first
    });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_AUTH_URL}/api/users/${memberId}/jukebox`)
      .then((response) => {
        const sortedVideos = sortVideos(response.data.videos);
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
    const videoId = generateUniqueId(); // Generate a unique ID for the video
    const createdAt = getDateTime(); // Get the current ISO date-time string
    const newVideo = { url: videoUrl, volume: 0.5, videoId, createdAt };

    // Here you need to add and then sort the videos
    const newVideosList = sortVideos([...videos, newVideo]);

    dispatch(setVideos({ memberId, videos: newVideosList }));
    axios
      .post(`${process.env.REACT_APP_AUTH_URL}/api/users/${memberId}/jukebox`, {
        videos: [...videos, newVideo], // Spread the existing videos and add the new video
      })
      .then((response) => {
        console.log("Videos saved:", response.data);
        setVideoUrl(""); // Reset the video URL
      })
      .catch((error) => {
        console.error("Error saving videos", error);
      });
  };

  const handleDeleteVideo = (videoIdToDelete) => {
    const updatedVideos = videos.filter(
      (video) => video.videoId !== videoIdToDelete
    );

    dispatch(setVideos({ memberId, videos: updatedVideos }));
    axios
      .post(`${process.env.REACT_APP_AUTH_URL}/api/users/${memberId}/jukebox`, {
        videos: updatedVideos,
      })
      .then((response) => {
        console.log("Video deleted and list updated on server:", response.data);
      })
      .catch((error) => {
        console.error("Error updating videos on server", error);
      });
  };

  const handleVolumeChange = (videoIdToChange, newVolume) => {
    const updatedVideos = videos.map((video) =>
      video.videoId === videoIdToChange
        ? { ...video, volume: newVolume }
        : video
    );
    dispatch(
      updateVolume({ memberId, videoId: videoIdToChange, volume: newVolume })
    );
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
            {/* <YoutubeLinksButton onClick={handleSaveVideos}>
              Save Videos
            </YoutubeLinksButton> */}
          </YoutubePlayer>

          {/* Grid of Videos */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            {videos.map((video, index) => (
              <div key={video.videoId} style={{ marginBottom: "20px" }}>
                <ReactPlayer
                  url={video.url}
                  width="200px"
                  height="100px"
                  playing={false}
                  muted={false}
                  controls={true}
                  volume={video.volume}
                  sandbox="allow-scripts allow-same-origin"
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
                  style={{ width: "200px" }}
                />
                <br />
                <button
                  onClick={() => handleDeleteVideo(video.videoId)}
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
