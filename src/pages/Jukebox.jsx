import React, { useState } from "react";
import Base from "./layout/Base";
import SpringGroup from "./layout/SpringGroup";
import CategoryGroup4 from "./layout/CategoryGroup4";
import FirstGridArea from "./FirstGridArea";
import SecondGridArea from "./SecondGridArea";
import { YoutubeLinksInput, YoutubePlayer } from "../shared/style/Jukebox";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";

export default function Jukebox() {
  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState("");

  const handleButtonClick = (path) => {
    navigate(path);
  };

  const handleInputChange = (event) => {
    setVideoUrl(event.target.value); // 추가: YoutubeLinksInput에서 입력한 값을 videoUrl 상태에 저장
  };

  const handleInputSubmit = () => {
    // 추가: 입력 버튼을 클릭할 때, videoUrl 상태 값을 이용하여 ReactPlayer의 url prop 업데이트
    console.log("입력한 URL:", videoUrl);
    // 여기에서 ReactPlayer의 url을 업데이트하는 로직 추가
  };

  return (
    <>
      <Base>
        <FirstGridArea />
        <SecondGridArea>
          <YoutubePlayer>
            <YoutubeLinksInput onChange={handleInputChange} />
            <button onClick={handleInputSubmit}>입력</button>
            <ReactPlayer
              className="player"
              url={videoUrl}
              width="800px"
              heigth="560px"
              playing={true}
              muted={false}
              controls={true}
              style={{ marginLeft: "20px" }}
            />
          </YoutubePlayer>
        </SecondGridArea>
      </Base>
      <SpringGroup />
      <CategoryGroup4 />
    </>
  );
}
