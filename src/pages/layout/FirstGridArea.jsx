import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setFeeling } from "../../redux/modules/feelingSlice";
import { getProfileFeeling } from "../../api/profile";
import axios from "axios";
import {
  Container1,
  FeelingSelectorBox,
  FontStyle,
  Item1,
  Item2,
  LiName,
  StatusMessage,
} from "../../shared/style/FirstGridArea";
import { MyProfile, MyProfileImage } from "../../shared/style/HeaderStyle";
import ProfileFeelingIcon from "../profile/ProfileFeelingIcon";
import { getProfileMessage } from "../../api/profile";
import { setStatusMessage } from "../../redux/modules/profileSlice";
import { addImage } from "../../redux/modules/imageSlice";
import ReactPlayer from "react-player";
import { setVideos } from "../../redux/modules/jukeboxSlice";
import { Button } from "../../components/smallButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

const FirstGridArea = () => {
  const memberId = localStorage.getItem("memberId");
  const dispatch = useDispatch();
  const videos = useSelector(
    (state) => state.jukebox.videosByMemberId[memberId] || []
  );
  const [currentVideoIndex, setCurrentVideoIndex] = useState(
    parseInt(localStorage.getItem("currentVideoIndex")) || 0
  );
  const [volume, setVolume] = useState(
    parseFloat(localStorage.getItem("volume")) || 0.2
  );
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef(null);
  const image = localStorage.getItem("image");
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => setIsPlaying(!isPlaying);
  const playPauseIcon = isPlaying ? faPause : faPlay;

  const handleProgress = (progress) => setCurrentTime(progress.playedSeconds);
  const handleDuration = (duration) => setDuration(duration);
  const handleSeekChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    playerRef.current.seekTo(newTime);
  };

  const handleVideoEnd = () =>
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  const handleVolumeChange = (event) =>
    setVolume(parseFloat(event.target.value));

  useEffect(() => {
    localStorage.setItem("currentVideoIndex", currentVideoIndex.toString());
    localStorage.setItem("volume", volume.toString());
  }, [currentVideoIndex, volume]);

  useEffect(() => {
    const fetchStatusMessage = async () => {
      try {
        const fetchedMessage = await getProfileMessage(memberId);
        dispatch(
          setStatusMessage({ memberId, message: fetchedMessage.message })
        );
      } catch (error) {
        console.error("Profile message doesn't exist!", error);
      }
    };

    const fetchFeelings = async () => {
      try {
        const fetchedFeeling = await getProfileFeeling(memberId);
        dispatch(setFeeling({ memberId, feeling: fetchedFeeling.feeling }));
      } catch (error) {
        console.error("Profile feeling doesn't exist!", error);
      }
    };

    const fetchProfileImage = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_AUTH_URL}/api/users/${memberId}/profileImage`
        );
        if (response.data.imageUrl) {
          dispatch(addImage({ memberId, imageUrl: response.data.imageUrl }));
        }
      } catch (error) {
        console.error("Error fetching profile image:", error);
      }
    };
    if (videos.length === 0) {
      axios
        .get(`${process.env.REACT_APP_AUTH_URL}/api/users/${memberId}/jukebox`)
        .then((response) => {
          dispatch(setVideos({ memberId, videos: response.data.videos }));
        })
        .catch((error) => {
          console.error("Error fetching videos:", error);
        });
    }

    fetchStatusMessage();
    fetchFeelings();
    fetchProfileImage();
  }, [memberId, dispatch, videos.length]);

  useEffect(() => {
    if (currentVideoIndex >= videos.length) {
      setCurrentVideoIndex(videos.length > 0 ? videos.length - 1 : 0);
    }
  }, [videos.length, currentVideoIndex]);

  const currentVideo = videos[currentVideoIndex];
  const currentStatusMessage =
    useSelector((state) => state.profile.messages[memberId]) ||
    "Loading status...";
  const selectedImage = useSelector((state) => state.image.images[memberId]); // Assuming you have such state in your Redux store
  const currentFeeling = useSelector((state) => state.feeling.selectedFeeling); // Assuming you have such state in your Redux store

  const playNextVideo = () =>
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  const playPreviousVideo = () =>
    setCurrentVideoIndex(
      (prevIndex) => (prevIndex - 1 + videos.length) % videos.length
    );
  // const state = useSelector((state) => state);
  // console.log(state); // Check the entire Redux state structure

  return (
    <LiName>
      <Container1>
        <Item1>
          <div style={{ marginBottom: "20px" }}>
            Today <span style={{ color: "red" }}>25 </span>
            <span>| TOTAL 777</span>
          </div>
        </Item1>
        <Item2>
          <FontStyle>
            <div style={{ marginTop: "10px" }}>
              <MyProfileImage
                src={selectedImage || image || "/images/default.png"}
                alt="Profile"
              />
            </div>
            <FeelingSelectorBox style={{ fontSize: "16px" }}>
              <span style={{ color: "#2aacd3" }}>TODAY IS.. &nbsp;</span>
              <span>{ProfileFeelingIcon(currentFeeling)}</span>
            </FeelingSelectorBox>
            <div>
              <StatusMessage style={{ color: "#2aacd3", fontSize: "25px" }}>
                {currentStatusMessage}
              </StatusMessage>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "10px",
                width: "10vw",
                height: "20vh",
              }}
            >
              {currentVideo && (
                <div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      margin: "10px",
                      padding: "10px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ReactPlayer
                      ref={playerRef}
                      url={currentVideo?.url}
                      width="8vw"
                      height="7vh"
                      playing={isPlaying}
                      controls={true}
                      volume={volume}
                      onEnded={handleVideoEnd}
                      onProgress={handleProgress}
                      onDuration={handleDuration}
                    />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={handleVolumeChange}
                      style={{ width: "100%" }}
                    />
                    <input
                      type="range"
                      min="0"
                      max={duration}
                      value={currentTime}
                      step="1"
                      onChange={handleSeekChange}
                      style={{ width: "100%", accentColor: "red" }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        textAlign: "center",
                        alignItems: "center",
                        width: "10vw",
                        height: "3vh",
                      }}
                    >
                      <Button
                        style={{
                          width: "2vw",
                          height: "2vh",
                          textAlign: "center",
                          fontSize: "8px",
                        }}
                        onClick={playPreviousVideo}
                      >
                        {"<<"}
                      </Button>
                      <Button
                        style={{
                          width: "2vw",
                          height: "2vh",
                          textAlign: "center",
                          fontSize: "8px",
                        }}
                        onClick={togglePlayPause}
                      >
                        <FontAwesomeIcon icon={playPauseIcon} />
                      </Button>
                      <Button
                        style={{
                          width: "2vw",
                          height: "2vh",
                          textAlign: "center",
                          fontSize: "8px",
                        }}
                        onClick={playNextVideo}
                      >
                        {">>"}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </FontStyle>
        </Item2>
      </Container1>
      {/* <SpringGroup /> */}
    </LiName>
  );
};

export default FirstGridArea;
