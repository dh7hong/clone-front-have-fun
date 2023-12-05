import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVenus } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { FontAwesomeIcon as ReactFontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { setFeeling } from "../redux/modules/feelingSlice";
import { getProfileFeeling } from "../api/profile";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Container1,
  FeelingSelectorBox,
  FontStyle,
  HelpLink,
  Item1,
  Item2,
  LiName,
  ProfileImg,
  StatusMessage,
} from "../shared/style/FirstGridArea";
import { MyProfile, MyProfileImage } from "../shared/style/HeaderStyle";
import ProfileFeelingIcon from "./profile/ProfileFeelingIcon"
import { current } from "@reduxjs/toolkit";
import { getProfileMessage } from "../api/profile";
import { updateProfileMessage } from "../api/profile";
import { updateOrCreateStatusMessage } from "../redux/modules/profileSlice";
import { setStatusMessage } from "../redux/modules/profileSlice";

const FirstGridArea = () => {
  const imageArr = useSelector((state) => state.image.imageArr);
  const currentFeeling = useSelector((state) => state.feeling.selectedFeeling);
  const profileStatus = useSelector((state) => state.profile.messages);
  const memberId = localStorage.getItem("memberId");
  const dispatch = useDispatch();


  useEffect(() => {
    // Fetching and setting status message
    const fetchStatusMessage = async () => {
      try {
        const fetchedMessage = await getProfileMessage(memberId);
        dispatch(setStatusMessage({ memberId, message: fetchedMessage.message }));
      } catch (error) {
        console.error("Error fetching profile message", error);
      }
    };

    fetchStatusMessage();
  }, [memberId, dispatch]);

  useEffect(() => {
    const fetchFeelings = async () => {
      const fetchedFeeling = await getProfileFeeling(memberId);
      dispatch(setFeeling({memberId, feeling: fetchedFeeling.feeling}));
    };
    fetchFeelings();
  }, [memberId, dispatch]);

  // const state = useSelector((state) => state);
  // console.log(state); // Check the entire Redux state structure

  console.log("fetched Feeling: ", currentFeeling);
  const image = localStorage.getItem("image");

  
  const currentStatusMessage = profileStatus[memberId] || "Loading status...";
  
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
              {imageArr && <ProfileImg src={imageArr} alt="엑박" />}
              {!imageArr && (
                <div>
                  {!image && <MyProfile alt="마이페이지" />}
                  {image && <MyProfileImage src={image} alt="마이페이지" />}
                </div>
              )}
            </div>
            {/* ↑ 경로를 수정해야할 곳 */}
            <FeelingSelectorBox style={{ fontSize: "16px" }}>
              <span style={{ color: "#2aacd3" }}>TODAY IS.. &nbsp;</span>
              <span>
                {ProfileFeelingIcon(currentFeeling)}
              </span>
            </FeelingSelectorBox>
            <div>
              <StatusMessage style={{ color: "#2aacd3", fontSize: "25px" }}>
                {currentStatusMessage}
              </StatusMessage>
            </div>
            <div
              style={{
                fontSize: "20px",
                color: "#436087",
                fontWeight: "7500",
                display: "flex",
              }}
            >
              싸이월드
              <div
                style={{
                  marginLeft: "5px",
                  border: "0px solid black",
                  borderRadius: "5px",
                  color: "#E8B793",
                  width: "20px",
                  height: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "3px",
                }}
              >
                <FontAwesomeIcon icon={faVenus} style={{ fontSize: "cover" }} />
              </div>
            </div>
            <div>
              <HelpLink href="https://support.spartacodingclub.kr/">
                cyhelp@cyworld.com
              </HelpLink>
            </div>
          </FontStyle>
        </Item2>
      </Container1>
      {/* <SpringGroup /> */}
    </LiName>
  );
};

export default FirstGridArea;
